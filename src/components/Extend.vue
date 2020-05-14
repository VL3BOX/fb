<template>
    <div class="m-fb-extend">

    </div>
</template>

<script>
import list_side from '@/components/list_side.vue'
import single_side from '@/components/single_side.vue'
export default {
    name: "Extend",
    props: [],
    data: function() {
        return {};
    },
    computed: {
        mode : function (){
            let params = new URLSearchParams(location.search);
            return params.get('pid') ? 'single' : 'list'
        }
    },
    methods: {},
    mounted: function() {
        list_side,
        single_side
    },
};
</script>

<style lang="less">
</style>
