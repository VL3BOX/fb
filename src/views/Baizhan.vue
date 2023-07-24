<template>
    <app-layout slug="baizhan" className="p-baizhan-app">
        <div class="p-baizhan">
            <LeftSidebar class="m-baizhan-sidebar" v-if="!isPhone()">
                <BTabs></BTabs>
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
                <BMap v-if="activeTab === 0"></BMap>
                <Skills v-if="activeTab === 1" :types="types"></Skills>
            </div>
            <div class="m-right">
                <BInfo :active="activeTab"></BInfo>
            </div>
        </div>
    </app-layout>
</template>

<script>
import Skills from "@/components/baizhan/Skills.vue";
import BMap from "@/components/baizhan/BMap.vue";
import BTabs from "@/components/baizhan/BTabs.vue";
import BInfo from "@/components/baizhan/BInfo.vue";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { isPhone } from "@/utils";
import { mapState, mapActions } from "vuex";
export default {
    name: "Baizhan",
    provide: {
        __imgRoot: __imgPath + "pve/baizhan/",
    },
    components: {
        Skills,
        BTabs,
        BMap,
        BInfo,
    },
    data() {
        return {
            loading: false,
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
        ...mapState({
            types: (state) => state.baizhan.types,
            bosses: (state) => state.baizhan.bosses,
            skills: (state) => state.baizhan.skills,
            effects: (state) => state.baizhan.effects,
            maps: (state) => state.baizhan.maps,
        }),
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
            this.$store.commit("baizhan/setState", {
                key: "currentBoss",
                val: {},
            });
        },
    },
    methods: {
        ...mapActions({
            loadTypes: "baizhan/loadTypes",
            loadBosses: "baizhan/loadBosses",
            loadSkills: "baizhan/loadSkills",
            loadEffects: "baizhan/loadEffects",
            loadMap: "baizhan/loadMap",
        }),
        isPhone,
        load() {
            const proArr = [];

            const bossPro = this.loadBosses();
            proArr.push(bossPro);

            const skillPro = this.loadSkills();
            proArr.push(skillPro);

            const typePro = this.loadTypes();
            proArr.push(typePro);

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
