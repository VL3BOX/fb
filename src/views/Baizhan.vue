<template>
    <app-layout slug="baizhan" className="p-baizhan-app">
        <div class="p-baizhan" v-loading="loading">
            <LeftSidebar class="m-baizhan-sidebar">
                <BTabs></BTabs>
            </LeftSidebar>
            <div class="m-content" :class="isPhone() && 'is-phone'">
                <BMap v-if="activeTab === 'map'"></BMap>
                <Skills v-if="activeTab === 'skill'"></Skills>
                <Bosses v-if="activeTab === 'boss'"></Bosses>
            </div>
            <div v-if="activeTab === 'map'" class="m-right">
                <BInfo></BInfo>
            </div>
        </div>
    </app-layout>
</template>

<script>
import Skills from "@/components/baizhan/Skills.vue";
import BMap from "@/components/baizhan/BMap.vue";
import BTabs from "@/components/baizhan/BTabs.vue";
import BInfo from "@/components/baizhan/BInfo.vue";
import Bosses from "@/components/baizhan/Bosses.vue";
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
        Bosses,
    },
    data() {
        return {
            loading: false,
        };
    },
    computed: {
        ...mapState({
            types: (state) => state.baizhan.types,
            bosses: (state) => state.baizhan.bosses,
            skills: (state) => state.baizhan.skills,
            effects: (state) => state.baizhan.effects,
            maps: (state) => state.baizhan.maps,
            activeTab: (state) => state.baizhan.activeTab,
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
            this.resetCurrent();
        },
    },
    methods: {
        ...mapActions({
            loadTypes: "baizhan/loadTypes",
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
