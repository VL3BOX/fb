<template>
    <div class="m-fb-attr" v-loading="loading">
        <el-divider content-position="left">穿透</el-divider>
        <div class="u-desc">穿透属性会将通用减伤效果降低100%，无视格挡伤害类效果。依旧可以受到属性减伤、小部分伤害吸收盾、内外功防御以及免死效果影响。</div>
        <ul class="u-content">
            <li v-for="(item,i) in chuantou" :key="i">
                <a :href="item.link" target="_blank"><img :src="item.icon | iconLink">{{item.label}}<span v-if="item.color">{{item.color}}</span></a>
            </li>
        </ul>
        <el-divider content-position="left">穿刺</el-divider>
        <div class="u-desc">穿刺伤害会在伤害作用玩家之前主要删除/无视无敌类型的技能，但是依旧可以受到通用减伤、属性减伤、部分分担伤害、伤害吸收盾、内外功防御以及免死效果影响。</div>
        <ul class="u-content">
            <li v-for="(item,i) in chuanci" :key="i">
                <a :href="item.link" target="_blank"><img :src="item.icon | iconLink">{{item.label}}<span v-if="item.color">{{item.color}}</span></a>
            </li>
        </ul>
        <el-divider content-position="left">贯体</el-divider>
        <div class="u-desc">可按百分比治疗目标的技能，在有较高禁疗下时很重要。</div>
        <ul class="u-content">
            <li v-for="(item,i) in guanti" :key="i">
                <a :href="item.link" target="_blank"><img :src="item.icon | iconLink">{{item.label}}<span v-if="item.color">{{item.color}}</span></a>
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
    data: function () {
        return {
            loading: false,
            chuantou: "",
            chuanci: "",
            guanti : ""
        };
    },
    filters : {
        iconLink
    },
    methods: {
        loadData: function () {
            this.loading = true;
            getSkillGroups('chuantou,chuanci,guanti')
                .then((res) => {
                    let data = res.data.data.data;
                    for (let key in data) {
                        this[key] = data[key]["items"];
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

<style scoped lang="less">
@import "../assets/css/attr.less";
</style>
