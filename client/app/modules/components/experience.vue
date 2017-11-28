<template lang="pug">
    li.row.experience
        .col-sm-3.date
            p(v-bind:title="duration()") {{ moment(startedAt).format(dateformat) }} à {{ moment(endedAt).format(dateformat) }}
        .col-sm-9
            h5
                a(v-bind:href="linkUrl")
                    img.img-thumbnail(v-if="thumbnailUrl" v-bind:src="thumbnailUrl" v-bind:alt="business")
                | {{ business }} - {{ position }}
            p {{ description }}
            ul
                tool(v-for="(tool, index) in tools" v-bind:key="index" v-bind="tool")
        hr(v-if="0 == isLast")
</template>

<script>
    import Tool from "./tool";
    import moment from "moment";
    
    moment.locale("fr");

    export default {
        name: "experience",
        components: { Tool },
        props: ["thumbnailUrl", "linkUrl", "business", "position", "description", "startedAt", "endedAt", "tools", "dateformat", "isLast"],
        data () {
            return {
                moment: moment
            };
        },
        methods: {
            duration: function() {
                return moment.duration(moment(this.endedAt).diff(moment(this.startedAt))).humanize();
            }
        }
    };
</script>

<style lang="scss" scoped>
    .experience {
        .date {
            font-weight: bold;
            :first-letter {
                text-transform:capitalize;
            }
        }

        h5 {
            padding: 0;
            font-weight: bold;
            margin: 0;

            img {
                padding: 0;
            }
        }

        hr {
            margin-top: .4em;
            margin-bottom: .4em;
        }
    }
</style>