<template>
    <div class="m-fb-rank">
        <el-alert title="即将开启，敬请期待" type="warning" center show-icon>
        </el-alert>

        <div class="m-fb-rank-group">
            <h5 class="u-title">周贽</h5>
            <ul>
                <li>
                    <div class="u-team">团队名称</div>
                    <div class="u-member">团员名称</div>
                    <time class="u-date"></time>
                    <time class="u-cost"></time>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "Rank",
    props: [],
    data: function() {
        return {
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
