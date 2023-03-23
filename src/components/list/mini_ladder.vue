<template>
    <div class="m-team-ladder-mini">
        <h3 class="m-ladder-title">
            <span class="u-title">
                <img class="u-icon" svg-inline :src="getAppIcon('rank')" /> 天梯榜
            </span>
            <a class="u-more" target="_blank" :href="getLink('rank', zlp)">查看更多<i class="el-icon-d-arrow-right"></i></a>
        </h3>
        <div class="m-ladder-select" v-loading="loading">
            <el-select v-model="zlp" placeholder="请选择" size="medium" class="u-select">
                <el-option v-for="item in zlps" :key="item.ID" :label="item.name" :value="item.ID"></el-option>
            </el-select>
            <div class="m-ladder-rank">
                <ul>
                    <li v-for="(item, j) in teams" :key="item.ID">
                        <a :href="getLink('org', item.team_id)" class="u-link" target="_blank">
                            <span class="u-order" :class="highlight(j)">{{ j + 1 }}</span>
                            <!-- <img :src="getThumbnail(item.team_logo)" alt="" class="u-img"> -->
                            <span class="u-team">{{ item.team_name }}</span>
                            <span class="u-serve">@{{ item.server }}</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
import { getLink } from "@jx3box/jx3box-common/js/utils";
import { getThumbnail } from "@jx3box/jx3box-common/js/utils";
//百强榜赛季名称接口
import { getEvents } from "@/service/getEvent.js";
import { getTeams } from "@/service/getTeam.js";
export default {
    name: "MiniLadder",
    components: {

    },
    props: [],
    data: function () {
        return {
            zlp: 6,
            zlps: [],//存储赛季列表
            teams: [],//存储团队列表
            loading: true
        };
    },
    computed: {

    },
    methods: {
        loadData: function () {
            //获取赛季列表(暂时去除群侠万变)
            this.loading = true;
            getEvents(this.params).then((res) => {
                this.zlps = res.data.data.list.slice(1, 6);
            });
            //获取团队列表
            getTeams(this.params).then((res) => {
                //取前10个团队
                this.teams = res.data.data.slice(0, 10)
                this.loading = false
            });
        },
        getAppIcon,
        getLink,
        getThumbnail,
        highlight: function (i) {
            if (i == 0) {
                return "t1";
            } else if (i == 1) {
                return "t2";
            } else if (i == 2) {
                return "t3";
            }
        },
    },
    filters: {

    },
    watch: {
        params: function () {
            this.loadData();
        },
        zlp: function (val) {
            this.loading = true;
            let achieveId = this.zlps[6 - val].boss_map.at(-1).achievement_id;
            //通过获得的成就ID请求团队列表(西津渡BOSS排序需修改)
            getTeams(this.params, achieveId, val).then((res) => {
                this.teams = res.data.data
                this.loading = false
            });
        }
    },
    mounted: function () {
        this.loadData();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/ladder.less";
</style>
