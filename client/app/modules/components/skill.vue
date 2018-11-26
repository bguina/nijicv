<template lang="pug">
    li.skill-type
        p {{ name }}: {{ description }}.
        ul
            tool(v-for="(tool, toolIndex) in tools" v-bind:key="toolIndex" v-bind="tool")
</template>

<script>
import Tool from "../components/tool";

export default {
    components: { "tool": Tool },
    name: "skill",
    props: ["type", "name", "description", "tools"],
    data () {
        return {
        };
    },
    methods: {
    }
};
</script>

<style lang="scss" scoped>
.skill {
}
</style>
