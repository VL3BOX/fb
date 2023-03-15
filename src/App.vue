<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: "App",
    beforeCreate: function() {
        this.$store.state.zlp = this.$route.query.fb_zlp;
        this.$store.state.fb = this.$route.query.fb_name;
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
