<template>
    <app-layout slug="baizhan" className="p-baizhan-app">
        <div class="p-baizhan">
            <LeftSidebar class="m-baizhan-sidebar" v-if="!isPhone()">
                <BTabs :maps="maps"></BTabs>
            </LeftSidebar>
            <div class="m-content" :class="isPhone() && 'is-phone'">
                <!-- <div class="m-btns">
                    <el-button
                        :type="item.value === activeTab ? 'primary' : 'default'"
                        v-for="item in tabs"
                        :key="item.value"
                        @click="activeTab = item.value"
                        >{{ item.label }}</el-button
                    >
                </div> -->
                <BMap v-if="activeTab === 0" :bosses="bosses" :effects="effects" :maps="maps"></BMap>
                <Skills v-if="activeTab === 1" :types="types"></Skills>
            </div>
        </div>
    </app-layout>
</template>

<script>
import { getBosses, getBossInfo, getTypes, getSkills, getSkillInfo, getEffects, getMap } from "@/service/baizhan";
import Skills from "@/components/baizhan/Skills.vue";
import BMap from "@/components/baizhan/BMap.vue";
import BTabs from "@/components/baizhan/BTabs.vue";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { baizhanEffects } from "@/assets/data/baizhan_effects.js";
import { isPhone } from "@/utils";
export default {
    name: "Baizhan",
    provide: {
        __imgRoot: __imgPath + "pve/baizhan/",
    },
    components: {
        Skills,
        BTabs,
        BMap,
    },
    data() {
        return {
            loading: false,
            types: {},
            bosses: [],
            skills: [],
            effects: [],
            maps: [],
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
    computed: {
        bossList() {
            const skills = this.skills;
            return this.bosses.map((boss) => {
                return {
                    ...boss,
                    skills: boss.skills
                        ? boss.skills.map((skill) => {
                              const skillObj = skills.find((item) => item.dwInSkillID === skill);
                              return {
                                  skillId: skill,
                                  skillName: skillObj?.szSkillName,
                                  skillColor: skillObj?.nColor,
                              };
                          })
                        : [],
                };
            });
        },
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
        async loadEffects() {
            await getEffects().then((res) => {
                const list = res.data?.data || [];
                list.unshift({
                    nID: 0,
                    dwIconID: 18505,
                    szName: "无",
                    szDescription: "",
                    coin: 0,
                    sketch: "",
                });
                this.effects = list.map((item) => {
                    return {
                        ...item,
                        coin: baizhanEffects.find((effect) => effect.nID === item.nID)?.coin || 0,
                        sketch: baizhanEffects.find((effect) => effect.nID === item.nID)?.sketch || "",
                    };
                });
                sessionStorage.setItem(`baizhan-effects`, JSON.stringify(this.effects));
            });
        },
        async loadSkills() {
            await getSkills().then((res) => {
                const list = res.data?.data?.list || [];
                const ids = list.map((item) => item.dwInSkillID).join(",");
                getSkillInfo({ ids: ids }).then((resInfo) => {
                    const skillExtraList = resInfo.data?.data || [];
                    const newList = list.map((item) => {
                        item.extra = skillExtraList.find((extra) => extra.skill_id === item.dwInSkillID) || {};
                        return item;
                    });
                    this.skills = newList;
                    sessionStorage.setItem(`baizhan-skills`, JSON.stringify(newList));
                });
            });
        },
        async loadTypes() {
            await getTypes().then((res) => {
                const data = res.data?.data || {};
                this.types = {
                    szTypes: data?.[1] || [],
                    costs: data?.[2] || [],
                    colors: data?.[3] || [],
                };
                sessionStorage.setItem(`baizhan-types`, JSON.stringify(this.types));
            });
        },
        async loadBosses() {
            await getBosses().then((res) => {
                let list = res.data?.data || [];
                list = list.map((item) => {
                    return {
                        id: item.dwNpcID,
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
                    const bosses = list.map((item) => {
                        item.link = bossExtraList.find((boss) => boss.boss_name === item.name)?.link || "";
                        return item;
                    });
                    this.bosses = bosses;
                    sessionStorage.setItem(`baizhan-bosses`, JSON.stringify(bosses));
                });
            });
        },
        async loadMap() {
            await getMap().then((res) => {
                const bosses = this.bosses;
                const effects = this.effects;
                const data = res.data?.data?.data || [];
                const list = data.map((item) => {
                    return {
                        ...item,
                        boss: bosses.find((boss) => boss.id === item.dwBossID),
                        bossName: bosses.find((boss) => boss.id === item.dwBossID)?.name,
                        effect: effects.find((effect) => effect.nID === item.nEffectID),
                    };
                });
                this.maps = list;
            });
        },
        load() {
            const proArr = [];
            const bossCache = sessionStorage.getItem(`baizhan-bosses`);
            if (bossCache) {
                this.bosses = JSON.parse(bossCache);
            } else {
                const bossPro = this.loadBosses();
                proArr.push(bossPro);
            }
            const skillCache = sessionStorage.getItem(`baizhan-skills`);
            if (skillCache) {
                this.skills = JSON.parse(skillCache);
            } else {
                const skillPro = this.loadSkills();
                proArr.push(skillPro);
            }
            const typeCache = sessionStorage.getItem(`baizhan-types`);
            if (typeCache) {
                this.types = JSON.parse(typeCache);
            } else {
                const typePro = this.loadTypes();
                proArr.push(typePro);
            }
            const effectCache = sessionStorage.getItem(`baizhan-effects`);
            if (effectCache) {
                this.effects = JSON.parse(effectCache);
            } else {
                const effectPro = this.loadEffects();
                proArr.push(effectPro);
            }

            this.loading = true;
            Promise.allSettled(proArr).then(() => {
                this.loadMap();
                this.loading = false;
            });
        },
    },
    mounted() {
        this.load();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/baizhan.less";
</style>
