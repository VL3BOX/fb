<template>
    <div class="m-fb-attr" v-loading="loading">
        <el-divider content-position="left">穿透</el-divider>
        <ul class="u-content">
            <li v-for="(item,i) in chuantou" :key="i">
                <a :href="item.link" target="_blank"><img :src="item.icon | iconLink">{{item.label}}</a>
            </li>
        </ul>
        <el-divider content-position="left">穿刺</el-divider>
        <ul class="u-content">
            <li v-for="(item,i) in chuanci" :key="i">
                <a :href="item.link" target="_blank"><img :src="item.icon | iconLink">{{item.label}}</a>
            </li>
        </ul>
    </div>
</template>

<script>
import { __ossMirror } from "@jx3box/jx3box-common/data/jx3box";
import { getMenuGroups } from "@/service/getAttr.js";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Attr",
    props: [],
    data: function () {
        return {
            loading: false,
            chuantou: "",
            chuanci: "",
        };
    },
    filters : {
        iconLink
    },
    methods: {
        loadData: function () {
            this.loading = true;
            getMenuGroups({
                names: ["chuantou", "chuanci"],
            })
                .then((res) => {
                    let data = res.data.data.data;
                    for (let key in data) {
                        this[key] = data[key]["menus"];
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
    mounted: function () {
        this.loadData();
    },
};
</script>

<style lang="less">
@import "../assets/css/attr.less";
</style>
