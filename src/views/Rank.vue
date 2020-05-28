<template>
    <div class="m-fb-rank" v-if="ready">
        
        <div class="m-fb-rank-tab">
            <el-tabs
                type="card"
                @tab-click="loadRank"
                v-model="active"
            >
                <el-tab-pane
                    v-for="(cid,name) in nav"
                    :label="name"
                    :key="name"
                    :name="name"
                ></el-tab-pane>
            </el-tabs>
        </div>

        <div class="m-fb-rank-box" :loading="loading">
            <h3 class="m-fb-rank-title">剑网3跨区服副本通关百强榜</h3>
            <div class="m-fb-rank-list" v-for="(group, id) in rank" :key="id" v-show="active == id">
                <div class="m-fb-rank-group">
                    <ul class="u-list">
                        <li class="u-th">
                            <span class="u-subblock u-order">排名</span>
                            <span class="u-subblock u-team">队长</span>
                            <span class="u-subblock u-server">服务器</span>
                            <!-- <span class="u-subblock u-member">成员名单</span> -->
                            <span class="u-subblock u-date">达成时间</span>
                            <span class="u-subblock u-cost">击杀用时</span>
                        </li>
                        <li v-for="(item, i) in group" :key="i">
                            <span class="u-subblock u-order" :class="highlight(i)">{{
                                i + 1
                            }}</span>
                            <span class="u-subblock u-team">{{ item.Role }}</span>
                            <span class="u-subblock u-server">{{ item.Server }}</span>
                            <!-- <span class="u-subblock u-member">成员名单</span> -->
                            <time class="u-subblock u-date"
                                >达成时间 : <b class="u-important">{{
                                    item.finishTime | format
                                }}</b></time
                            >
                            <time class="u-subblock u-cost"
                                >用时 : <b class="u-important u-big">{{
                                    item.fightTime | costFormat
                                }} </b
                                ></time
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
import { getDateRank } from "../service/getRank";
import moment, { fn } from "moment";
import rankmap from "../assets/js/rank.json";
// import mock from '../mock/rank.json'

export default {
    name: "Rank",
    props: [],
    data: function() {
        return {
            active: "",
            rank: {},
            loading: false,
            ready:false
        };
    },
    computed: {
        fb: function() {
            return this.$store.state.fb;
        },
        nav : function (){
            return rankmap[this.fb]
        },
        labels : function (){
            return Object.keys(this.nav)
        },
        values : function (){
            return Object.values(this.nav)
        },
        first : function (){
            return this.labels[0]
        }
    },
    filters: {
        format: function(val) {
            return moment(val * 1000).format("YYYY-MM-DD HH:mm:ss");
        },
        costFormat : function (val){
            let s = val / 1000
            return ~~(s/60) + '分' + ~~(s%60) + '秒'
        }
    },
    methods: {
        loadRank: function() {

            // 状态设置
            this.loading = true;

            // 已请求
            if (this.rank[this.active]) {
                this.loading = false;
                return;
            }

            // 新请求
            let cid = this.nav[this.active];
            return getDateRank(cid)
                .then((res) => {
                    this.$set(this.rank,this.active,res.data.data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    this.loading = false;
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
        if (this.nav) {
            this.active = this.first
            this.loadRank().then(() => {
                this.ready = true
            })
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/rank.less";
</style>
