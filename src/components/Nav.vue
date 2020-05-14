<template>
    <nav class="m-fb-nav">
        <div class="m-nav-group" v-for="(group, key) in map" :key="key">
            <h2 class="u-category active">
                <span class="u-title">{{ key }}</span>
                <em class="u-level">({{ group.level }})</em>
            </h2>
            <ul class="u-list">
                <li
                    v-for="(item, subkey) in group.dungeon"
                    :key="subkey"
                    class="u-item"
                    :class="{active:isActive(subkey)}"
                >
                    <a :href="'/fb/?fb_name=' + item.name">{{ item.name }}</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
import getNav from "../service/getNav";
export default {
    name: "Nav",
    data: function() {
        return {
            map: {},
        };
    },
    computed: {
        
    },
    methods: {
        isActive : function (subkey){
            let params = new URLSearchParams(location.search);
            let current = params.get('fb_name')
            return current == subkey
        }
    },
    mounted: function() {
        getNav().then((res) => {
            this.map = res.data;
        });
    },
};
</script>

<style lang="less">
@import '../assets/css/nav.less';
</style>
