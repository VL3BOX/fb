<template>
    <div class="m-fb-story">

        <el-divider content-position="left">故事背景</el-divider>
        <p class="u-fb" v-html="introduce"></p>

        <el-divider content-position="left">首领传说</el-divider>
        <div class="u-boss" v-for="(item,i) in boss" :key="i">
            <h5 class="u-name">
                <img class="u-boss-icon" svg-inline src="../assets/img/skull.svg" />
                {{item.name}}
            </h5>
            <p class="u-boss-detail" v-html="item.summary.replace(/\\n/g,'<br/>')"></p>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "Story",
    props: [],
    data: function() {
        return {};
    },
    computed: {
        zlp: function() {
            return this.$store.state.zlp
        },
        fb: function() {
            return this.$store.state.fb
        },
        info: function() {
            return this.$store.state.map[this.zlp]["dungeon"][this.fb]['detail'];
        },
        introduce: function (){
            return this.info.introduce.replace(/\\n/g,'<br/>')
        },
        boss : function (){
            return this.info.boss_infos
        }
    },
    methods: {},
    mounted: function() {
        console.log(this.info)
    },
};
</script>

<style lang="less">
@import '../assets/css/story.less';
</style>
