<template>
    <div class="m-info">
        <div class="m-info-notice">
            <!-- <a class="u-item" href="/fb/#/npc">🍭 最新NPC数据上线</a>
            <a class="u-item" href="/fb/#/skill">🍬 最新技能解包上线</a>
            <a class="u-item" href="/fb/#/cj">🍸 同步最新成就条目</a> -->
            <a class="u-item" href="/fb/#/rank">⚽️ 安小逢百强榜已结榜</a>
        </div>

        <div class="m-info-router">
            <router-link to="/"><i class="el-icon-collection"></i></router-link>
            <router-link to="/rank"><i class="el-icon-trophy"></i></router-link>
            <router-link to="/cj"><i class="el-icon-collection-tag"></i></router-link>
            <router-link to="/npc"><i class="el-icon-key"></i></router-link>
            <router-link to="/skill"><i class="el-icon-cpu"></i></router-link>
            <router-link to="/story"><i class="el-icon-film"></i></router-link>
            <router-link to="/map"><i class="el-icon-map-location"></i></router-link>
            <router-link to="/drop"><i class="el-icon-present"></i></router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Info",
    props: [],
    data: function() {
        return {};
    },
    computed: {},
    methods: {},
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/info.less";
</style>
