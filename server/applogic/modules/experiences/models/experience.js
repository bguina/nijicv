"use strict";

// let ROOT             = "../../../../";
let config          = require("../../../../config");
let logger          = require("../../../../core/logger");

let db              = require("../../../../core/mongo");
let mongoose        = require("mongoose");
let Schema          = mongoose.Schema;
let hashids         = require("../../../../libs/hashids")("experiences");
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

let ExperienceSchema = new Schema({
    business: {
        type: String,
        trim: true
    },
    thumbnailUrl: {
        type: String,
        trim: true
    },
    linkUrl: {
        type: String,
        trim: true
    },
    position: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        default: ""
    },
    startedAt: {
        type: Date,
        default: Date.now
    },
    endedAt: {
        type: Date,   
        default: Date.now
    },
    skills: [{ type: Number, ref: "Skill", default: [] }],
    tools: [{ type: Number, ref: "Tool", default: [] }],
    status: { type: Number, default: 0 },
    metadata: {}

}, schemaOptions);

ExperienceSchema.virtual("code").get(function() {
    return this.encodeID();
});

ExperienceSchema.plugin(autoIncrement.plugin, {
    model: "Experience",
    startAt: 1
});

ExperienceSchema.methods.encodeID = function() {
    return hashids.encodeHex(this._id);
};

ExperienceSchema.methods.decodeID = function(code) {
    return hashids.decodeHex(code);
};

let Experience = mongoose.model("Experience", ExperienceSchema);

module.exports = Experience;
