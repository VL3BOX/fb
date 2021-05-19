<template>
    <div class="m-fb-map">
        <img class="u-map" :src="mapLink(mapid,item)" :alt="fb" ref="fb_map_img" v-for="(item) in maplist" :key="item">
    </div>
</template>

<script>
import {__iconPath} from '@jx3box/jx3box-common/data/jx3box'
import maptree from '@jx3box/jx3box-data/data/common/maptree.json'
export default {
    name: "JMap",
    props: [],
    data: function() {
        return {
            loading : true,
            maptree
        };
    },
    computed: {
        zlp: function() {
            return this.$store.state.zlp || this.$store.state.default_zlp 
        },
        fb: function() {
            return this.$store.state.fb || this.$store.state.default_fb
        },
        mapid : function (){
            return this.$store.state.map[this.zlp]["dungeon"][this.fb]['maps'][0]['map_id']
        },
        maplist : function (){
            return this.maptree[this.mapid]
        },
    },
    watch : {
        mapid : function (val){
            console.log(val)
        }
    },
    methods: {
        loaded : function (){
            this.loading = false            
        },
        mapLink : function (val,i){
            return __iconPath + 'map/map_' + val + '_' + i + '.png'
        }
    },
};
</script>

<style lang="less">
@import '../assets/css/map.less';
</style>
