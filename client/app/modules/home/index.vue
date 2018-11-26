<template lang="pug">
    .container
        tabs(:options="{ useUrlFragment: false }")
            tab.cv(v-for="cv in cvs" v-bind:key="cv.tag" v-bind:prefix="tabIconOf(cv)" v-bind:name="cv.title")
                cv(v-bind="cv")
</template>
<!--        
            tab(v-bind:prefix="tabIconOf(null)" v-bind:name="\"Add CV\" | i18n")
                form(action='/cvs/new', method='POST')
                    input(type="hidden", name="_csrf" value=_csrf)

                    h4 Job title
                    input(name="title" v-model="title")
                    h4 Skills
                    ul
                        li(v-for="skill in skills")
                            p {{ skill.name }}
                        li
                            a(href="#" @click="addSkill()") {{ "Add skill" | i18n }}
                    h4 Experiences
                    ul
                        li(v-for="xp in experiences")
                            p {{ xp.name }}
                        li
                            a(href="#" @click="addExperience()") {{ "Add experience" | i18n }}
                    h4 Education
                    ul
                        li(v-for="xp in educations")
                            p {{ xp.name }}
                        li
                            a(href="#" @click="addEducation()") {{ "Add education" | i18n }}
                    h4 Languages -->
<script>
    import Vue from "vue";
    import toast from "../../core/toastr";
    import { mapGetters, mapActions } from "vuex";

    import {Tabs, Tab} from "vue-tabs-component";
    import Cv from "../components/cv";

    export default {
        components: { Tabs, Tab, Cv },
        computed: {
            ...mapGetters("cvs", [
                "cvs"
            ])
        },
        /**
         * Set page schema as data property
         */
        data() {
            return {
                name: "",
                title: "",
                skills: [],
                languages: [],
                experiences: [],
                educations: []
            };
        },
        methods: {
            ...mapActions("cvs", [
                "downloadUserCvs"
            ]),
            tabIconOf: function(cv) {
                let awesomeIcon = "question";
                if (cv) {
                    if (cv.icon) {
                        if (cv.icon.startsWith("http"))
                            return "<img class=\"img-thumbnail\" src=\"" + cv.icon + "\" alt=\"\"/>";
                        awesomeIcon = cv.icon;
                    }
                } else
                    awesomeIcon = "plus";

                return "<i class=\"fa fa-" + awesomeIcon + " fa-lg\"></i>";
            },
            addSkill: function() {
                alert("Alerte skill");
            },
            addExperience: function() {
                alert("Alerte experience");
            },
            addEducation: function() {
                alert("Alerte education");
            }
        },

        created() {
            console.log("watching " + this.$store.state.session);
            this.$store.watch(
                (state) => {
                    return this.$store.state.session.user;
                },
                (val) => {
                    console.log("user code changed to "+ val.code);
                    this.downloadUserCvs(val.code);
                },
                {
                    deep:true
                }
            );
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

    @media(min-width: 700px) {
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

</style>
