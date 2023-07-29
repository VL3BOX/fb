<template>
    <app-layout slug="baizhan" className="p-baizhan-app">
        <div class="p-baizhan" v-loading="loading">
            <div class="m-baizhan-left" v-if="!isPhone()">
                <main-tabs></main-tabs>
                <keep-alive>
                    <component :is="leftComponent"></component>
                </keep-alive>
            </div>
            <div class="m-baizhan-center" :class="isPhone() && 'is-phone'">
                <BMap v-if="activeTab === 'map'"></BMap>
                <Skills v-if="activeTab === 'skill'"></Skills>
                <Bosses v-if="activeTab === 'boss'"></Bosses>
            </div>
            <div class="m-baizhan-right" v-if="activeTab === 'map' && !isPhone()">
                <BInfo></BInfo>
            </div>
        </div>
    </app-layout>
</template>

<script>
import MainTabs from "@/components/baizhan/main_tabs.vue";
import MapFilter from "@/components/baizhan/map_filter.vue";

import Skills from "@/components/baizhan/skill_list.vue";
import BMap from "@/components/baizhan/map_index.vue";

import BInfo from "@/components/baizhan/map_level_info.vue";
import Bosses from "@/components/baizhan/boss_index.vue";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { isPhone } from "@/utils";
import { mapState, mapActions } from "vuex";
export default {
    name: "Baizhan",
    provide: {
        __imgRoot: __imgPath + "pve/baizhan/",
    },
    components: {
        MainTabs,
        MapFilter,

        Skills,
        BMap,
        BInfo,
        Bosses,
    },
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        ...mapState({
            bosses: (state) => state.baizhan.bosses,
            skills: (state) => state.baizhan.skills,
            effects: (state) => state.baizhan.effects,
            maps: (state) => state.baizhan.maps,
            activeTab: (state) => state.baizhan.activeTab,
        }),
        leftComponent() {
            return MapFilter;
        },
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
            this.resetCurrent();
        },
    },
    methods: {
        ...mapActions({
            loadBosses: "baizhan/loadBosses",
            loadSkills: "baizhan/loadSkills",
            loadEffects: "baizhan/loadEffects",
            loadMap: "baizhan/loadMap",
            resetCurrent: "baizhan/resetCurrent",
        }),
        isPhone,
        load() {
            const proArr = [];

            const bossPro = this.loadBosses();
            proArr.push(bossPro);

            const skillPro = this.loadSkills();
            proArr.push(skillPro);

            const effectPro = this.loadEffects();
            proArr.push(effectPro);
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
