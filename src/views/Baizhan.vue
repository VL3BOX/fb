<template>
    <app-layout slug="baizhan">
        <Skills :types="types"></Skills>
    </app-layout>
</template>

<script>
import { getTypes } from "@/service/baizhan";
import Skills from "@/components/baizhan/Skills.vue";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "Baizhan",
    provide: {
        __imgRoot: __imgPath + "pve/baizhan/",
    },
    components: {
        Skills,
    },
    data() {
        return {
            types: {},
        };
    },
    methods: {
        loadTypes() {
            getTypes().then((res) => {
                const data = res.data?.data || {};
                this.types = {
                    szTypes: data?.[1] || [],
                    costs: data?.[2] || [],
                    colors: data?.[3] || [],
                };
            });
        },
    },
    mounted() {
        this.loadTypes();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/baizhan.less";
</style>
