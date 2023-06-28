<template>
    <el-dialog class="m-map-dialog" :visible.sync="show" :title="title" :before-close="close" draggable>
        <div class="u-list">
            <a href="" @click.prevent="toSetData(item)" class="u-item" v-for="item in list" :key="item.id">
                {{ dateFormat(new Date(item.start)) }}
            </a>
        </div>
    </el-dialog>
</template>
<script>
import { getMaps } from "@/service/baizhan";
import User from "@jx3box/jx3box-common/js/user";
import { dateFormat } from "@/utils/dateFormat";
export default {
    name: "MapList",
    props: ["visible"],
    data: function () {
        return {
            loading: false,
            title: "往期地图",
            list: [],
        };
    },
    computed: {
        isEditor: function () {
            return User.isEditor();
        },
    },
    watch: {
        visible: {
            immediate: true,
            handler: function (val) {
                this.show = val;
            },
        },
    },
    methods: {
        dateFormat,
        // 关闭
        close() {
            this.show = false;
            this.$emit("close");
        },
        load() {
            getMaps({ only_enable: 1 }).then((res) => {
                this.list = res.data?.data || [];
            });
        },
        toSetData(item) {
            const data = item?.data || [];
            this.$emit("update", data);
        },
    },
    mounted() {
        this.load();
    },
};
</script>
<style lang="less">
.m-map-dialog {
    .u-list {
        .flex;
        gap: 20px;
        flex-wrap: wrap;
        .u-item {
            &:hover {
                text-decoration: underline;
            }
        }
    }
    @media screen and (max-width: @phone) {
        max-width: 100%;
        .el-dialog {
            margin-top: 3vh !important;
            width: 90%;
        }
    }
}
</style>
