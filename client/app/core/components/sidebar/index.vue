<template lang="pug">
    aside.nav(:class="{ mini: minimized }")
        .menu
            .title {{ "General" | i18n }}
            ul
                router-link(tag="li", to="/")
                    a(:title="_('Home')")
                        span.icon
                            i.fa.fa-home
                        span.label {{ "Home" | i18n }}

                router-link(tag="li", to="/cv")
                    a(:title="_('Cv')")
                        span.icon
                            i.fa.fa-tasks
                        span.label {{ "Cv" | i18n }}

                router-link(tag="li", to="/experiences")
                    a(:title="_('Experiences')")
                        span.icon
                            i.fa.fa-tasks
                        span.label {{ "Experiences" | i18n }}

            .title {{ "Profile" | i18n }}
            ul
                li
                    a(href="/logout", :title="_('Logout')")
                        span.icon
                            i.fa.fa-sign-out
                        span.label {{ "Logout" | i18n }}

        .footer
            .social
                a(href="", target="_blank")
                    i.fa.fa-facebook
                a(href="https://twitter.com/Icebobcsi", target="_blank")
                    i.fa.fa-twitter
                a(href="https://github.com/icebob/vue-express-mongo-boilerplate", target="_blank")
                    i.fa.fa-github
            .copyright &copy; Copyright, 2016
</template>

<script>

    export default {
        props: [
            "minimized"
        ]
    };
    
</script>

<style lang="scss">
</style>