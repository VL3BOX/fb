<template>
    <div class="w-card m-map-filter">
        <div class="w-card-title">
            <img src="@/assets/img/baizhan/filter.svg" alt="筛选" />
            <span>筛选</span>
        </div>
        <div class="m-section-title">特殊效果</div>
        <div class="m-filter-list">
            <div
                class="u-filter"
                :class="activeEffectKey === effect.key && 'is-active'"
                v-for="(effect, index) in effectsFilter"
                :key="index"
                @click="setEffect(effect)"
            >
                {{ effect.text }}
            </div>
        </div>
        <div class="m-section-title m-boss-title">首领</div>
        <div class="m-filter-list">
            <div
                class="u-filter"
                :class="currentBossName === bossName && 'is-active'"
                v-for="(bossName, index) in bossNames"
                :key="index"
                @click="setBoss(bossName)"
            >
                {{ bossName }}
            </div>
        </div>
    </div>
</template>

<script>
import { getWeekStartDate, getWeekEndDate } from "@/utils/dateFormat";
import { effectsFilter } from "@/assets/data/baizhan_effects.js";
import { getEffectInfo } from "@/assets/js/baizhan";
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
import { mapState } from "vuex";
export default {
    name: "BaizhanMainTabs",
    data() {
        return {
            tabs: [
                {
                    label: "百战地图",
                    value: "map",
                },
                {
                    label: "技能列表",
                    value: "skill",
                },
                {
                    label: "首领信息",
                    value: "boss",
                },
            ],
            startDate: getWeekStartDate(),
            endDate: getWeekEndDate(),
            effectsFilter,
        };
    },
    computed: {
        ...mapState({
            currentEffect: (state) => state.baizhan.currentEffect,
            activeTab: (state) => state.baizhan.activeTab,
            currentBossName: (state) => state.baizhan.currentBossName,
        }),
        bossNames() {
            return this.$store.getters["baizhan/bossNames"];
        },
        activeBossId() {
            return this.currentBoss?.dwBossID || 0;
        },
        activeEffectKey() {
            return this.currentEffect?.key;
        },
    },
    watch: {
        currentBoss: {
            deep: true,
            handler(boss) {
                const floor = ~~boss?.floor;
                let index = 0;
                if (floor > 10) {
                    index = floor - 1;
                }
                this.$refs.floor[index].scrollIntoView({
                    behavior: "smooth",
                    block: "center",
                });
            },
        },
    },
    methods: {
        setActiveTab(tab) {
            this.$store.commit("baizhan/setState", {
                key: "activeTab",
                val: tab,
            });
        },
        getEffectInfo,
        setEffect(effect) {
            let val = effect;
            if (effect.key === this.currentEffect.key) {
                val = {};
            }
            this.$store.commit("baizhan/setState", {
                key: "currentEffect",
                val: val,
            });
        },
        setBoss(bossName) {
            let val = bossName;
            if (bossName === this.currentBossName) {
                val = "";
            }
            this.$store.commit("baizhan/setState", {
                key: "currentBossName",
                val: val,
            });
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/map_filter.less";
</style>
