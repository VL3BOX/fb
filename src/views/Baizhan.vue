<template>
    <app-layout slug="baizhan">
        <div class="p-baizhan">
            <LeftSidebar v-if="!isPhone()">
                <Bosses :bosses="bosses" @update="updateBoss($event)"></Bosses>
            </LeftSidebar>
            <div class="m-content" :class="isPhone() && 'is-phone'">
                <div class="m-btns">
                    <el-button
                        :type="item.value === activeTab ? 'primary' : 'default'"
                        v-for="item in tabs"
                        :key="item.value"
                        @click="activeTab = item.value"
                        >{{ item.label }}</el-button
                    >
                </div>
                <keep-alive>
                    <BMap v-if="activeTab === 0" :bosses="bosses"></BMap>
                    <Skills v-if="activeTab === 1" :types="types"></Skills>
                </keep-alive>
            </div>
        </div>
    </app-layout>
</template>

<script>
import { getBosses, getBossInfo, getTypes } from "@/service/baizhan";
import Skills from "@/components/baizhan/Skills.vue";
import BMap from "@/components/baizhan/BMap.vue";
import Bosses from "@/components/baizhan/Bosses.vue";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { isPhone } from "@/utils";
export default {
    name: "Baizhan",
    provide: {
        __imgRoot: __imgPath + "pve/baizhan/",
    },
    components: {
        Skills,
        Bosses,
        BMap,
    },
    data() {
        return {
            types: {},
            bosses: [],
            activeTab: 0,
            tabs: [
                {
                    value: 0,
                    label: "百战地图",
                },
                {
                    value: 1,
                    label: "百战技能",
                },
            ],
        };
    },
    watch: {
        activeTab() {
            this.$store.commit("setState", {
                key: "baizhanBoss",
                val: "",
            });
        },
    },
    methods: {
        updateBoss(data) {
            const index = this.bosses.findIndex((item) => item.name === data.boss_name);
            this.bosses[index].link = data.link;
        },
        isPhone,
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
        loadBosses() {
            getBosses().then((res) => {
                let list = res.data?.data || [];
                list = list.map((item) => {
                    return {
                        avatar: item.ImagePath
                            ? `${__imgPath}pve/baizhan/${item.ImagePath.match(/\\([^\\]*)\./)[1].toLowerCase()}_${
                                  item.ImageFrame
                              }.png`
                            : `${__imgPath}pve/baizhan/fbcdpanel02_51.png`,
                        name: item.szName,
                        skills: item.szSkill,
                    };
                });
                let map = new Map();
                let mapList = list.filter((v) => !map.has(v.name) && map.set(v.name, 1));
                const names = mapList.map((item) => item.name).join(",");
                getBossInfo({ names: names }).then((resInfo) => {
                    const bossExtraList = resInfo.data?.data || [];
                    this.bosses = mapList.map((item) => {
                        item.link = bossExtraList.find((boss) => boss.boss_name === item.name)?.link || "";
                        return item;
                    });
                });
            });
        },
    },
    mounted() {
        this.loadTypes();
        this.loadBosses();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/baizhan.less";
</style>
