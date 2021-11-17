<template>
    <div class="m-fb-story" v-loading="loading">
        <el-tabs v-model="map_id" type="card" v-if="data && data.length">
            <el-tab-pane
                v-for="item in data"
                :label="item.Layer3Name"
                :key="item.MapID"
                :name="String(item.MapID)"
            >
                <div class="m-story-basic">
                    <el-divider content-position="left">基本信息</el-divider>
                    <el-descriptions :column="3" border>
                        <el-descriptions-item label="名称">{{item.OtherName}}</el-descriptions-item>
                        <el-descriptions-item label="地图ID">{{item.MapID}}</el-descriptions-item>
                        <el-descriptions-item
                            label="资料片"
                        >Level.{{item.DivideLevel}}／{{item.DivideName}}／{{item.VersionName}}</el-descriptions-item>
                        <el-descriptions-item label="最低等级要求">{{item.MinLevel}}</el-descriptions-item>
                        <el-descriptions-item label="入口" :span="2">{{item.EnterWay}}</el-descriptions-item>
                        <el-descriptions-item label="简介">{{item.Introduction | formartIntroduction}}</el-descriptions-item>
                    </el-descriptions>
                </div>
                <div class="m-story-boss">
                    <el-divider content-position="left">首领传说</el-divider>
                    <div class="u-list" v-if="boss_list && boss_list.length">
                        <div class="u-boss" v-for="(boss, i) in boss_list" :key="i">
                            <h5 class="u-name">
                                <img class="u-boss-icon" svg-inline src="../assets/img/skull.svg" />
                                {{ boss.BOSS }}
                            </h5>
                            <p class="u-boss-detail" v-html="boss.Introduce"></p>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
        <el-alert title="未找到相关信息" type="info" show-icon v-else></el-alert>
    </div>
</template>

<script>
import { __ossMirror } from "@jx3box/jx3box-common/data/jx3box";
import { getInfo, getBoss } from "@/service/getStory.js";
import { extractTextContent } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Story",
    props: [],
    data: function () {
        return {
            map_id: "",
            data: "",
            boss_list: "",
            loading: false,
        };
    },
    computed: {
        fb: function () {
            return this.$route.query.fb_name || this.$store.state.default_fb;
        },
        client: function () {
            return this.$store.state.client;
        },
        map_cover: function () {
            return __ossMirror + "pic/map/map_" + this.mapid + "_0.png";
        },
    },
    methods: {
        loadData: function () {
            this.loading = true;
            getInfo(this.fb, this.client)
                .then((res) => {
                    this.data = res?.data || [];
                    this.map_id = String(this.data?.[0]?.["MapID"]);
                    return this.map_id;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
    watch: {
        fb: function () {
            this.loadData();
        },
        map_id: function (id) {
            if (id) {
                this.loading = true;
                getBoss(id, this.client)
                    .then((res) => {
                        this.boss_list = res?.data || [];
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
    },
    filters: {
        formartIntroduction: function (str) {
            return extractTextContent(str)?.[0]?.text;
        },
    },
    mounted: function () {
        this.loadData();
    },
};
</script>

<style lang="less">
@import "../assets/css/story.less";
</style>
