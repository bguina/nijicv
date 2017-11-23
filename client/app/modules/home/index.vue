<template lang="pug">
    .container
        tabs(:options="{ useUrlFragment: false }")
            tab.cv(v-for="cv in cvs" v-bind:key="cv.tag" v-bind:name="cv.title" v-bind:prefix="tabIconOf(cv)")
                .row.is-flex.border-top
                    .col-sm-3.border-left.border-right.text-center
                        img.logo.img-fluid(src="app/images/niji.jpg" alt="Niji")
                    .col-sm-9.text-center.border-right
                        h2(style="margin: 8px;") {{ cv.name }}
                        h3(style="margin: 8px;") {{ cv.title }}
                section
                    h4.border Synthèse
                section
                    h4.border Parcours professionnel
                    ul
                        li.row.experience(v-for="xp in cv.experiences")
                            .col-sm-2
                                b {{ moment(xp.startedAt).format("MMM YYYY") }} à
                                    br
                                    | {{ moment(xp.endedAt).format("MMM YYYY") }}
                                p (soit {{ moment.duration(moment(xp.endedAt).diff(moment(xp.startedAt))).humanize() }})
                            .col-sm-10
                                h5
                                    img.img-thumbnail(src="https://pbs.twimg.com/profile_images/846988540676329472/4Q63bjW1.jpg" v-bind:alt="xp.business")
                                    | {{ xp.business }} - {{ xp.position }}
                                p {{ xp.description }}
                section
                    h4.border Formations
                    ul
                        li.row.formation()
                            .col-sm-2
                            .col-sm-10
                hr
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
    import moment from "moment";

    import {Tabs, Tab} from "vue-tabs-component";

    Vue.component("tabs", Tabs);
    Vue.component("tab", Tab);
    moment.locale('fr');

    export default {
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
                moment: moment
            };
        },
        methods: {
            ...mapActions("cvs", [
                "downloadRows",
            ]),
            tabIconOf: function(cv) {
                let awesomeIcon = "android";
                return "<i class=\"fa fa-" + awesomeIcon + " fa-lg\"></i>";
            }
        },
        /**
         * Call if the component is created
         */
        created() {
            // Download rows for the page
            this.downloadRows();
        }
    };
</script>

<style lang="scss">
    @import "../../../scss/themes/blurred/variables";
    @import "~bootstrap/scss/bootstrap";

    .container {

        .cv {
            background-color: #fff;
            color: black;

            .logo {
              max-height: 120px;
              margin: 16px 26px 26px 26px;
            }

            .row.is-flex {
                display: flex;
                flex-wrap: wrap;
                align-items: center;
            }

            .row.is-flex > [class*='col-'] {
                display: flex;
                flex-direction: column;
            }

            /*
            * And with max cross-browser enabled.
            * Nobody should ever write this by hand. 
            * Use a preprocesser with autoprefixing.
            */
            .row.is-flex {
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                -webkit-flex-wrap: wrap;
                -ms-flex-wrap: wrap;
                flex-wrap: wrap;
            }

            .row.is-flex > div {
                display: -webkit-box;
                display: -webkit-flex;
                display: -ms-flexbox;
                display: flex;
                -webkit-box-orient: vertical;
                -webkit-box-direction: normal;
                -webkit-flex-direction: column;
                -ms-flex-direction: column;
                flex-direction: column;
                vertical-align: middle;
            }

            section > h4 {
              background-color: #dadfe2;
              padding: 16px 32px;
            }

            section:nth-of-type(1) > h4 {
                margin-top: 0px;
            }

            h5 {
                padding: 0;
                font-weight: bold;
                margin: 0;
                img {
                    width: 1.8em;
                    height: 1.8em;
                    margin: 0 .4em;
                }

            }

            .contact {
                li {
                    list-style: none;
                    text-align: center;
                }
            }
        }

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
    }
    
    .tabs-component {
        margin: 2em 0;
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


</style>