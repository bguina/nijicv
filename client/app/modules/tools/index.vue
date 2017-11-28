<template lang="pug">
    admin-page(:schema="schema", :selected="selected", :rows="tools")
</template>

<script>
    import Vue from "vue";
    import jquery from "jquery";
    import AdminPage from "../../core/DefaultAdminPage.vue";
    import schema from "./schema";
    import toast from "../../core/toastr";
    import { mapGetters, mapActions } from "vuex";
    export default {
        
        components: {
            AdminPage: AdminPage
        },
        computed: mapGetters("tools", [
            "tools",
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
            prefix: "/tools/",
            events: {
                /**
                 * New tool added
                 * @param  {Object} res Tool object
                 */
                created(res) {
                    this.created(res.data);
                    toast.success(this._("ToolAdded", res), this._("ToolAdded"));
                },
                /**
                 * Tool updated
                 * @param  {Object} res Tool object
                 */
                updated(res) {
                    this.updated(res.data);
                    toast.success(this._("ToolUpdated", res), this._("ToolUpdated"));
                },
                /**
                 * Tool removed
                 * @param  {Object} res Response object
                 */
                removed(res) {
                    this.removed(res.data); 
                    toast.success(this._("ToolDeleted", res), this._("ToolDeleted"));
                }
            }
        },      
        methods: {
            ...mapActions("tools", [
                "downloadTools",
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
            this.downloadTools();
        }
    };
</script>
