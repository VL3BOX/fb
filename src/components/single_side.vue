<template>
    <div class="m-extend-single" v-if="$store.state.status">
        <Author :author="author"/>
        <Authorposts :uid="uid"/>
    </div>
</template>

<script>
export default {
    name: "single_side",
    props: [],
    data: function() {
        return {
        };
    },
    computed: {
        author : function (){
            return this.$store.state.author
        },
        uid : function (){
            return this.author.uid
        }
    },
    methods: {
        
    },
    filters : {
    },
    mounted: function() {},
};
</script>

<style lang="less">
    // @import '../assets/css/author.less';
</style>