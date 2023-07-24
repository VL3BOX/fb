<template>
    <div class="m-right-info">
        <div v-if="currentBoss.dwBossID" class="u-boss-info">
            <div class="u-name-wrap">
                <img class="u-avatar" :src="currentBoss.bossAvatar" :alt="currentBoss.bossName" />
                <div class="u-name-info">
                    <div class="u-floor">第{{ currentBoss.floor }}层</div>
                    <div class="u-name">{{ currentBoss.bossName }}</div>
                </div>
            </div>
            <div class="u-effect-wrap">
                <div class="u-title">层数效果</div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "BInfo",
    props: {
        active: {
            type: Number,
            default: 0,
        },
    },
    computed: {
        ...mapState({
            currentBoss: (state) => state.baizhan.currentBoss,
            effects: (state) => state.baizhan.effects,
        }),
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/info.less";
</style>
