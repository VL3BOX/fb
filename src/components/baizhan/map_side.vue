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
                <img src="@/assets/img/baizhan/baizhan_purple.svg" svg-inline />
                <div class="u-title">百战异闻录</div>
            </div>
            <div class="u-time">最后更新时间: {{ update_time }}</div>
            <div class="u-tabs" v-if="maps.length">
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
                        <!-- <div class="u-index">{{ (activeIndex - 1) * per + index + 1 }}</div> -->
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
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { moment } from "@jx3box/jx3box-common/js/moment";
import { cloneDeep } from "lodash";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "MapSide",
    data() {
        return {
            loading: false,
            base: 3,
            activeIndex: 1,
            qq: "785597424",
        };
    },
    computed: {
        ...mapState({
            bosses: (state) => state.baizhan.bosses,
            effects: (state) => state.baizhan.effects,
            maps: (state) => state.baizhan.maps,
        }),
        update_moment() {
            return moment(this.$store.state.baizhan.map.updated_at);
        },
        update_time() {
            return this.update_moment.format("YYYY/MM/DD HH:mm:ss");
        },
        per() {
            return this.maps.length / this.base;
        },
        mapList() {
            const list = [];
            let per = this.per;
            const maps = cloneDeep(this.maps);
            for (let i = 0; i < this.base; i++) {
                list.push(maps.slice(i * per, (i + 1) * per));
            }
            return list;
        },
        client() {
            return this.$store.state.client;
        },
    },
    watch: {
        activeIndex(index) {
            const baseIndex = this.maps.length / this.base;
            const refIndex = (index - 1) * baseIndex ? (index - 1) * baseIndex - 1 : 0;
            this.$refs.mapItem[refIndex].scrollIntoView({
                behavior: "smooth",
                block: refIndex ? "start" : "center",
            });
        },
    },
    methods: {
        ...mapActions({
            loadBosses: "baizhan/loadBosses",
            loadSkills: "baizhan/loadSkills",
            loadEffects: "baizhan/loadEffects",
            loadMap: "baizhan/loadMap",
        }),
        iconLink,
        getSpecialStyle(i) {
            // const index = (this.activeIndex - 1) * this.per + i + 1;
            const index = i + 1;
            return !(index % 10) ? "is-special" : "";
        },
        toMap(i) {
            const url = `${location.origin}/fb/baizhan?floor=${i + 1}`;
            window.open(url, "_blank");
        },
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
    mounted() {
        this.load();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/map_side.less";
</style>
