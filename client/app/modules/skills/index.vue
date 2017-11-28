<template lang="pug">
    admin-page(:schema="schema", :selected="selected", :rows="skills")
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
        computed: mapGetters("skills", [
            "skills",
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
            prefix: "/skills/",
            events: {
                /**
                 * New skill added
                 * @param  {Object} res Skill object
                 */
                created(res) {
                    this.created(res.data);
                    toast.success(this._("SkillAdded", res), this._("SkillAdded"));
                },
                /**
                 * Skill updated
                 * @param  {Object} res Skill object
                 */
                updated(res) {
                    this.updated(res.data);
                    toast.success(this._("SkillUpdated", res), this._("SkillUpdated"));
                },
                /**
                 * Skill removed
                 * @param  {Object} res Response object
                 */
                removed(res) {
                    this.removed(res.data); 
                    toast.success(this._("SkillDeleted", res), this._("SkillDeleted"));
                }
            }
        },      
        methods: {
            ...mapActions("skills", [
                "downloadSkills",
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
            this.downloadSkills();
        }
    };
</script>
