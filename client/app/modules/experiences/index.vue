<template lang="pug">
    admin-page(:schema="schema", :selected="selected", :rows="experiences")
</template>

<script>
    import Vue from "vue";
    import jquery from "jquery";
    import AdminPage from "../../core/DefaultAdminPage.vue";
    import schema from "./schemaExperience";
    import toast from "../../core/toastr";
    import { mapGetters, mapActions } from "vuex";
    export default {
        
        components: {
            AdminPage: AdminPage
        },
        computed: mapGetters("experiences", [
            "experiences",
            "selected"
        ]),
        /**
         * Set page schema as data property
         */
        data() {
            return {
                schema
            };
        },
        /**
         * Socket handlers. Every property is an event handler
         */
        socket: {
            prefix: "/experiences/",
            events: {
                /**
                 * New experience added
                 * @param  {Object} res Experience object
                 */
                created(res) {
                    this.created(res.data);
                    toast.success(this._("ExperienceAdded", res), this._("ExperienceAdded"));
                },
                /**
                 * Experience updated
                 * @param  {Object} res Experience object
                 */
                updated(res) {
                    this.updated(res.data);
                    toast.success(this._("ExperienceUpdated", res), this._("ExperienceUpdated"));
                },
                /**
                 * Experience removed
                 * @param  {Object} res Response object
                 */
                removed(res) {
                    this.removed(res.data); 
                    toast.success(this._("ExperienceDeleted", res), this._("ExperienceDeleted"));
                }
            }
        },      
        methods: {
            ...mapActions("experiences", [
                "downloadRows",
                "created",
                "updated",
                "removed",
                "selectRow",
                "clearSelection",
                "saveRow",
                "updateRow",
                "removeRow"
            ])
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
