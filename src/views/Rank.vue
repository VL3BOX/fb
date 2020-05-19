<template>
    <div class="m-fb-rank">
        <el-alert title="即将开启，敬请期待" type="warning" center show-icon>
        </el-alert>

        <!-- <el-row :gutter="20" class="m-fb-rank-box">
            <el-col :span="6" class="m-fb-rank-group"
                ><h5 class="u-title">周贽·25人英雄</h5>
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item name="1">
                        <template slot="title">
                            <span class="u-team">Team name</span>
                            <span class="u-server">server</span>
                            <time class="u-date">2020/05/20 11:11:11</time>
                        </template>
                        <div class="u-member">Member list</div>
                        <div class="u-cost">
                            用时:<time class="u-cost">----seconds</time>
                        </div>
                    </el-collapse-item>
                </el-collapse></el-col
            >
            <el-col :span="6" class="m-fb-rank-group"
                ><h5 class="u-title">厌夜·25人英雄</h5>
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item name="1">
                        <template slot="title">
                            <span class="u-team">Team name</span>
                            <span class="u-server">server</span>
                            <time class="u-date">2020/05/20 11:11:11</time>
                        </template>
                        <div class="u-member">Member list</div>
                        <div class="u-cost">
                            用时:<time class="u-cost">----seconds</time>
                        </div>
                    </el-collapse-item>
                </el-collapse></el-col
            >
            <el-col :span="6" class="m-fb-rank-group"
                ><h5 class="u-title">迟驻·25人英雄</h5>
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item name="1">
                        <template slot="title">
                            <span class="u-team">Team name</span>
                            <span class="u-server">server</span>
                            <time class="u-date">2020/05/20 11:11:11</time>
                        </template>
                        <div class="u-member">Member list</div>
                        <div class="u-cost">
                            用时:<time class="u-cost">----seconds</time>
                        </div>
                    </el-collapse-item>
                </el-collapse></el-col
            >
            <el-col :span="6" class="m-fb-rank-group"
                ><h5 class="u-title">白某·25人英雄</h5>
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item name="1">
                        <template slot="title">
                            <span class="u-team">Team name</span>
                            <span class="u-server">server</span>
                            <time class="u-date">2020/05/20 11:11:11</time>
                        </template>
                        <div class="u-member">Member list</div>
                        <div class="u-cost">
                            用时:<time class="u-cost">----seconds</time>
                        </div>
                    </el-collapse-item>
                </el-collapse></el-col
            >
        </el-row>
        <el-row :gutter="20" class="m-fb-rank-box-final">
            <el-col :span="12" class="m-fb-rank-group"
                ><h5 class="u-title">安小逢·25人普通</h5>
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item name="1">
                        <template slot="title">
                            <span class="u-team">Team name</span>
                            <span class="u-server">server</span>
                            <time class="u-date">2020/05/20 11:11:11</time>
                        </template>
                        <div class="u-member">Member list</div>
                        <div class="u-cost">
                            用时:<time class="u-cost">----seconds</time>
                        </div>
                    </el-collapse-item>
                </el-collapse></el-col
            >
            <el-col :span="12" class="m-fb-rank-group"
                ><h5 class="u-title">安小逢·25人英雄</h5>
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item name="1">
                        <template slot="title">
                            <span class="u-team">Team name</span>
                            <span class="u-server">server</span>
                            <time class="u-date">2020/05/20 11:11:11</time>
                        </template>
                        <div class="u-member">Member list</div>
                        <div class="u-cost">
                            用时:<time class="u-cost">----seconds</time>
                        </div>
                    </el-collapse-item>
                </el-collapse></el-col
            >
        </el-row> -->
    </div>
</template>

<script>
export default {
    name: "Rank",
    props: [],
    data: function() {
        return {
            activeName : ''
        };
    },
    computed: {},
    methods: {},
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/rank.less";
</style>
