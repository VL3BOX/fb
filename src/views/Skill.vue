<template>
    <div class="m-fb-skill" v-loading="loading">
        <!-- BOSS切换 -->
        <div class="m-skill-index">
            <el-tabs v-model="focus" type="card" @tab-click="loadLua" v-if="subnav">
                <el-tab-pane
                    v-for="(boss, i) in subnav"
                    :label="boss"
                    :key="i"
                    :name="boss"
                ></el-tab-pane>
            </el-tabs>
        </div>

        <el-input
            class="m-skill-search"
            placeholder="请输入技能名称"
            v-model="search"
        >
            <template slot="prepend">技能名称</template>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>

        <ul class="m-skill-list" v-if="!empty">
            <!-- 付费版 -->
            <template v-if="hasRight">
                <li
                    v-for="(skill, key) in data"
                    class="u-item"
                    :key="key"
                    v-show="skill.show"
                >
                    <img class="u-icon" src="../assets/img/iskill.png" />

                    <Mark
                        v-if="skill.origin_id"
                        class="u-id u-mark"
                        :value="skill.origin_id || 0"
                        v-clipboard:copy="skill.origin_id"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                    />

                    <div class="u-title">
                        <span class="u-name"
                            >{{ key }}
                            <a
                                v-if="skill.origin_name"
                                :href="skill.origin_id | getDBlink"
                                target="_blank"
                                ><i class="el-icon-connection"></i
                                >{{ skill.origin_name || "未知" }}</a
                            >
                            <em v-if="skill.isPenetration">(穿透)</em>
                        </span>
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
                            </span>
                        </div>
                    </div>

                    <div class="u-props" v-if="skill.props.length">
                        <skill-format :data="skill.props"/>
                    </div>

                    <el-collapse
                        accordion
                        class="u-call"
                        v-if="skill.call.length"
                    >
                        <el-collapse-item>
                            <template slot="title">
                                ✿ 附加效果组
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
            </template>
            <!-- 免费版 -->
            <template v-else>
                <li
                    v-for="(skill, key) in data"
                    class="u-item"
                    :key="key"
                    v-show="skill.show"
                >
                    <img class="u-icon" src="../assets/img/iskill.png" />

                    <!-- <Mark
                    v-if="skill.origin_id"
                    class="u-id u-mark"
                    :value="skill.origin_id || 0"
                    v-clipboard:copy="skill.origin_id"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                /> -->

                    <div class="u-title">
                        <span class="u-name"
                            >{{ key }}
                            <!-- <a v-if="skill.origin_name" :href="skill.origin_id | getDBlink" target="_blank"
                            ><i class="el-icon-connection"></i
                            >{{ skill.origin_name || "未知" }}</a
                        >
                        <em v-if="skill.isPenetration">(穿透)</em> -->
                        </span>
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
                            </span>
                            <span>
                                <em>nCostMana</em>
                                <b>{{ keymap.nCostMana.desc }}</b>
                                <strong>{{ g.nCostMana }}</strong>
                            </span> -->
                            </span>
                        </div>
                    </div>

                    <div class="u-props" v-if="skill.props.length">
                        <div
                            class="u-prop"
                            v-for="(g, i) in skill.props"
                            :key="i"
                        >
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

                    <!-- <el-collapse accordion class="u-call" v-if="skill.call.length">
                    <el-collapse-item>
                        <template slot="title">
                            ✿ 附加效果组
                        </template>
                        <div v-for="(g, i) in skill.call" :key="i">
                            <em>{{ g.call }}</em>
                            <b>{{
                                keymap[g.call] ? keymap[g.call].desc : g.call
                            }}</b>
                            <strong>{{ g.args }}</strong>
                        </div>
                    </el-collapse-item>
                </el-collapse> -->

                    <div class="u-private">
                        <i class="el-icon-lock"></i> 更多词条仅<a
                            href="/vip/premium?from=database_npc"
                            target="_blank"
                            >高级版会员</a
                        >可见
                    </div>
                </li>
            </template>
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
import keymap from "@/assets/data/keymap.json";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box";
import User from "@jx3box/jx3box-common/js/user";
import skill_format from '@/components/skill_format.vue'
export default {
    name: "Skill",
    props: [],
    data: function() {
        return {
            focus: "",
            search: "",
            loading: true,
            isSuperAuthor: User.isSuperAuthor(),
            cache: {},
            luaindex: {},
            data: {},
            keymap,
            empty: false,
            hasRight: true, //TODO:
        };
    },
    computed: {
        fb: function() {
            return this.$store.state.fb;
        },
        subnav: function() {
            let list = this.luaindex[this.fb];
            let _list = [];
            list && list.forEach((item) => {
                if (item) {
                    _list.push(item);
                }
            });
            return _list;
        },
    },
    filters: {
        valueFilter: function(val) {
            return Array.isArray(val) ? val.join(" ") : val;
        },
        propTips: function(key) {
            return keymap[key] ? keymap[key]["remark"] : key;
        },
        getDBlink: function(val) {
            return "/app/database/?type=skill&query=" + val;
        },
    },
    methods: {
        loadLua: function() {
            this.loading = true;
            getLua(this.fb, this.focus)
                .then((res) => {
                    this.data = res.data;
                    for (let key in this.data) {
                        this.data[key]["show"] = true;
                    }
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        onCopy: function(val) {
            this.$notify({
                title: "复制成功",
                message: "复制内容 : " + val.text,
                type: "success",
            });
        },
        onError: function() {
            this.$notify.error({
                title: "复制失败",
                message: "请手动复制",
            });
        },
    },
    watch: {
        search: function(val) {
            if (!val) {
                for (let key in this.data) {
                    this.data[key]["show"] = true;
                }
            } else {
                for (let key in this.data) {
                    if (
                        key.includes(val) ||
                        (!!this.data[key]["origin_id"]
                            ? String(this.data[key]["origin_id"]).includes(val)
                            : false) ||
                        (!!this.data[key]["origin_name"]
                            ? this.data[key]["origin_name"].includes(val)
                            : false)
                    ) {
                        this.data[key]["show"] = true;
                    } else {
                        this.data[key]["show"] = false;
                    }
                }
            }
        },
    },
    mounted: function() {
        getLuaIndex()
            .then((res) => {
                this.luaindex = this.$store.state.luaindex = res.data;
            })
            .then(() => {
                if (Object.keys(this.luaindex).includes(this.fb)) {
                    this.focus = this.subnav[0];
                    this.loadLua();
                } else {
                    this.loading = false;
                    this.empty = true;
                }
            })
            .catch((err) => {
                console.log(err);
            });

        // TODO:
        // User.isLogin() && User.isVIP().then((data) => {
        //     this.hasRight = data;
        // });
    },
    components : {
        'skill-format':skill_format
    }
};
</script>

<style lang="less">
@import "../assets/css/skill.less";
</style>
