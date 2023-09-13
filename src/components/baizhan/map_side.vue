<template>
    <div class="m-list-side">
        <!-- 群号 -->
        <RightSideMsg>
            <em>全服团长交流群</em> :
            <strong @click="onQQClick" class="u-link" title="点击复制">
                <a>{{ qq }}</a>
            </strong>
        </RightSideMsg>
        <div class="m-map-side" v-if="client == 'std'">
            <div class="m-header">
                <a href="javascript:;" @click="toMap">
                    <img src="@/assets/img/baizhan/baizhan_purple.svg" svg-inline />
                    <span class="u-title">百战异闻录</span>
                </a>
            </div>
            <div class="u-time">最后更新时间: {{ update_time }}</div>
            <BMap mode="list"></BMap>
            <!-- <div class="u-tabs" v-if="maps.length">
                <div
                    class="u-tab"
                    :class="activeIndex === i && 'is-active'"
                    v-for="i in base"
                    :key="i"
                    @click="activeIndex = i"
                >
                    {{ (i - 1) * per + 1 }}~{{ i * per }}
                </div>
            </div>
            <div class="u-list" v-if="maps.length">
                <div
                    class="u-item"
                    ref="mapItem"
                    :class="getSpecialStyle(index)"
                    v-for="(item, index) in maps"
                    :key="item.dwBossID"
                    @click="toMap(index)"
                >
                    <div class="u-item-left">
                        <div class="u-index">{{ index + 1 }}</div>
                        <div class="u-avatar">
                            <img :src="item.bossAvatar" :alt="item.bossName" />
                        </div>
                        <div class="u-name">{{ item.bossName }}</div>
                    </div>
                    <div v-if="item.nEffectID" class="u-item-right">
                        <img :src="iconLink(item.effect.dwIconID)" />
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import { moment } from "@jx3box/jx3box-common/js/moment";
import BMap from "@jx3box/jx3box-bmap/src/components/BMap.vue";
export default {
    name: "MapSide",
    components: {
        BMap,
    },
    data() {
        return {
            loading: false,
            qq: "785597424",
        };
    },
    computed: {
        update_moment() {
            return moment(this.$store.state.baizhan.map.updated_at);
        },
        update_time() {
            return this.update_moment.format("YYYY/MM/DD HH:mm:ss");
        },
        client() {
            return this.$store.state.client;
        },
    },
    methods: {
        toMap() {
            let url = `${location.origin}/fb/baizhan`;
            window.open(url, "_blank");
        },
        onQQClick() {
            navigator.clipboard.writeText(this.qq).then(() => {
                this.$notify({
                    title: "复制成功",
                    message: "内容：" + this.qq,
                    type: "success",
                });
            });
        },
    },
    mounted() {},
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/map_side.less";
</style>
