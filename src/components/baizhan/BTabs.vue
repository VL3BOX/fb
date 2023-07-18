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
        <div class="m-search"></div>
    </div>
</template>

<script>
import { getWeekStartDate, getWeekEndDate } from "@/utils/dateFormat";
export default {
    name: "BTabs",
    data() {
        return {
            activeTab: "map",
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
        };
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/tabs.less";
</style>
