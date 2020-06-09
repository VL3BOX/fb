<template>
    <div class="m-archive">
        <!-- 排序 -->
        <div class="m-archive-order">
            <a
                :href="publish_url"
                class="u-publish el-button el-button--primary el-button--small"
                >+ 发布副本攻略</a
            >
            <div class="u-filter" :class="{ on: filter_visible }">
                <span class="u-label" @click="showFilter">
                    <span class="u-current-filter"
                        >筛选 : {{ currentMark || "全部" }}</span
                    >
                    <span class="u-toggle">
                        <i class="el-icon-arrow-down"></i>
                        <i class="el-icon-arrow-up"></i>
                    </span>
                </span>
                <span class="u-options">
                    <span
                        class="u-mode u-all"
                        :class="{ on: mark == '' }"
                        @click="filterMark('')"
                        ><i class="el-icon-s-operation"></i> 全部</span
                    >
                    <span
                        class="u-mode u-newbie"
                        :class="{ on: mark == 'newbie' }"
                        @click="filterMark('newbie')"
                        ><i class="el-icon-user"></i> 新手易用</span
                    >
                    <span
                        class="u-mode u-advanced"
                        :class="{ on: mark == 'advanced' }"
                        @click="filterMark('advanced')"
                        ><i class="el-icon-data-line"></i> 进阶推荐</span
                    >
                    <span
                        class="u-mode u-recommended"
                        :class="{ on: mark == 'recommended' }"
                        @click="filterMark('recommended')"
                        ><i class="el-icon-star-off"></i> 编辑精选</span
                    >
                    <span
                        class="u-mode u-geek"
                        :class="{ on: mark == 'geek' }"
                        plain
                        @click="filterMark('geek')"
                        ><i class="el-icon-medal-1"></i> 骨灰必备</span
                    >
                </span>
            </div>
            <div class="u-modes" :class="{ on: order_visible }">
                <span class="u-label" @click="showOrder">
                    <span class="u-current-order"
                        >排序 : {{ currentOrder || "最后更新" }}</span
                    >
                    <span class="u-toggle">
                        <i class="el-icon-arrow-down"></i>
                        <i class="el-icon-arrow-up"></i>
                    </span>
                </span>
                <span class="u-options">
                    <span
                        class="u-mode u-update"
                        :class="{ on: order == 'update' }"
                        @click="reorder('update')"
                        ><i class="el-icon-refresh"></i> 最后更新</span
                    >
                    <span
                        class="u-mode u-podate"
                        :class="{ on: order == 'podate' }"
                        @click="reorder('podate')"
                        ><i class="el-icon-sort"></i> 最早发布</span
                    >
                </span>
            </div>
        </div>
        <div class="m-archive-list m-fb-list" v-if="data.length">
            <ul class="u-list">
                <li class="u-item" v-for="(item, i) in data" :key="i">
                    <a
                        class="u-banner"
                        :href="item.post.ID | postLink"
                        :target="target"
                        ><img :src="showBanner(item.post.post_banner)"
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
                            >{{ item.post.post_title }}</a
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
                                >
                                    {{ c }}
                                </b>
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
        <el-alert
            v-else
            class="m-archive-null"
            title="没有找到相关条目"
            type="info"
            center
            show-icon
        >
        </el-alert>
        <el-button
            class="m-archive-more"
            :class="{ show: hasNextPage }"
            type="primary"
            :loading="loading"
            @click="appendPage(++page)"
            >加载更多</el-button
        >
        <el-pagination
            class="m-archive-pages"
            background
            :hide-on-single-page="true"
            @current-change="changePage"
            :current-page.sync="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
import lodash from "lodash";
import { getPosts } from "../service/getPost";
import dateFormat from "../utils/dateFormat";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box";
import {
    showAvatar,
    authorLink,
    showMinibanner,
    publishLink,
    buildTarget,
} from "@jx3box/jx3box-common/js/utils";
const mark_map = {
    newbie: "新手易用",
    advanced: "进阶推荐",
    recommended: "编辑精选",
    geek: "骨灰必备",
};
const order_map = {
    update : '最后更新',
    podate : '最早发布',
    favs : '收藏最多',
    likes : '点赞最多',
    downs : '下载最多'
}
export default {
    name: "List",
    props: [],
    data: function() {
        return {
            loading: false, //加载状态

            subtype: "",

            data: [], //数据列表
            page: 1, //当前页数
            total: 1, //总条目数
            pages: 1, //总页数
            per: 10, //每页条目
            order: "", //排序模式
            mark: "", //筛选模式

            filter_visible: false,
            order_visible : false
        };
    },
    computed: {
        params: function() {
            let params = {
                per: this.per,
                subtype: this.subtype,
            };
            if (this.search) {
                params[this.searchType] = this.search;
            }
            if (this.order) {
                params.order = this.order;
            }
            if (this.mark) {
                params.mark = this.mark;
            }
            return params;
        },
        currentMark: function() {
            return mark_map[this.mark];
        },
        currentOrder : function (){
            return order_map[this.order]
        },
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
        target: function() {
            return buildTarget();
        },
        publish_url: function(val) {
            return publishLink("house");
        },

        defaultBanner: function() {
            return (
                __ossMirror +
                this.$store.state.map[this.$store.state.zlp]["dungeon"][
                    this.$store.state.fb
                ]["icon"]
            );
        },
    },
    methods: {
        loadPosts: function(i = 1, append = false) {
            let query = Object.assign(this.params, {
                page: i,
            });
            this.loading = true;
            getPosts(query, this)
                .then((res) => {
                    if (append) {
                        this.data = this.data.concat(res.data.data.list);
                    } else {
                        window.scrollTo(0, 0);
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
            this.loadPosts(i);
        },
        appendPage: function(i) {
            this.loadPosts(i, true);
        },
        filterMark: function(val) {
            this.mark = val;
            this.filter_visible = false;
            this.loadPosts();
        },
        reorder: function(val) {
            this.order = val;
            this.order_visible = false;
            this.loadPosts();
        },
        showFilter: function() {
            this.filter_visible = !this.filter_visible;
        },
        showOrder : function (){
            this.order_visible = !this.order_visible;
        },

        
        showBanner: function(val) {
            return val ? showMinibanner(val) : this.defaultBanner;
        },
        format: function(parent, key) {
            let val = lodash.get(parent, key);
            if (val && val.length) {
                return val;
            } else {
                return [];
            }
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
        showAvatar: function(val) {
            return showAvatar(val);
        },
        authorLink: function(val) {
            return authorLink(val);
        },
        postLink: function(val) {
            return "./?pid=" + val;
        },
        isHighlight: function(val) {
            return val ? `color:${val};font-weight:600;` : "";
        },
        showMark: function(val) {
            return mark_map[val];
        },
    },
    mounted: function() {
        let params = new URLSearchParams(location.search);
        this.subtype = params.get("fb_name");
        this.loadPosts(1);
    },
    components: {
        
    },
};
</script>

<style lang="less">
@import "../assets/css/list.less";
</style>
