"use strict";

let logger      = require("../../../core/logger");
let config      = require("../../../config");
let C           = require("../../../core/constants");

let _           = require("lodash");

let Experience  = require("./models/experience");

module.exports = {
    settings: {
        name: "experiences",
        version: 1,
        namespace: "experiences",
        rest: true,
        ws: true,
        graphql: true,
        permission: C.PERM_LOGGEDIN,
        role: "user",
        collection: Experience,
        modelPropFilter: "code business tags position description startedAt endedAt"
    },
    
    actions: {
        find: {
            cache: true,
            handler(ctx) {
                let filter = {};
                let query = Experience.find(filter);

                return ctx.queryPageSort(query).exec().then( (docs) => {
                    return this.toJSON(docs);
                });
            }
        },

        // return a model by ID
        get: {
            cache: true,
            handler(ctx) {
                ctx.assertModelIsExist(ctx.t("app:ExperienceNotFound"));
                return Promise.resolve(ctx.model);
            }
        },

        create(ctx) {
            this.validateParams(ctx, true);
            
            let experience = new Experience({
                business: ctx.params.business,
                tags: ctx.params.tags,
                position: ctx.params.position,
                description: ctx.params.description,
                startedAt: ctx.params.startedAt,
                endedAt: ctx.params.endedAt,
                status: ctx.params.status
            });

            return experience.save()
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
            ctx.assertModelIsExist(ctx.t("app:ExperienceNotFound"));
            this.validateParams(ctx);

            return this.collection.findById(ctx.modelID).exec()
            .then((doc) => {

                if (ctx.params.business != null)
                    doc.business = ctx.params.business;

                if (ctx.params.tags != null) {
                    if (1 == ctx.params.tags.length) {
                        doc.tags = ctx.params.tags[0].split(",");
                    } else {
                        doc.tags = ctx.params.tags;
                    }
                }

                if (ctx.params.position != null)
                    doc.position = ctx.params.position;

                if (ctx.params.description != null)
                    doc.description = ctx.params.description;

                if (ctx.params.startedAt != null)
                    doc.startedAt = ctx.params.startedAt;

                if (ctx.params.endedAt != null)
                    doc.endedAt = ctx.params.endedAt;

                if (ctx.params.status != null)
                    doc.status = ctx.params.status;

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
            ctx.assertModelIsExist(ctx.t("app:ExperienceNotFound"));

            return Experience.remove({ _id: ctx.modelID })
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
            ctx.validateParam("business").trim().notEmpty(ctx.t("app:ExperienceBusinessCannotBeBlank")).end();
            ctx.validateParam("tags").notEmpty(ctx.t("app:ExperienceTagsCannotBeEmpty")).end();
            ctx.validateParam("position").trim().notEmpty(ctx.t("app:ExperiencePositionCannotBeBlank")).end();
            ctx.validateParam("description").trim().notEmpty(ctx.t("app:ExperienceDescriptionCannotBeBlank")).end();
            ctx.validateParam("startedAt").trim().notEmpty(ctx.t("app:ExperienceStartedAtCannotBeBlank")).end();
            ctx.validateParam("endedAt").trim().notEmpty(ctx.t("app:ExperienceEndedAtCannotBeBlank")).end();
            ctx.validateParam("status").isNumber(ctx.t("app:ExperienceStatusMustBeNumber"));

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
        experiences(limit: Int, offset: Int, sort: String): [Experience]
        experience(code: String): Experience
        `,

        types: `
        type Experience {
            business: String!
            tags: [String]
            position: String!
            description: String!
            startedAt: String!
            endedAt: String!
        }
        `,

        mutation: `
        experienceCreate(business: String!, tags: [String!]!, position: String!, description: String!, startedAt: String!, endedAt: String!): Experience
        experienceUpdate(code: String!, business: String!, tags: [String!]!, position: String!, description: String!, startedAt: String!, endedAt: String!): Experience
        experienceRemove(code: String!): Experience
        `,

        resolvers: {
            Query: {
                experiences: "find",
                experience: "get"
            },

            Mutation: {
                experienceCreate: "create",
                experienceUpdate: "update",
                experienceRemove: "remove"
            }
        }
    }

};

/*
## GraphiQL test ##

# Find all experiences
query getExperiences {
  experiences(sort: "lastCommunication", limit: 5) {
    ...experienceFields
  }
}

# Create a new experience
mutation createExperience {
  experienceCreate(position: "New experience", business: "192.168.0.1", type: "raspberry", description: "My experience", startedAt: 1) {
    ...experienceFields
  }
}

# Get a experience
query getExperience($code: String!) {
  experience(code: $code) {
    ...experienceFields
  }
}

# Update an existing experience
mutation updateExperience($code: String!) {
  experienceUpdate(code: $code, business: "127.0.0.1") {
    ...experienceFields
  }
}

# Remove a experience
mutation removeExperience($code: String!) {
  experienceRemove(code: $code) {
    ...experienceFields
  }
}

fragment experienceFields on Experience {
    code
    business
    type
    position
    description
    startedAt
    lastCommunication
}

*/