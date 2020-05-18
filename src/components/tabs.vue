<template>
    <el-tabs class="m-fb-tabs" v-model="view" @tab-click="changeView">
        <el-tab-pane label="副本攻略" name="index">
            <span slot="label">
                <i class="el-icon-collection"></i>
                副本攻略
                <span class="u-secret">开荒首发</span>
            </span>
        </el-tab-pane>

        <el-tab-pane label="副本成就" name="cj">
            <span slot="label">
                <i class="el-icon-trophy"></i>
                副本成就
                <span class="u-new">新上线</span>
            </span>
        </el-tab-pane>

        <el-tab-pane label="NPC数据" name="npc">
           <span slot="label">
               <i class="el-icon-key"></i>
               NPC数据
               <span class="u-secret">重磅独家</span>
            </span>
        </el-tab-pane>

        <el-tab-pane label="技能数据" name="skill">
            <span slot="label">
                <i class="el-icon-cpu"></i>
                技能数据
                <span class="u-secret">重磅独家</span>
            </span>
        </el-tab-pane>

        <el-tab-pane label="副本背景" name="story">
            <span slot="label">
                <i class="el-icon-film"></i>
                副本背景
            </span>
        </el-tab-pane>

        <el-tab-pane label="副本地图" name="map">
            <span slot="label">
                <i class="el-icon-map-location"></i>
                副本地图
                <span class="u-new">新上线</span>
            </span>
        </el-tab-pane>


        <el-tab-pane label="副本掉落" name="drop">
            <span slot="label">
                <i class="el-icon-present"></i>
                副本掉落
                <span class="u-pending">即将推出</span>
            </span>
        </el-tab-pane>

        <el-tab-pane label="击杀记录" name="rank">
            <span slot="label">
                <i class="el-icon-date"></i>
                击杀排行
                <span class="u-pending">即将推出</span>
            </span>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
export default {
    name: "tabs",
    props: [],
    data: function() {
        return {
            view: "index",
        };
    },
    computed: {},
    methods: {
        changeView: function() {
            this.$router.push({ path: this.view });
        },
    },
    mounted: function() {
        this.view = this.$route.name
    },
};
</script>

<style lang="less">
@import "../assets/css/tabs.less";
</style>
