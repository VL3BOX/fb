<template>
    <div class="m-extend-box">
        <RightSideMsg>
            <em>全服团长交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=CAiizina" v-if="client == 'origin'">590349918</a>
                <a href="https://jq.qq.com/?_wv=1027&k=HZdXPmZe" v-else>785597424</a>
            </strong>
        </RightSideMsg>
        <div class="m-extend-list">
            <a href="/team" class="m-team-app" target="_blank">
                <img class="u-icon" svg-inline src="../assets/img/team_on.svg" />
                <b>团队管理平台</b>
                <span>在线排表 自动金团记录</span>
            </a>
        </div>
        <div class="m-extend-qlink">
            <a href="/rank" target="_blank">
                <i class="el-icon-trophy"></i>
                <span>全服排行</span>
                <i class="el-icon-arrow-right"></i>
            </a>
            <!-- <router-link to="/npc">
                <i class="el-icon-key"></i>
                <span>首领数据</span>
                <i class="el-icon-arrow-right"></i>
            </router-link>
            <router-link to="/skill">
                <i class="el-icon-cpu"></i>
                <span>技能数据</span>
                <i class="el-icon-arrow-right"></i>
            </router-link> -->
            <router-link to="/drop">
                <i class="el-icon-present"></i>
                <span>掉落数据</span>
                <i class="el-icon-arrow-right"></i>
            </router-link>
            <router-link to="/gem">
                <i class="el-icon-cherry"></i>
                <span>瑰石数据</span>
                <i class="el-icon-arrow-right"></i>
            </router-link>
            <router-link to="/story">
                <i class="el-icon-film"></i>
                <span>背景故事</span>
                <i class="el-icon-arrow-right"></i>
            </router-link>
        </div>
    </div>
</template>

<script>
import { __ossMirror } from "@jx3box/jx3box-common/data/jx3box";
import { resolveImagePath } from "@jx3box/jx3box-common/js/utils.js";
export default {
    name: "list_side",
    props: [],
    data: function () {
        return {};
    },
    computed: {
        zlp: function () {
            return this.$store.state.zlp;
        },
        fb: function () {
            return this.$store.state.fb;
        },
        info: function () {
            return this.$store.state.map[this.zlp]["dungeon"][this.fb];
        },
        img: function () {
            return __ossMirror + this.info.icon;
        },
        introduce: function () {
            return this.info.detail.introduce.replace(/\\n/g, "<br/>");
        },
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {},
    mounted: function () {},
    components: {},
};
</script>

<style lang="less">
@import "../assets/css/list_side.less";
</style>
