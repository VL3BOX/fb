<template>
    <div class="m-fb-nav m-fb-list-nav">
        <div class="m-nav-search" @click.stop>
            <!-- 下拉框 -->
            <el-select v-model="search" placeholder="选择副本" clearable filterable @change="changeFb">
                <el-option-group v-for="(group, key) in map" :key="key" :label="'🍄 ' + key + '(' + group.level + ')'">
                    <el-option v-for="(item, subkey) in group.dungeon" :key="subkey" :label="subkey" :value="subkey">
                    </el-option>
                </el-option-group>
            </el-select>
        </div>

        <div class="m-nav-panel">
            <img class="u-img" :src="getMap(fbDetail.icon)" />
            <div class="u-name">{{ fbName }}</div>
        </div>
        <div class="m-nav-info">
            <div class="m-nav-sel">
                <el-select v-model="mode" placeholder="全部模式" size="small" clearable popper-append-to-body :disabled="!fbName">
                    <el-option v-for="(group, key) in fbDetail.maps" :key="key" :label="group.mode" :value="group.mode">
                    </el-option>
                </el-select>
                <el-select v-model="boss" placeholder="全部首领" size="small" clearable popper-append-to-body :disabled="!fbName">
                    <el-option v-for="item in fbDetail.boss" :key="item" :label="item" :value="item">
                    </el-option>
                </el-select>
            </div>
            <!-- <div class="m-nav-tag">
                <div v-for="(item, key) in tabs" :key="key" class="u-tag" :class="{ active: tagActive(item.name) }"
                    @click="tagClick(item.name)">
                    <i :class="'el-icon-' + item.icon"></i>
                    <span>{{ item.label }}</span>
                </div>
            </div> -->
        </div>

        <div class="m-nav-app">
            <h5 class="u-title">在线应用</h5>
            <a href="/jdt" target="_blank">
                <img class="u-icon" :src="getAppIcon('jdt')" />
                <span>秘境百强</span>
                <em>JX3 Dungeon Top100</em>
            </a>
            <a href="/team" target="_blank">
                <img class="u-icon" :src="getAppIcon('team')" />
                <span>团队平台</span>
                <em>Team Platform</em>
            </a>
            <a href="/jcl" target="_blank">
                <img class="u-icon" :src="getAppIcon('jcl')" />
                <span>日志分析</span>
                <em>JX3 Combat Log</em>
            </a>
            <a href="/battle" target="_blank">
                <img class="u-icon" :src="getAppIcon('battle')" />
                <span>战斗统计</span>
                <em>Battle Statistics</em>
            </a>
            <a href="/jcl" target="_blank" class="disabled" @click.prevent>
                <img class="u-icon" src="@/assets/img/timeline.svg" />
                <span>时间轴</span>
                <em>Boss Timeline</em>
            </a>
            <a href="/dbm" target="_blank" class="disabled" @click.prevent>
                <img class="u-icon" :src="getAppIcon('dbm')" />
                <span>数据构建</span>
                <em>DBM Data Builder</em>
            </a>
            <a href="/bahuang" target="_blank" v-if="client == 'origin'">
                <img class="u-icon" :src="getAppIcon('bhhj')" />
                <span>八荒衡鉴</span>
                <em>Ba Huang</em>
            </a>
            <a href="/baizhan" target="_blank" v-if="client == 'std'"  class="disabled" @click.prevent>
                <img class="u-icon" :src="getAppIcon('bhhj')" />
                <span>百战查询</span>
                <em>Bai Zhan</em>
            </a>
        </div>
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
            fbDetail: {
                maps: [],
                boss: [],
                icon: ''
            },
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
        client: function () {
            return this.$store.state.client;
        },
        map: function () {
            return this.$store.state.map;
        },
        topic() {
            return this.boss || this.mode || undefined;
        },
        dungeons() {
            let dungeons = {};

            Object.values(this.map).forEach((group) => {
                Object.assign(dungeons, group.dungeon);
            });

            return dungeons;
        }
    },
    methods: {
        tagClick: function (tagname) {
            if (!this.fbName) return
            this.$router.push({
                name: tagname,
                query: {
                    fb_name: this.$route.query.fb_name,
                },
            });
        },
        getMap: function (path) {
            return path ? __imgPath + path : __imgPath + "image/fb_map_thumbnail/null.png"
        },
        isActive: function (subkey, group) {
            let current = this.$route.query.fb_name;
            return current == subkey
        },
        getAppIcon,
        //下拉框修改展示的副本内容
        changeFb: function (fb_name) {
            const topic = this.boss || this.mode || undefined;
            const query = {
                fb_name,
                topic
            }
            this.$router.push({ query })

            this.fbName = fb_name;

            if (fb_name) {
                this.fbDetail = this.dungeons?.[fb_name];
                this.search = this.fbName || '';
            } else {
                this.fbDetail = {
                    maps: [],
                    boss: [],
                    icon: ''
                };
            }
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
                const fb_name = val?.fb_name
                if (fb_name) {
                    this.$store.commit('setState', { key: 'fb', val: fb_name });
                    this.fbName = fb_name;

                    this.fbDetail = this.dungeons?.[fb_name];
                    this.search = this.fbName || '';
                }
            }
        },
        topic() {
            const query = {
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
