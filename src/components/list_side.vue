<template>
    <div class="m-extend-list">
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
        <div class="m-fb-rank-mini" v-if="rank.length">
            <el-tabs v-model="focus" @tab-click="loadRank">
                <el-tab-pane :label="name" :name="i+''" v-for="(name,i) in subnav" :key="i"
                    ></el-tab-pane
                >
            </el-tabs>
            <el-row
                :gutter="20"
                class="m-fb-rank-box"
                v-for="(group, i) in rank"
                :key="i"
            >
                <div
                    class="m-fb-rank-group"
                    v-if="focus == i && group"
                    v-loading="loading"
                >
                    <ul class="u-list">
                        <li v-for="(item, i) in group" :key="i">
                            <span class="u-order">{{
                                i + 1
                            }}</span>
                            <span class="u-team">{{ item.Role }}</span>
                            <span class="u-server">{{ item.Server }}</span>
                        </li>
                    </ul>
                </div>
            </el-row>
            <a class="u-more el-button el-button--primary is-plain" href="/fb/#/rank">&raquo; 查看更多</a>
        </div>
    </div>
</template>

<script>
import { getDateRank, getMiniRank } from "../service/getRank";
import moment from "moment";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box";
// import mock from '../mock/rank.json'
export default {
    name: "list_side",
    props: [],
    data: function() {
        return {
            focus: 0,
            subnav: ["周贽", "厌夜", "迟驻", "白某", "安小逢"],
            rank: [],
            loading: false,
            list: [7525, 7526, 7527, 7528, 7529],
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
    methods: {
        loadRank: function() {
            let i = ~~this.focus;

            // 状态设置
            this.loading = true;

            // 已请求
            if (this.rank[i]) {
                this.loading = false;
                return;
            }

            // 新请求
            getMiniRank(this.list[i])
                .then((res) => {
                    this.rank.splice(i,1,res.data.data)
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
                    // this.rank.splice(i,1,mock)
                });
        },
    },
    mounted: function() {
        this.loadRank()
    },
};
</script>

<style lang="less">
@import "../assets/css/fb_info.less";
</style>
