<template>
    <div class="m-archive" v-loading="loading">
        <listbox
            :data="data"
            :total="total"
            :pages="pages"
            :per="per"
            :page="page"
            @appendPage="appendPage"
            @changePage="changePage"
        >
            <template slot="filter">
                <a
                    :href="publish_url"
                    class="u-publish el-button el-button--primary el-button--small"
                    >+ 发布副本攻略</a
                >
                <!-- 角标过滤 -->
                <markBy @filter="filter"></markBy>
                <!-- 排序过滤 -->
                <orderBy @filter="filter"></orderBy>
            </template>
            <!-- 搜索 -->
            <div class="m-archive-search" slot="search-after">
                <el-input
                    placeholder="请输入搜索内容"
                    v-model="search"
                    class="input-with-select"
                >
                    <span slot="prepend">关键词</span>
                    <!-- <el-select
                        v-model="searchType"
                        slot="prepend"
                        placeholder="请选择"
                        @change="loadPosts"
                    >
                        <el-option label="标题" value="title"></el-option>
                        <el-option label="作者" value="authorname"></el-option>
                    </el-select> -->
                    <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>
            </div>
            <div class="m-archive-list m-fb-list" v-if="data.length">
                <ul class="u-list">
                    <li class="u-item" v-for="(item, i) in data" :key="i">
                        <a
                            class="u-banner"
                            :href="item.post.ID | postLink"
                            :target="target"
                            ><img :src="showBanner(item)"
                        /></a>

                        <h2 class="u-post" :class="{ isSticky: item.post.sticky }">
                            <img
                                class="u-icon"
                                svg-inline
                                src="../assets/img/post.svg"
                            />
                            <a
                                class="u-title"
                                :style="item.post.color | isHighlight"
                                :href="item.post.ID | postLink"
                                :target="target"
                                >{{ item.post.post_title || '无标题' }}</a
                            >
                            <span
                                class="u-marks"
                                v-if="item.post.mark && item.post.mark.length"
                            >
                                <i
                                    v-for="mark in item.post.mark"
                                    class="u-mark"
                                    :key="mark"
                                    >{{ mark | showMark }}</i
                                >
                            </span>
                        </h2>

                        <div class="u-content">
                            <div
                                class="u-metalist u-boss-list"
                                v-if="
                                    item.post.post_meta &&
                                        item.post.post_meta.fb_boss
                                "
                            >
                                <strong>首领</strong>
                                <em>
                                    <b
                                        v-for="(c, i) in format(
                                            item.post,
                                            'post_meta.fb_boss'
                                        )"
                                        :key="i"
                                    >{{ c }}</b>
                                </em>
                            </div>

                            <div
                                class="u-metalist u-mode-list c-jx3fb-mode"
                                v-if="
                                    item.post.post_meta &&
                                        item.post.post_meta.fb_level
                                "
                            >
                                <strong>模式</strong>
                                <em>{{
                                    format(item.post, "post_meta.fb_level") + ""
                                }}</em>
                            </div>
                        </div>

                        <div class="u-misc">
                            <span class="u-author">
                                <img
                                    class="u-author-avatar"
                                    :src="item.author.avatar | showAvatar"
                                    :alt="item.author.name"
                                />
                                <a
                                    class="u-author-name"
                                    :href="item.author.uid | authorLink"
                                    target="_blank"
                                    >{{ item.author.name }}</a
                                >
                            </span>
                            <span class="u-date">
                                Updated on
                                <time>{{
                                    item.post.post_modified | dateFormat
                                }}</time>
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
        </listbox>
    </div>
</template>

<script>
import listbox from "@jx3box/jx3box-page/src/cms-list.vue";
import { cms as mark_map } from "@jx3box/jx3box-common/js/mark.json";
import _ from "lodash";
import { getPosts } from "../service/getPost";
import dateFormat from "../utils/dateFormat";
import { __ossMirror,__imgPath } from "@jx3box/jx3box-common/js/jx3box";
import {
    showAvatar,
    authorLink,
    showMinibanner,
    publishLink,
    buildTarget,
    getAppType
} from "@jx3box/jx3box-common/js/utils";
export default {
    name: "list",
    props: [],
    data: function() {
        return {
            loading: false, //加载状态

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 15, //每页条目
            appendMode : false, //追加模式

            order: "", //排序模式
            mark: "", //筛选模式

            search: "",
            searchType: "title",

            subtype: "",
        };
    },
    computed: {
        params: function() {
            let params = {
                per: this.per,
                subtype: this.subtype,
                page : ~~this.page || 1
            };
            if (this.search) {
                params.search = this.search;
            }
            if (this.order) {
                params.order = this.order;
            }
            if (this.mark) {
                params.mark = this.mark;
            }
            return params;
        },
        target: function() {
            return buildTarget();
        },
        publish_url: function(val) {
            return publishLink("fb");
        },
    },
    methods: {
        loadPosts: function() {
            this.loading = true;
            getPosts(this.params, this)
                .then((res) => {
                    if (this.appendMode) {
                        this.data = this.data.concat(res.data.data.list);
                    } else {
                        this.data = res.data.data.list;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.pages;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changePage: function(i) {
            this.appendMode = false
            this.page = i
            window.scrollTo(0, 0);
        },
        appendPage: function(i) {
            this.appendMode = true
            this.page = i
        },
        filter: function(o) {
            this.appendMode = false
            this[o["type"]] = o["val"];
        },
        showBanner: function(item) {
            let banner = item.post.post_banner
            return banner ? showMinibanner(banner) : this.showDefaultBanner(item);
        },
        showDefaultBanner : function (item){
            let zlp = _.get(item,'post.post_meta.fb_zlp') || this.$store.state.default_zlp
            let fb = _.get(item,'post.post_subtype') || this.$store.state.default_fb
            let img = _.get(this.$store,`state.map.${zlp}.dungeon.${fb}.icon`)
            if(img){
                return __imgPath + img 
            }else{
                return __imgPath + 'image/fb_map_thumbnail/null.png'
            }
        },
        format: function(parent, key) {
            let val = _.get(parent, key);
            if (val && val.length) {
                return val;
            } else {
                return ['全部'];
            }
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
        showAvatar,
        authorLink,
        postLink: function(val) {
            // return "./?pid=" + val;
            return location.origin + '/' + getAppType() + '/' + val;
        },
        isHighlight: function(val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function(val) {
            return mark_map[val];
        },
    },
    watch : {
        params : {
            deep : true,
            handler : function (){
                this.loadPosts()
            }
        },
        '$route.query.page' : function (val){
            this.page = ~~val
        }
    },
    created: function() {
        let params = new URLSearchParams(location.search);
        this.subtype = params.get("fb_name");
        this.page = ~~this.$route.query.page || 1
        this.loadPosts()
    },
    components: {
        listbox,
    },
};
</script>

<style lang="less">
@import "../assets/css/list.less";
</style>
