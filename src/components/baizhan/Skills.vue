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
        <div class="m-table">
            <div class="u-item u-header">
                <div class="u-card" v-for="item in headList" :key="item">{{ item }}</div>
            </div>
            <div class="u-item" v-for="skill in skills" :key="skill.dwInSkillID">
                <div class="u-card">
                    <SkillIcon :source="skill"></SkillIcon>
                </div>
                <div class="u-card">{{ skill.szBossName }}</div>
                <div class="u-card">
                    <div class="u-points">
                        <img v-for="point in skill.nCost" :key="point" :src="`${__imgRoot}baizhan_6.png`" />
                    </div>
                </div>
            </div>
            <el-button
                class="u-more"
                v-show="hasNextPage"
                type="primary"
                @click="appendPage"
                :loading="loading"
                icon="el-icon-arrow-down"
                >加载更多</el-button
            >
            <el-pagination
                class="m-pages"
                background
                layout="total, prev, pager, next, jumper"
                :hide-on-single-page="true"
                :page-size="limit"
                :total="total"
                :current-page.sync="page"
                @current-change="handleCurrentChange"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import { getSkills } from "@/service/baizhan";
import { removeEmptyIncludeZero } from "@/utils";
import SkillIcon from "./SkillIcon.vue";
export default {
    name: "Skills",
    inject: ["__imgRoot"],
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
            loading: false,
            skills: [],
            cost: 0, // 技能占用点数
            type: 0, // 技能类型
            color: 0, // 技能颜色
            boss: "", // 技能所属BOSS 模糊查询
            name: "", // 技能名称 模糊查询
            keyword: "",
            page: 1,
            limit: 30,
            total: 0,
            headList: ["技能", "所属BOSS", "点数消耗", "技能CD", "精耐消耗", "精耐打击", "备注"],
        };
    },
    computed: {
        params() {
            return {
                cost: this.cost,
                type: this.type,
                color: this.color,
                keyword: this.keyword,
            };
        },
        query() {
            return {
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
        hasNextPage() {
            return this.page < this.total / this.limit;
        },
    },
    watch: {
        params: {
            deep: true,
            handler() {
                this.page = 1;
                this.load();
            },
        },
    },
    methods: {
        getColor(color) {
            return this.colors.find((item) => item.ID === color)?.TypeName || "";
        },
        load(isAppend = false) {
            const params = removeEmptyIncludeZero(this.params);
            const data = Object.assign(params, this.query);
            this.loading = true;
            getSkills(data)
                .then((res) => {
                    if (isAppend) {
                        const list = res.data?.data?.list || [];
                        this.skills = this.skills.concat(list);
                    } else {
                        this.skills = res.data?.data?.list || [];
                    }
                    this.total = res.data?.data?.total || 0;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        handleCurrentChange() {
            this.load();
        },
        appendPage() {
            this.page++;
            this.load(true);
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
