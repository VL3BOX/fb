<template>
    <div class="m-fb-nav m-fb-list-nav">
        <div class="m-nav-search" @click.stop>
            <!-- 下拉框 -->
            <el-select v-model="search" placeholder="选择副本" clearable filterable>
                <el-option-group v-for="(group, key) in map" :key="key" :label="'🍄 ' + key + '(' + group.level + ')'">
                    <el-option v-for="(item, subkey) in group.dungeon" :key="subkey" :label="subkey" :value="subkey"
                        @click.native="changeFb(key, subkey)">
                    </el-option>
                </el-option-group>
            </el-select>
        </div>

        <div class="m-nav-panel">
            <img class="u-img" :src="getMap(fbDetail.icon)" />
            <div class="u-name">{{ fbName }}</div>
        </div>
        <div class="m-nav-info">
            <!-- 模式与首领选择 功能未实现 -->
            <div class="m-nav-sel">
                <el-select v-model="mode" placeholder="全部模式" size="small" clearable popper-append-to-body>
                    <el-option v-for="(group, key) in fbDetail.maps" :key="key" :label="group.mode" :value="group.mode">
                    </el-option>
                </el-select>
                <el-select v-model="boss" placeholder="全部首领" size="small" clearable popper-append-to-body>
                    <el-option v-for="item in fbDetail.boss" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </div>
            <div class="m-nav-tag">
                <div v-for="(item, key) in tabs" :key="key" class="u-tag" :class="{ active: tagActive(item.name) }"
                    @click="url(item.name)">
                    <i :class="'el-icon-' + item.icon"></i>
                    <span>{{ item.label }}</span>
                </div>
            </div>
        </div>
        <h5 class="u-title">在线应用</h5>
        <div class="m-nav-app">
            <a href="/jcl" target="_blank">
                <img class="u-icon" :src="getAppIcon('jcl')" />
                <span>日志分析</span>
                <em>JX3 Combat Log</em>
            </a>
            <a href="/battle" target="_blank">
                <img class="u-icon" :src="getAppIcon('battle')" />
                <span>团队统计</span>
                <em>Team Statistics</em>
            </a>
            <a href="" target="_blank">
                <img class="u-icon" :src="getAppIcon('')" />
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
                <img class="u-icon" :src="getAppIcon('bhhj')" />
                <span>八荒衡鉴</span>
                <em>Ba Huang</em>
            </a>
            <a href="/baizhan" target="_blank">
                <img class="u-icon" :src="getAppIcon('baizhan')" />
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
import { default_zlp, default_fb } from "/setting.json"
import { getAppIcon } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "listNav",
    props: [],
    data: function () {
        return {
            search: "",
            searchBelong: [],
            fbName: '',
            fbZlp: '',
            fbDetail: {},
            boss: "",
            mode: "",
            tabs: [
                {
                    label: '副本攻略',
                    icon: 'collection',
                    name: 'index'
                }, {
                    label: '副本掉落',
                    icon: 'present',
                    name: 'drop'
                }, {
                    label: '瑰石列表',
                    icon: 'cherry',
                    name: 'gem'
                }, {
                    label: '副本成就',
                    icon: 'medal',
                    name: 'cj'
                }, {
                    label: '秘境传说',
                    icon: 'film',
                    name: 'story'
                }, {
                    label: '首领数据',
                    icon: 'aim',
                    name: 'npc'
                }, {
                    label: '高阶技巧',
                    icon: 'help',
                    name: 'attr'
                }
            ]
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
        map: function () {
            return this.$store.state.map;
        },
        topic() {
            return this.boss || this.mode || undefined;
        }
    },
    methods: {
        url: function (tagname) {
            this.$router.push({
                name: tagname,
                query: {
                    fb_name: this.$route.query.fb_name,
                    fb_zlp: this.$route.query.fb_zlp,
                },
            });
        },
        getMap: function (path) {
            return __imgPath + path
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
            const topic = this.boss || this.mode || undefined;
            const query = {
                fb_zlp,
                fb_name,
                topic
            }
            this.$router.push({ query })
            this.fbZlp = fb_zlp;
            this.fbName = fb_name;
            this.fbDetail = this.map[fb_zlp].dungeon[fb_name];
            this.boss = "";
            this.mode = "";
        },
        tagActive: function (tag_name) {
            return this.$route.name == tag_name
        }
    },
    watch: {
        "$route.query": {
            deep: true,
            immediate: true,
            handler(val) {
                const fb_zlp = val.fb_zlp || default_zlp[this.client];
                this.$store.commit('setState', { key: 'zlp', val: fb_zlp });
                this.fbZlp = fb_zlp;

                const fb_name = val.fb_name || default_fb[this.client];
                this.$store.commit('setState', { key: 'fb', val: fb_name });
                this.fbName = fb_name;

                this.fbDetail = this.map[fb_zlp].dungeon[fb_name];

                this.search = this.fbName || '';
            }
        },
        topic() {
            const query = {
                fb_zlp: this.fbZlp,
                fb_name: this.fbName,
                topic: this.topic
            }
            this.$router.push({ query })
        },
        mode(val) {
            if (val) this.boss = '';
        },
        boss(val) {
            if (val) this.mode = '';
        }
    },
};
</script>

<style lang="less">
@import "../../assets/css/nav.less";
</style>
