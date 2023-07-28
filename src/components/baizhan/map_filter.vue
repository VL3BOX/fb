<template>
    <div class="m-map-filter w-card">
        <div class="w-card-title">
            <img src="@/assets/img/baizhan/filter.svg" alt="筛选" />
            <span>筛选</span>
        </div>
        <div class="m-section-title">特殊效果</div>
        <div class="m-filter-list">
            <div
                class="u-effect"
                :class="activeEffectKey === effect.key && 'is-active'"
                v-for="(effect, index) in effectsFilter"
                :key="index"
                @click="setEffect(effect)"
            >
                <img :src="require(`@/assets/img/baizhan/effect/${effect.key}.svg`)" :alt="effect.text" />
                <span>{{ effect.text }}</span>
            </div>
        </div>
        <div class="m-section-title">首领筛选</div>
        <div class="m-filter-boss">
            <div class="u-boss-list">
                <div
                    class="u-tab-boss"
                    :class="activeBossId === floor.dwBossID && 'is-active'"
                    v-for="(floor, i) in maps"
                    :key="floor.dwBossID"
                    ref="floor"
                    @click="setBoss(floor, i)"
                >
                    <i class="u-index">{{ i + 1 }}</i>
                    <img class="u-avatar" :src="floor.bossAvatar" :alt="floor.bossName" />
                    <span>{{ floor.bossName }}</span>
                    <a
                        v-if="floor.bossLink"
                        class="u-link"
                        :title="`${floor.bossName}攻略`"
                        :href="floor.bossLink"
                        target="_blank"
                        @click.stop
                    >
                        <i class="el-icon-link"></i>
                    </a>
                    <img
                        v-if="activeTab === 'map' && floor.nEffectID"
                        class="u-effect-img"
                        :src="getEffectInfo(effects, floor.nEffectID)"
                        :alt="getEffectInfo(effects, floor.nEffectID, 'name')"
                        @click.stop="toBuff(floor)"
                    />
                </div>
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
            effects: (state) => state.baizhan.effects,
            maps: (state) => state.baizhan.maps,
            currentBoss: (state) => state.baizhan.currentBoss,
            currentEffect: (state) => state.baizhan.currentEffect,
            activeTab: (state) => state.baizhan.activeTab,
        }),
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
        setBoss(floor, i) {
            let val = floor;
            if (floor.dwBossID === this.currentBoss.dwBossID) {
                val = {};
            }
            this.$store.commit("baizhan/setState", {
                key: "currentBoss",
                val: Object.assign(val, {
                    floor: i + 1,
                }),
            });
        },
        toBuff(floor) {
            const domain = process.env.NODE_ENV === "development" ? __Root : location.origin + "/";
            const url = domain + `app/database/?type=buff&query=${floor.effect.buffID}&level=${floor.effect.buffLevel}`;
            window.open(url, "_blank");
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/map_filter.less";
</style>
