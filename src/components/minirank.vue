<template>
    <div class="m-fb-rank-mini" v-if="rank.length">
        <h3 class="c-sidebar-right-title">
            <img
                class="u-icon"
                svg-inline
                src="../assets/img/rank.svg"
            />全服排行
        </h3>
        <el-tabs v-model="focus" @tab-click="loadRank">
            <el-tab-pane
                :label="name"
                :name="i + ''"
                v-for="(name, i) in subnav"
                :key="i"
            ></el-tab-pane>
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
                        <span class="u-order">{{ i + 1 }}</span>
                        <span class="u-team">{{ item.Role }}</span>
                        <span class="u-server">{{ item.Server }}</span>
                    </li>
                </ul>
            </div>
        </el-row>
        <!-- <a
            class="u-more el-button el-button--primary is-plain"
            href="/fb/#/rank"
            >&raquo; 查看更多</a
        > -->
    </div>
</template>

<script>
import { getDateRank, getMiniRank } from "../service/getRank";
import moment from "moment";
// import mock from '../mock/rank.json'

export default {
    name: "minirank",
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
    computed: {},
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
    },
    mounted: function() {
        this.loadRank();
    },
    components: {},
};
</script>
