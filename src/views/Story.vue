<template>
    <div class="m-fb-story" >
        <el-divider content-position="left">故事背景</el-divider>
        <p class="u-fb" v-html="introduce"></p>

        <el-divider content-position="left">首领传说</el-divider>
        <div class="u-boss" v-for="(item, i) in boss" :key="i">
            <h5 class="u-name">
                <img
                    class="u-boss-icon"
                    svg-inline
                    src="../assets/img/skull.svg"
                />
                {{ item.name }}
            </h5>
            <p
                class="u-boss-detail"
                v-html="item.summary.replace(/\\n/g, '<br/>')"
            ></p>
        </div>

        <el-divider content-position="left">副本地图</el-divider>
        <div class="m-fb-map" v-loading="loading">
            <img class="u-map" :src="mapimg" :alt="fb" ref="fb_map_img" @load="loaded">
        </div>
    </div>
</template>

<script>
import {__ossMirror} from '@jx3box/jx3box-common/js/jx3box'
export default {
    name: "Story",
    props: [],
    data: function() {
        return {
            loading : true
        };
    },
    computed: {
        zlp: function() {
            return this.$store.state.zlp;
        },
        fb: function() {
            return this.$store.state.fb;
        },
        info: function() {
            return this.$store.state.map[this.zlp]["dungeon"][this.fb][
                "detail"
            ];
        },
        introduce: function() {
            return this.info.introduce.replace(/\\n/g, "<br/>");
        },
        boss: function() {
            return this.info.boss_infos;
        },
        mapid : function (){
            return this.$store.state.map[this.zlp]["dungeon"][this.fb]['detail']['map_id']
        },
        mapimg : function (){
            return __ossMirror + 'pic/map/map_' + this.mapid + '.jpg'
        }
    },
    methods: {
        loaded : function (){
            this.loading = false            
        }
    },
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/story.less";
</style>
