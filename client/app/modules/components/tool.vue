<template lang="pug">
    li.tool
        a(v-bind:href="linkUrl")
            i.fa(v-if="!thumbnailIsUrl()" aria-hidden="true" v-bind:class="thumbnailUrl") class="fa fa-handshake-o" ></i>
            img.img-thumbnail(v-if="thumbnailIsUrl()" v-bind:src="thumbnailUrl" v-bind:alt="name")
        | {{ name }}
</template>

<script>
    export default {
        name: "experience",
        props: ["thumbnailUrl", "linkUrl", "name", ],
        data () {
            return {
            };
        },
        methods: {
            thumbnailIsUrl() {
                if (this.thumbnailUrl) {
                    if (this.thumbnailUrl.startsWith("http"))
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

        .img-thumbnail {
            width: 1.6em;
            height: 1.6em;
            margin: 0 .4em;
            padding: 0;
        }

        :first-letter {
            text-transform:capitalize;
        }
    }
</style>