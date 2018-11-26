<template lang="pug">
    li.tool
        a(v-bind:href="linkUrl")
            img.img-thumbnail(v-if="thumbnailIsUrl()" v-bind:src="icon" v-bind:alt="name")
        | {{ name }}
</template>

<script>
    export default {
        name: "experience",
        props: ["icon", "linkUrl", "name", ],
        data () {
            return {
            };
        },
        methods: {
            thumbnailIsUrl() {
                if (this.icon) {
                    if (this.icon.startsWith("http"))
                        return true;
                }
                return false;
            },
        }
    };
</script>

<style lang="scss" scoped>
    .tool {
        list-style: none;
        display: inline;
        margin: 0 1em 0 0;

        .img-thumbnail {
            width: 1.6em;
            height: 1.6em;
            margin: 0 .4em;
            padding: 0;
        }

        :first-letter {
            text-transform: capitalize;
        }
    }
</style>
