<template>
    <div class="m-extend-list">
        <RightSideMsg>
            <em>全服团长交流群</em> : <strong><a href="https://jq.qq.com/?_wv=1027&k=HZdXPmZe">785597424</a></strong>
        </RightSideMsg>
        <div class="m-fb-info">
            <i class="u-pic"><img id="m-archive-fb-pic" :src="img"/></i>
            <h1 class="u-title" id="m-archive-fb-name">{{ info.name }}</h1>
            <p class="u-intro" id="m-archive-fb-intro" v-html="introduce"></p>
            <ul class="u-mode" id="m-archive-fb-mode">
                <li v-for="(item, i) in info.detail.maps" :key="i">
                    {{ item.mode }}
                </li>
            </ul>
        </div>
        <div class="m-fb-links">
            <h3 class="c-sidebar-right-title">
                <img
                    class="u-icon"
                    svg-inline
                    src="../assets/img/puzzle.svg"
                />相关链接
            </h3>
            <div class="c-sidebar-right-list">
                <a
                    class="u-item"
                    href="https://www.jx3box.com/discuz/13715/"
                    target="_blank"
                    >全服排行榜说明</a>
                <a
                    class="u-item"
                    href="https://www.jx3box.com/app/jx3-query/"
                    target="_blank"
                    >技能Buff查询</a>
            </div>
        </div>
        <!-- <Github_REPO REPO="fb" coder="8,15,2"></Github_REPO> -->
    </div>
</template>

<script>
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box";
export default {
    name: "list_side",
    props: [],
    data: function() {
        return {};
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
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/list_side.less";
</style>
