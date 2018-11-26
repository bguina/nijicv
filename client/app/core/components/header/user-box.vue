<template lang="pug">
    .user-box(v-if="me")
        .user-info.right
            img.avatar(:src='me.avatar')
            .username {{ me.firstName }} {{ me.lastName }}

            router-link(tag="a", to="/profile")
                i.fa.fa-user
                | {{ "MyAccount" | i18n }}
                    
            router-link(tag="a", to="/settings")
                i.fa.fa-cog
                | {{ "Settings" | i18n }}
            
            a(href='/logout')
                i.icon.fa.fa-power-off
                | {{ "Logout" | i18n }}

        //.notification-box.right
        //    ul.icons
        //        li(@click="toggleNotifications()", :class=" { active: notifications.length > 0 }")
        //            i.fa.fa-bell-o
        //            span {{ notifications.length }}
        //            .ring

        //        li(@click="toggleMessages()", :class=" { active: messages.length > 0 }")
        //            i.fa.fa-envelope-o
        //            span {{ messages.length }}
        //            .ring
            
        //    notifications-dropdown(:visible="expandedNotifications")
        //    messages-dropdown(:visible="expandedMessages")


</template>

<script>
    //import NotificationsDropdown from "./dropdowns/notifications";

    import { mapActions, mapGetters } from "vuex";

    export default {
        /*
        Import getters from the session store onto this object
        */
        computed: mapGetters("session", [
            "me",
            "notifications"
        ]),

        /*
            Compose object with following components
        */
        components: {
            //NotificationsDropdown,
        },

        /*
            Attributes
        */
        data() {
            return {
                expandedNotifications: false,
            };
        },

        methods: {
            toggleNotifications() {
                this.expandedNotifications = !this.expandedNotifications;
                if (this.expandedNotifications) {
                    this.expandedMessages = false;
                }
            }
        }

    };
    
</script>

<style lang="scss">
    .user-info > a {
        display: inline-block;
        margin: 0 1em 1em 0;
    }
</style>
