<template>
    <div class="m-fb-nav m-fb-list-nav">
        <!--
        <RightSideMsg class="u-group">
            <em>全服团长交流群</em> :
            <strong>
                <a href="https://jq.qq.com/?_wv=1027&k=nzOIpVGI" v-if="client == 'origin'">528707506</a>
                <a href="https://jq.qq.com/?_wv=1027&k=HZdXPmZe" v-else>785597424</a>
            </strong>
        </RightSideMsg>
        -->
        <!-- <div class="m-nav-link">
            <a class="el-button el-button--primary el-button--mini is-plain" href="/rank" target="_blank">
                <i class="el-icon-trophy"></i>
                <span>秘境百强</span>
            </a>
            <a class="el-button el-button--primary el-button--mini is-plain" href="/team" target="_blank">
                <i class="el-icon-user"></i>
                <span>团队管理</span>
            </a>
        </div> -->

        <div class="m-nav-search" @click.stop>
            <!-- 输入框 -->
            <!-- <el-input placeholder="搜索副本或首领名称" v-model="search" clearable></el-input> -->
            <!-- 下拉框 -->
            <el-select v-model="search" placeholder="选择副本">
                <el-option-group v-for="(group, key) in map" :key="key" :label="'🍄' + key + '(' + group.level + ')'">
                    <el-option v-for="(item, subkey) in group.dungeon" :key="subkey" :label="subkey" :value="subkey"
                        @click.native="changeFb(key, subkey)">
                    </el-option>
                </el-option-group>
            </el-select>
        </div>

        <!--副本选择面板 路由及样式未完成 -->
        <div class="m-nav-fbPanel">
            <img :src="imgPath + fbImg" />
            <div class="u-fbName">{{ fbName }}</div>
        </div>
        <div class="m-nav-fbInfo">
            <div class="m-nav-sel">
                <el-select v-model="mode" placeholder="选择模式" size="small">
                    <el-option v-for="(group, key) in modeList" :key="key" :label="group.mode" :value="group.mode">
                    </el-option>
                </el-select>
                <el-select v-model="boss" placeholder="选择首领" size="small">
                    <el-option v-for="item in bossList" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="m-nav-detail">
                <a href="" class="u-tag"><i class="el-icon-collection"></i>副本攻略</a>
                <a href="" class="u-tag"><i class="el-icon-film"></i>副本简介</a>
                <a href="" class="u-tag"><i class="el-icon-present"></i>副本掉落</a>
                <a href="" class="u-tag"><i class="el-icon-medal"></i>副本成就</a>
                <a href="" class="u-tag"><i class="el-icon-cherry"></i>瑰石列表</a>
                <a href="" class="u-tag"><i class="el-icon-help"></i>Npc信息</a>
            </div>
        </div>
        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-app">
            <a href="/jcl" target="_blank">
                <img class="u-icon" :src="getAppIcon('jcl', true)" />
                <span>日志分析</span>
                <em>JX3 Combat Log</em>
            </a>
            <a href="/battle" target="_blank">
                <img class="u-icon" :src="getAppIcon('battle')" />
                <span>团队统计</span>
                <em>Team Statistics</em>
            </a>
            <a href="" target="_blank">
                <img class="u-icon" :src="getAppIcon('battle')" />
                <span>Boss时间轴</span>
                <em>Boss Timeline</em>
            </a>
            <a href="/team" target="_blank">
                <img class="u-icon" :src="getAppIcon('team')" />
                <span>团队平台</span>
                <em>Team Platform</em>
            </a>
            <a href="/dbm" target="_blank">
                <img class="u-icon" :src="getAppIcon('dbm')" />
                <span>数据构建</span>
                <em>DBM Structure</em>
            </a>
            <a href="/bahuang" target="_blank">
                <img class="u-icon" :src="getAppIcon('battle')" />
                <span>八荒衡鉴</span>
                <em>Ba Huang</em>
            </a>
            <a href="/baizhan" target="_blank">
                <img class="u-icon" :src="getAppIcon('battle')" />
                <span>百战查询</span>
                <em>Bai Zhan</em>
            </a>
        </div>

        <!-- 原副本分组 -->
        <!-- <div class="m-nav-group" v-for="(group, key) in map" :key="key">
            <h2 class="u-category active" v-show="!search">
                <span class="u-title">🍄 {{ key }}</span>
                <em class="u-level">({{ group.level }})</em>
            </h2>
            <ul class="u-list">
                <li v-for="(item, subkey) in group.dungeon" :key="subkey" class="u-item" :class="{
                    active: isActive(subkey, group),
                    hidden: isHide(subkey),
                }">
                    <router-link class="u-link" :to="{ query: { fb_zlp: group.name, fb_name: subkey } }">
                        {{ item.name }}
                    </router-link>
                </li>
            </ul>
        </div> -->
    </div>
</template>

<script>
import { __imgPath } from "/node_modules/@jx3box/jx3box-common/data/jx3box.json"
//引入默认副本信息
import defaultFb from "/setting.json"
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "list",
    props: [],
    data: function () {
        return {
            search: "",
            map: this.$store.state.map,
            searchBelong: [],
            imgPath: __imgPath,
            //初始变量定义需优化↓
            fbName: defaultFb.default_fb.std,
            fbZlp: defaultFb.default_zlp.std,
            fbImg: this.$store.state.map[defaultFb.default_zlp.std].dungeon[defaultFb.default_fb.std].icon,
            modeList: this.$store.state.map[defaultFb.default_zlp.std].dungeon[defaultFb.default_fb.std].maps,
            bossList: this.$store.state.map[defaultFb.default_zlp.std].dungeon[defaultFb.default_fb.std].boss,
            boss: "",
            mode: ""
        };
    },
    computed: {
        searchMap: function () {
            let search_map = {};
            for (let group in this.map) {
                let fbs = this.map[group]["dungeon"];
                for (let fbname in fbs) {
                    let fb = fbs[fbname];
                    // 副本单元信息
                    let __ = [];
                    __.push(group);
                    __.push(fbname);
                    for (let boss of fb.boss) {
                        __.push(boss);
                    }

                    search_map[fbname] = __;
                }
            }
            return search_map;
        },
        client: function () {
            return this.$store.state.client;
        },
    },
    methods: {
        url: function (zlp, fb) {
            return `/fb/?fb_zlp=${zlp}&fb_name=${fb}` + "#" + this.$route.path;
        },
        isActive: function (subkey, group) {
            // let params = new URLSearchParams(location.search);
            // let current = params.get("fb_name");
            let current = this.$route.query.fb_name;
            let zlp = this.$route.query.fb_zlp
            return current == subkey && group.name == zlp;
        },
        isHide: function (subkey) {
            if (!this.search) return;
            if (this.searchMap[subkey].includes(this.search)) {
                return false;
            } else {
                for (let key of this.searchMap[subkey]) {
                    if (key.includes(this.search)) {
                        return false;
                    }
                }
            }
            return true;
        },
        getAppIcon,
        //下拉框修改展示的副本内容
        changeFb: function (fb_zlp, fb_name) {
            this.$router.push('?fb_zlp=' + fb_zlp + '&fb_name=' + fb_name)
            this.fbZlp = fb_zlp;
            this.fbName = fb_name;
            this.fbImg = this.map[fb_zlp].dungeon[fb_name].icon;
            this.modeList = this.map[fb_zlp].dungeon[fb_name].maps;
            this.bossList = this.map[fb_zlp].dungeon[fb_name].boss;
            this.boss = "";
            this.mode = "";
        }
    },
    watch: {
        "$route.query.fb_zlp": function (val) {
            this.$store.state.zlp = val;
        },
        "$route.query.fb_name": function (val) {
            this.$store.state.fb = val;
        },
        mode: function (val) {
            this.mode = val;
            //路由待定
        },
        boss: function (val) {
            this.boss = val;
            //路由待定
        }

    },
};
</script>

<style lang="less">
@import "../../assets/css/nav.less";
</style>
