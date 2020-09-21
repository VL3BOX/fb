<template>
    <el-tabs class="m-fb-tabs" v-model="view" @tab-click="changeView">
        <el-tab-pane label="副本攻略" name="index">
            <span slot="label">
                <i class="el-icon-collection"></i>
                <b>副本攻略</b>
                <em class="u-secret">开荒首发</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="副本成就" name="cj">
            <span slot="label">
                <i class="el-icon-collection-tag"></i>
                <b>副本成就</b>   
                <em class="u-new">最新同步</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="NPC数据" name="npc">
           <span slot="label">
               <i class="el-icon-key"></i>
               <b>NPC数据</b>
               <em class="u-secret">重磅独家</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="技能数据" name="skill">
            <span slot="label">
                <i class="el-icon-cpu"></i>
                <b>技能数据</b>
                <em class="u-secret">重磅独家</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="全服排行" name="rank">
            <span slot="label">
                <i class="el-icon-trophy"></i>
                <b>全服排行</b>
                <em class="u-ready">已结榜</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="副本掉落" name="drop">
            <span slot="label">
                <i class="el-icon-present"></i>
                <b>副本掉落</b>
                <em class="u-new">全新上线</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="瑰石列表" name="gem">
            <span slot="label">
                <i class="el-icon-house"></i>
                <b>瑰石列表</b>
                <em class="u-new">全新上线</em>
            </span>
        </el-tab-pane>

        <el-tab-pane label="背景故事" name="story">
            <span slot="label">
                <i class="el-icon-film"></i>
                <b>背景故事</b>
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
    watch : {
        $route : function (_route){
            this.view = _route.name
        }
    },
    computed: {},
    methods: {
        changeView: function() {
            this.$router.push({ name: this.view });
        },
    },
};
</script>

<style lang="less">
@import "../assets/css/tabs.less";
</style>
