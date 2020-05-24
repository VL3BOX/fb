<template>
    <div class="m-fb-index">
        <div class="m-archive-list m-fb-list" v-if="data.length">
            <ul class="u-list">
                <li class="u-item" v-for="(item, i) in data" :key="i">
                    <a class="u-banner" :href="'/fb/?pid=' + item.post.ID"
                        ><img :src="buildBanner(item.post.post_banner)"
                    /></a>

                    <h2 class="u-post">
                        <img
                            class="u-icon"
                            svg-inline
                            src="../assets/img/post.svg"
                        />
                        <a
                            class="u-title"
                            :href="'/fb/?pid=' + item.post.ID"
                            target="_blank"
                            >{{ item.post.post_title }}</a
                        >
                    </h2>

                    <div class="u-content">
                        <div class="u-metalist u-boss-list">
                            <strong>首领</strong>
                            <em>
                                <b
                                    v-for="(c, i) in format(item.post,'post_meta.fb_boss')"
                                    :key="i"
                                >
                                    {{ c }}
                                </b>
                            </em>
                        </div>

                        <div class="u-metalist u-mode-list c-jx3fb-mode">
                            <strong>模式</strong>
                            <em>{{
                                format(item.post,'post_meta.fb_level') + ''
                            }}</em>
                        </div>
                    </div>

                    <div class="u-misc">
                        <img class="u-author-avatar" :src="item.author.avatar | showAvatar" :alt="item.author.name">
                        <a class="u-author-name" :href="item.author.uid | authorLink" target="_blank">{{item.author.name}}</a>
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
            :current-page="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
import lodash from 'lodash'
import { getPosts } from "../service/getPost";
import dateFormat from "../utils/dateFormat";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box";
import {showAvatar,authorLink} from '@jx3box/jx3box-common/js/utils'
export default {
    name: "Index",
    props: [],
    data: function() {
        return {
            data: [],
            total: 0,
            page: 1,
            pages: 1,
            loading: true,
            subtype: "",
        };
    },
    computed: {
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
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
        changePage: function(i) {
            this.loading = true;
            getPosts({
                page: i,
                subtype: this.subtype,
            }).then((res) => {
                window.scrollTo(0,0)
                this.data = res.data.data.list;
                this.total = res.data.data.total;
                this.pages = res.data.data.pages;
            }).finally(() => {
                this.loading = false;
            })
        },
        appendPage: function(i) {
            this.loading = true;
            getPosts({
                page: i,
                subtype: this.subtype,
            }).then((res) => {
                this.data = this.data.concat(res.data.data.list);
                this.total = res.data.data.total;
                this.pages = res.data.data.pages;
            }).finally(() => {
                this.loading = false;
            })
        },
        buildBanner: function(val) {
            return val ? val : this.defaultBanner;
        },
        format : function (parent,key){
            let val = lodash.get(parent,key)
            if(val.length){
                return val
            }else{
                return []
            }
        }
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
        showAvatar : function (val){
            return showAvatar(val)
        },
        authorLink : function (val){
            return authorLink(val)
        }
    },
    mounted: function() {
        let params = new URLSearchParams(location.search);
        this.subtype = params.get("fb_name");
        this.changePage(1);
    },
};
</script>

<style lang="less">
@import "../assets/css/index.less";
</style>
