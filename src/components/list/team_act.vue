<template>
    <div class="m-team-act-mini">
        <h3 class="m-act-title">
            <span class="u-title">
                <img class="u-icon" svg-inline :src="getAppIcon('team')" /> 团队招募
            </span>
            <span class="u-more" @click="viewMore">查看更多<i class="el-icon-d-arrow-right"></i></span>
        </h3>
        <div class="m-tab">
            <span :class="{ 'u-tab': true, 'is-active': tab == 'act' }" @click="actTab">活动</span>
            <span :class="{ 'u-tab': true, 'is-active': tab == 'team' }" @click="teamTab">团队</span>
        </div>
        <div class="m-act-info-null" v-show="tab == 'act'" v-if="acts.length == 0"><span>暂无团队活动</span></div>
        <div class="m-act-info" v-show="tab == 'act'" v-else v-for="(item, key) in acts" :key="key"
            @click="viewDetail(item.id)">
            <img :src="item.team_logo" alt="" class="u-img">
            <div class="u-act-title">
                <span>【{{ item.team_name }}】{{ item.name }}</span>
            </div>
            <div class="u-detail">
                <span>服务器:@{{ item.server }}</span>
            </div>
            <div class="u-detail">
                <span class="u-date">{{ item.start_time | showRaidMonth }}月{{ item.start_time | showRaidDate
                }}日</span>
                <span class="u-week">({{ item.start_time | showRaidWeek }})</span>
                <!-- <span class="u-today" v-if="isToday(activity.start_time)">★ 今天</span> -->
                <span class="u-time">{{ item.start_time | showRaidTime }}</span>
            </div>
        </div>
        <div class="m-act-info" v-show="tab == 'team'" v-for="(item, key) in teams" :key="key" @click="viewTeam(item.ID)">
            <img :src="item.logo" alt="" class="u-img">
            <div class="u-team-title">
                <span>{{ item.name }}</span>
            </div>
            <div class="u-detail">
                <span>@{{ item.server }}</span>
            </div>
            <div class="u-detail">
                <span class="u-tag" v-for="(tag, key) in item.tags.slice(0, 3)" :key="key">{{ tag }}</span>
            </div>
        </div>

    </div>
</template>

<script>
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
import { getActs, getTeams } from "@/service/getActs.js";
import { moment } from "@jx3box/jx3box-common/js/moment";
export default {
    name: "team_act",
    components: {

    },
    props: [],
    data: function () {
        return {
            tab: 'act',
            acts: [],
            teams: [],
            tabDefault: 'teams'
        };
    },
    computed: {

    },
    methods: {
        loadData: function () {
            //获取活动列表前三个
            getActs(this.params).then((res) => {
                this.acts = res.data.data.list.slice(0, 3);
            });
            getTeams(this.params).then((res) => {
                this.teams = res.data.data.list;
            });
        },
        getAppIcon,
        getActs,
        getTeams,
        teamTab() {
            this.tab = 'team'
        },
        actTab() {
            this.tab = 'act'
        },
        viewMore() {
            //跳转团队页
            window.open("https://www.jx3box.com/team/")
        },
        viewDetail(val) {
            //跳转招募详情
            window.open("https://www.jx3box.com/team/raid/" + val)
        },
        viewTeam(val) {
            //跳转团队详情
            window.open("https://www.jx3box.com/team/org/" + val)
        }
    },
    filters: {
        showRaidTime(d) {
            return moment(d).format("HH:mm");
        },
        showRaidWeek(d) {
            return moment(d).format("dddd");
        },
        showRaidMonth(d) {
            return moment(d).format("MM");
        },
        showRaidDate(d) {
            return moment(d).format("DD");
        },
    },
    watch: {

    },
    mounted: function () {
        this.loadData();
    },
};
</script>

<style lang="less" >
@import "~@/assets/css/team_act.less";
</style>