<template>
    <div class="m-fb-nav m-fb-list-nav">
        <RightSideMsg class="u-group">
            <em>全服团长交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=nzOIpVGI" v-if="client == 'origin'">528707506</a>
                <a href="https://jq.qq.com/?_wv=1027&k=HZdXPmZe" v-else>785597424</a>
            </strong>
        </RightSideMsg>

        <!-- <div class="m-nav-link">
            <a class="el-button el-button--primary el-button--mini is-plain" href="/rank" target="_blank">
                <i class="el-icon-trophy"></i>
                <span>秘境百强</span>
            </a>
            <a class="el-button el-button--primary el-button--mini is-plain" href="/team" target="_blank">
                <i class="el-icon-user"></i>
                <span>团队管理</span>
            </a>
        </div> -->

        <div class="m-nav-search" @click.stop>
            <el-input placeholder="搜索副本或首领名称" v-model="search" clearable></el-input>
        </div>

        <div class="m-nav-group" v-for="(group, key) in map" :key="key">
            <h2 class="u-category active" v-show="!search">
                <span class="u-title">🍄 {{ key }}</span>
                <em class="u-level">({{ group.level }})</em>
            </h2>
            <ul class="u-list">
                <li
                    v-for="(item, subkey) in group.dungeon"
                    :key="subkey"
                    class="u-item"
                    :class="{
                        active: isActive(subkey,group),
                        hidden: isHide(subkey),
                    }"
                >
                    <router-link class="u-link" :to="{ query: { fb_zlp: group.name, fb_name: subkey } }">{{ item.name }}</router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "list",
    props: [],
    data: function() {
        return {
            search: "",
            map: this.$store.state.map,
            searchBelong: [],
        };
    },
    computed: {
        searchMap: function() {
            let search_map = {};
            for (let group in this.map) {
                let fbs = this.map[group]["dungeon"];
                for (let fbname in fbs) {
                    let fb = fbs[fbname];

                    // 副本单元信息
                    let __ = [];
                    __.push(group);
                    __.push(fbname);
                    for (let boss of fb.boss) {
                        __.push(boss);
                    }

                    search_map[fbname] = __;
                }
            }
            return search_map;
        },
        client: function() {
            return this.$store.state.client;
        },
    },
    methods: {
        url: function(zlp, fb) {
            return `/fb/?fb_zlp=${zlp}&fb_name=${fb}` + "#" + this.$route.path;
        },
        isActive: function(subkey,group) {
            // let params = new URLSearchParams(location.search);
            // let current = params.get("fb_name");
            let current = this.$route.query.fb_name;
            let zlp = this.$route.query.fb_zlp
            return current == subkey && group.name == zlp;
        },
        isHide: function(subkey) {
            if (!this.search) return;
            if (this.searchMap[subkey].includes(this.search)) {
                return false;
            } else {
                for (let key of this.searchMap[subkey]) {
                    if (key.includes(this.search)) {
                        return false;
                    }
                }
            }
            return true;
        },
    },
    watch: {
        "$route.query.fb_zlp": function(val) {
            this.$store.state.zlp = val;
        },
        "$route.query.fb_name": function(val) {
            this.$store.state.fb = val;
        },
    },
};
</script>

<style lang="less">
@import "../../assets/css/nav.less";
</style>
