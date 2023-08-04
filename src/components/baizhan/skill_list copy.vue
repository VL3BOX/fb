<template>
    <div class="p-skills">
        <el-table ref="table" class="m-table" :data="skills" height="86vh">
            <el-table-column label="技能">
                <template #default="{ row: skill }">
                    <div class="u-skill-cell">
                        <!-- <SkillIcon :source="skill"></SkillIcon>-->
                        <img :src="iconLink(skill.skillIconId)" />
                        <span>{{ skill.szSkillName }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="szBossName" label="所属Boss"></el-table-column>
            <el-table-column prop="nCost" label="点数">
                <template #default="{ row: skill }">
                    <div class="u-points">
                        <img v-for="point in skill.nCost" :key="point" :src="`${__imgRoot}baizhan_6.png`" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="nColor" label="颜色"></el-table-column>
            <el-table-column prop="szType" label="效果"></el-table-column>
            <!-- <el-table-column prop="select_level" label="等级" align="center" width="120">
                <template #header>
                    <div class="u-level-select-header">
                        <el-select size="mini" v-model="allLevel" placeholder="重数" @change="changeAllLevel">
                            <el-option v-for="item in 6" :key="item" :value="item" :label="`第 ${item} 重`"></el-option>
                        </el-select>
                    </div>
                </template>
                <template #default="{ row: skill }">
                    <div v-if="skill.InSkill">
                        <el-select
                            v-model="skill._select_level"
                            size="mini"
                            placeholder="重数"
                            @change="applyAddon(skill)"
                        >
                            <el-option
                                v-for="item in Number(skill.InSkill.MaxLevel)"
                                :key="item"
                                :value="item"
                                :label="`第 ${item} 重`"
                            ></el-option>
                        </el-select>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="_cooldown" label="冷却时间" sortable>
                <template #default="{ row: skill }">
                    <div v-if="skill._cooldown == 60" class="u-cooldown-60">三级 - 60s</div>
                    <div v-if="skill._cooldown == 30" class="u-cooldown-30">二级 - 30s</div>
                    <div v-if="skill._cooldown == 10" class="u-cooldown-10">一级 - 10s</div>
                    <div v-if="skill._cooldown == 0" class="u-cooldown-0">被动技能</div>
                </template>
            </el-table-column>
            <el-table-column prop="_damage" label="伤害" sortable></el-table-column>
            <el-table-column prop="_cost_vigor" label="精力消耗" sortable>
                <template #default="{ row: skill }">
                    <div class="u-vigor-about">{{ skill._cost_vigor }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="_cost_endurance" label="耐力消耗" sortable>
                <template #default="{ row: skill }">
                    <div class="u-endurance-about">{{ skill._cost_endurance }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="_hit_vigor" label="精力打击" sortable>
                <template #default="{ row: skill }">
                    <div class="u-vigor-about">{{ skill._hit_vigor }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="_hit_endurance" label="耐力打击" sortable>
                <template #default="{ row: skill }">
                    <div class="u-vigor-about">{{ skill._hit_endurance }}</div>
                </template>
            </el-table-column>
            <el-table-column prop="_remarks" label="备注"></el-table-column> -->
        </el-table>
        <SkillForm ref="editAddon" :staged="staged" @update="handleUpdate($event)" @close="close" />
    </div>
</template>

<script>
import { mapState } from "vuex";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
import SkillIcon from "./skill_icon.vue";
import SkillForm from "./SkillForm.vue";
import User from "@jx3box/jx3box-common/js/user";
import { isPhone } from "@/utils";

import { getAppID } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Skills",
    inject: ["__imgRoot"],
    components: {
        // SkillIcon,
        SkillForm,
    },
    data: () => ({
        id: getAppID(),
        loading: false,
        skills: [],
        skillAddon: {},
        allLevel: 5,
        staged: {},

        addon_key: ["cooldown", "damage", "cost_vigor", "cost_endurance", "hit_vigor", "hit_endurance", "remarks"],
    }),
    computed: {
        ...mapState({
            types: (state) => state.baizhan.types,
            skillList: (state) => state.baizhan.skills,
            skillExtraList: (state) => state.baizhan.skillExtraList,
            currentBoss: (state) => state.baizhan.currentBoss,
            params: (state) => state.baizhan.skillParams,
        }),
        skillColors() {
            return this.types.skill_colors;
        },
        skillCosts() {
            return this.types.skill_costs;
        },
        skillTypes() {
            return this.types.skill_types;
        },
        isEditor: function () {
            return User.isEditor();
        },
    },
    watch: {
        skillList: {
            immediate: true,
            deep: true,
            handler(list) {
                this.skills = list;
            },
        },
        params: {
            deep: true,
            handler(params) {
                const { color, cost, type, name, bossName } = params;
                if (!color && !cost && !name && !type && !bossName) {
                    return (this.skills = this.skillList);
                }
                this.skills = this.skillList.filter((item) => {
                    return (
                        (!color || item.nColor === color) &&
                        (!cost || item.nCost === cost) &&
                        (!bossName || item.szBossName === bossName) &&
                        (!type || item.szType.includes(type)) &&
                        (!name || item?.szSkillName?.indexOf(name) > -1)
                    );
                });
            },
        },
        skillExtraList: {
            immediate: true,
            deep: true,
            handler(list) {
                if (list.length) {
                    this.load();
                }
            },
        },
    },
    methods: {
        iconLink,
        isPhone,
        changeAllLevel() {
            for (let item of this.skills)
                this.$set(item, "_select_level", Math.min(item?.InSkill?.MaxLevel ?? this.allLevel, this.allLevel));
            this.applyAllAddon();
        },
        toEdit(item) {
            this.staged = item;
            const { dwInSkillID: skill_id, _select_level: level } = item;
            const addon = this.skillAddon[skill_id]?.[level];
            this.$refs["editAddon"].open(addon ?? { skill_id: skill_id });
        },
        close() {
            this.visible = false;
        },
        getColor(color) {
            return this.colors.find((item) => item.ID === color)?.TypeName || "";
        },
        addAddon(addon) {
            const { skill_id, level } = addon;
            if (!this.skillAddon[skill_id]) this.skillAddon[skill_id] = {};
            this.skillAddon[skill_id][level] = addon;
        },
        handleUpdate(data) {
            this.addAddon(data);
            const { skill_id } = data;
            const skill = this.skills.find((s) => s.dwInSkillID == skill_id);
            skill.extra = {
                ...skill.extra,
                ...data,
            };
            this.applyAddon(skill);
            sessionStorage.setItem(`baizhan-skills`, JSON.stringify(this.skills));
            const skillExtraList = this.skillExtraList.map((item) => {
                if (item.skill_id === skill_id) {
                    item = {
                        ...item,
                        ...data,
                    };
                }
                return item;
            });
            sessionStorage.setItem(`baizhan-skillExtraList`, JSON.stringify(skillExtraList));
        },
        load() {
            const skillAddonList = this.skillExtraList;
            for (let addon of skillAddonList) this.addAddon(addon);
            this.changeAllLevel();
        },
        applyAllAddon() {
            for (let skill of this.skills) this.applyAddon(skill);
        },
        applyAddon(skill) {
            const { dwInSkillID: skill_id, _select_level: level } = skill;
            const addon = this.skillAddon[skill_id]?.[level];
            // console.log(skill_id, level, addon);
            for (let key of this.addon_key) {
                this.$set(skill, `_${key}`, addon?.[key]);
            }
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/skills.less";
</style>
