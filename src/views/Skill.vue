<template>
    <div class="m-fb-skill">
        <!-- BOSS切换 -->
        <div class="m-skill-index">
            <el-tabs v-model="focus" type="card" @tab-click="loadLua">
                <el-tab-pane
                    v-for="(boss, i) in subnav"
                    :label="boss"
                    :key="i"
                    :name="boss"
                ></el-tab-pane>
            </el-tabs>
        </div>

        <!-- <el-input
            class="m-skill-search"
            placeholder="请输入技能名称"
            v-model="search"
            @change="searchSkill"
        >
            <template slot="prepend">技能名称</template>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input> -->

        <ul class="m-skill-list" v-if="done" v-loading="loading">
            <li v-for="(skill, key) in data" class="u-item" :key="key">
                <img class="u-icon" src="../assets/img/iboss.png" />
                <span class="u-id">
                    <i class="u-logo"
                        ><img
                            svg-inline
                            src="../assets/img/logo.svg"
                        />JX3BOX</i
                    >
                    <!-- <span class="u-idn">ID:{{ skill.ID }}</span> -->
                </span>

                <div class="u-title">
                    <span class="u-name">{{ key }}</span>
                    <div class="u-damage" v-if="skill.tSkillData.length">
                        <span class="u-label">伤害值 : </span>
                        <span
                            class="u-data-group"
                            v-for="(g, i) in skill.tSkillData"
                            :key="i"
                        >
                            <span>
                                <em>nDamageBase</em>
                                <b>{{ keymap.nDamageBase.desc }}</b>
                                <strong>{{ g.nDamageBase }}</strong>
                            </span>
                            <!-- <span>
                                <em>nDamageRand</em>
                                <b>{{ keymap.nDamageRand.desc }}</b>
                                <strong>{{ g.nDamageRand }}</strong>
                            </span> -->
                            <!-- <span>
                                <em>nCostMana</em>
                                <b>{{ keymap.nCostMana.desc }}</b>
                                <strong>{{ g.nCostMana }}</strong>
                            </span> -->
                        </span>
                    </div>
                </div>

                <div class="u-props" v-if="skill.props.length">
                    <div class="u-prop" v-for="(g, i) in skill.props" :key="i">
                        <b>{{
                            keymap[g.prop] ? keymap[g.prop].desc : g.prop
                        }}</b>
                        <em>{{ g.prop }}</em>
                        <el-tooltip
                            effect="dark"
                            :content="g.prop | propTips"
                            placement="right"
                            ><strong>{{
                                g.value | valueFilter
                            }}</strong></el-tooltip
                        >
                    </div>
                </div>

                <el-collapse accordion class="u-call" v-if="skill.call.length">
                    <el-collapse-item>
                        <template slot="title">
                            &raquo; 魔法属性
                        </template>
                        <div v-for="(g, i) in skill.call" :key="i">
                            <em>{{ g.call }}</em>
                            <!-- <b>{{
                                keymap[g.call] ? keymap[g.call].desc : g.call
                            }}</b> -->
                            <strong>{{ g.args }}</strong>
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </li>
        </ul>
        <el-alert
            v-else
            class="m-archive-null"
            title="没有找到相关条目"
            type="info"
            center
            show-icon
        >
        </el-alert>
    </div>
</template>

<script>
import { getLuaIndex, getLua } from "../service/getSkill";
import keymap from "../service/keymap.json";
import { __iconPath } from "@jx3box/jx3box-common/js/jx3box";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "Skill",
    props: [],
    data: function() {
        return {
            focus: "",
            search: "",
            loading: true,
            isSuper: false,
            cache: {},
            luaindex: {},
            data: {},
            done: false,
            keymap,
        };
    },
    computed: {
        fb: function() {
            return this.$store.state.fb;
        },
        subnav: function() {
            return this.luaindex[this.fb];
        },
    },
    filters: {
        valueFilter: function(val) {
            return Array.isArray(val) ? val.join(" ") : val;
        },
        propTips : function (key){
            return keymap[key] ? keymap[key]['remark'] : key
        }
    },
    methods: {
        loadLua: function() {
            this.loading = true;
            getLua(this.fb, this.focus).then((res) => {
                this.loading = false;
                this.done = true;
                this.data = res.data;
            });
        },
    },
    mounted: function() {
        this.isSuper = User.getInfo().group > 8;
        getLuaIndex()
            .then((res) => {
                this.luaindex = this.$store.state.luaindex = res.data;
            })
            .then(() => {
                this.focus = this.subnav[0];
            })
            .then(() => {
                this.loadLua();
            });
    },
};
</script>

<style lang="less">
@import "../assets/css/skill.less";
</style>
