<template>
    <div class="m-list-side">
        <!-- 群号 -->
        <RightSideMsg>
            <em>全服团长交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=mEl1e2hL">785597424</a>
            </strong>
        </RightSideMsg>
        <!-- 团队天梯 -->
        <mini-ladder></mini-ladder>
        <!-- 团队招募 -->
        <!-- <team-act></team-act> -->
    </div>
</template>

<script>
import miniLadder from "./mini_ladder.vue";
// import teamAct from "./team_act.vue";
export default {
    name: "list_side",
    components: {
        miniLadder,
        // teamAct
    },
    props: [],
    data: function () {
        return {

        };
    },
    computed: {

    },
    methods: {

    },
    filters: {

    },
    watch: {

    },
    mounted: function () { },
};
</script>

<style lang="less" scoped>
@import "~@/assets/css/side.less";
</style>
