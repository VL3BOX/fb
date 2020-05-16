<template>
    <div class="m-single-box m-fb-single" v-if="!loading" :loading="loading">
        <header class="m-single-header">
            <div class="m-single-title">
                <!-- 标题 -->
                <a class="u-title u-sub-block" :href="url">{{
                    post.post_title
                }}</a>
            </div>

            <div class="m-single-info">
                <!-- 用户名 -->
                <div class="u-author u-sub-block">
                    <i class="u-icon-author2"
                        ><img svg-inline src="../assets/img/author.svg"
                    /></i>
                    <a class="u-name" :href="authorLink">{{author.name}}</a>
                </div>

                <!-- 发布日期 -->
                <span
                    class="u-podate u-sub-block"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="发布日期"
                >
                    <i class="u-icon-podate"
                        ><img svg-inline src="../assets/img/podate.svg"
                    /></i>
                    <time>{{ post.post_date | dateFormat }}</time>
                </span>

                <!-- 最后更新时间 -->
                <span
                    class="u-modate u-sub-block"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="最后更新"
                >
                    <i class="u-icon-modate"
                        ><img svg-inline src="../assets/img/modate.svg"
                    /></i>
                    <time>{{ post.post_modified | dateFormat }}</time>
                </span>

                <!-- 阅读次数 -->
                <span class="u-views u-sub-block">
                    <i class="u-icon-views"></i>
                    <span></span>
                </span>
            </div>

            <div class="m-single-meta">
            <li>
                <em class="u-label">首领</em>
                <div class="u-value u-boss-list">
                    {{ meta.fb_boss.toString() }}
                </div>
            </li>
            <li>
                <em class="u-label">模式</em>
                <div class="u-value u-mode-list c-jx3fb-mode">
                    {{ meta.fb_level.toString() }}
                </div>
            </li>
        </div>
        </header>

        <div class="m-single-prepend">
            <!-- <el-divider content-position="left">作者摘要</el-divider> -->
            <div class="m-single-excerpt" v-if="post.post_excerpt">
                {{ post.post_excerpt }}
                <Mark class="u-mark" value="作者摘要"/>                
            </div>
        </div>

        <div class="m-single-post">
            <div class="m-single-content">
                <div class="c-article" v-html="post.post_content"></div>
            </div>
        </div>

        <div class="m-single-comment">
            <el-divider content-position="left">评论</el-divider>
            <Comment :post-id="id"/>
        </div>
    </div>
</template>

<script>
import { getPost } from "../service/getPost";
import dateFormat from "../utils/dateFormat";


// import '@jx3box/jx3box-article-ui/dist/css/article.css'

export default {
    name: "single",
    props: [],
    data: function() {
        return {
            post: {},
            setting: {},
            meta: {},
            author : {},
            loading: true,
            url : location.href,
        };
    },
    computed: {
        authorLink : function (){
            return '/author/?uid=' + this.author.uid
        },
        id : function (){
            return this.$store.state.pid
        }
    },
    methods: {},
    filters: {
        dateFormat: function(val) {
            return dateFormat(new Date(val));
        },
    },
    mounted: function() {
        if(this.$store.state.pid){
            getPost(this.$store.state.pid).then((res) => {
                this.post = res.data.data.post;
                this.setting = res.data.data.post;
                this.meta = res.data.data.post.post_meta;
                this.author = res.data.data.author
                this.$store.state.post = res.data.data

                this.$store.state.postloaded = true
                this.loading = false;
            });
        }
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
</style>

<!-- <Comment post-id="100"/> -->
