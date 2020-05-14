<template>
    <div class="m-fb-map">
        <img class="u-map" :src="mapimg" :alt="fb">
    </div>
</template>

<script>
import {__iconPath} from '@jx3box/jx3box-common/js/jx3box'
export default {
    name: "JMap",
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
        mapid : function (){
            return this.$store.state.map[this.zlp]["dungeon"][this.fb]['detail']['map_id']
        },
        mapimg : function (){
            return __iconPath + 'map/map_' + this.mapid + '.jpg'
        }
    },
    methods: {},
    mounted: function() {
    },
};
</script>

<style lang="less">
@import '../assets/css/map.less';
</style>
