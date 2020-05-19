<template>
    <div class="m-extend-list">
        <div class="m-fb-info">
            <i class="u-pic"
                ><img
                    id="m-archive-fb-pic"
                    :src="img"
            /></i>
            <h1 class="u-title" id="m-archive-fb-name">{{info.name}}</h1>
            <p class="u-intro" id="m-archive-fb-intro" v-html="introduce"></p>
            <ul class="u-mode" id="m-archive-fb-mode">
                <li v-for="(item,i) in info.detail.maps" :key="i">{{item.mode}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import {__ossMirror} from '@jx3box/jx3box-common/js/jx3box'
export default {
    name: "list_side",
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
            return this.$store.state.map[this.zlp]["dungeon"][this.fb];
        },
        img : function (){
            return __ossMirror + this.info.icon
        },
        introduce : function (){
            return this.info.detail.introduce.replace(/\\n/g,'<br/>')
        }
    },
    methods: {},
    mounted: function() {
    },
};
</script>

<style lang="less">@import '../assets/css/fb_info.less';</style>