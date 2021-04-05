<template>
    <div class="m-fb-skill" v-loading="loading">
        <!-- BOSS切换 -->
        <div class="m-skill-index">
            <el-tabs v-model="focus" type="card" @tab-click="loadLua" v-if="subnav">
                <el-tab-pane v-for="(boss, i) in subnav" :label="boss" :key="i" :name="boss"></el-tab-pane>
            </el-tabs>
        </div>

        <el-input class="m-skill-search" placeholder="请输入技能名称" v-model="search">
            <template slot="prepend">技能名称</template>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>

        <ul class="m-skill-list" v-if="!empty">
            <li v-for="(skill, key) in data" class="u-item" :key="key" v-show="skill.show">
                <skill-item :data="skill" :hasRight="hasRight" :name="key"></skill-item>
            </li>
        </ul>
        <el-alert v-else class="m-archive-null" title="没有找到相关条目" type="info" center show-icon></el-alert>
    </div>
</template>

<script>
import { getLuaIndex, getLua } from "../service/getSkill";
import { __ossMirror } from "@jx3box/jx3box-common/data/jx3box";
import User from "@jx3box/jx3box-common/js/user";
import skill_item from "@/components/skill_item.vue";
export default {
    name: "Skill",
    props: [],
    data: function () {
        return {
            focus: "",
            search: "",
            loading: false,
            isSuperAuthor: User.isSuperAuthor(),
            cache: {},
            luaindex: {},
            data: {},
            empty: false,
            hasRight: false,
        };
    },
    computed: {
        fb: function () {
            return this.$route.query.fb_name || this.$store.state.default_fb;
        },
        zlp: function () {
            return this.$route.query.fb_zlp || this.$store.state.default_zlp;
        },
        subnav: function () {
            let list = this.luaindex[this.fb];
            let _list = [];
            list &&
                list.forEach((item) => {
                    if (item) {
                        _list.push(item);
                    }
                });
            return _list;
        },
    },
    methods: {
        loadLua: function () {
            if (Object.keys(this.luaindex).includes(this.fb)) {
                this.focus = this.subnav[0];
                this.empty = false;
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
            } else {
                this.empty = true;
            }
        },
        loadLuaIndex: function () {
            getLuaIndex()
                .then((res) => {
                    this.luaindex = this.$store.state.luaindex = res.data;
                })
                .catch((err) => {
                    console.log(err);
                });
        },
    },
    watch: {
        search: function (val) {
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
        fb: function () {
            this.loadLua();
        },
    },
    mounted: function () {
        this.loadLuaIndex();
        User.isLogin() &&
            User.isVIP().then((data) => {
                this.hasRight = data;
            });
    },
    components: {
        "skill-item": skill_item,
    },
};
</script>

<style lang="less">
@import "../assets/css/skill.less";
</style>
