<template>
    <div class="m-fb-index">
        <!-- <slider /> -->
        <list />
    </div>
</template>

<script>
// import slider from '@/components/slider.vue'
import list from '@/components/list.vue'
export default {
    name: "Index",
    props: [],
    data: function() {
        return {
            
        };
    },
    computed: {
        
    },
    methods: {
        
    },
    filters: {
    },
    mounted: function() {
        
    },
    components: {
        list,
        // slider
    }
};
</script>

<style lang="less">
@import "../assets/css/index.less";
</style>
