<template>
    <div class="m-fb-rank">
        <div class="m-fb-rank-tab">
            <el-tabs type="card" @tab-click="loadRank" v-model="focus">
                <el-tab-pane
                    v-for="(boss, i) in subnav"
                    :label="boss"
                    :key="i"
                    :name="i + ''"
                ></el-tab-pane>
            </el-tabs>
        </div>

        <el-row
            :gutter="20"
            class="m-fb-rank-box"
            v-for="(group, i) in rank"
            :key="i"
        >
            <div class="m-fb-rank-group" v-if="focus == i" v-loading="loading">
                <h3 class="u-title">剑网3跨区服副本通关百强榜</h3>
                <ul class="u-list">
                    <li v-for="(item, i) in group" :key="i">
                        <span class="u-order" :class="highlight(i)">{{
                            i + 1
                        }}</span>
                        <span class="u-team">{{ item.Role }}</span>
                        <span class="u-server">{{ item.Server }}</span>
                        <time class="u-date"
                            >达成时间:<b class="u-important">{{
                                item.finishTime | format
                            }}</b></time
                        >
                        <time class="u-cost"
                            >用时:<b class="u-important u-big">{{
                                item.fightTime
                            }}</b
                            >秒</time
                        >
                    </li>
                </ul>
            </div>
        </el-row>
    </div>
</template>

<script>
// 10人 7503,7504,7505,7506,7507
// 25普通 7514,7515,7516,7517,7518
// 25英雄 7525,7526,7527,7528,7529
import { getDateRank, getSpeedRank } from "../service/getRank";
import moment from "moment";
// import mock from '../mock/rank.json'

export default {
    name: "Rank",
    props: [],
    data: function() {
        return {
            focus: 0,
            subnav: [
                "周贽·25人英雄",
                "厌夜·25人英雄",
                "迟驻·25人英雄",
                "白某·25人英雄",
                "安小逢·25人英雄",
            ],
            rank: [],
            loading: false,
            list: [7525, 7526, 7527, 7528, 7529],
        };
    },
    computed: {},
    filters: {
        format: function(val) {
            return moment(val * 1000).format("YYYY-MM-DD HH:mm:ss");
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
            getDateRank(this.list[i])
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
        highlight: function(i) {
            if (i < 10) {
                return "t1";
            } else if (i >= 10 && i < 20) {
                return "t2";
            } else if (i >= 20 && i < 30) {
                return "t3";
            }
        },
    },
    mounted: function() {
        this.loadRank();
    },
};
</script>

<style lang="less">
@import "../assets/css/rank.less";
</style>
