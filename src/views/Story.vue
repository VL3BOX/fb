<template>
    <div class="m-fb-story">
        <el-divider content-position="left">故事背景</el-divider>
        <p class="u-fb" v-html="introduction"></p>

        <template v-if="bosslist.length">
        <el-divider content-position="left">首领传说</el-divider>
        <div class="u-boss" v-for="(boss, i) in bosslist" :key="i">
            <h5 class="u-name">
                <img
                    class="u-boss-icon"
                    svg-inline
                    src="../assets/img/skull.svg"
                />
                {{ boss.BOSS }}
            </h5>
            <p
                class="u-boss-detail"
                v-html="boss.Introduce"
            ></p>
        </div>
        </template>

        <template v-if="mapid">
        <el-divider content-position="left">副本地图</el-divider>
        <div class="m-fb-map" v-loading="loading">
            <img
                class="u-map"
                :src="mapimg"
                :alt="fb"
                ref="fb_map_img"
                @load="loaded"
            />
        </div>
        </template>
    </div>
</template>

<script>
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box";
import { getInfo, getBoss } from "@/service/getStory.js";
export default {
    name: "Story",
    props: [],
    data: function() {
        return {
            loading: true,
            introduction: "",
            mapid : '',
            bosslist : []
        };
    },
    computed: {
        fb: function() {
            return this.$store.state.fb;
        },
        mapimg : function (){
            return __ossMirror + "pic/map/map_" + this.mapid + ".jpg";
        }
    },
    methods: {
        loadData: function() {
            getInfo(this.fb).then((res) => {
                let data = res.data ? res.data[0] : ''

                if(data){
                    if(data.Introduction){
                        this.introduction = data.Introduction.replace('<text>text="','')
                        this.introduction = this.introduction.replace('</text>','')
                        this.introduction = this.introduction.replace(/font=\d*/g,'')
                        this.introduction = this.introduction.replace(/\\\\\\n/g,'<br/>')
                    }
                    this.mapid = data.MapID
                }else{
                    this.introduction = '无'
                }

                if(this.mapid){
                    getBoss(this.mapid).then((res) => {
                        let bosslist = res.data
                        if(bosslist && bosslist.length){
                            this.bosslist = bosslist
                        }
                    })
                }
            })
        },
        loaded : function (){
            this.loading = false
        }
    },
    filters : {
    },
    mounted: function() {
        this.loadData()
    },
};
</script>

<style lang="less">
@import "../assets/css/story.less";
</style>
