<template>
    <singlebox :post="post" :author="author" :stat="stat" v-loading="loading">
        <div class="u-meta u-sub-block" slot="single-header">
            <em class="u-label">副本</em>
            <span class="u-value">
                {{ post_subtype }}
            </span>
        </div>
    </singlebox>
</template>

<script>
import singlebox from "@jx3box/jx3box-page/src/cms-single";
import { getPost } from "../service/getPost.js";
import { getStat, postStat } from "@jx3box/jx3box-common/js/stat";
import _ from 'lodash'
export default {
    name: "single",
    props: [],
    data: function() {
        return {
            loading: false,
            post: {},
            author: {},
            stat: {},
        };
    },
    computed: {
        id: function() {
            return this.$store.state.pid;
        },
        post_subtype: function() {
            return _.get(this.post, "post_subtype") || '未知';
        },
    },
    methods: {
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
                    this.author = this.$store.state.author =
                        res.data.data.author;
                    this.$store.state.status = true;
                })
                .finally(() => {
                    this.loading = false;
                });

            getStat('fb',this.id).then((res) => {
                this.stat = this.$store.state.stat = res.data;
            });
            postStat('fb',this.id);
        }
    },
    components: {
        singlebox,
    },
};
</script>

<style lang="less">
@import "../assets/css/single.less";
</style>
