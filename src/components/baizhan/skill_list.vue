<template>
    <div class="p-skills">
        <div class="m-search">
            <el-select v-model="type" placeholder="技能效果">
                <el-option v-for="item in szTypes" :key="item.ID" :value="item.ID" :label="item.TypeName"></el-option>
            </el-select>
            <el-select v-model="color" placeholder="技能颜色">
                <el-option v-for="item in colors" :key="item.ID" :value="item.ID" :label="item.TypeName"></el-option>
            </el-select>
            <el-select v-model="cost" placeholder="点数消耗">
                <el-option v-for="item in costs" :key="item.ID" :value="item.ID" :label="item.TypeName"></el-option>
            </el-select>
            <el-input v-model="keyword" placeholder="请输入技能名称或BOSS名称" clearable></el-input>
        </div>
        <el-table ref="table" class="m-table" :data="skills">
            <el-table-column label="技能" width="200">
                <template #default="{ row: skill }">
                    <div class="u-skill-cell">
                        <SkillIcon :source="skill"></SkillIcon>
                        <a v-if="isEditor" class="u-edit" @click.stop="toEdit(skill)">
                            <i class="el-icon-edit-outline"></i>
                        </a>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="szBossName" label="所属Boss" sortable> </el-table-column>
            <el-table-column prop="nCost" label="点数" align="center" sortable width="80">
                <template #default="{ row: skill }">
                    <div class="u-points">
                        <img v-for="point in skill.nCost" :key="point" :src="`${__imgRoot}baizhan_6.png`" />
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="select_level" label="等级" align="center" width="120">
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
            <el-table-column prop="_remarks" label="备注"></el-table-column>
        </el-table>
        <SkillForm ref="editAddon" :staged="staged" @update="handleUpdate($event)" @close="close" />
    </div>
</template>

<script>
import { mapState } from "vuex";
import SkillIcon from "./skill_icon.vue";
import SkillForm from "./SkillForm.vue";
import User from "@jx3box/jx3box-common/js/user";

import { getAppID } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "Skills",
    inject: ["__imgRoot"],
    components: {
        SkillIcon,
        SkillForm,
    },
    data: () => ({
        id: getAppID(),
        loading: false,
        skills: [],
        skillAddon: {},
        allLevel: 5,
        staged: {},

        cost: 0, // 技能占用点数
        type: 0, // 技能类型
        color: 0, // 技能颜色
        boss: "", // 技能所属BOSS 模糊查询
        name: "", // 技能名称 模糊查询
        keyword: "",

        addon_key: ["cooldown", "damage", "cost_vigor", "cost_endurance", "hit_vigor", "hit_endurance", "remarks"],
    }),
    computed: {
        ...mapState({
            types: (state) => state.baizhan.types,
            skillList: (state) => state.baizhan.skills,
            skillExtraList: (state) => state.baizhan.skillExtraList,
            currentBoss: (state) => state.baizhan.currentBoss,
        }),
        params() {
            return {
                color: this.color,
                cost: this.cost,
                // name: this.name,
                type: this.type,
                keyword: this.keyword,
            };
        },
        colors() {
            return this.types.colors;
        },
        costs() {
            return this.types.costs;
        },
        szTypes() {
            return this.types.szTypes;
        },
        isEditor: function () {
            return User.isEditor();
        },
    },
    watch: {
        currentBoss: {
            deep: true,
            handler(boss) {
                this.keyword = boss.bossName;
            },
        },
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
                const { color, cost, type, keyword } = params;
                if (!color && !cost && !keyword && !type) {
                    return (this.skills = this.skillList);
                }
                this.skills = this.skillList.filter((item) => {
                    return (
                        (!color || item.nColor === color) &&
                        (!cost || item.nCost === cost) &&
                        (!type || item.szType.includes(type)) &&
                        (!keyword ||
                            item?.szBossName?.indexOf(keyword) > -1 ||
                            item?.szSkillName?.indexOf(keyword) > -1)
                    );
                });
            },
        },
    },
    methods: {
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
    mounted() {
        this.load();
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/skills.less";
</style>
