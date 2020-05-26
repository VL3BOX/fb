<template>
    <div class="m-fb-rank" v-if="rank.length">
        <div class="m-fb-rank-tab">
            <el-tabs
                type="card"
                @tab-click="loadRank"
                v-model="focus"
                v-if="labels"
            >
                <el-tab-pane
                    v-for="(boss, i) in labels"
                    :label="boss"
                    :key="i"
                    :name="i + ''"
                ></el-tab-pane>
            </el-tabs>
        </div>

        <div class="m-fb-rank-box" :loading="loading">
            <div class="m-fb-rank-list" v-for="(group, i) in rank" :key="i">
                <div
                    class="m-fb-rank-group"
                    v-if="focus == i"
                >
                    <h3 class="u-title">剑网3跨区服副本通关百强榜</h3>
                    <ul class="u-list">
                        <li class="u-th">
                            <span class="u-subblock u-order">排名</span>
                            <span class="u-subblock u-team">队长</span>
                            <span class="u-subblock u-server">服务器</span>
                            <!-- <span class="u-subblock u-member">成员名单</span> -->
                            <span class="u-subblock u-date">达成时间</span>
                            <span class="u-subblock u-cost">耗费时间</span>
                        </li>
                        <li v-for="(item, i) in group" :key="i">
                            <span class="u-subblock u-order" :class="highlight(i)">{{
                                i + 1
                            }}</span>
                            <span class="u-subblock u-team">{{ item.Role }}</span>
                            <span class="u-subblock u-server">{{ item.Server }}</span>
                            <time class="u-subblock u-date"
                                >达成时间 : <b class="u-important">{{
                                    item.finishTime | format
                                }}</b></time
                            >
                            <time class="u-subblock u-cost"
                                >用时 : <b class="u-important u-big">{{
                                    item.fightTime
                                }} </b
                                >秒</time
                            >
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <el-alert
        v-else
        class="m-archive-null"
        title="没有找到相关条目"
        type="info"
        center
        show-icon
    >
    </el-alert>
</template>

<script>
// 10人 7503,7504,7505,7506,7507
// 25普通 7514,7515,7516,7517,7518
// 25英雄 7525,7526,7527,7528,7529
import { getDateRank, getMiniRank } from "../service/getRank";
import moment, { fn } from "moment";
import rankmap from "../assets/js/rank.json";
// import mock from '../mock/rank.json'

export default {
    name: "Rank",
    props: [],
    data: function() {
        return {
            focus: 0,
            rank: [],
            loading: false,
        };
    },
    computed: {
        fb: function() {
            return this.$store.state.fb;
        },
        labels: function() {
            return rankmap[this.fb] && Object.keys(rankmap[this.fb]);
        },
        values: function() {
            return rankmap[this.fb] && Object.values(rankmap[this.fb]);
        },
    },
    filters: {
        format: function(val) {
            return moment(val).format("YYYY-MM-DD HH:mm:ss");
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
            getDateRank(this.values[i])
                .then((res) => {
                    this.rank.splice(i, 1, res.data.data);
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
        if (this.labels) this.loadRank();
    },
};
</script>

<style lang="less">
@import "../assets/css/rank.less";
</style>
