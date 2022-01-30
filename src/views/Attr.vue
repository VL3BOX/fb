<template>
    <div class="m-fb-attr" v-loading="loading">
        <template v-if="client == 'std'">
            <el-divider content-position="left">穿透</el-divider>
            <div class="u-desc">{{chuantou['desc']}}</div>
            <ul class="u-content">
                <li v-for="(item, i) in chuantou['list']" :key="i">
                    <a :href="item.link" target="_blank">
                        <img :src="item.icon | iconLink" />
                        {{ item.label }}
                        <span v-if="item.color">{{ item.color }}</span>
                    </a>
                </li>
            </ul>
            <el-divider content-position="left">穿刺</el-divider>
            <div class="u-desc">{{chuanci['desc']}}</div>
            <ul class="u-content">
                <li v-for="(item, i) in chuanci['list']" :key="i">
                    <a :href="item.link" target="_blank" :title="item.meta_1">
                        <img :src="item.icon | iconLink" />
                        {{ item.label }}
                        <span v-if="item.color">{{ item.color }}</span>
                    </a>
                </li>
            </ul>
        </template>
        <el-divider content-position="left">贯体</el-divider>
        <div class="u-desc">{{guanti['desc']}}</div>
        <ul class="u-content">
            <li v-for="(item, i) in guanti['list']" :key="i">
                <a :href="item.link" target="_blank" :title="item.meta_1">
                    <img :src="item.icon | iconLink" />
                    {{ item.label }}
                    <span v-if="item.color">{{ item.color }}</span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import { __ossMirror } from "@jx3box/jx3box-common/data/jx3box";
import { getSkillGroups } from "@/service/helper.js";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Attr",
    props: [],
    data: function() {
        return {
            loading: false,
            chuantou: {
                list : [],
                desc : ''
            },
            chuanci: {
                list : [],
                desc : ''
            },
            guanti: {
                list : [],
                desc : ''
            },
        };
    },
    computed: {
        client: function() {
            return this.$store.state.client || "std";
        },
    },
    filters: {
        iconLink,
    },
    methods: {
        loadData: function() {
            this.loading = true;
            let params = this.client == "origin" ? ["guanti", "origin"] : ["chuantou,chuanci,guanti", "std"];
            getSkillGroups(...params)
                .then((res) => {
                    let data = res.data.data.data;
                    for (let key in data) {
                        this[key]['list'] = data[key]["items"] || [];
                        this[key]['desc'] = data[key]["description"];
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
    },
    mounted: function() {
        this.loadData();
    },
};
</script>

<style scoped lang="less">
@import "../assets/css/attr.less";
</style>
