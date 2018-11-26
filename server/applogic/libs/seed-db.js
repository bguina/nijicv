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
                icon: "https://301o583r8shhildde3s0vcnh-wpengine.netdna-ssl.com/wp-content/uploads/2017/04/Linux-Shell.png",
                linkUrl: "https://www.gnu.org/software/bash/",
                name: "Shell UNIX",
            });
            let mongoTool = new Tool({
                icon: "https://pbs.twimg.com/profile_images/750403034178478081/EPrK3ci2.jpg",
                linkUrl: "https://www.mongodb.com/",
                name: "MongoDB",
            });
            let sqlTool = new Tool({
                icon: "https://webdevolutions.blob.core.windows.net/images/Media/Logos/Cloud/DevolutionsCloud-Database-Icon-MR.png",
                name: "SQL",
            });
            let ionicTool = new Tool({
                icon: "https://pbs.twimg.com/profile_images/834457277830541312/bYMCvtHD.jpg",
                linkUrl: "https://ionicframework.com/",
                name: "Ionic",
            });
            let androidTool = new Tool({
                icon: "https://developer.android.com/studio/images/studio-icon.png",
                linkUrl: "https://developer.android.com/studio",
                name: "Android Studio",
            });
            let kotlinTool = new Tool({
                icon: "https://kotlinlang.org/assets/images/open-graph/kotlin_250x250.png",
                linkUrl: "https://kotlinlang.org/",
                name: "Kotlin",
            });
            let reactTool = new Tool({
                icon: "https://opbeat.com/images/stacks/logo_react.svg",
                linkUrl: "https://reactjs.org/",
                name: "React",
            });
            let cucumberTool = new Tool({
                icon: "https://seeklogo.com/images/C/cucumber-logo-D727C551CE-seeklogo.com.png",
                linkUrl: "https://cucumber.io/",
                name: "Cucumber",
            });
            let calabashTool = new Tool({
                icon: "https://seeklogo.com/images/C/cucumber-logo-D727C551CE-seeklogo.com.png",
                linkUrl: "http://calaba.sh/",
                name: "Calabash",
            });
            let junitTool = new Tool({
                icon: "http://junit.org/junit5/assets/img/junit5-logo.png",
                linkUrl: "http://junit.org/junit5/",
                name: "JUnit",
            });
            let phpTool = new Tool({
                icon: "https://avatars1.githubusercontent.com/u/25158?s=200",
                linkUrl: "http://www.php.net/",
                name: "PHP5",
            });
            let invisionTool = new Tool({
                icon: "https://p4.zdassets.com/hc/theme_assets/604014/200095455/logo.jpg",
                linkUrl: "https://www.invisionapp.com/",
                name: "InVision",
            });
            let prestashopTool = new Tool({
                icon: "https://pbs.twimg.com/profile_images/612974656958689280/C6U2rHtG.jpg",
                linkUrl: "https://www.prestashop.com",
                name: "Prestashop",
            });
            let cTool = new Tool({
                icon: "https://www.javatpoint.com/cpages/images/c-programming.png",
                name: "Langage C",
            });
            let cppTool = new Tool({
                icon: "https://raw.githubusercontent.com/isocpp/logos/master/cpp_logo.png",
                name: "Langage C++",
            });
            let railsTool = new Tool({
                icon: "https://seeklogo.com/images/R/ruby-logo-087AF79367-seeklogo.com.jpg",
                linkUrl: "http://rubyonrails.org/",
                name: "Ruby On Rails",
            });
            let pythonTool = new Tool({
                icon: "https://www.python.org/static/opengraph-icon-200x200.png",
                linkUrl: "https://www.python.org/",
                name: "Python 2.7-3.0",
            });
            let djangoTool = new Tool({
                icon: "http://ztechnologie.com/blog/demarrer-un-projet-sous-django/django.png",
                linkUrl: "https://www.djangoproject.com/",
                name: "Django",
            });
            let javascriptTool = new Tool({
                icon: "https://i.stack.imgur.com/Mmww2.png",
                name: "Javascript",
            });

            let archSkill = new Skill({
                type: "métier",
                name: "Architecture applicative",
                description: "analyse des besoins, conception et découpage en briques logicielles"
            });
            let codeSkill = new Skill({
                type: "métier",
                name: "Réalisation applicative",
                description: "algorithmie, intelligence artificielle, réseau, 3d, ..."
            });
            let androidSkill = new Skill({
                type: "technical",
                name: "Développement mobile",
                description: "expérience confirmée en Android"
            });
            let androidTestingSkill = new Skill({
                type: "technical",
                name: "Testing",
                description: "tests unitaires, tests comportementaux"
            });
            let testingSkill = new Skill({
                type: "technical",
                name: "Testing",
                description: "tests unitaires, tests comportementaux"
            });
            let xpDkt = new Experience({
                linkUrl: "https://play.google.com/store/apps/details?id=com.decathlon.app",
                icon: "https://pbs.twimg.com/profile_images/846988540676329472/4Q63bjW1.jpg",
                business: "Decathlon",
                position: "Développeur Android",
                description: "Mission de développement de la nouvelle application grand-public, avec les évolutions nécessaires aux mises en production France, Hong-Kong et Italie.",
                startedAt: "2017-01-10T00:00:00+00:00",
                endedAt: "2017-08-03T00:00:00+00:00",
            });
            let xpEqs = new Experience({
                linkUrl: "https://equisense.com/fr",
                icon: "https://i0.wp.com/pegasebuzz.com/leblog/wp-content/uploads/2016/03/equisense-logo.jpg?fit=703%2C715&ssl=1",
                business: "Equisense",
                position: "Développeur Android",
                description: "Développement de l’application de contrôle de la centrale inertielle Bluetooth « Motion » permettant l’analyse de la locomotion équine.",
                startedAt: "2015-07-25T00:00:00+00:00",
                endedAt: "2016-10-01T00:00:00+00:00",
            });

            let xpPresta = new Experience({
                linkUrl: "https://lille.alerteapero.com/",
                icon: "https://pbs.twimg.com/profile_images/566230308328964096/leRiLPFp.png",
                business: "AlerteApero",
                position: "Prestataire Auto-entrepreneur",
                description: "Création d’un site-boutique livrable aux franchisés en collaboration avec Samuel Lemaresquier, web designer",
                startedAt: "2012-10-01T00:00:00+00:00",
                endedAt: "2013-03-01T00:00:00+00:00",
            });

            let xpNeuf = new Experience({
                linkUrl: "https://www.ubinect.fr/",
                icon: "https://pbs.twimg.com/profile_images/3224891044/fa7577ebe6973f19605a13f75ccd04a7_400x400.png",
                business: "9h37",
                position: "Stagiaire Python",
                description: "Développement d’un logiciel de télétransmission de données médicales opérable depuis tous les navigateurs web majeurs.",
                startedAt: "2012-06-01T00:00:00+00:00",
                endedAt: "2013-07-01T00:00:00+00:00",
            });
            let xpEpitech = new Experience({
                linkUrl: "http://www.epitech.eu/",
                icon: "https://media-elerium.cursecdn.com/avatars/100/635/636316564390503229.png",
                business: "EPITECH",
                position: "Ecole d'expertise en informatique",
                description: "",
                startedAt: "2010-10-01T00:00:00+00:00",
                endedAt: "2015-10-01T00:00:00+00:00",
            });
            let cvAndroid = new Cv({
                ownerId: null,
                title: "Développeur Android",
                icon: "android",
                status: 1
            });
            let cvWeb = new Cv({
                ownerId: null,
                title: "Développeur Web",
                icon: "globe",
                status: 1
            });
            let cv = new Cv({
                ownerId: null,
                title: "Développeur Software",
                icon: "code-fork",
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
                junitTool.save().then((value) => {
                    logger.info("Default junit tool created:" + value);
                }).catch((err) => { logger.error("Error creating junit tool: " + err); }),
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
                archSkill.save().then((value) => {
                    logger.info("Default arch skill created:" + value);
                }).catch((err) => { logger.error("Error creating arch skill: " + err); }),
                codeSkill.save().then((value) => {
                    logger.info("Default code skill created:" + value);
                }).catch((err) => { logger.error("Error creating code skill: " + err); }),
                androidSkill.save().then((value) => {
                    logger.info("Default android skill created:" + value);
                }).catch((err) => { logger.error("Error creating android skill: " + err); }),
                androidTestingSkill.save().then((value) => {
                    logger.info("Default android testing skill created:" + value);
                }).catch((err) => { logger.error("Error creating android testing skill: " + err); }),
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
                androidTestingSkill.tools = [junitTool, calabashTool];
                testingSkill.tools = [junitTool, cucumberTool];

                xpDkt.tools = [androidTool, reactTool, kotlinTool, calabashTool];
                xpEqs.tools = [androidTool, ionicTool, invisionTool];
                xpPresta.tools = [phpTool, prestashopTool, javascriptTool];
                xpNeuf.tools = [pythonTool, djangoTool, javascriptTool];
                xpEpitech.tools = [shellTool, cTool, cppTool];

                cvAndroid.skills = [archSkill, codeSkill, androidTestingSkill];
                cvAndroid.experiences = [xpDkt, xpEqs];
                cvAndroid.formations = [xpEpitech];
                cvWeb.skills = [archSkill, codeSkill, testingSkill];
                cvWeb.experiences = [xpPresta, xpNeuf];
                cvWeb.formations = [xpEpitech];
                cv.skills = [archSkill, codeSkill, androidSkill, testingSkill];
                cv.experiences = [xpDkt, xpEqs, xpPresta, xpNeuf];
                cv.formations = [xpEpitech];

                logger.info("Saved base DB");

                return Promise.all([
                    androidSkill.save().then((value) => {
                        logger.info("Default android skill updated:" + value);
                    }).catch((err) => { logger.error("Error updating android skill: " + err); }),
                    androidTestingSkill.save().then((value) => {
                        logger.info("Default testing skill updated:" + value);
                    }).catch((err) => { logger.error("Error updating android testing skill: " + err); }),
                    testingSkill.save().then((value) => {
                        logger.info("Default testing skill updated:" + value);
                    }).catch((err) => { logger.error("Error updating testing skill: " + err); }),
                    xpDkt.save().then((value) => {
                        logger.info("Default dkt xp updated:" + value);
                    }).catch((err) => { logger.error("Error updating dkt xp: " + err); }),
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


