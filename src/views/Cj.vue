<template>
    <div class="m-fb-cj" v-loading="loading">
        <div class="m-cj-list" v-if="data.length">
            <a
                class="m-cj-item"
                v-for="(item, i) in data"
                :href="item.ID | url"
                :key="i"
                target="_blank"
            >
                <img class="u-icon" :src="item.IconID | icon" />
                <span class="u-title">{{ item.Name }}</span>
                <span class="u-desc"
                    >{{ item.BossName }} · {{ item.ShortDesc }}</span
                >
                <i class="u-point"
                    ><img src="../assets/img/point.png" />{{ item.Point }}</i
                >
            </a>
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
            :page-size.sync="per"
            layout="total, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
import { getCJ } from "../service/getCJ";
import { __ossMirror,__iconPath,__ossRoot } from "@jx3box/jx3box-common/js/jx3box";
export default {
    name: "Cj",
    props: [],
    data: function() {
        return {
            data: [],
            total: 0,
            page: 1,
            pages: 1,
            loading: true,
            per : 10
        };
    },
    computed: {
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
        fb: function() {
            return this.$store.state.fb;
        },
    },
    filters: {
        icon: function(id) {
            return __ossMirror + "icon/" + id + ".png";
        },
        url : function (id){
            return '/cj/#/view/' + id
        }
    },
    methods: {
        loadPosts: function(i = 1, append = false) {
            this.loading = true;
            getCJ(this.fb, i)
                .then((res) => {
                    if (append) {
                        this.data = this.data.concat(res.data.data.achievements);
                    } else {
                        window.scrollTo(0, 0);
                        this.data = res.data.data.achievements;
                    }
                    this.total = res.data.data.total;
                    this.pages = res.data.data.last_page;
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
    },
    mounted: function() {
        this.changePage(1);
    },
};
</script>

<style lang="less">
@import "../assets/css/cj.less";
</style>
