<template>
    <div class="m-fb-npc">
        <el-input
            class="m-npc-search"
            placeholder="请输入NPC名称或ID"
            v-model="search"
            @change="searchNpc"
        >
            <template slot="prepend">NPC</template>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <ul class="m-npc-list" v-if="data.length" :loading="loading">
            <li v-for="(npc, i) in data" class="u-item" :key="i">
                <i v-if="isBoss(npc.ID)" class="u-isBoss">
                    <img src="../assets/img/boss_mini.png" />
                </i>
                <img class="u-icon" src="../assets/img/iboss.png" />

                <Mark class="u-id" :value="'ID:' + npc.ID"/>
                <div class="u-title">
                    <span class="u-name">{{ npc.Name }}</span>
                    <span class="u-name-add">
                        <span v-if="npc.Title || npc.Level">&lt;</span>
                        <span class="u-nick" v-if="npc.Title">{{
                            npc.Title
                        }}</span>
                        <span v-if="npc.Title && npc.Level"> · </span>
                        <b class="u-level" v-if="npc.Level">{{ npc.Level }}</b>
                        <span v-if="npc.Title || npc.Level">&gt;</span>
                    </span>
                    <div class="u-base">
                        <span class="u-atmap" v-if="npc.MapName"
                            ><em>MapName</em>{{ npc.MapName }}</span
                        >
                        <span class="u-totation" v-if="npc._Notation"
                            ><em>_Notation</em>{{ npc._Notation }}</span
                        >
                        <span class="u-intensity" v-if="npc.Intensity"
                            >强度<em>Intensity</em>{{ npc.Intensity }}</span
                        >
                    </div>
                </div>
                <div class="u-primary">
                    <div class="u-life">
                        <b>血量</b><em>MaxLife</em>
                        <i class="u-range"
                            ><strong
                                :style="{
                                    width: (npc.MaxLife * 100) / 99999999 + '%',
                                }"
                                >{{ npc.MaxLife }}</strong
                            ></i
                        >
                    </div>
                    <div class="u-mana">
                        <b>内力</b><em>MaxMana</em>
                        <i class="u-range"
                            ><strong
                                :style="{
                                    width: (npc.MaxMana * 100) / 99999999 + '%',
                                }"
                                >{{ npc.MaxMana }}</strong
                            ></i
                        >
                    </div>
                    <div class="u-speed" v-if="npc.RunSpeed || npc.WalkSpeed">
                        <b>跑速</b><em>RunSpeed</em
                        >{{ npc.RunSpeed || npc.WalkSpeed }}
                    </div>
                    <div class="u-touch" v-if="npc.TouchRange">
                        <b>范围</b><em>TouchRange</em>{{ npc.TouchRange }}
                    </div>
                    <div class="u-sense" v-if="npc.Sense">
                        <b>识破</b><em>Sense</em>{{ npc.Sense }}
                    </div>
                    <div class="u-dodge" v-if="npc.Dodge">
                        <b>闪避</b><em>Dodge</em>{{ npc.Dodge }}
                    </div>
                    <div class="u-shield">
                        <b>防御</b><em>Shield</em>
                        <span class="u-sitem"
                            >外功防御<em>PhysicsShieldBase</em
                            ><span class="u-value">{{
                                npc.PhysicsShieldBase
                            }}</span></span
                        >
                        <span class="u-sitem"
                            >混元防御<em>NeutralMagicDefence</em
                            ><span class="u-value">{{
                                npc.NeutralMagicDefence
                            }}</span></span
                        >
                        <span class="u-sitem"
                            >阳性防御<em>SolarMagicDefence</em
                            ><span class="u-value">{{
                                npc.SolarMagicDefence
                            }}</span></span
                        >
                        <span class="u-sitem"
                            >阴性防御<em>LunarMagicDefence</em
                            ><span class="u-value">{{
                                npc.LunarMagicDefence
                            }}</span></span
                        >
                        <span class="u-sitem"
                            >毒性防御<em>PoisonMagicDefence</em
                            ><span class="u-value">{{
                                npc.PoisonMagicDefence
                            }}</span></span
                        >
                    </div>
                    <div class="u-critical">
                        <b>会心</b><em>Critical</em>
                        <span class="u-sitem"
                            >外功会心<em>PhysicsCriticalStrike</em
                            ><span class="u-value">{{
                                npc.PhysicsCriticalStrike
                            }}</span></span
                        >
                        <span class="u-sitem"
                            >混元会心<em>NeutralCriticalStrike</em
                            ><span class="u-value">{{
                                npc.NeutralCriticalStrike
                            }}</span></span
                        >
                        <span class="u-sitem"
                            >阳性会心<em>SolarCriticalStrike</em
                            ><span class="u-value">{{
                                npc.SolarCriticalStrike
                            }}</span></span
                        >
                        <span class="u-sitem"
                            >阴性会心<em>LunarCriticalStrike</em
                            ><span class="u-value">{{
                                npc.LunarCriticalStrike
                            }}</span></span
                        >
                        <span class="u-sitem"
                            >毒性会心<em>PoisonCriticalStrike</em
                            ><span class="u-value">{{
                                npc.PoisonCriticalStrike
                            }}</span></span
                        >
                    </div>
                    <div class="u-attack">
                        <b>命中</b><em>Attack</em>
                        <span class="u-sitem"
                            >外功命中<em>PhysicsAttackHit</em
                            ><span class="u-value">{{
                                npc.PhysicsAttackHit
                            }}</span></span
                        >
                        <span class="u-sitem"
                            >混元命中<em>NeutralMagicHit</em
                            ><span class="u-value">{{
                                npc.NeutralMagicHit
                            }}</span></span
                        >
                        <span class="u-sitem"
                            >阳性命中<em>SolarMagicHit</em
                            ><span class="u-value">{{
                                npc.SolarMagicHit
                            }}</span></span
                        >
                        <span class="u-sitem"
                            >阴性命中<em>LunarMagicHit</em
                            ><span class="u-value">{{
                                npc.LunarMagicHit
                            }}</span></span
                        >
                        <span class="u-sitem"
                            >毒性命中<em>PoisonMagicHit</em
                            ><span class="u-value">{{
                                npc.PoisonMagicHit
                            }}</span></span
                        >
                    </div>
                </div>
                <div class="u-misc" v-if="isSuper">
                    <span class="u-remark"
                        >CanSeeLifeBar:
                        <strong>{{ npc.CanSeeLifeBar }}</strong></span
                    >
                    <span class="u-remark"
                        >IsSelectable:
                        <strong>{{ npc.IsSelectable }}</strong></span
                    >

                    <span class="u-remark"
                        >ReviveTime: <strong>{{ npc.ReviveTime }}</strong></span
                    >
                    <span class="u-remark"
                        >ImmunityMask:
                        <strong>{{ npc.ImmunityMask }}</strong></span
                    >
                    <span class="u-remark"
                        >ScriptName: <strong>{{ npc.ScriptName }}</strong></span
                    >
                </div>
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
        <el-button
            class="m-archive-more"
            :class="{ show: hasNextPage }"
            type="primary"
            :loading="loading"
            @click="appendPage(++page)"
            >加载更多</el-button
        >
        <el-pagination
            class="m-archive-pages"
            background
            :hide-on-single-page="true"
            @current-change="changePage"
            :current-page="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </div>
</template>

<script>
import bossids from "@jx3box/jx3box-data/data/fb/fb_boss_ids.json";
import { getMapNpc, getNpc } from "../service/getNpc";
import { __iconPath } from "@jx3box/jx3box-common/js/jx3box";
import User from "@jx3box/jx3box-common/js/user";
const bossicon = [9482, 9461, 9462, 8591, 8592, 8593, 8594, 8595, 8596, 8597];
export default {
    name: "Npc",
    props: [],
    data: function() {
        return {
            data: [],
            total: 0,
            page: 1,
            pages: 1,
            loading: false,
            isSuper: false,
            search: "",
            cache: [],
        };
    },
    computed: {
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
        // icon: function() {
        //     return __iconPath + "icon/" + 1 + ".png";
        // },
        mapname: function() {
            let mapname = "";
            let dotIndex = this.$store.state.fb.indexOf("·");
            if (dotIndex >= 0) {
                mapname = this.$store.state.fb.slice(dotIndex + 1);
            } else {
                mapname = this.$store.state.fb;
            }
            return mapname;
        },
    },
    methods: {
        changePage: function(i) {
            getMapNpc(this.mapname, i).then((res) => {
                this.data = this.cache = res.data.list;
                this.total = res.data.total;
                this.pages = res.data.pages;
                window.scrollTo(0,0)
            });
        },
        appendPage: function(i) {
            this.loading = true;

            getMapNpc(this.mapname, i).then((res) => {
                this.loading = false;
                this.data = this.cache = this.data.concat(res.data.list);
                this.total = res.data.total;
                this.pages = res.data.pages;
            });
        },
        searchNpc: function() {
            if (!this.search) {
                this.data = this.cache;
                return;
            }
            getNpc(this.search).then((res) => {
                this.loading = false;

                this.data = res.data;
                this.total = 1;
                this.pages = 1;
            });
        },
        isBoss: function(id) {
            return !!bossids.includes(id);
        },
    },
    filters: {},
    mounted: function() {
        this.changePage(1);
        this.isSuper = User.getInfo().group > 8;
    },
};
</script>

<style lang="less">
@import "../assets/css/npc.less";
</style>
