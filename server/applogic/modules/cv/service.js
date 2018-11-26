"use strict";

let logger      = require("../../../core/logger");
let config      = require("../../../config");
let C           = require("../../../core/constants");

let _           = require("lodash");

let Cv          = require("./models/cv");

module.exports = {
    settings: {
        name: "cvs",
        version: 1,
        namespace: "cvs",
        rest: true,
        ws: true,
        graphql: true,
        permission: C.PERM_LOGGEDIN,
        role: "user",
        collection: Cv,
        modelPropFilter: "code ownerId title icon status skills experiences formations"
    },
    
    actions: {
        find: {
            cache: true,
            handler(ctx) {
                let filter = {};
                let query = Cv.find(filter)
                    .populate("ownerId")
                    .populate("skills")
                    .populate({
                        path: "skills",
                        populate: { path: "tools", model: "Tool" }
                    })
                    .populate("experiences")
                    .populate({
                        path: "experiences",
                        populate: { path: "tools", model: "Tool" }
                    })
                    .populate("formations")
                    .populate({
                        path: "formations",
                        populate: { path: "tools", model: "Tool" }
                    })
                    ;

                return ctx.queryPageSort(query).exec().then( (docs) => {
                    return this.toJSON(docs);
                });
            }
        },

        // return a model by ID
        get: {
            cache: true,
            handler(ctx) {
                ctx.assertModelIsExist(ctx.t("app:CvNotFound"));
                return Promise.resolve(ctx.model);
            }
        },

        create(ctx) {
            this.validateParams(ctx, true);
            
            let cv = new Cv({
                ownerId: ctx.params.ownerId,
                title: ctx.params.title,
                icon: ctx.params.icon,
                tag: ctx.params.tag,
                status: ctx.params.status,
            });

            return cv.save()
            .then((doc) => {
                return this.toJSON(doc);
            })
            .then((json) => {
                return this.populateModels(json);
            })
            .then((json) => {
                this.notifyModelChanges(ctx, "created", json);
                return json;
            }); 
        },

        update(ctx) {
            ctx.assertModelIsExist(ctx.t("app:CvNotFound"));
            this.validateParams(ctx);

            return this.collection.findById(ctx.modelID).exec()
            .then((doc) => {

                if (ctx.params.name != null)
                    doc.name = ctx.params.name;

                if (ctx.params.title != null)
                    doc.title = ctx.params.title;

                if (ctx.params.icon != null)
                    doc.icon = ctx.params.icon;
                
                if (ctx.params.status != null)
                    doc.status = ctx.params.status;

                if (ctx.params.skills != null) {
                    if (1 == ctx.params.experiences.length) {
                        doc.skills = ctx.params.skills[0].split(",");
                    } else {
                        doc.skills = ctx.params.skills;
                    }
                }

                if (ctx.params.experiences != null) {
                    if (1 == ctx.params.experiences.length) {
                        doc.experiences = ctx.params.experiences[0].split(",");
                    } else {
                        doc.experiences = ctx.params.experiences;
                    }
                }

                if (ctx.params.formations != null) {
                    if (1 == ctx.params.experiences.length) {
                        doc.formations = ctx.params.formations[0].split(",");
                    } else {
                        doc.formations = ctx.params.formations;
                    }
                }

                return doc.save();
            })
            .then((doc) => {
                return this.toJSON(doc);
            })
            .then((json) => {
                return this.populateModels(json);
            })
            .then((json) => {
                this.notifyModelChanges(ctx, "updated", json);
                return json;
            });                             
        },

        remove(ctx) {
            ctx.assertModelIsExist(ctx.t("app:CvNotFound"));

            return Cv.remove({ _id: ctx.modelID })
            .then(() => {
                return ctx.model;
            })
            .then((json) => {
                this.notifyModelChanges(ctx, "removed", json);
                return json;
            });     
        }

    },
    
    methods: {
        /**
        * Validate params of context.
        * We will call it in `create` and `update` actions
        * 
        * @param {Context} ctx          context of request
        * @param {boolean} strictMode       strictMode. If true, need to exists the required parameters
        */
        validateParams(ctx, strictMode) {

            ctx.validateParam("name").trim().notEmpty(ctx.t("app:CvNameCannotBeBlank")).end();
            ctx.validateParam("title").trim().notEmpty(ctx.t("app:CvTitleCannotBeBlank")).end();
            ctx.validateParam("tag").trim().end();
            ctx.validateParam("status").isNumber(ctx.t("app:CvStatusMustBeNumber"));

            if (ctx.hasValidationErrors())
                throw ctx.errorBadRequest(C.ERR_VALIDATION_ERROR, ctx.validationErrors);            
        }
    },  

    init(ctx) {
        // Fired when start the service
    },

    socket: {
        afterConnection(socket, io) {
            // Fired when a new client connected via websocket
        }
    },

    graphql: {

        query: `
        cvs(limit: Int, offset: Int, sort: String): [Cv]
        cv(code: String): Cv
        `,

        types: `
        type Cv {
            name: String!
            title: String!
            icon: String!
            status: Int
            skills: [String!]
            experiences: [String!]
            formations: [String!]
        }
        `,

        mutation: `
        cvCreate(name: String!, title: String!, tag: String, icon: String!, status: Int): Cv
        cvUpdate(code: String!, name: String!, title: String!, tag: String, icon: String!, status: Int, skills: [String!], experiences: [String!], formations: [String!]): Cv
        cvRemove(code: String!): Cv
        `,

        resolvers: {
            Query: {
                cvs: "find",
                cv: "get"
            },

            Mutation: {
                cvCreate: "create",
                cvUpdate: "update",
                cvRemove: "remove"
            }
        }
    }

};

/*
## GraphiQL test ##

# Find all cvs
query getCvs {
  cvs(sort: "lastCommunication", limit: 5) {
    ...cvFields
  }
}

# Create a new cv
mutation createCv {
  cvCreate(position: "New cv", business: "192.168.0.1", type: "raspberry", description: "My cv", status: 1) {
    ...cvFields
  }
}

# Get a cv
query getCv($code: String!) {
  cv(code: $code) {
    ...cvFields
  }
}

# Update an existing cv
mutation updateCv($code: String!) {
  cvUpdate(code: $code, business: "127.0.0.1") {
    ...cvFields
  }
}

# Remove a cv
mutation removeCv($code: String!) {
  cvRemove(code: $code) {
    ...cvFields
  }
}

fragment cvFields on Cv {
    code
    business
    type
    position
    description
    status
    lastCommunication
}

*/