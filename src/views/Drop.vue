<template>
    <div class="m-fb-drop" v-loading="loading">
        <el-tabs v-model="mapid" type="card" @tab-click="loadData">
            <el-tab-pane
                :label="item.mode"
                :name="item.map_id"
                v-for="(item, i) in maplist"
                :key="i"
            >
                <div class="u-bosslist">
                    <!-- <div class="u-label">首领</div> -->
                    <div
                        class="u-boss"
                        :class="{ on: item.BossIndex == bossid }"
                        v-for="(item, j) in bosslist"
                        :key="j"
                        @click="loadDropList(item.BossIndex)"
                    >
                        <!-- <img :src="bossavatar(j)" /> -->
                        <img class="u-boss-avatar" svg-inline src="../assets/img/skull.svg" />
                        {{ item.BOSS }}
                    </div>
                </div>
                <div class="u-droplist">
                    <div class="u-tabs">
                        <el-tabs
                            tab-position="left"
                            class="u-group"
                            v-for="(group, groupname) in fillDroplist(droplist)"
                            :key="groupname"
                            v-model="activeType"
                        >
                            <el-tab-pane
                                :label="dropType(groupname)"
                                v-if="groupname !== 'maps'"
                                :name="groupname"
                            ></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="u-drops">
                        <div
                            class="u-drop"
                            v-for="(group, groupname) in droplist"
                            :key="groupname"
                        >
                            <div
                                v-show="
                                    activeType == 'all' ||
                                        groupname == activeType
                                "
                            >
                                <template v-if="groupname !== 'maps'">
                                    <div
                                        class="u-drop-wrapper"
                                        v-if="group && group.length"
                                    >
                                        <div
                                            class="u-item"
                                            v-for="(drop, dropindex) in group"
                                            :key="dropindex"
                                        >
                                            <el-popover
                                                placement="top"
                                                width="200"
                                                trigger="hover"
                                                :open-delay="100"
                                                :close-delay="50"
                                            >
                                                <drop_item
                                                    class="u-item-content"
                                                    :data="drop"
                                                    :type="groupname"
                                                ></drop_item>
                                                <div slot="reference">
                                                    <i
                                                        class="u-drop-item-icon u-item-icon"
                                                        :class="
                                                            'u-item-color-' +
                                                                drop.Color
                                                        "
                                                    >
                                                        <img
                                                            v-if="
                                                                drop.Icon &&
                                                                    drop.Icon
                                                                        .FileName
                                                            "
                                                            :src="
                                                                drop.Icon
                                                                    .FileName
                                                            "
                                                        />
                                                        <img
                                                            v-else
                                                            src="../assets/img/null.png"
                                                        />
                                                    </i>
                                                    <span class="u-item-name">{{
                                                        drop.Name
                                                    }}</span>
                                                </div>
                                            </el-popover>
                                        </div>
                                    </div>
                                    <el-alert
                                        v-if="
                                            activeType != 'all' &&
                                                (!group ||
                                                    (group && !group.length))
                                        "
                                        title="没有相关条目"
                                        type="info"
                                        show-icon
                                    >
                                    </el-alert>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { getDrop, getMapid, getBossid } from "../service/getDrop";
import dropmap from "../assets/js/drop.json";
import { __iconPath,__ossRoot } from "@jx3box/jx3box-common/data/jx3box.json";
import drop_item from "../components/drop_item";
import _ from "lodash";
const iconids = [4835, 8848, 10452, 10451, 2589, 2646, 2647, 2648];

export default {
    name: "Drop",
    props: [],
    data: function() {
        return {
            mapid: "",
            bossid: "",
            bosslist: [],
            droplist: [],
            activeType: "all",
            data: {},
            loading: false,
        };
    },
    computed: {
        fb: function() {
            return this.$store.state.fb;
        },
        zlp: function() {
            return this.$store.state.zlp;
        },
        maplist: function() {
            return (
                this.$store.state.map &&
                this.$store.state.map[this.zlp]["dungeon"][this.fb]["maps"]
            );
        },
    },
    methods: {
        loadBossList: function() {
            this.loading = true
            return getBossid(this.mapid).then((data) => {
                this.bosslist = data;
                this.bossid = data[0]["BossIndex"];
            }).finally(() => {
                this.loading = false
            })
        },
        loadDropList: function(id) {
            this.bossid = id;
            this.loading = true
            return getDrop(this.bossid).then((data) => {
                this.droplist = data && data.data;
            }).finally(() => {
                this.loading = false
            })
        },
        dropType: function(val) {
            return dropmap[val];
        },
        bossavatar: function(i) {
            return __iconPath + "icon/" + iconids[i] + ".png";
        },
        fillDroplist: function(list) {
            if (list) list["all"] = [];
            return list;
        },
        showDrop: function(drop) {
            this.data = drop;
        },
        loadData: function() {
            this.loadBossList()
                .then(() => {
                    this.loadDropList(this.bossid)
                })
        },
    },
    created: function() {
        this.mapid = this.maplist && this.maplist[0]["map_id"];
        this.loadData();
    },
    components: {
        drop_item,
    },
};
</script>

<style lang="less">
@import "../assets/css/drop.less";
</style>
