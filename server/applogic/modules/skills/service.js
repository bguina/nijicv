"use strict";

let logger      = require("../../../core/logger");
let config      = require("../../../config");
let C           = require("../../../core/constants");

let _           = require("lodash");

let Skill  = require("./models/skill");

module.exports = {
    settings: {
        name: "skills",
        version: 1,
        namespace: "skills",
        rest: true,
        ws: true,
        graphql: true,
        permission: C.PERM_LOGGEDIN,
        role: "user",
        collection: Skill,
        modelPropFilter: "type name description tools"
    },
    
    actions: {
        find: {
            cache: true,
            handler(ctx) {
                let filter = {};
                let query = Skill.find(filter)
                    .populate("tools")
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
                ctx.assertModelIsExist(ctx.t("app:SkillNotFound"));
                return Promise.resolve(ctx.model);
            }
        },

        create(ctx) {
            this.validateParams(ctx, true);
            
            let skill = new Skill({
                type: ctx.params.type,
                name: ctx.params.name,
                description: ctx.params.description
            });

            return skill.save()
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
            ctx.assertModelIsExist(ctx.t("app:SkillNotFound"));
            this.validateParams(ctx);

            return this.collection.findById(ctx.modelID).exec()
            .then((doc) => {

                if (ctx.params.type != null)
                    doc.type = ctx.params.type;

                if (ctx.params.name != null)
                    doc.name = ctx.params.name;

                if (ctx.params.description != null)
                    doc.description = ctx.params.description;

                if (ctx.params.tools != null) {
                    if (1 == ctx.params.tools.length) {
                        doc.tools = ctx.params.tools[0].split(",");
                    } else {
                        doc.tools = ctx.params.tools;
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
            ctx.assertModelIsExist(ctx.t("app:SkillNotFound"));

            return Skill.remove({ _id: ctx.modelID })
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
            ctx.validateParam("type").trim().notEmpty(ctx.t("app:SkillTypeCannotBeBlank")).end();
            ctx.validateParam("name").trim().notEmpty(ctx.t("app:SkillNameCannotBeBlank")).end();
            ctx.validateParam("description").trim().notEmpty(ctx.t("app:SkillDescriptionCannotBeBlank")).end();

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
        skills(limit: Int, offset: Int, sort: String): [Skill]
        skill(code: String): Skill
        `,

        types: `
        type Skill {
            type: String!
            name: String!
            description: String!
            tools: [String!]
        }
        `,

        mutation: `
        skillCreate(type: String!, name: String!, description: String!): Skill
        skillUpdate(code: String!, type: String!, name: String!, description: String!, tools: [String!]): Skill
        skillRemove(code: String!): Skill
        `,

        resolvers: {
            Query: {
                skills: "find",
                skill: "get"
            },

            Mutation: {
                skillCreate: "create",
                skillUpdate: "update",
                skillRemove: "remove"
            }
        }
    }

};

/*
## GraphiQL test ##

# Find all skills
query getSkills {
  skills(sort: "lastCommunication", limit: 5) {
    ...skillFields
  }
}

# Create a new skill
mutation createSkill {
  skillCreate(name: "New skill", type: "192.168.0.1", type: "raspberry", description: "My skill", startedAt: 1) {
    ...skillFields
  }
}

# Get a skill
query getSkill($code: String!) {
  skill(code: $code) {
    ...skillFields
  }
}

# Update an existing skill
mutation updateSkill($code: String!) {
  skillUpdate(code: $code, type: "127.0.0.1") {
    ...skillFields
  }
}

# Remove a skill
mutation removeSkill($code: String!) {
  skillRemove(code: $code) {
    ...skillFields
  }
}

fragment skillFields on Skill {
    code
    type
    type
    name
    description
    startedAt
    lastCommunication
}

*/