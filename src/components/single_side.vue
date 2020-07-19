<template>
    <div class="m-extend-single">
        <div id="directory" class="m-fb-directory"></div>
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
    @import '../assets/css/single_side.less';
</style>