"use strict";

// let ROOT             = "../../";
let logger          = require("../../core/logger");
let config          = require("../../config");

let _               = require("lodash");
let tokgen          = require("../../libs/tokgen");
let fakerator       = require("fakerator")();

let User            = require("../.././models/user");
let Cv              = require("../modules/cv/models/cv");
let Experience      = require("../modules/experiences/models/experience");

module.exports = function() {
    let cvs = Cv.find({}).exec().then((docs) => {
        logger.info("Looking up current cvs...");

        if (docs.length === 0 && true) {
            logger.warn("Load default Cvs to DB...");

            {
                let tag = "android";
                let xp = new Experience({
                    business: tag + " business name",
                    tags: ["", tag],
                    position: "travail sur " + tag,
                    description: "mais genre vraiment de ouf",
                    startedAt: 0,
                    endedAt: 5
                });

                xp.save().then(() => {
                    logger.info("Default xp created!");
                });

                let cv = new Cv({
                    name: "Benoit Guina",
                    title: "Développeur Android",
                    thumbnailUrl: "https://image.freepik.com/free-vector/android-boot-logo_634639.jpg",
                    tag: "android",
                    status: 1
                });

                cv.save().then(() => {
                    logger.info("Default" + "created!");
                });
            }

            {
                let tag = "web";
                let xp = new Experience({
                    business: tag + " business name",
                    tags: ["", tag],
                    position: "travail sur " + tag,
                    description: "mais genre vraiment de ouf",
                    startedAt: 0,
                    endedAt: 5
                });

                xp.save().then(() => {
                    logger.info("Default xp created!");
                });

                let cv = new Cv({
                    name: "Benoit Guina",
                    title: "Développeur web",
                    thumbnailUrl: "https://cdn.dribbble.com/users/79486/screenshots/1505622/logo-2_1x.jpg",
                    tag: "web",
                    status: 1
                });

                cv.save().then(() => {
                    logger.info("Default" + "created!");
                });
            }

            {
                let tag ="";
                let cv = new Cv({
                    name: "Benoit Guina",
                    title: "Développeur logiciel",
                    thumbnailUrl: "Ma tete",
                    tag: "",
                    status: 1
                });

                cv.save().then(() => {
                    logger.info("Default" + "created!");
                });
            }
        }
    });

    return cvs;
};
