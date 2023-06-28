<template>
    <div class="p-map">
        <div class="m-left">
            <div class="m-title">
                <div class="u-title"></div>
                <div class="u-date">
                    <div class="u-time">{{ startDate }}</div>
                    <div>|</div>
                    <div class="u-time">{{ endDate }}</div>
                </div>
                <el-button
                    class="u-edit"
                    v-if="isEditor"
                    :icon="!editStatus ? 'el-icon-edit-outline' : ''"
                    :loading="loading"
                    @click="toOperate"
                    >{{ editStatus ? "立即上传" : "编辑" }}</el-button
                >
            </div>
            <div class="m-boss-list">
                <div class="u-step" v-for="(item, step) in list" :key="step">
                    <div
                        class="u-floor"
                        :class="[
                            activeFloor === step * 10 + index + 1 ? 'is-active' : '',
                            currentBoss === floor.boss ? 'is-current' : '',
                        ]"
                        v-for="(floor, index) in item"
                        :key="index"
                        @click="setFloor(step * 10 + index + 1, step)"
                    >
                        <div class="u-img">
                            <img :src="getBossAvatar(floor.boss)" :alt="floor.boss || '未知'" />
                        </div>

                        <div class="u-index" :class="floor.effect && 'u-effect'">
                            {{ step * 10 + index + 1 }}
                        </div>
                        <div class="u-icon">
                            <img :src="getEffectIcon(floor.effect)" />
                        </div>
                        <div class="u-name" :class="currentBoss === floor.boss && 'is-current'">{{ floor.boss }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="m-right">
            <div v-if="editStatus" class="m-edit-wrap">
                <div class="m-header">
                    <div class="u-title">{{ activeFloor }}</div>
                </div>
                <div class="m-form">
                    <el-select v-model="currentFloor.level" disabled placeholder="请选择BOSS级别">
                        <el-option v-for="level in step" :key="level" :value="level" :label="`${level}阶`"></el-option>
                    </el-select>
                    <el-select v-model="currentFloor.boss" placeholder="请选择BOSS">
                        <el-option v-for="boss in bosses" :key="boss.name" :value="boss.name" :label="boss.name">
                            <div class="u-effect-option">
                                <img :src="boss.avatar" :alt="boss.name" />
                                <span>{{ boss.name }}</span>
                            </div>
                        </el-option>
                    </el-select>
                    <el-select v-model="currentFloor.effect" placeholder="请选择层数效果">
                        <el-option
                            v-for="effect in effects"
                            :key="effect.nID"
                            :value="effect.nID"
                            :label="effect.szName"
                        >
                            <div class="u-effect-option">
                                <img :src="iconLink(effect.dwIconID)" :alt="effect.szName" />
                                <span>{{ effect.szName }}</span>
                            </div>
                        </el-option>
                    </el-select>
                    <el-button @click="save">保存</el-button>
                </div>
            </div>
            <div v-else class="m-show-wrap">
                <div class="m-header">
                    <div class="u-title">{{ activeFloor }}</div>
                    <div class="u-boss-name">{{ currentFloor.boss || "未知" }}</div>
                    <div class="u-avatar">
                        <img :src="getBossAvatar(currentFloor.boss)" :alt="currentFloor.boss || '未知'" />
                    </div>
                </div>
                <div v-if="getRewardList().length" class="m-reward">
                    <div class="u-title"></div>
                    <div class="u-rewards">
                        <SkillIcon
                            class="u-reward"
                            :source="{
                                dwInSkillID: skill,
                            }"
                            v-for="skill in getRewardList()"
                            :key="skill"
                        ></SkillIcon>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { getBuffs, getEffects, getMap, addMap } from "@/service/baizhan";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
import { arr1to2 } from "@/utils";
import { getWeekStartDate, getWeekEndDate } from "@/utils/dateFormat";
import { cloneDeep } from "lodash";
import SkillIcon from "./SkillIcon.vue";
export default {
    name: "BaizhanMap",
    inject: ["__imgRoot"],
    props: ["bosses"],
    components: {
        SkillIcon,
    },
    data() {
        return {
            loading: false,
            editStatus: false,
            data: [],
            effects: [],
            startDate: getWeekStartDate(),
            endDate: getWeekEndDate(),
            point: {
                level: 1,
                boss: "",
                effect: 0,
            },
            step: 6,
            row: 10,
            activeFloor: 1, // 当前层数 BOSS
            currentStep: 1, // 当前阶段
            currentFloor: {
                level: 1,
                boss: "",
                effect: 0,
            },
        };
    },
    computed: {
        currentBoss() {
            return this.$store.state.baizhanBoss;
        },
        isEditor: function () {
            return User.isEditor();
        },
        list() {
            const data = cloneDeep(this.data);
            return arr1to2(data, this.row);
        },
    },
    watch: {
        activeFloor: {
            immediate: true,
            handler(index) {
                const point = cloneDeep(this.point);
                const data = cloneDeep(this.data);
                const floor = data?.[index - 1] || point;
                floor.level = this.currentStep;
                this.currentFloor = floor;
            },
        },
    },
    methods: {
        getRewardList() {
            const boss_name = this.currentFloor.boss;
            return this.bosses.find((item) => item.name === boss_name)?.skills || [];
        },
        getBossAvatar(name) {
            const avatar =
                this.bosses.find((item) => item.name === name)?.avatar || `${this.__imgRoot}fbcdpanel02_51.png`;
            return avatar;
        },
        getEffectIcon(id) {
            const iconId = this.effects.find((item) => item.nID === id)?.dwIconID || 18005;
            return iconLink(iconId);
        },
        save() {
            const currentFloor = cloneDeep(this.currentFloor);
            this.$set(this.data, this.activeFloor - 1, currentFloor);
            this.$notify({
                message: `第${this.activeFloor}层保存成功！`,
                type: "success",
            });
        },
        toOperate() {
            if (this.editStatus) {
                // 编辑状态 保存
                if (this.loading) return;
                const isAll = this.data.every((item) => item.boss);
                const message = isAll ? "确认是否上传？" : "数据尚未添加完整，确认是否临时保存？";
                this.$confirm(message, "温馨提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                    .then(() => {
                        this.addMap().then(() => {
                            this.editStatus = false;
                        });
                    })
                    .catch(() => {});
            } else {
                // 去编辑
                this.editStatus = true;
            }
        },
        setFloor(index, step) {
            this.currentStep = step + 1;
            this.activeFloor = index;
        },
        iconLink,
        async addMap() {
            this.loading = true;
            const isAll = this.data.every((item) => item.boss);
            const formData = {
                start: this.startDate + " 14:00",
                data: this.data,
                enable: ~~isAll,
            };
            await addMap(formData)
                .then((res) => {
                    console.log(res);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        load() {
            getMap().then((res) => {
                const data = res.data?.data?.data;
                const total = this.step * this.row;
                const point = cloneDeep(this.point);
                if (!data || data.length < total) {
                    const list = new Array(total).fill(point);
                    this.data = list;
                } else {
                    this.data = data;
                }
                this.currentFloor = this.data[0];
            });
        },
        loadBuffs() {
            getBuffs().then((res) => {
                // console.log(res.data?.data);
            });
        },
        loadEffects() {
            getEffects().then((res) => {
                const list = res.data?.data || [];
                list.unshift({
                    nID: 0,
                    dwIconID: 18505,
                    szName: "无",
                    szDescription: "",
                });
                this.effects = list;
            });
        },
    },
    mounted() {
        this.load();
        // this.loadBuffs();
        this.loadEffects();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/map.less";
</style>
