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


            let shellTool = new Tool({
                thumbnailUrl: "https://301o583r8shhildde3s0vcnh-wpengine.netdna-ssl.com/wp-content/uploads/2017/04/Linux-Shell.png",
                linkUrl: "https://www.gnu.org/software/bash/",
                name: "Shell UNIX",
            });
            let mongoTool = new Tool({
                thumbnailUrl: "https://pbs.twimg.com/profile_images/750403034178478081/EPrK3ci2.jpg",
                linkUrl: "https://www.mongodb.com/",
                name: "MongoDB",
            });
            let sqlTool = new Tool({
                thumbnailUrl: "https://webdevolutions.blob.core.windows.net/images/Media/Logos/Cloud/DevolutionsCloud-Database-Icon-MR.png",
                name: "SQL",
            });
            let ionicTool = new Tool({
                thumbnailUrl: "https://pbs.twimg.com/profile_images/834457277830541312/bYMCvtHD.jpg",
                linkUrl: "https://ionicframework.com/",
                name: "Ionic",
            });
            let androidTool = new Tool({
                thumbnailUrl: "https://developer.android.com/studio/images/studio-icon.png",
                linkUrl: "https://developer.android.com/studio",
                name: "Android Studio",
            });
            let kotlinTool = new Tool({
                thumbnailUrl: "https://kotlinlang.org/assets/images/open-graph/kotlin_250x250.png",
                linkUrl: "https://kotlinlang.org/",
                name: "Kotlin",
            });
            let reactTool = new Tool({
                thumbnailUrl: "https://opbeat.com/images/stacks/logo_react.svg",
                linkUrl: "https://reactjs.org/",
                name: "React",
            });
            let cucumberTool = new Tool({
                thumbnailUrl: "https://seeklogo.com/images/C/cucumber-logo-D727C551CE-seeklogo.com.png",
                linkUrl: "https://cucumber.io/",
                name: "Cucumber",
            });
            let calabashTool = new Tool({
                thumbnailUrl: "https://seeklogo.com/images/C/cucumber-logo-D727C551CE-seeklogo.com.png",
                linkUrl: "http://calaba.sh/",
                name: "Calabash",
            });
            let phpTool = new Tool({
                thumbnailUrl: "https://avatars1.githubusercontent.com/u/25158?s=200",
                linkUrl: "http://www.php.net/",
                name: "PHP5",
            });
            let invisionTool = new Tool({
                thumbnailUrl: "https://p4.zdassets.com/hc/theme_assets/604014/200095455/logo.jpg",
                linkUrl: "https://www.invisionapp.com/",
                name: "InVision",
            });
            let prestashopTool = new Tool({
                thumbnailUrl: "https://pbs.twimg.com/profile_images/612974656958689280/C6U2rHtG.jpg",
                linkUrl: "https://www.prestashop.com",
                name: "Prestashop",
            });
            let cTool = new Tool({
                thumbnailUrl: "https://www.javatpoint.com/cpages/images/c-programming.png",
                name: "Langage C",
            });
            let cppTool = new Tool({
                thumbnailUrl: "https://raw.githubusercontent.com/isocpp/logos/master/cpp_logo.png",
                name: "Langage C++",
            });
            let railsTool = new Tool({
                thumbnailUrl: "https://seeklogo.com/images/R/ruby-logo-087AF79367-seeklogo.com.jpg",
                linkUrl: "http://rubyonrails.org/",
                name: "Ruby On Rails",
            });
            let pythonTool = new Tool({
                thumbnailUrl: "https://www.python.org/static/opengraph-icon-200x200.png",
                linkUrl: "https://www.python.org/",
                name: "Python 2.7-3.0",
            });
            let djangoTool = new Tool({
                thumbnailUrl: "http://ztechnologie.com/blog/demarrer-un-projet-sous-django/django.png",
                linkUrl: "https://www.djangoproject.com/",
                name: "Django",
            });
            let javascriptTool = new Tool({
                thumbnailUrl: "https://i.stack.imgur.com/Mmww2.png",
                name: "Javascript",
            });

            let codeSkill = new Skill({
                type: "métier",
                name: "Architecture et développement applicatif",
                description: "analyse des besoins, découpage en composants fonctionnels, conception"
            });
            let androidSkill = new Skill({
                type: "technical",
                name: "Mobile",
                description: "expérience confirmé Android Java, Kotlin"
            });
            let testingSkill = new Skill({
                type: "technical",
                name: "Testing",
                description: "tests unitaires, tests comportementaux"
            });
            let xpDkt = new Experience({
                thumbnailUrl: "https://pbs.twimg.com/profile_images/846988540676329472/4Q63bjW1.jpg",
                linkUrl: "https://play.google.com/store/apps/details?id=com.decathlon.app",
                business: "Decathlon",
                position: "Développeur Android",
                description: "Mission de développement de la nouvelle application grand-public, avec les évolutions nécessaires aux mises en production France, Hong-Kong et Italie.",
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
                position: "Prestataire Auto-entrepreneur",
                description: "Création d’un site-boutique livrable aux franchisés en collaboration avec Samuel Lemaresquier, web designer",
                startedAt: "2012-10-01T00:00:00+00:00",
                endedAt: "2013-03-01T00:00:00+00:00",
            });

            let xpNeuf = new Experience({
                thumbnailUrl: "https://pbs.twimg.com/profile_images/3224891044/fa7577ebe6973f19605a13f75ccd04a7_400x400.png",
                linkUrl: "https://www.ubinect.fr/",
                business: "9h37",
                position: "Stagiaire Python",
                description: "Développement d’un logiciel de télétransmission de données médicales opérable depuis tous les navigateurs web majeurs.",
                startedAt: "2012-06-01T00:00:00+00:00",
                endedAt: "2013-07-01T00:00:00+00:00",
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
            let cvAndroid = new Cv({
                name: "Benoit Guina",
                title: "Développeur Android",
                thumbnailUrl: "android",
                status: 1
            });
            let cvWeb = new Cv({
                name: "Benoit Guina",
                title: "Développeur Web",
                thumbnailUrl: "globe",
                status: 1
            });
            let cv = new Cv({
                name: "Benoit Guina",
                title: "Développeur Software",
                thumbnailUrl: "code-fork",
                status: 1,
            });

            Promise.all([
                shellTool.save().then((value) => {
                    logger.info("Default shell tool created:" + value);
                }).catch((err) => { logger.error("Error creating shell tool: " + err); }),
                ionicTool.save().then((value) => {
                    logger.info("Default ionic tool created:" + value);
                }).catch((err) => { logger.error("Error creating ionic tool: " + err); }),
                androidTool.save().then((value) => {
                    logger.info("Default android tool created:" + value);
                }).catch((err) => { logger.error("Error creating android tool: " + err); }),
                kotlinTool.save().then((value) => {
                    logger.info("Default kotlin tool created:" + value);
                }).catch((err) => { logger.error("Error creating kotlin tool: " + err); }),
                reactTool.save().then((value) => {
                    logger.info("Default react tool created:" + value);
                }).catch((err) => { logger.error("Error creating react tool: " + err); }),
                cucumberTool.save().then((value) => {
                    logger.info("Default cucumber tool created:" + value);
                }).catch((err) => { logger.error("Error creating cucumber tool: " + err); }),
                calabashTool.save().then((value) => {
                    logger.info("Default calabash tool created:" + value);
                }).catch((err) => { logger.error("Error creating calabash tool: " + err); }),
                phpTool.save().then((value) => {
                    logger.info("Default php tool created:" + value);
                }).catch((err) => { logger.error("Error creating php tool: " + err); }),
                invisionTool.save().then((value) => {
                    logger.info("Default invision tool created:" + value);
                }).catch((err) => { logger.error("Error creating invision tool: " + err); }),
                prestashopTool.save().then((value) => {
                    logger.info("Default prestashop tool created:" + value);
                }).catch((err) => { logger.error("Error creating prestashop tool: " + err); }),
                djangoTool.save().then((value) => {
                    logger.info("Default django tool created:" + value);
                }).catch((err) => { logger.error("Error creating django tool: " + err); }),
                javascriptTool.save().then((value) => {
                    logger.info("Default javascript tool created:" + value);
                }).catch((err) => { logger.error("Error creating javascript tool: " + err); }),
                cTool.save().then((value) => {
                    logger.info("Default c tool created:" + value);
                }).catch((err) => { logger.error("Error creating c tool: " + err); }),
                cppTool.save().then((value) => {
                    logger.info("Default cpp tool created:" + value);
                }).catch((err) => { logger.error("Error creating cpp tool: " + err); }),
                railsTool.save().then((value) => {
                    logger.info("Default rails tool created:" + value);
                }).catch((err) => { logger.error("Error creating rails tool: " + err); }),
                pythonTool.save().then((value) => {
                    logger.info("Default python tool created:" + value);
                }).catch((err) => { logger.error("Error creating python tool: " + err); }),
                codeSkill.save().then((value) => {
                    logger.info("Default code skill created:" + value);
                }).catch((err) => { logger.error("Error creating code skill: " + err); }),
                androidSkill.save().then((value) => {
                    logger.info("Default android skill created:" + value);
                }).catch((err) => { logger.error("Error creating android skill: " + err); }),
                testingSkill.save().then((value) => {
                    logger.info("Default testing skill created:" + value);
                }).catch((err) => { logger.error("Error creating testing skill: " + err); }),
                xpDkt.save().then((value) => {
                    logger.info("Default android xp created:" + value);
                }).catch((err) => { logger.error("Error creating android xp: " + err); }),
                xpEqs.save().then((value) => {
                    logger.info("Default web xp created:" + value);
                }).catch((err) => { logger.error("Error creating web xp: " + err); }),
                xpPresta.save().then((value) => {
                    logger.info("Default presta xp created:" + value);
                }).catch((err) => { logger.error("Error creating presta xp: " + err); }),
                xpNeuf.save().then((value) => {
                    logger.info("Default 9h37 xp created:" + value);
                }).catch((err) => { logger.error("Error creating 9h37 xp: " + err); }),
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

                androidSkill.tools = [androidTool, kotlinTool];
                testingSkill.tools = [cucumberTool, calabashTool];

                xpDkt.tools = [androidTool, reactTool, kotlinTool, cucumberTool];
                xpEqs.tools = [androidTool, ionicTool, invisionTool];
                xpPresta.tools = [phpTool, prestashopTool, javascriptTool];
                xpNeuf.tools = [pythonTool, djangoTool, javascriptTool];
                xpEpitech.tools = [shellTool, cTool, cppTool];

                cvAndroid.skills = [codeSkill, testingSkill];
                cvAndroid.experiences = [xpDkt, xpEqs];
                cvAndroid.formations = [xpEpitech];
                cvWeb.skills = [codeSkill, testingSkill];
                cvWeb.experiences = [xpPresta, xpNeuf];
                cvWeb.formations = [xpEpitech];
                cv.skills = [codeSkill, testingSkill, androidSkill];
                cv.experiences = [xpDkt, xpEqs, xpPresta, xpNeuf];
                cv.formations = [xpEpitech];

                logger.info("Saved base DB");

                return Promise.all([
                    androidSkill.save().then((value) => {
                        logger.info("Default android skill updated:" + value);
                    }).catch((err) => { logger.error("Error updating android skill: " + err); }),
                    testingSkill.save().then((value) => {
                        logger.info("Default testing skill updated:" + value);
                    }).catch((err) => { logger.error("Error updating android skill: " + err); }),
                    xpDkt.save().then((value) => {
                        logger.info("Default android xp updated:" + value);
                    }).catch((err) => { logger.error("Error updating android xp: " + err); }),
                    xpNeuf.save().then((value) => {
                        logger.info("Default neuf xp updated:" + value);
                    }).catch((err) => { logger.error("Error updating neuf xp: " + err); }),
                    xpEqs.save().then((value) => {
                        logger.info("Default web xp updated:" + value);
                    }).catch((err) => { logger.error("Error updating web xp: " + err); }),
                    xpPresta.save().then((value) => {
                        logger.info("Default prestashop xp updated:" + value);
                    }).catch((err) => { logger.error("Error updating presta xp: " + err); }),
                    xpEpitech.save().then((value) => {
                        logger.info("Default edu xp updated! " + value);
                    }).catch((err) => { logger.error("Error updating formation experience: " + err); }),
                    cv.save().then((value) => {
                        logger.info("Default cv updated:" + value);
                    }).catch((err) => { logger.error("Error updating cv: " + err); }),
                    cvAndroid.save().then((value) => {
                        logger.info("Default android cv updated:" + value);
                    }).catch((err) => { logger.error("Error updating android cv: " + err); }),
                    cvWeb.save().then((value) => {
                        logger.info("Default web cv updated:" + value);
                    }).catch((err) => { logger.error("Error updating web cv: " + err); }),
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
