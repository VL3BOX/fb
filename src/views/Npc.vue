<template>
    <div class="m-fb-npc" v-loading="loading">
        <el-input
            class="m-npc-search"
            placeholder="请输入NPC名称或ID"
            v-model="search"
            @change="loadData"
            :disabled="onlyboss"
        >
            <template slot="prepend">
                NPC
            </template>
            <el-switch
                class="u-switch u-onlyboss"
                slot="append"
                v-model="onlyboss"
                active-color="#13ce66"
                inactive-text="只看首领"
                @change="loadData"
            >
            </el-switch>
        </el-input>
        <div class="m-filter-group" v-if="onlyboss">
            <el-radio-group v-model="mapid" size="medium">
                <el-radio-button
                    v-for="item in maps"
                    :key="item.map_id"
                    :label="item.map_id"
                    >{{ item.mode }}</el-radio-button
                >
            </el-radio-group>
        </div>
        <ul class="m-npc-list" v-if="data.length">
            <li v-for="(npc, i) in data" class="u-item" :key="npc + i">
                <i v-if="isBoss(npc.ID)" class="u-isBoss"
                    ><img src="../assets/img/boss_mini.png"
                /></i>
                <img class="u-icon" src="../assets/img/iboss.png" />

                <Mark
                    class="u-mark u-id"
                    :value="npc.ID"
                    v-clipboard:copy="npc.ID"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                />
                <div class="u-title">
                    <span class="u-name">{{ npc.Name }}</span>
                    <span class="u-name-add">
                        <span v-if="npc.Title || npc.Level">&lt;</span>
                        <span class="u-nick" v-if="npc.Title">{{
                            npc.Title
                        }}</span>
                        <span v-if="npc.Title && npc.Level">·</span>
                        <b class="u-level" v-if="npc.Level">{{ npc.Level }}</b>
                        <span v-if="npc.Title || npc.Level">&gt;</span>
                    </span>
                    <div class="u-base">
                        <span class="u-atmap" v-if="npc.MapName">
                            <em>MapName</em>
                            {{ npc.MapName }}
                        </span>
                        <span class="u-totation" v-if="npc._Notation">
                            <em>_Notation</em>
                            {{ npc._Notation }}
                        </span>
                        <span class="u-intensity" v-if="npc.Intensity">
                            强度
                            <em>Intensity</em>
                            {{ npc.Intensity }}
                        </span>
                    </div>
                </div>
                <div class="u-primary">
                    <div class="u-life">
                        <b>血量</b>
                        <em>MaxLife</em>
                        <i class="u-range">
                            <strong
                                :style="{
                                    width: (npc.MaxLife * 100) / 99999999 + '%',
                                }"
                            >
                                {{ npc.MaxLife }}
                            </strong>
                        </i>
                    </div>
                    <div class="u-mana">
                        <b>内力</b>
                        <em>MaxMana</em>
                        <i class="u-range">
                            <strong
                                :style="{
                                    width: (npc.MaxMana * 100) / 99999999 + '%',
                                }"
                            >
                                {{ npc.MaxMana }}
                            </strong>
                        </i>
                    </div>
                    <div class="u-speed" v-if="npc.RunSpeed || npc.WalkSpeed">
                        <b>跑速</b>
                        <em>RunSpeed</em>
                        {{ npc.RunSpeed || npc.WalkSpeed }}
                    </div>
                    <div class="u-touch" v-if="npc.TouchRange">
                        <b>范围</b>
                        <em>TouchRange</em>
                        {{ npc.TouchRange }}
                    </div>
                    <div class="u-sense" v-if="npc.Sense">
                        <b>识破</b>
                        <em>Sense</em>
                        {{ npc.Sense }}
                    </div>
                    <div class="u-dodge" v-if="npc.Dodge">
                        <b>闪避</b>
                        <em>Dodge</em>
                        {{ npc.Dodge }}
                    </div>
                    <div class="u-shield">
                        <b>防御</b>
                        <em>Shield</em>
                        <span class="u-sitem">
                            外功防御
                            <em>PhysicsShieldBase</em>
                            <span class="u-value">{{
                                npc.PhysicsShieldBase
                            }}</span>
                        </span>
                        <span class="u-sitem">
                            混元防御
                            <em>NeutralMagicDefence</em>
                            <span class="u-value">{{
                                npc.NeutralMagicDefence
                            }}</span>
                        </span>
                        <span class="u-sitem">
                            阳性防御
                            <em>SolarMagicDefence</em>
                            <span class="u-value">{{
                                npc.SolarMagicDefence
                            }}</span>
                        </span>
                        <span class="u-sitem">
                            阴性防御
                            <em>LunarMagicDefence</em>
                            <span class="u-value">{{
                                npc.LunarMagicDefence
                            }}</span>
                        </span>
                        <span class="u-sitem">
                            毒性防御
                            <em>PoisonMagicDefence</em>
                            <span class="u-value">{{
                                npc.PoisonMagicDefence
                            }}</span>
                        </span>
                    </div>
                    <div class="u-critical">
                        <b>会心</b>
                        <em>Critical</em>
                        <span class="u-sitem">
                            外功会心
                            <em>PhysicsCriticalStrike</em>
                            <span class="u-value">{{
                                npc.PhysicsCriticalStrike
                            }}</span>
                        </span>
                        <span class="u-sitem">
                            混元会心
                            <em>NeutralCriticalStrike</em>
                            <span class="u-value">{{
                                npc.NeutralCriticalStrike
                            }}</span>
                        </span>
                        <span class="u-sitem">
                            阳性会心
                            <em>SolarCriticalStrike</em>
                            <span class="u-value">{{
                                npc.SolarCriticalStrike
                            }}</span>
                        </span>
                        <span class="u-sitem">
                            阴性会心
                            <em>LunarCriticalStrike</em>
                            <span class="u-value">{{
                                npc.LunarCriticalStrike
                            }}</span>
                        </span>
                        <span class="u-sitem">
                            毒性会心
                            <em>PoisonCriticalStrike</em>
                            <span class="u-value">{{
                                npc.PoisonCriticalStrike
                            }}</span>
                        </span>
                    </div>
                    <div class="u-attack">
                        <b>命中</b>
                        <em>Attack</em>
                        <span class="u-sitem">
                            外功命中
                            <em>PhysicsAttackHit</em>
                            <span class="u-value">{{
                                npc.PhysicsAttackHit
                            }}</span>
                        </span>
                        <span class="u-sitem">
                            混元命中
                            <em>NeutralMagicHit</em>
                            <span class="u-value">{{
                                npc.NeutralMagicHit
                            }}</span>
                        </span>
                        <span class="u-sitem">
                            阳性命中
                            <em>SolarMagicHit</em>
                            <span class="u-value">{{ npc.SolarMagicHit }}</span>
                        </span>
                        <span class="u-sitem">
                            阴性命中
                            <em>LunarMagicHit</em>
                            <span class="u-value">{{ npc.LunarMagicHit }}</span>
                        </span>
                        <span class="u-sitem">
                            毒性命中
                            <em>PoisonMagicHit</em>
                            <span class="u-value">{{
                                npc.PoisonMagicHit
                            }}</span>
                        </span>
                    </div>
                </div>
                <div class="u-misc" v-if="hasRight">
                    <span class="u-remark">
                        CanSeeLifeBar:
                        <strong>{{ npc.CanSeeLifeBar }}</strong>
                    </span>
                    <span class="u-remark">
                        IsSelectable:
                        <strong>{{ npc.IsSelectable }}</strong>
                    </span>

                    <span class="u-remark">
                        ReviveTime:
                        <strong>{{ npc.ReviveTime }}</strong>
                    </span>
                    <span class="u-remark">
                        ImmunityMask:
                        <strong>{{ npc.ImmunityMask }}</strong>
                    </span>
                    <span class="u-remark">
                        ScriptName:
                        <strong>{{ npc.ScriptName }}</strong>
                    </span>
                </div>
                <div class="u-misc-tip" v-else>
                    <i class="el-icon-lock"></i> 更多词条仅<a
                        href="/vip/premium?from=database_npc"
                        target="_blank"
                        >高级/专业版会员</a
                    >可见
                </div>
            </li>
        </ul>
        <el-alert v-else class="m-archive-null" type="info" center show-icon
            >该副本没有找到相关条目，全图搜索请前往<a
                href="/app/database"
                target="_blank"
                >剑三数据库</a
            >应用</el-alert
        >
        <template v-if="!onlyboss">
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
                :current-page.sync="page"
                :page-size.sync="per"
                layout="total, prev, pager, next, jumper"
                :total="total"
            ></el-pagination>
        </template>
    </div>
</template>

<script>
import bossids from "@jx3box/jx3box-data/data/fb/fb_boss_ids.json";
import mapids from "@jx3box/jx3box-data/data/common/mapids.json";
import {
    getNpcList,
    getMapNpc,
    getBossList,
    getBossIds,
} from "../service/getNpc";
import { __ossMirror } from "@jx3box/jx3box-common/data/jx3box";
import User from "@jx3box/jx3box-common/js/user";
import { axios } from "../service/axios/api.js";
import { getDB } from "../service/getDB";
export default {
    name: "Npc",
    props: [],
    data: function() {
        return {
            loading: true,
            data: [],

            per: 10,
            total: 0,
            page: 0,
            pages: 1,

            search: "",
            onlyboss: true,
            mapid: "",
            bossids: [],

            hasRight: false,
        };
    },
    computed: {
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
        zlp: function() {
            return this.$store.state.zlp;
        },
        fb: function() {
            return this.$store.state.fb;
        },
        maps: function() {
            return this.$store.state.map[this.zlp]["dungeon"][this.fb]["maps"];
        },
        bosslist: function() {
            return this.$store.state.map[this.zlp]["dungeon"][this.fb]["boss"];
        },
        params: function() {
            let params = {
                per: this.per,
            };
            if (this.search) {
                if (isNaN(this.search)) {
                    params.Name = this.search;
                } else {
                    params.ID = this.search;
                }
            }
            return params;
        },
    },
    methods: {
        loadData: function(i = 1, append = false) {
            this.loading = true;
            if (!this.onlyboss) {
                let params = Object.assign(this.params, {
                    page: i,
                });
                getMapNpc(this.fb, params)
                    .then((res) => {
                        if (append) {
                            this.data = this.data.concat(res.data.list);
                        } else {
                            window.scrollTo(0, 0);
                            this.data = res.data.list;
                        }
                        this.total = res.data.total;
                        this.pages = res.data.pages;
                    })
                    .finally(() => {
                        this.loading = false;
                    });
            } else {
                // console.log(this.mapid)

                // 获取boss表中索引
                let indexs = [];
                getBossList(this.mapid).then((res) => {
                    res.data.forEach((item) => {
                        indexs.push(...item.Index.split("、"));
                    });
                    // console.log(indexs)

                    // 通过info表中索引查id
                    let ids = [];
                    getBossIds(indexs.join(",")).then((res) => {
                        res.data.forEach((item) => {
                            item.NpcID && ids.push(item.NpcID);
                            this.bossids = ids;
                        });
                        // console.log(ids)

                        getNpcList({
                            per: this.per,
                            page: i,
                            ID: this.bossids.join(","),
                        })
                            .then((res) => {
                                if (append) {
                                    this.data = this.data.concat(res.data.list);
                                } else {
                                    window.scrollTo(0, 0);
                                    this.data = res.data.list;
                                }
                                this.total = res.data.total;
                                this.pages = res.data.pages;
                            })
                            .finally(() => {
                                this.loading = false;
                            });
                    });
                });
            }
        },
        changePage: function(i) {
            this.loadData(i);
        },
        appendPage: function(i) {
            this.loadData(i, true);
        },
        isBoss: function(id) {
            return !!bossids.includes(id);
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
        mapid: function() {
            this.loadData();
        },
    },
    mounted: function() {
        this.mapid = this.maps.slice(-1)[0]["map_id"];
        User.isLogin() && User.isVIP().then((data) => {
            this.hasRight = data;
        });
    },
};
</script>

<style lang="less">
@import "../assets/css/npc.less";
</style>
