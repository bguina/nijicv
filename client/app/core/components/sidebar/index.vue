<template lang="pug">
    aside.nav(:class="{ mini: minimized }")
        .menu
            .title {{ "General" | i18n }}
            ul
                router-link(tag="li", to="/")
                    a(:title="_('My CVs')")
                        span.icon
                            i.fa.fa-home
                        span.label {{ "Home" | i18n }}

                router-link(tag="li", to="/cv")
                    a(:title="_('Update a CV')")
                        span.icon
                            i.fa.fa-file-code-o
                        span.label {{ "Cv" | i18n }}

                router-link(tag="li", to="/experiences")
                    a(:title="_('Update my experiences')")
                        span.icon
                            i.fa.fa-film
                        span.label {{ "Experiences" | i18n }}

                router-link(tag="li", to="/skills")
                    a(:title="_('Skills')")
                        span.icon
                            i.fa.fa-rocket
                        span.label {{ "Skills" | i18n }}

                router-link(tag="li", to="/tools")
                    a(:title="_('Tools')")
                        span.icon
                            i.fa.fa-cogs
                        span.label {{ "Tools" | i18n }}

                // .fa-graduation-cap

            .title {{ "Profile" | i18n }}
            ul
                li
                    a(href="/logout", :title="_('Logout')")
                        span.icon
                            i.fa.fa-sign-out
                        span.label {{ "Logout" | i18n }}

        .footer
            .social
                a(href="https://twitter.com/Niji", target="_blank")
                    i.fa.fa-twitter
                a(href="https://github.com/icebob/vue-express-mongo-boilerplate", target="_blank")
                    i.fa.fa-github
            //.copyright &copy; Copyright, 2016
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

