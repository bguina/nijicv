"use strict";

let logger      = require("../../../core/logger");
let config      = require("../../../config");
let C           = require("../../../core/constants");

let _           = require("lodash");

let Tool  = require("./models/tool");

module.exports = {
    settings: {
        name: "tools",
        version: 1,
        namespace: "tools",
        rest: true,
        ws: true,
        graphql: true,
        permission: C.PERM_LOGGEDIN,
        role: "user",
        collection: Tool,
        modelPropFilter: "icon linkUrl name"
    },
    
    actions: {
        find: {
            cache: true,
            handler(ctx) {
                let filter = {};
                let query = Tool.find(filter);

                return ctx.queryPageSort(query).exec().then( (docs) => {
                    return this.toJSON(docs);
                });
            }
        },

        // return a model by ID
        get: {
            cache: true,
            handler(ctx) {
                ctx.assertModelIsExist(ctx.t("app:ToolNotFound"));
                return Promise.resolve(ctx.model);
            }
        },

        create(ctx) {
            this.validateParams(ctx, true);
            
            let tool = new Tool({
                icon: ctx.params.icon,
                linkUrl: ctx.params.linkUrl,
                name: ctx.params.name,
            });

            return tool.save()
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
            ctx.assertModelIsExist(ctx.t("app:ToolNotFound"));
            this.validateParams(ctx);

            return this.collection.findById(ctx.modelID).exec()
            .then((doc) => {

                if (ctx.params.icon != null)
                    doc.type = ctx.params.icon;

                if (ctx.params.linkUrl != null)
                    doc.type = ctx.params.linkUrl;

                if (ctx.params.name != null)
                    doc.name = ctx.params.name;

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
            ctx.assertModelIsExist(ctx.t("app:ToolNotFound"));

            return Tool.remove({ _id: ctx.modelID })
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
            ctx.validateParam("icon").trim().notEmpty(ctx.t("app:ToolThumbnailUrlCannotBeBlank")).end();
            ctx.validateParam("linkUrl").trim().notEmpty(ctx.t("app:ToolLinkUrlCannotBeBlank")).end();
            ctx.validateParam("name").trim().notEmpty(ctx.t("app:ToolNameCannotBeBlank")).end();

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
        tools(limit: Int, offset: Int, sort: String): [Tool]
        tool(code: String): Tool
        `,

        types: `
        type Tool {
            icon: String!
            name: String!
        }
        `,

        mutation: `
        toolCreate(icon: String!, name: String!): Tool
        toolUpdate(code: String!, icon: String!, name: String!): Tool
        toolRemove(code: String!): Tool
        `,

        resolvers: {
            Query: {
                tools: "find",
                tool: "get"
            },

            Mutation: {
                toolCreate: "create",
                toolUpdate: "update",
                toolRemove: "remove"
            }
        }
    }

};

/*
## GraphiQL test ##

# Find all tools
query getTools {
  tools(sort: "lastCommunication", limit: 5) {
    ...toolFields
  }
}

# Create a new tool
mutation createTool {
  toolCreate(name: "New tool", type: "192.168.0.1", type: "raspberry", description: "My tool", startedAt: 1) {
    ...toolFields
  }
}

# Get a tool
query getTool($code: String!) {
  tool(code: $code) {
    ...toolFields
  }
}

# Update an existing tool
mutation updateTool($code: String!) {
  toolUpdate(code: $code, type: "127.0.0.1") {
    ...toolFields
  }
}

# Remove a tool
mutation removeTool($code: String!) {
  toolRemove(code: $code) {
    ...toolFields
  }
}

fragment toolFields on Tool {
    code
    type
    type
    name
    description
    startedAt
    lastCommunication
}

*/