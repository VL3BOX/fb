<template>
    <div class="m-tabs">
        <div class="m-tab-wrap">
            <div class="u-tab-list">
                <div
                    class="u-tab"
                    :class="tab.value === activeTab && 'is-active'"
                    v-for="tab in tabs"
                    :key="tab.value"
                    @click="activeTab = tab.value"
                >
                    <img
                        :src="
                            require(`@/assets/img/baizhan/${
                                tab.value === activeTab ? tab.value + '_active' : tab.value
                            }.svg`)
                        "
                        svg-inline
                        :alt="tab.label"
                    />
                    <div class="u-name">{{ tab.label }}</div>
                </div>
            </div>
            <div v-if="activeTab === 'map'" class="u-map-time">{{ startDate }} ~ {{ endDate }}</div>
        </div>
        <div class="m-search">
            <div class="u-header">
                <img src="@/assets/img/baizhan/filter.svg" svg-inline alt="筛选" />
                <h2>筛选</h2>
            </div>
            <div class="m-effects">
                <div class="u-title">特殊效果</div>
                <div class="u-effect-list">
                    <div
                        class="u-effect"
                        :class="activeEffectIndex === i && 'is-active'"
                        v-for="(effect, i) in effectsFilter"
                        :key="effect.key"
                        @click="setEffect(i)"
                    >
                        <img :src="require(`@/assets/img/baizhan/${effect.key}.svg`)" :alt="effect.text" />
                        <span>{{ effect.text }}</span>
                    </div>
                </div>
            </div>
            <div class="m-tab-bosses">
                <div class="u-title">每层首领</div>
                <div class="u-boss-list">
                    <div
                        class="u-tab-boss"
                        :class="activeBossId === floor.dwBossID && 'is-active'"
                        v-for="floor in maps"
                        :key="floor.dwBossID"
                        @click="setBoss(boss)"
                    >
                        <img class="u-avatar" :src="floor.boss.avatar" :alt="floor.bossName" />
                        <span>{{ floor.bossName }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getWeekStartDate, getWeekEndDate } from "@/utils/dateFormat";
import { effectsFilter } from "@/assets/data/baizhan_effects.js";
export default {
    name: "BTabs",
    props: ["maps"],
    data() {
        return {
            activeTab: "map",
            activeEffectIndex: -1,
            activeBossId: 0,
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
    methods: {
        setEffect(i) {
            if (this.activeEffectIndex === i) {
                this.activeEffectIndex = -1;
            } else {
                this.activeEffectIndex = i;
            }
        },
        setBoss(boss) {
            console.log(boss);
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/tabs.less";
</style>
