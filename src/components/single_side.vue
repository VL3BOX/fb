<template>
    <div class="m-extend-single">
        <Postauthor :author="author"/>
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
            return this.$store.state.post.author
        },
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