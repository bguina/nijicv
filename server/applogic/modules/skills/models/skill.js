"use strict";

// let ROOT             = "../../../../";
let config          = require("../../../../config");
let logger          = require("../../../../core/logger");

let db              = require("../../../../core/mongo");
let mongoose        = require("mongoose");
let Schema          = mongoose.Schema;
let hashids         = require("../../../../libs/hashids")("skills");
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

let SkillSchema = new Schema({
    type: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    tools: [{ type: Number, ref: "Tool", default: [] }],
    metadata: {}

}, schemaOptions);

SkillSchema.virtual("code").get(function() {
    return this.encodeID();
});

SkillSchema.plugin(autoIncrement.plugin, {
    model: "Skill",
    startAt: 1
});

SkillSchema.methods.encodeID = function() {
    return hashids.encodeHex(this._id);
};

SkillSchema.methods.decodeID = function(code) {
    return hashids.decodeHex(code);
};

let Skill = mongoose.model("Skill", SkillSchema);

module.exports = Skill;
