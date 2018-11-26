<template lang="pug">
div
    section
        .is-flex.cv-border-top
            .col-sm-3.cv-border-right.text-center
                img.logo.img-fluid(src="app/images/niji.png" alt="Niji")
            .col-sm-9.text-center
                h2 {{ name }}
                h3 {{ title }}
    section
        h4 Synthèse
        ul(type="disc")
            li.row(v-for="(skillType, index) in skills")
                .col-sm-12
                    h5 Compétences {{ skillNameOfType(index) }}
                    ul
                        skill(v-for="skill in skillType" v-bind:key="index" v-bind="skill")
                    h5 Add skills
                        vue-form-generator(:schema="skillSchema", :model="skills")
            li.row
                .col-sm-12
                    h5 Methodologies
                    ul
                        li
                            p V-model, Scrum
            li.row
                .col-sm-12
                    h5 Langues
                    ul
                        li
                            p Anglais, francais
    
    section
        h4 Parcours professionnel
        ul
            experience(v-for="(xp, index) in experiences" v-bind:key="index" v-bind="xp" v-bind:dateformat="\"MMM YYYY\"" v-bind:is-last="index == experiences.length - 1")
    section
        h4 Formations
        ul
            experience(v-for="(xp, index) in formations" v-bind:key="index" v-bind="xp" v-bind:dateformat="\"YYYY\"" v-bind:is-last="index == formations.length - 1")
    br
    .contact
        | 38ter, rue de Rennes - 35510 Cesson-Sévigné - 
        i(class="fa fa-phone")
        |  02 99 32 02 84 - 
        i(class="fa fa-fax")
        |  02 99 32 03 89

</template>

<script>
    import Vue from "vue";
    import { mapGetters, mapActions } from "vuex";
    import { validators } from "vue-form-generator";
    import Experience from "../components/experience";
    import Skill from "../components/skill";
    let _ = Vue.prototype._;

    export default {
        components: { Experience, Skill },
        name: "cv",
        props: ["name", "title", "skills", "experiences", "formations"],
        data () {
            return {
                model: {
                    columns: [{
                        "label": "Type",
                        "field": "type",
                        "template": ""
                    }, {
                        "label": "Nom",
                        "field": "name",
                        "template": ""
                    }, {
                        "label": "Description",
                        "field": "description",
                        "template": ""
                    }, {
                        "label": "Tools",
                        "field": "tools",
                        "template": ""
                    }],
                },
                skillSchema: {
                    fields: [
                        {
                            type: "array",
                            label: "Tools",
                            model: "tools",
                            items: {
                                fields: [ {
                                    type: "input",
                                    inputType: "text",
                                    label: "Name",
                                    model: "name"
                                } ]
                            }
                        }
                    ],
                }
            };
        },
        methods: {
            skillNameOfType: function(type) {
                if (type == "technical")
                    return "techniques";
                return type;
            }
        }
    };
</script>

<style lang="scss" scoped>
   .cv {
        background-color: #fff;
        color: black;

        ul {
            list-style-type: disc;
        }

        .cv-border {
          border: 1px #ccc solid !important;
        }

        .cv-border-left {
          border-left: 1px #ccc solid !important;
        }

        .cv-.border-right {
          border-right: 1px #ccc solid !important;
        }

        .cv-border-top {
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

        .skill-type > * {
            display: inline-block;
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

