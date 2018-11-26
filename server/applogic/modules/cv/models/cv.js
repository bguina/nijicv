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
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    ownerName: {
        type:String,
        trim:true
    },
    title: {
        type: String,
        trim: true
    },
    icon: {
        type: String,
        trim: true
    },
    skills: [{ type: Schema.Types.ObjectId, ref: "Skill", default: [] }],
    experiences: [{ type: Schema.Types.ObjectId, ref: "Experience", default: [] }],
    formations: [{ type: Schema.Types.ObjectId, ref: "Experience", default: [] }],
    status: { type: Number, default: 0 },
    metadata: {}

}, schemaOptions);

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
