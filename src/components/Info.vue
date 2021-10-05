<template>
    <div class="m-info">
        <RightSideMsg class="u-group">
            <em>全服团长交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=nzOIpVGI" v-if="client == 'origin'">528707506</a>
                <a href="https://jq.qq.com/?_wv=1027&k=HZdXPmZe" v-else>785597424</a>
            </strong>
        </RightSideMsg>
        <a href="/team" class="u-team" target="_blank"><i class="el-icon-user"></i> 团队管理平台</a>

        <div class="m-info-router">
            <router-link to="/">
                <i class="el-icon-collection"></i>
            </router-link>
            <a href="/rank" target="_blank" v-if="client =='std'">
                <i class="el-icon-trophy"></i>
            </a>
            <router-link to="/cj">
                <i class="el-icon-trophy"></i>
            </router-link>
            <router-link to="/npc">
                <i class="el-icon-key"></i>
            </router-link>
            <router-link to="/skill">
                <i class="el-icon-cpu"></i>
            </router-link>
            <router-link to="/attr">
                <i class="el-icon-help"></i>
            </router-link>
            <router-link to="/drop">
                <i class="el-icon-present"></i>
            </router-link>
            <router-link to="/gem">
                <i class="el-icon-cherry"></i>
            </router-link>
            <router-link to="/story">
                <i class="el-icon-film"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Info",
    props: [],
    data: function () {
        return {};
    },
    computed: {
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {},
    mounted: function () {},
};
</script>

<style lang="less">
@import "../assets/css/info.less";
</style>
