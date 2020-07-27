<template>
    <div class="m-fb-gem" v-loading="loading">
        <el-input
            class="m-gem-search"
            placeholder="请输入关键词"
            v-model="search"
            @change="loadPosts"
        >
            <template slot="prepend">关键词</template>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>

        <div class="m-gem-list" v-if="data.length">
            <a
                class="m-gem-item"
                v-for="(item, i) in data"
                :href="item.Link"
                :key="i"
                target="_blank"
            >
                <img class="u-icon" :src="item.IconID | icon" />
                <span class="u-title">{{ item.Name }}</span>
                <span class="u-desc" v-html="item.DescHtml"></span>
                <!-- <span class="u-drops">
                    <span
                        class="u-drop"
                        v-for="(drop, i) in item._drops"
                        :key="i"
                    >
                        {{ drop }}
                    </span>
                </span> -->
                <span class="u-id">UUID:{{item.UiID}}</span>
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
import { getGemlist, searchItem } from "../service/getGem";
import { __ossMirror, __iconPath,__ossRoot } from "@jx3box/jx3box-common/js/jx3box";
export default {
    name: "Gem",
    props: [],
    data: function() {
        return {
            data: [],
            total: 0,
            page: 1,
            pages: 1,
            per: 15,
            loading: true,
            search: "",
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
            return __iconPath + "icon/" + id + ".png";
        },
    },
    methods: {
        loadPosts: function(i = 1, append = false) {
            this.loading = true;
            if (this.search) {
                searchItem(this.search, i)
                    .then((res) => {
                        let data = [];
                        if (append) {
                            data = this.data.concat(res.data.data.data);
                        } else {
                            data = res.data.data.data;
                        }
                        this.data = data;

                        this.total = res.data.data.total;
                        this.pages = res.data.data.last_page;

                        if (!append) {
                            window.scrollTo(0, 0);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else {
                getGemlist(this.fb, i)
                    .then((res) => {
                        let data = [];
                        if (append) {
                            data = this.data.concat(res.data.data.data);
                        } else {
                            data = res.data.data.data;
                        }
                        // console.log(data)
                        // for (let item of data) {
                        //     item._desc = this.getDesc(item.Desc);
                        //     item._drops = this.getDrops(item.Desc);
                        // }
                        this.data = data;

                        this.total = res.data.data.total;
                        this.pages = res.data.data.last_page;

                        if (!append) {
                            window.scrollTo(0, 0);
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            }
        },
        changePage: function(i = 1) {
            this.loadPosts(i);
        },
        appendPage: function(i) {
            this.loadPosts(i, true);
        },
        getDesc: function(str) {
            const RE = /使用(.*?)装备。/;
            let result = RE.exec(str);
            return result[0];
        },
        getDrops: function(str) {
            const RE = /\[(.*?)\]/g;
            let result = str.match(RE) || [];
            return result;
        },
    },
    created: function() {
        this.changePage();
    },
};
</script>

<style lang="less">
@import "../assets/css/gem.less";
</style>
