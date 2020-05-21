<template>
    <div class="m-fb-npc" v-loading="loading">
        <el-input class="m-npc-search" placeholder="请输入NPC名称或ID" v-model="search" @change="searchNpc">
            <template slot="prepend">
                NPC
            </template>
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <div class="m-filter-group">
            <el-radio-group v-model="difficultyRadioValue" size="medium">
                <el-radio-button v-for="difficulty of difficultyRadios" :key="difficulty.name" :label="difficulty.id">{{ difficulty.name }}</el-radio-button>
            </el-radio-group>
            <el-checkbox-group v-model="npcFilterCheckboxValue" size="small">
                <el-checkbox label="boss" border>首领</el-checkbox>
                <el-checkbox label="minion" border>小怪</el-checkbox>
                <el-checkbox label="hiddennpc" border>其他NPC</el-checkbox>
            </el-checkbox-group>
        </div>
        <ul class="m-npc-list" v-if="data.length">
            <li v-for="(npc, i) in data" class="u-item" :key="i">
                <i v-if="isBoss(npc.ID)" class="u-isBoss"><img src="../assets/img/boss_mini.png" /></i>
                <img class="u-icon" src="../assets/img/iboss.png" />

                <Mark class="u-id" :value="'ID:' + npc.ID" />
                <div class="u-title">
                    <span class="u-name">{{ npc.Name }}</span>
                    <span class="u-name-add">
                        <span v-if="npc.Title || npc.Level">&lt;</span>
                        <span class="u-nick" v-if="npc.Title">{{ npc.Title }}</span>
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
                                    width: (npc.MaxLife * 100) / 99999999 + '%'
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
                                    width: (npc.MaxMana * 100) / 99999999 + '%'
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
                            <span class="u-value">{{ npc.PhysicsShieldBase }}</span>
                        </span>
                        <span class="u-sitem">
                            混元防御
                            <em>NeutralMagicDefence</em>
                            <span class="u-value">{{ npc.NeutralMagicDefence }}</span>
                        </span>
                        <span class="u-sitem">
                            阳性防御
                            <em>SolarMagicDefence</em>
                            <span class="u-value">{{ npc.SolarMagicDefence }}</span>
                        </span>
                        <span class="u-sitem">
                            阴性防御
                            <em>LunarMagicDefence</em>
                            <span class="u-value">{{ npc.LunarMagicDefence }}</span>
                        </span>
                        <span class="u-sitem">
                            毒性防御
                            <em>PoisonMagicDefence</em>
                            <span class="u-value">{{ npc.PoisonMagicDefence }}</span>
                        </span>
                    </div>
                    <div class="u-critical">
                        <b>会心</b>
                        <em>Critical</em>
                        <span class="u-sitem">
                            外功会心
                            <em>PhysicsCriticalStrike</em>
                            <span class="u-value">{{ npc.PhysicsCriticalStrike }}</span>
                        </span>
                        <span class="u-sitem">
                            混元会心
                            <em>NeutralCriticalStrike</em>
                            <span class="u-value">{{ npc.NeutralCriticalStrike }}</span>
                        </span>
                        <span class="u-sitem">
                            阳性会心
                            <em>SolarCriticalStrike</em>
                            <span class="u-value">{{ npc.SolarCriticalStrike }}</span>
                        </span>
                        <span class="u-sitem">
                            阴性会心
                            <em>LunarCriticalStrike</em>
                            <span class="u-value">{{ npc.LunarCriticalStrike }}</span>
                        </span>
                        <span class="u-sitem">
                            毒性会心
                            <em>PoisonCriticalStrike</em>
                            <span class="u-value">{{ npc.PoisonCriticalStrike }}</span>
                        </span>
                    </div>
                    <div class="u-attack">
                        <b>命中</b>
                        <em>Attack</em>
                        <span class="u-sitem">
                            外功命中
                            <em>PhysicsAttackHit</em>
                            <span class="u-value">{{ npc.PhysicsAttackHit }}</span>
                        </span>
                        <span class="u-sitem">
                            混元命中
                            <em>NeutralMagicHit</em>
                            <span class="u-value">{{ npc.NeutralMagicHit }}</span>
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
                            <span class="u-value">{{ npc.PoisonMagicHit }}</span>
                        </span>
                    </div>
                </div>
                <div class="u-misc" v-if="isSuper">
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
            </li>
        </ul>
        <el-alert v-else class="m-archive-null" title="没有找到相关条目" type="info" center show-icon></el-alert>
        <el-button class="m-archive-more" :class="{ show: hasNextPage }" type="primary" :loading="loading" @click="appendPage(++page)">加载更多</el-button>
        <el-pagination
            class="m-archive-pages"
            background
            :hide-on-single-page="true"
            @current-change="changePage"
            :current-page.sync="page"
            layout="total, prev, pager, next, jumper"
            :total="total"
        ></el-pagination>
    </div>
</template>

<script>
import bossids from '@jx3box/jx3box-data/data/fb/fb_boss_ids.json';
import { getMapNpc, getNpc } from '../service/getNpc';
import { __ossMirror } from '@jx3box/jx3box-common/js/jx3box';
import User from '@jx3box/jx3box-common/js/user';
import { axios } from '../service/axios/api.js';
import { mapList } from '../assets/js/mapList.js';
const bossicon = [9482, 9461, 9462, 8591, 8592, 8593, 8594, 8595, 8596, 8597];
export default {
    name: 'Npc',
    props: [],
    data: function() {
        return {
            perpage: 10,
            data: [],
            // total: 0,
            page: 0,
            gotoOrAppend: 'goto',
            // pages: 1,
            loading: true,
            isSuper: false,
            search: '',
            cache: [],
            difficultyRadioValue: 0,
            difficultyRadios: [],
            npcFilterCheckboxValue: ['boss'],
            allNPC: [],
            dataAlreadyChanged: false
        };
    },
    computed: {
        hasNextPage: function() {
            return this.total > 1 && this.page < this.pages;
        },
        // icon: function() {
        //     return __ossMirror + "icon/" + 1 + ".png";
        // },
        mapname: function() {
            let mapname = '';
            let dotIndex = this.$store.state.fb.indexOf('·');
            if (dotIndex >= 0) {
                mapname = this.$store.state.fb.slice(dotIndex + 1);
            } else {
                mapname = this.$store.state.fb;
            }
            return mapname;
        },
        zlp: function() {
            return this.$store.state.zlp
        },
        fb: function() {
            return this.$store.state.fb
        },
        info: function() {
            return this.$store.state.map[this.zlp]["dungeon"][this.fb];
        },
        tmpData() {
            let tmp = this.allNPC.filter((npc) => {
                let judge = false
                let npcType = ''
                if (bossids.includes(npc.ID)) {
                    npcType = 'boss'
                } else if (npc.Name === null || npc.Sense === null) {
                    npcType = 'hiddennpc'
                } else {
                    npcType = 'minion'
                }
                judge = this.npcFilterCheckboxValue.includes(npcType)
                
                // 判断搜索
                if (!this.search) {
                    judge = judge && true
                } else {
                    judge = judge && npc.Name.includes(this.search.replace(/\ /g, ''))
                }
                
                // 判断map
                let thisMapId = mapList[npc.MapName]
                if (thisMapId !== this.difficultyRadioValue) {
                    judge = false
                }
                
                return judge
            })
            let mapped = tmp.map(function(el, i) {
                return { index: i, sense: el.Sense, name: el.Name, isBoss: bossids.includes(el.ID) };
            })
            mapped.sort((a,b) => {
                if (a.isBoss) {
                    if (b.isBoss) {
                        if (a.sense === b.sense) {
                            return +(a.name > b.name) || +(a.name === b.name) - 1;
                        } else {
                            return -(+(a.sense > b.sense) || +(a.sense === b.sense) - 1);
                        }
                    } else {
                        return -1
                    }
                } else {
                    if (b.isBoss) {
                        return 1
                    }
                }
                if (a.sense === null || a.name === null) {
                    if (b.sense === null || b.name === null) {
                        return +(a.name > b.name) || +(a.name === b.name) - 1;
                    } else {
                        return 1
                    }
                } else if (b.sense === null || b.name === null) {
                    return -1
                } else {
                    if (a.sense === b.sense) {
                        return +(a.name > b.name) || +(a.name === b.name) - 1;
                    } else {
                        return -(+(a.sense > b.sense) || +(a.sense === b.sense) - 1);
                    }
                }
            })
            return mapped.map(function(el){
                return tmp[el.index];
            });
        },
        total() {
            return this.tmpData.length
        },
        pages() {
            return Math.ceil(this.total/this.perpage)
        },
        someDataChanged() {
            return +(!this.page || !this.pages || !this.total || !this.tmpData || !this.difficultyRadioValue)+Math.random()
        }
    },
    watch: {
        someDataChanged: function (newPage, oldPage) {
            let start = (this.page-1) * this.perpage
            let end = start + 10
            let newData = this.tmpData.slice(start, end)
            if (this.gotoOrAppend === 'goto') {
                this.data = newData
            } else {
                this.data = this.data.concat(newData)
                this.gotoOrAppend = 'goto'
            }
        }
    },
    methods: {
        changePage: function(i) {
            this.gotoOrAppend = 'goto'
            window.scrollTo(0, 0);
            // this.loading = true;
            // getMapNpc(this.mapname)
            //     .then(res => {
            //         console.log(res);
            //         window.scrollTo(0, 0);
            //         // this.data = this.cache = res.data.list;
            //         // this.total = res.data.total;
            //         // this.pages = res.data.pages;
            //     })
            //     .finally(() => {
            //         this.loading = false;
            //     });
        },
        appendPage: function(i) {
            this.gotoOrAppend = 'append'
            // this.loading = true;
            // getMapNpc(this.mapname)
            //     .then(res => {
            //         // this.data = this.cache = this.data.concat(res.data.list);
            //         // this.total = res.data.total;
            //         // this.pages = res.data.pages;
            //     })
            //     .finally(() => {
            //         this.loading = false;
            //     });
        },
        searchNpc: function() {
            // if (!this.search) {
            //     // this.data = this.cache;
            //     return;
            // }
            // this.loading = true;
            // getNpc(this.search)
            //     .then(res => {
            //         // this.data = res.data;
            //         this.total = 1;
            //         this.pages = 1;
            //     })
            //     .finally(() => {
            //         this.loading = false;
            //     });
        },
        isBoss: function(id) {
            return !!bossids.includes(id);
        },
        getVersion() {
            this.loading = true;
            axios('https://node.jx3box.com')
                .then(res => {
                    this.version = res.version;
                })
                .catch(e => {
                    switch (e.code) {
                        case -1:
                            // 网络异常
                            this.$message.error(e.msg);
                            break;
                        default:
                            // 服务器错误
                            console.log(e);
                            this.$message.error(`[${e.code}]${e.msg}`);
                    }
                })
                .then(() => {
                    this.getAllNpc();
                });
        },
        async getAllNpc() {
            this.allNPC = await getMapNpc(this.mapname, this.version);
            this.page = 1
            this.loading = false;
            let start = (this.page-1) * this.perpage
            let end = start + 10
            let newData = this.tmpData.slice(start, end)
            this.data = newData
            // .then(res => {
            //     console.log(res);
            //     window.scrollTo(0, 0);
            //     this.data = this.cache = res.data.list;
            //     this.total = res.data.total;
            //     this.pages = res.data.pages;
            // })
            // .finally(() => {
            //     this.loading = false;
            // });
        },
        setDifficultyRadios() {
            let tmp = []
            this.info.maps.forEach((map) => {
                tmp.push({id: map.map_id, name: map.mode})
            })
            this.difficultyRadios = tmp
            this.difficultyRadioValue = tmp[0].id
        },
    },
    filters: {},
    mounted: function() {
        this.getVersion();
        this.setDifficultyRadios()
        // this.changePage(1);
        this.isSuper = User.getInfo().group > 8;
    }
};
</script>

<style lang="less">
@import '../assets/css/npc.less';
</style>
