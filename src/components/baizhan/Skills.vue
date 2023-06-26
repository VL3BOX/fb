<template>
    <div class="p-skills">
        <div class="m-search"></div>
        <div class="m-table">
            <div class="u-item u-header">
                <div class="u-card" v-for="item in keyList" :key="item.label">{{ item.label }}</div>
            </div>
            <div class="u-item" v-for="skill in skills" :key="skill.dwInSkillID">
                <div class="u-card">
                    <SkillIcon :source="skill"></SkillIcon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getBosses, getBuffs, getEffects, getSkills } from "@/service/baizhan";
import { removeEmpty } from "@/utils";
import SkillIcon from "./SkillIcon.vue";
export default {
    name: "Skills",
    components: {
        SkillIcon,
    },
    props: {
        types: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            skills: [],
            cost: null, // 技能占用点数
            type: "", // 技能类型
            color: "", // 技能颜色
            boss: "", // 技能所属BOSS 模糊查询
            name: "", // 技能名称 模糊查询
            page: 1,
            limit: 30,
            total: 0,
            keyList: [
                {
                    label: "技能",
                    key: "",
                },
                {
                    label: "CD",
                    key: "",
                },
                {
                    label: "消耗点数",
                    key: "",
                },
                {
                    label: "精耐消耗",
                    key: "",
                },
                {
                    label: "精耐打击",
                    key: "",
                },
                {
                    label: "备注",
                    key: "",
                },
            ],
        };
    },
    computed: {
        params() {
            return {
                cost: this.cost,
                type: this.type,
                color: this.color,
                boss: this.boss,
                name: this.name,
                page: this.page,
                limit: this.limit,
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
    },
    methods: {
        load() {
            const params = removeEmpty(this.params);
            getSkills(params).then((res) => {
                this.skills = res.data?.data?.list || [];
                this.total = res.data?.data?.total || 0;
            });
        },
    },
    mounted() {
        this.load();
        getEffects().then((res) => {
            console.log(res);
        });
        getBuffs().then((res) => {
            console.log(res);
        });
        getBosses().then((res) => {
            console.log(res);
        });
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/skills.less";
</style>
