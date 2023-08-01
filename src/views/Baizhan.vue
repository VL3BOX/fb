<template>
    <app-layout slug="baizhan" className="p-baizhan-app">
        <div class="p-baizhan" v-loading="loading">
            <LeftSidebar class="m-baizhan-sidebar">
                <div class="m-baizhan-left">
                    <main-tabs></main-tabs>
                    <keep-alive>
                        <component :is="leftComponent"></component>
                    </keep-alive>
                </div>
            </LeftSidebar>
            <div
                class="m-baizhan-center"
                :class="[isPhone() ? 'is-phone' : '', hasRight && rightOpen ? '' : 'is-right-close']"
            >
                <BMap v-if="activeTab === 'map'"></BMap>
                <Skills v-if="activeTab === 'skill'"></Skills>
                <Bosses v-if="activeTab === 'boss'"></Bosses>
            </div>
            <!-- v-if="hasRight" -->
            <div class="m-baizhan-right" :class="[rightOpen ? 'is-open' : 'is-close', hasRight ? 'is-has' : 'is-no']">
                <div class="m-right-wrap">
                    <BInfo></BInfo>
                    <BComment v-if="hasRight"></BComment>
                </div>
                <span class="c-sidebar-right-toggle" @click="rightOpen = !rightOpen">
                    <i :class="rightOpen ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
                </span>
            </div>
        </div>
    </app-layout>
</template>

<script>
import MainTabs from "@/components/baizhan/main_tabs.vue";
import MapFilter from "@/components/baizhan/map_filter.vue";
import SkillFilter from "@/components/baizhan/skill_filter.vue";

import Skills from "@/components/baizhan/skill_list.vue";
import BMap from "@/components/baizhan/map_index.vue";

import BInfo from "@/components/baizhan/map_level_info.vue";
import BComment from "@/components/baizhan/baizhan_comment.vue";
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
        SkillFilter,

        Skills,
        BMap,
        BInfo,
        Bosses,
        BComment,
    },
    data() {
        return {
            loading: false,
            rightOpen: true,
        };
    },
    computed: {
        ...mapState({
            bosses: (state) => state.baizhan.bosses,
            skills: (state) => state.baizhan.skills,
            effects: (state) => state.baizhan.effects,
            maps: (state) => state.baizhan.maps,
            activeTab: (state) => state.baizhan.activeTab,
            currentBoss: (state) => state.baizhan.currentBoss,
        }),
        leftComponent() {
            if (this.activeTab === "map") {
                return MapFilter;
            }
            if (this.activeTab === "skill") {
                return SkillFilter;
            }
            return null;
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
        hasRight() {
            return this.activeTab === "map" && this.currentBoss?.dwBossID && !isPhone();
        },
    },
    watch: {
        activeTab() {
            this.resetCurrent(true);
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
