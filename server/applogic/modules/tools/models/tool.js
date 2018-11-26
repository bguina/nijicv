"use strict";

// let ROOT             = "../../../../";
let config          = require("../../../../config");
let logger          = require("../../../../core/logger");

let db              = require("../../../../core/mongo");
let mongoose        = require("mongoose");
let Schema          = mongoose.Schema;
let hashids         = require("../../../../libs/hashids")("tools");
let autoIncrement   = require("mongoose-auto-increment");

let schemaOptions = {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
};

let ToolSchema = new Schema({
    icon: {
        type: String,
        trim: true
    },
    linkUrl: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    metadata: {}

}, schemaOptions);

ToolSchema.virtual("code").get(function() {
    return this.encodeID();
});

ToolSchema.plugin(autoIncrement.plugin, {
    model: "Tool",
    startAt: 1
});

ToolSchema.methods.encodeID = function() {
    return hashids.encodeHex(this._id);
};

ToolSchema.methods.decodeID = function(code) {
    return hashids.decodeHex(code);
};

let Tool = mongoose.model("Tool", ToolSchema);

module.exports = Tool;
