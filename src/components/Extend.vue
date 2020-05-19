<template>
    <div class="m-extend">
        <list_side v-if="mode == 'list'"/>
        <single_side v-if="mode == 'single'"/>
        <Github_REPO REPO="fb" coder="8,15,2"></Github_REPO>
        <ins 
            class="adsbygoogle"
            style="display:block;max-width:100%;overflow:hidden;"
            data-ad-client="ca-pub-4388499329141185"
            data-ad-slot="9773281887"
            data-ad-format="auto"
            data-full-width-responsive="true"
        ></ins>
    </div>
</template>

<script>
import list_side from "@/components/list_side.vue";
import single_side from "@/components/single_side.vue";
export default {
    name: "Extend",
    props: [],
    data: function() {
        return {};
    },
    computed: {
        mode: function() {
            return this.$store.state.mode
        },
    },
    methods: {},
    mounted: function() {},
    components: {
        list_side,
        single_side,
    },
};
</script>

<style lang="less"></style>
