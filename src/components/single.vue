<template>
    <div class="m-single-box m-fb-single" :loading="loading">
        <header class="m-single-header">
            <div class="m-single-title">
                <!-- 标题 -->
                <a class="u-title u-sub-block" :href="url">{{ title }}</a>
            </div>

            <div class="m-single-info">
                <!-- 用户名 -->
                <div class="u-author u-sub-block">
                    <i class="u-icon-author2"
                        ><img svg-inline src="../assets/img/author.svg"
                    /></i>
                    <a class="u-name" :href="authorLink">{{ author.name }}</a>
                </div>

                <div class="u-meta u-sub-block">
                    <em class="u-label">首领</em>
                    <span class="u-value u-boss-list">
                        {{ format(meta, "fb_boss") }}
                    </span>
                </div>

                <div class="u-meta u-sub-block">
                    <em class="u-label">模式</em>
                    <span class="u-value u-mode-list c-jx3fb-mode">
                        {{ format(meta, "fb_level") }}
                    </span>
                </div>

                <!-- 发布日期 -->
                <span class="u-podate u-sub-block" title="发布日期">
                    <i class="u-icon-podate"
                        ><img svg-inline src="../assets/img/podate.svg"
                    /></i>
                    <time>{{ post.post_date | dateFormat }}</time>
                </span>

                <!-- 最后更新时间 -->
                <span class="u-modate u-sub-block" title="最后更新">
                    <i class="u-icon-modate"
                        ><img svg-inline src="../assets/img/modate.svg"
                    /></i>
                    <time>{{ post.post_modified | dateFormat }}</time>
                </span>

                <!-- 查看次数 -->
                <span class="u-views u-sub-block">
                    <i class="el-icon-view"></i>
                    {{ setting.views }}
                </span>

                <!-- 编辑 -->
                <a class="u-edit u-sub-block" :href="editLink" v-if="showEdit">
                    <i class="u-icon-edit el-icon-edit-outline"></i>
                    <span>编辑</span>
                </a>
            </div>
        </header>

        <div class="m-single-prepend">
            <div class="m-single-excerpt" v-if="post.post_excerpt">
                <el-divider content-position="left">Excerpt</el-divider>
                {{ post.post_excerpt }}
                <!-- <Mark class="u-mark" value="作者摘要"/>                 -->
            </div>
        </div>

        <div class="m-single-post">
            <el-divider content-position="left">JX3BOX</el-divider>
            <div class="m-single-content">
                <Article
                    :content="post.post_content"
                    directorybox="#directory"
                />
            </div>
        </div>

        <div class="m-single-append">
            <!-- 操作 -->
            <div class="m-single-panel" v-if="!loading">
                <div class="u-minigroup">
                    <Print class="u-fn" :title="title" :authorID="post.post_author"/>
                    <QRcode class="u-fn" />
                    <Sharing class="u-fn" :title="title" />
                </div>
                <Fav />
            </div>
        </div>

        <div class="m-single-comment">
            <el-divider content-position="left">评论</el-divider>
            <Comment :post-id="id" />
        </div>

        <footer class="m-single-footer">
            <!-- <ins
                class="adsbygoogle"
                style="display:block;max-width:100%;overflow:hidden;margin:10px;"
                data-ad-client="ca-pub-4388499329141185"
                data-ad-slot="1787190081"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins> -->
        </footer>
    </div>
</template>

<script>
import lodash from "lodash";
import { getPost } from "../service/getPost";
import dateFormat from "../utils/dateFormat";
import { __Links } from "@jx3box/jx3box-common/js/jx3box.json";
import { authorLink, editLink } from "@jx3box/jx3box-common/js/utils.js";
import User from "@jx3box/jx3box-common/js/user.js";
import { getStat, postStat } from "../service/stat.js";
import Article from "@jx3box/jx3box-editor/src/Article.vue";
export default {
    name: "single",
    props: [],
    data: function() {
        return {
            post: {},
            setting: {},
            meta: {},
            author: {},
            loading: false,
            url: location.href,
        };
    },
    computed: {
        authorLink: function() {
            return authorLink(this.author.uid);
        },
        editLink: function() {
            return editLink(this.post.post_type, this.post.ID);
        },
        id: function() {
            return this.$store.state.pid;
        },
        showEdit: function() {
            return (
                this.post.post_author == User.getInfo().uid ||
                User.getInfo().group > 60
            );
        },
        title: function() {
            return _.get(this.post, "post_title") || "无标题";
        },
    },
    methods: {
        format: function(parent, key) {
            let val = lodash.get(parent, key);
            if (Array.isArray(val)) {
                return val.toString();
            } else {
                return val;
            }
        },
    },
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
    },
    created: function() {
        if (this.id) {
            this.loading = true;
            getPost(this.id, this)
                .then((res) => {
                    this.post = this.$store.state.post = res.data.data.post;
                    this.meta = this.$store.state.meta =
                        res.data.data.post.post_meta;
                    // this.setting = this.$store.state.setting =
                    //     res.data.data.post;
                    this.author = this.$store.state.author =
                        res.data.data.author;
                    this.$store.state.status = true;
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat(this.id).then((data) => {
                if (data) this.setting = this.$store.state.setting = data;
            });
            postStat(this.id);
        }
    },
    components: {
        Article,
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
</style>
