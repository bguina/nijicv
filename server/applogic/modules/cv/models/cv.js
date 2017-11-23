"use strict";

// let ROOT             = "../../../../";
let config          = require("../../../../config");
let logger          = require("../../../../core/logger");

let db              = require("../../../../core/mongo");
let mongoose        = require("mongoose");
let Schema          = mongoose.Schema;
let hashids         = require("../../../../libs/hashids")("cvs");
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

let CvSchema = new Schema({
    name: {
        type: String,
        trim: true
    },
    title: {
        type: String,
        trim: true
    },
    thumbnailUrl: {
        type: String,
        trim: true
    },
    tag:  {
        type: String,
        default: "",
        trim: true
    },
    status: { type: Number, default: 0 },
    metadata: {}

}, schemaOptions);

CvSchema.virtual("experiences", {
    ref: "Experience", // The model to use
    localField: "tag", // Find people where `localField`
    foreignField: "tags", // is equal to `foreignField`
});

CvSchema.virtual("code").get(function() {
    return this.encodeID();
});

CvSchema.plugin(autoIncrement.plugin, {
    model: "Cv",
    startAt: 1
});

CvSchema.methods.encodeID = function() {
    return hashids.encodeHex(this._id);
};

CvSchema.methods.decodeID = function(code) {
    return hashids.decodeHex(code);
};

let Cv = mongoose.model("Cv", CvSchema);

module.exports = Cv;
