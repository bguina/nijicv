<template lang="pug">
    li.tool
        a(v-bind:href="linkUrl")
            img.img-thumbnail(v-if="thumbnailUrl" v-bind:src="thumbnailUrl" v-bind:alt="name")
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
        }
    };
</script>

<style lang="scss" scoped>
    .tool {
        list-style: none;
        display: inline;

        .img-thumbnail {
            width: 1.8em;
            height: 1.8em;
            margin: 0 .4em;
            padding: .25rem;
        }

        :first-letter {
            text-transform:capitalize;
        }
    }
</style>