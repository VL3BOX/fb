<template>
    <div class="m-extend-box">
        <RightSideMsg>
            <em>全服团长交流群</em> :
            <strong
                ><a href="https://jq.qq.com/?_wv=1027&k=HZdXPmZe"
                    >785597424</a
                ></strong
            >
        </RightSideMsg>
        <div class="m-extend-list">
            <!-- <div class="m-fb-info">
            <i class="u-pic"><img id="m-archive-fb-pic" :src="img"/></i>
            <h1 class="u-title" id="m-archive-fb-name">{{ info.name }}</h1>
            <p class="u-intro" id="m-archive-fb-intro" v-html="introduce"></p>
            <ul class="u-mode" id="m-archive-fb-mode">
                <li v-for="(item, i) in info.detail.maps" :key="i">
                    {{ item.mode }}
                </li>
            </ul>
        </div> -->
            <el-carousel
                class="m-rank-ing"
                v-if="data && data.length"
                trigger="click"
                height="140px"
                indicator-position="none"
                :interval="6000"
            >
                <el-carousel-item v-for="(item, i) in data" :key="i">
                    <a
                        :href="item.link"
                        rel="noopener noreferrer"
                        target="_blank"
                        ><img :src="item.img"
                    /></a>
                </el-carousel-item>
            </el-carousel>
            <a href="/team" class="m-team-app" target="_blank">
                <img
                    class="u-icon"
                    svg-inline
                    src="../assets/img/team_on.svg"
                />
                <b>团队管理平台</b>
                <span>在线排表 自动金团记录</span>
            </a>
            <div class="m-team-recruit">
                <h3 class="c-sidebar-right-title">
                    <img
                        class="u-icon"
                        svg-inline
                        src="../assets/img/puzzle.svg"
                    />团队招募
                    <a class="u-more" href="/team" target="_blank"
                        >查看更多 &raquo;</a
                    >
                </h3>
                <ul>
                    <li v-for="(item, i) in teams" :key="i">
                        <a :href="item.ID | teamLink">
                            <i class="u-flag el-icon-s-flag"></i>
                            <!-- <img :src="item.logo | showLogo"> -->
                            <span class="u-name">{{ item.name }}</span>
                            <span class="u-server">{{ item.server }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { __ossMirror } from "@jx3box/jx3box-common/data/jx3box";
// import minirank from './minirank'
import { getEvents, getTeams } from "@/service/next.js";
import {
    showAvatar,
    resolveImagePath,
    getLink
} from "@jx3box/jx3box-common/js/utils.js";
import { getNews } from "../service/sidebar";
export default {
    name: "list_side",
    props: [],
    data: function() {
        return {
            teams: [],
            events: [],
            data: [],
        };
    },
    computed: {
        zlp: function() {
            return this.$store.state.zlp;
        },
        fb: function() {
            return this.$store.state.fb;
        },
        info: function() {
            return this.$store.state.map[this.zlp]["dungeon"][this.fb];
        },
        img: function() {
            return __ossMirror + this.info.icon;
        },
        introduce: function() {
            return this.info.detail.introduce.replace(/\\n/g, "<br/>");
        },
    },
    methods: {},
    mounted: function() {
        // getEvents().then((res) => {
        //     this.events = res.data.data.list
        // })
        getNews("activity").then((data) => {
            data.forEach((item) => {
                item.img = resolveImagePath(item.img);
            });
            this.data = data;
        });
        getTeams().then((res) => {
            this.teams = res.data.data.list;
        });
    },
    filters: {
        showLogo: function(val) {
            return showAvatar(val);
        },
        eventLink: function(val) {
            return "/rank/race/" + val;
        },
        teamLink: function(val) {
            return getLink('org',val)
        },
    },
    components: {
        // minirank
    },
};
</script>

<style lang="less">
@import "../assets/css/list_side.less";
</style>
