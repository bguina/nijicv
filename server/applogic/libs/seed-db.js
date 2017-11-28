"use strict";

// let ROOT             = "../../";
let logger          = require("../../core/logger");
let config          = require("../../config");

let _               = require("lodash");
let tokgen          = require("../../libs/tokgen");
let fakerator       = require("fakerator")();
let async           = require("async");

let mongoose        = require("mongoose");
let User            = require("../.././models/user");
let Cv              = require("../modules/cv/models/cv");
let Experience      = require("../modules/experiences/models/experience");
let Skill           = require("../modules/skills/models/skill");
let Tool            = require("../modules/tools/models/tool");

module.exports = function() {
    let cvs = Cv.find({}).exec().then((docs) => {

        if (docs.length === 0 && true) {
            logger.warn("Setting up DB...");

            let androidTool = new Tool({
                thumbnailUrl: "https://developer.android.com/studio/images/studio-icon.png",
                linkUrl: "https://developer.android.com/studio",
                name: "Android Studio",
            });
            let androidCucumberTool = new Tool({
                thumbnailUrl: "https://seeklogo.com/images/C/cucumber-logo-D727C551CE-seeklogo.com.png",
                linkUrl: "https://cucumber.io",
                name: "Cucumber",
            });
            let prestashopTool = new Tool({
                thumbnailUrl: "https://pbs.twimg.com/profile_images/612974656958689280/C6U2rHtG.jpg",
                linkUrl: "https://www.prestashop.com",
                name: "Prestashop",
            });
            let xpEpitech = new Experience({
                thumbnailUrl: "https://media-elerium.cursecdn.com/avatars/100/635/636316564390503229.png",
                linkUrl: "http://www.epitech.eu/",
                business: "EPITECH",
                position: "Ecole d'expertise en informatique",
                description: "",
                startedAt: "2010-10-01T00:00:00+00:00",
                endedAt: "2015-10-01T00:00:00+00:00",
            });
            let androidSkill = new Skill({
                type: "technical",
                name: "Android",
            });
            let xpDkt = new Experience({
                thumbnailUrl: "https://pbs.twimg.com/profile_images/846988540676329472/4Q63bjW1.jpg",
                linkUrl: "https://play.google.com/store/apps/details?id=com.decathlon.app&hl=fr",
                business: "Decathlon",
                position: "Développeur Android",
                description: "Mission de développement de la nouvelle application grand-public, avec les évolutions souhaitées pour les mises en production France, Hong-Kong et Italie.",
                startedAt: "2017-01-10T00:00:00+00:00",
                endedAt: "2017-08-03T00:00:00+00:00",
            });
            let xpEqs = new Experience({
                thumbnailUrl: "https://i0.wp.com/pegasebuzz.com/leblog/wp-content/uploads/2016/03/equisense-logo.jpg?fit=703%2C715&ssl=1",
                linkUrl: "https://equisense.com/fr",
                business: "Equisense",
                position: "Développeur Android",
                description: "Développement de l’application de contrôle de la centrale inertielle Bluetooth « Motion » permettant l’analyse de la locomotion équine.",
                startedAt: "2015-07-25T00:00:00+00:00",
                endedAt: "2016-10-01T00:00:00+00:00",
            });

            let xpPresta = new Experience({
                thumbnailUrl: "https://pbs.twimg.com/profile_images/566230308328964096/leRiLPFp.png",
                linkUrl: "https://lille.alerteapero.com/",
                business: "AlerteApero",
                position: "Auto-Entrepreneur prestataire",
                description: "Création d’un site-boutique livrable aux franchisés en collaboration avec Samuel Lemaresquier, web designer",
                startedAt: "2012-10-01T00:00:00+00:00",
                endedAt: "2013-03-01T00:00:00+00:00",
            });
            
            let cvAndroid = new Cv({
                name: "Benoit Guina",
                title: "Développeur Android",
                thumbnailUrl: "android",
                status: 1
            });
            let cvWeb = new Cv({
                name: "Benoit Guina",
                title: "Développeur web",
                thumbnailUrl: "globe",
                status: 1
            });
            let cv = new Cv({
                name: "Benoit Guina",
                title: "Développeur logiciel",
                thumbnailUrl: "code-fork",
                status: 1,
            });

            Promise.all([
                androidTool.save().then((value) => {
                    logger.info("Default android tool created:" + value);
                }).catch((err) => { logger.error("Error creating android tool: " + err); }),
                androidCucumberTool.save().then((value) => {
                    logger.info("Default cucumber tool created:" + value);
                }).catch((err) => { logger.error("Error creating cucumber tool: " + err); }),
                prestashopTool.save().then((value) => {
                    logger.info("Default prestashop tool created:" + value);
                }).catch((err) => { logger.error("Error creating prestashop tool: " + err); }),
                androidSkill.save().then((value) => {
                    logger.info("Default android skill created:" + value);
                }).catch((err) => { logger.error("Error creating android skill: " + err); }),
                xpDkt.save().then((value) => {
                    logger.info("Default android xp created:" + value);
                }).catch((err) => { logger.error("Error creating android xp: " + err); }),
                xpEqs.save().then((value) => {
                    logger.info("Default web xp created:" + value);
                }).catch((err) => { logger.error("Error creating web xp: " + err); }),
                xpPresta.save().then((value) => {
                    logger.info("Default prestashop xp created:" + value);
                }).catch((err) => { logger.error("Error creating prestashop xp: " + err); }),
                xpEpitech.save().then((value) => {
                    logger.info("Default edu xp created! " + value + " :" + value);
                }).catch((err) => { logger.error("Error creating formation experience: " + err); }),
                cvAndroid.save().then((value) => {
                    logger.info("Default android cv created:" + value);
                }).catch((err) => { logger.error("Error creating android cv: " + err); }),
                cvWeb.save().then((value) => {
                    logger.info("Default web cv created:" + value);
                }).catch((err) => { logger.error("Error creating web cv: " + err); }),
                cv.save().then((value) => {
                    logger.info("Default cv created:" + value);
                }).catch((err) => { logger.error("Error creating cv: " + err); }),
            ]).then(() => {
                androidSkill.tools = [androidTool];
                xpDkt.skills = [androidSkill];
                xpEqs.skills = [androidSkill];

                xpDkt.tools = [androidTool, androidCucumberTool];
                xpEqs.tools = [androidTool];
                xpPresta.tools = [prestashopTool];

                cv.skills = [androidSkill];

                cvAndroid.experiences = [xpDkt, xpEqs];
                cvWeb.experiences = [xpPresta];
                cv.experiences = [xpDkt, xpEqs, xpPresta];

                cvAndroid.formations = [xpEpitech];
                cvWeb.formations = [xpEpitech];
                cv.formations = [xpEpitech];

                logger.info("Saved base DB");

                return Promise.all([
                    xpEpitech.save().then((value) => {
                        logger.info("Default edu xp updated! " + value);
                    }).catch((err) => { logger.error("Error updating formation experience: " + err); }),
                    androidSkill.save().then((value) => {
                        logger.info("Default android skill updated:" + value);
                    }).catch((err) => { logger.error("Error updating android skill: " + err); }),
                    xpDkt.save().then((value) => {
                        logger.info("Default android xp updated:" + value);
                    }).catch((err) => { logger.error("Error updating android xp: " + err); }),
                    cvAndroid.save().then((value) => {
                        logger.info("Default android cv updated:" + value);
                    }).catch((err) => { logger.error("Error updating android cv: " + err); }),
                    xpEqs.save().then((value) => {
                        logger.info("Default web xp updated:" + value);
                    }).catch((err) => { logger.error("Error updating web xp: " + err); }),
                    xpPresta.save().then((value) => {
                        logger.info("Default prestashop xp updated:" + value);
                    }).catch((err) => { logger.error("Error updating prestashop xp: " + err); }),
                    cvWeb.save().then((value) => {
                        logger.info("Default web cv updated:" + value);
                    }).catch((err) => { logger.error("Error updating web cv: " + err); }),
                    cv.save().then((value) => {
                        logger.info("Default cv updated:" + value);
                    }).catch((err) => { logger.error("Error updating cv: " + err); }),
                ]).then(() => {
                    logger.info("Saved DB associations");
                    return null;
                }).catch((err) => {
                    logger.error("Error saving DB associations: " + err);
                });
            }).catch((err) => {
                logger.error("Error saving base DB: " + err);
            });
        }
    });

    return cvs;
};
