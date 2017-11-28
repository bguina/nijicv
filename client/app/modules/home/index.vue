<template lang="pug">
    .container
        tabs(:options="{ useUrlFragment: false }")
            tab.cv(v-for="cv in cvs" v-bind:key="cv.tag" v-bind:name="cv.title" v-bind:prefix="tabIconOf(cv)")
                .is-flex.border-top
                    .col-sm-3.border-left.border-right.text-center
                        img.logo.img-fluid(src="app/images/niji.jpg" alt="Niji")
                    .col-sm-9.text-center.border-right
                        h2 {{ cv.name }}
                        h3 {{ cv.title }}
                section
                    h4 Synthèse
                    ul
                        li.row(v-for="(skillType, index) in cv.skills")
                            .col-sm-12
                                h5 Compétences {{ skillNameOfType(index) }}
                                ul
                                    li(v-for="skill in skillType")
                                        p {{ skill.name }}: {{ skill.description }}.
                                        ul
                                            tool(v-for="(tool, toolIndex) in skill.tools" v-bind:key="toolIndex" v-bind="tool")
                section
                    h4 Parcours professionnel
                    ul
                        experience(v-for="(xp, index) in cv.experiences" v-bind:key="index" v-bind="xp" v-bind:dateformat="\"MMM YYYY\"" v-bind:is-last="index == cv.experiences.length - 1")
                section
                    h4 Formations
                    ul
                        experience(v-for="(xp, index) in cv.formations" v-bind:key="index" v-bind="xp" v-bind:dateformat="\"YYYY\"" v-bind:is-last="index == cv.formations.length - 1")
                br
                ul.contact
                    li
                        | 38ter, rue de Rennes - 35510 Cesson-Sévigné - 
                        i(class="fa fa-phone")
                        |  02 99 32 02 84 - 
                        i(class="fa fa-fax")
                        |  02 99 32 03 89
                    li
                        | 14, boulevard des Frères Voisin - 92130 Issy-les-Moulineaux - 
                        i(class="fa fa-phone")
                        |  01 58 88 30 72 - 
                        i(class="fa fa-fax")
                        |  01 46 45 13 93
                    li
                        | 165, avenue de Bretagne - 59000 Lille - 
                        i(class="fa fa-phone")
                        |  03 20 12 23 50 - 
                        i(class="fa fa-fax")
                        |  03 28 04 88 35
                    li
                        | 11, rue Arthur III - 44200 Nantes - 
                        i(class="fa fa-phone")
                        |  02 51 84 11 12 - 
                        i(class="fa fa-fax")
                        |  02 51 84 10 05

</template>

<script>
    import Vue from "vue";
    import toast from "../../core/toastr";
    import { mapGetters, mapActions } from "vuex";

    import {Tabs, Tab} from "vue-tabs-component";
    import Experience from "../components/experience";
    import Tool from "../components/tool";

    export default {
        components: { Experience, Tool, Tabs, Tab },
        computed: {
            ...mapGetters("cvs", [
                "cvs"
            ]),
        },
        /**
         * Set page schema as data property
         */
        data() {
            return {
            };
        },
        methods: {
            ...mapActions("cvs", [
                "downloadCvs",
            ]),
            skillNameOfType: function(type) {
                if (type == "technical")
                    return "techniques";
                return type;
            },
            tabIconOf: function(cv) {
                let awesomeIcon = "question";
                if (cv.thumbnailUrl) {
                    if (cv.thumbnailUrl.startsWith("http"))
                        return "<img class=\"img-thumbnail\" src=\"" + cv.thumbnailUrl + "\" alt=\"\"/>";
                    awesomeIcon = cv.thumbnailUrl;
                }

                return "<i class=\"fa fa-" + awesomeIcon + " fa-lg\"></i>";
            }
        },
        /**
         * Call if the component is created
         */
        created() {
            // Download rows for the page
            this.downloadCvs();
        }
    };
</script>

<style lang="scss">
    @import "../../../scss/themes/blurred/variables";
    @import "~bootstrap/scss/bootstrap";

    .tabs-component {
        margin: 1.2em 0;
    }

    .tabs-component-tabs {
        border: solid 1px #ddd;
        border-radius:  6px;
        margin-bottom: 5px;
    }

    @media (min-width: 700px) {
        .tabs-component-tabs {
            border: 0;
            align-items: stretch;
            display: flex;
            justify-content: flex-start;
            margin-bottom: -1px;
        }
    }

    .tabs-component-tab {
        color: #999;
        font-size: 14px;
        font-weight: 600;
        margin-right: 0;
        list-style: none;
    }

    .tabs-component-tab:not(:last-child) {
        border-bottom: dotted 1px #ddd;
    }

    .tabs-component-tab:hover {
        color: #666;
    }

    .tabs-component-tab.is-active {
        color: #000;
    }

    @media (min-width: 700px) {
        .tabs-component-tab {
            background-color: #fff;
            border: solid 1px #ddd;
            border-radius: 3px 3px 0 0;
            margin-right: .5em;
            transform: translateY(2px);
            transition: transform .3s ease;
        }

        .tabs-component-tab.is-active {
            border-bottom: solid 1px #fff;
            z-index: 2;
            transform: translateY(0);
        }
    }

    .tabs-component-tab-a {
        align-items: center;
        color: inherit;
        display: flex;
        padding: .75em 1em;
        text-decoration: none;

        i.fa {
            margin: 0 .4em;
        }
    }

    .tabs-component-tab-a:hover {
        text-decoration: none;
    }

    .tabs-component-panels {
        padding: 2em 0;
    }

    @media (min-width: 700px) {
        .tabs-component-panels {
            border-top-left-radius: 0;
            background-color: #fff;
            border: solid 1px #ddd;
            border-radius: 0 6px 6px 6px;
            box-shadow: 0 0 10px rgba(0, 0, 0, .05);
            padding: 2em 2em;
        }
    }

    .is-flex {
        display: flex;
    }

    .is-flex > [class*='col-'] {
        display: flex;
        flex-direction: column;
        justify-content: center; /* center items horizontally, in this case */
        align-items: center;
    }

    .cv {
        background-color: #fff;
        color: black;

        .border {
          border: 1px #ccc solid !important;
        }

        .border-left {
          border-left: 1px #ccc solid !important;
        }

        .border-right {
          border-right: 1px #ccc solid !important;
        }

        .border-top {
          border-top: 1px #ccc solid !important;
        }

        .logo {
          max-height: 120px;
          margin: 16px 26px 26px 26px;
        }

        section > * {
            border-left: 1px #ccc solid !important;
            border-right: 1px #ccc solid !important;
            padding: .4em 1.2em;
            margin: 0;
        }

        section > h4 {
            background-color: #dadfe2;
            border-top: 1px #ccc solid !important;
            border-bottom: 1px #ccc solid !important;
        }

        section:last-of-type {
            border-bottom: 1px #ccc solid !important;
        }

        h5 {
            font-weight: bold;
        }

        .contact {
            margin: 0;

            li {
                list-style: none;
                text-align: center;
            }
        }
    }


</style>