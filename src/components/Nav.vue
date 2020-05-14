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
                    <a :href="url(group.name,item.name)">{{ item.name }}</a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
export default {
    name: "Nav",
    data: function() {
        return {
            map: this.$store.state.map,
        };
    },
    computed: {
        
    },
    methods: {
        url : function (zlp,fb){
            return `/fb/?fb_zlp=${zlp}&fb_name=${fb}`
        },
        isActive : function (subkey){
            let current = this.$store.state.fb
            return current == subkey
        },
    },
    mounted: function() {
    },
};
</script>

<style lang="less">
@import '../assets/css/nav.less';
</style>
