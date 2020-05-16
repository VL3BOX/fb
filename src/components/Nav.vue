<template>
    <nav class="m-fb-nav">
        <div class="m-nav-search" @click="stopPop">
            <el-input placeholder="搜索副本或首领名称" v-model="search" clearable>
            </el-input>
        </div>

        <div class="m-nav-group" v-for="(group, key) in map" :key="key">
            <h2 class="u-category active">
                <span class="u-title">{{ key }}</span>
                <em class="u-level">({{ group.level }})</em>
            </h2>
            <ul class="u-list">
                <li
                    v-for="(item, subkey) in group.dungeon"
                    :key="subkey"
                    class="u-item"
                    :class="{ active: isActive(subkey), hidden: isHide(subkey) }"
                >
                    <a :href="url(group.name, item.name)">{{ item.name }}</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Nav",
    data: function() {
        return {
            map: this.$store.state.map,
            search: "",
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
                    __.push(fbname);
                    for (let boss of fb.detail.boss_infos) {
                        __.push(boss.name);
                    }

                    search_map[fbname] = __
                }
            }
            return search_map;
        },
    },
    methods: {
        url: function(zlp, fb) {
            return `/fb/?fb_zlp=${zlp}&fb_name=${fb}`;
        },
        isActive: function(subkey) {
            let params = new URLSearchParams(location.search);
            let current = params.get("fb_name");
            return current == subkey;
        },
        isHide: function(subkey) {
            if (!this.search) return;
            if(this.searchMap[subkey].includes(this.search)){
                return false
            }else{
                for(let key of this.searchMap[subkey]){
                    if(key.includes(this.search)){
                        return false
                    }
                }
            }
            return true
        },
        stopPop: function(e) {
            e.stopPropagation();
        },
    },
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/nav.less";
</style>
