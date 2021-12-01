<template>
    <div class="m-fb-drop" v-loading="loading">
        <el-tabs v-model="mapid" type="card">
            <el-tab-pane
                :label="item.mode"
                :name="item.map_id"
                v-for="(item, i) in maplist"
                :key="i"
            >
                <div class="u-bosslist">
                    <div
                        class="u-boss"
                        :class="{ on: item.BOSS == boss }"
                        v-for="(item, j) in bosslist"
                        :key="j"
                        @click="changeBoss(item.BOSS)"
                    >
                        <!-- <img :src="bossavatar(j)" /> -->
                        <img class="u-boss-avatar" svg-inline src="../assets/img/skull.svg" />
                        {{ item.BOSS }}
                    </div>
                </div>
                <div class="u-schools">
                    <div
                        class="u-school"
                        v-for="(school_name,school_id) in schoolmap"
                        :key="school_id"
                        @click="filterBySchool(school_id)"
                        :class="{active:school_id == school}"
                    >
                        <img
                            class="u-school-icon"
                            :src="school_id | showSchoolIcon"
                            :alt="school_name"
                        />
                        <span class="u-school-name">{{~~school_id ? school_name : '全部'}}</span>
                    </div>
                </div>
                <div class="u-droplist">
                    <div class="u-tabs">
                        <el-tabs tab-position="left" class="u-group" v-model="droptype">
                            <el-tab-pane label="全部" name></el-tab-pane>
                            <el-tab-pane
                                :label="groupname"
                                v-for="(groupname, group) in dropmap"
                                :key="group"
                                :name="group"
                            ></el-tab-pane>
                        </el-tabs>
                    </div>
                    <div class="u-drops" v-if="droplist && droplist.length">
                        <div
                            class="u-item-wrapper"
                            v-for="drop in droplist"
                            :key="drop.ItemName"
                            v-show="isVisible(drop)"
                        >
                            <el-popover
                                placement="right-end"
                                popper-class="u-drop-popup"
                                width="auto"
                                :visible-arrow="false"
                                trigger="hover"
                                transition="none"
                                :close-delay="0"
                            >
                                <a
                                    slot="reference"
                                    class="u-item"
                                    :href="getDropLink(drop)"
                                    target="_blank"
                                    @mouseenter="viewDrop(drop)"
                                >
                                    <i
                                        class="u-drop-item-icon u-item-icon"
                                        :class="'u-item-color-' + drop.ItemQuality"
                                    >
                                        <img :src="iconLink(drop.ItemIconID)" />
                                    </i>
                                    <span class="u-item-name">{{ drop.ItemName}}</span>
                                </a>
                                <jx3-item :item_id="drop.jx3_item_id" :jx3-client-type="client_id" v-if="focus == drop.ItemID"/>
                            </el-popover>
                        </div>
                    </div>
                    <el-alert v-else title="没有相关条目" type="info" show-icon></el-alert>
                </div>
            </el-tab-pane>
        </el-tabs>
        <!-- <router-link class="u-switch-version" to="/drop"><i class="el-icon-sort"></i> 切换至旧版</router-link> -->
    </div>
</template>

<script>
import { getDropV2, getBoss } from "../service/getDrop";
import {
    __iconPath,
    __ossRoot,
    __imgPath,
} from "@jx3box/jx3box-common/data/jx3box.json";
import dropmap from "../assets/data/drop_types.json";
import {
    getLink,
    iconLink,
    jx3ClientType,
} from "@jx3box/jx3box-common/js/utils";
import schoolmap from "@jx3box/jx3box-data/data/xf/schoolid.json";
import Item from "@jx3box/jx3box-editor/src/Item.vue";
// import drop_item from "../components/drop_item";

export default {
    name: "DropV2",
    props: [],
    data: function () {
        return {
            mapid: "",
            bosslist: [],
            boss: "",

            dropmap,
            droplist: [],
            droptype: "",

            focus : '',
            data: {},
            loading: false,

            school: "0",
            schoolmap,
        };
    },
    computed: {
        fb: function () {
            return this.$route.query.fb_name || this.$store.state.default_fb;
        },
        zlp: function () {
            return this.$route.query.fb_zlp || this.$store.state.default_zlp;
        },
        client: function () {
            return this.$store.state.client || "std";
        },
        maplist: function () {
            return this.$store.state.map?.[this.zlp]?.["dungeon"]?.[this.fb]?.[
                "maps"
            ];
        },
        params: function () {
            return {
                client: this.client,
                BossName: this.boss,
                // ItemType: this.droptype,
            };
        },
        client_id: function () {
            return this.client == 'std' ? 1 : 2
        },
    },
    methods: {
        loadData: function () {
            this.loadBossList().then(() => {
                this.loadDropList();
            });
        },
        loadBossList: function () {
            return getBoss(this.mapid, this.client).then((res) => {
                this.bosslist = res?.data || [];
                this.boss = this.bosslist[0]["BOSS"];
            });
        },
        loadDropList: function () {
            this.loading = true;
            return getDropV2(this.mapid, this.params)
                .then((res) => {
                    let data = res?.data;
                    data.forEach((item) => {
                        item.schools = item?.ApplicableSchoolIDs?.split("|");
                        item.jx3_item_id = this.getDropItemID(item)
                    });
                    this.droplist = data;
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        changeBoss: function (boss) {
            this.boss = boss;
            this.loadDropList();
        },
        getDropItemID: function (dropitem) {
            return dropitem.ItemExtID
                ? `${dropitem.ItemType}_${dropitem.ItemID}_${dropitem.ItemExtID}`
                : `${dropitem.ItemType}_${dropitem.ItemID}`;
        },
        getDropLink(dropitem) {
            return getLink("item", dropitem.jx3_item_id);
        },
        filterBySchool(school_id) {
            this.school = school_id;
        },
        isVisible: function (drop) {
            let categoryIsVisible =
                !~~this.droptype || drop.ItemType == this.droptype;
            let schoolIsVisible =
                !~~this.school || drop.schools?.includes(this.school);
            return categoryIsVisible && schoolIsVisible;
        },
        viewDrop : function (item){
            this.focus = item.ItemID
        },
        iconLink : function (id){
            return iconLink(id,this.client)
        },
    },
    watch: {
        fb: {
            immediate: true,
            handler: function () {
                this.mapid = this.maplist?.[0]["map_id"];
                this.loadData();
            },
        },
        mapid: {
            handler: function (val) {
                val && this.loadData();
            },
        },
    },
    filters: {
        showSchoolIcon: function (val) {
            return __imgPath + "image/school/" + val + ".png";
        },
    },
    components: {
        // drop_item,
        "jx3-item": Item,
    },
};
</script>

<style lang="less">
@import "../assets/css/drop.less";
</style>
