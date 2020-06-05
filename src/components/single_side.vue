<template>
    <div class="m-extend-single">
        <!-- <Author v-if="$store.state.status" :author="author"/> -->
        <div id="directory" class="m-fb-directory"></div>
        <!-- <Authorposts :uid="uid"/> -->
        <!-- <ins 
            class="adsbygoogle"
            style="display:block;max-width:100%;overflow:hidden;"
            data-ad-client="ca-pub-4388499329141185"
            data-ad-slot="9773281887"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins> -->
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