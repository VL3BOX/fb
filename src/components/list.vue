<template>
    <div class="m-fb">
        <tabs />
        <router-view />
    </div>
</template>

<script>
import tabs from "./tabs";
export default {
    name: "list",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {},
    methods: {
    },
    mounted: function() {},
    components: {
        tabs,
    },
};
</script>

<style lang="less">
@import "../assets/css/layout.less";
</style>
