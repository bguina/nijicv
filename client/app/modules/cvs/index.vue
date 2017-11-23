<template lang="pug">
    admin-page(:schema="schema", :selected="selected", :rows="cvs")
</template>

<script>
    import Vue from "vue";
    import jquery from "jquery";
    import AdminPage from "../../core/DefaultAdminPage.vue";
    import schema from "./schemaCv";
    import toast from "../../core/toastr";
    import { mapGetters, mapActions } from "vuex";
    export default {
        
        components: {
            AdminPage: AdminPage
        },
        computed: mapGetters("cvs", [
            "cvs",
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
            prefix: "/cvs/",
            events: {
                /**
                 * New experience added
                 * @param  {Object} res Cv object
                 */
                created(res) {
                    this.created(res.data);
                    toast.success(this._("CvNameAdded", res), this._("CvAdded"));
                },
                /**
                 * Cv updated
                 * @param  {Object} res Cv object
                 */
                updated(res) {
                    this.updated(res.data);
                    toast.success(this._("CvNameUpdated", res), this._("CvUpdated"));
                },
                /**
                 * Cv removed
                 * @param  {Object} res Response object
                 */
                removed(res) {
                    this.removed(res.data); 
                    toast.success(this._("CvNameDeleted", res), this._("CvDeleted"));
                }
            }
        },      
        methods: {
            ...mapActions("cvs", [
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
