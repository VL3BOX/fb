<template>
    <div class="m-fb-single-nav">
        <Author :author="author"/>
        <Authorposts :uid="uid"/>
    </div>
</template>

<script>
export default {
    name: "list",
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
    mounted: function() {},
};
</script>

<style lang="less">
@import "../assets/css/single_nav.less";
</style>
