<template>
    <div
        class="p-map"
        v-loading="loading"
        ref="container"
        @mousedown="startDrag"
        @mousemove="drag"
        @mouseup="stopDrag"
        @mouseleave="stopDrag"
    >
        <div
            class="m-boss-list"
            ref="map"
            :style="{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` }"
            @click="preventClick"
        >
            <el-button class="u-download" icon="el-icon-download" @click="exportToImage"></el-button>
            <div class="u-step" v-for="(item, step) in list" :key="step">
                <div
                    class="u-floor"
                    :class="[
                        floor.effect ? 'is-effect' : '',
                        activeFloor === step * 10 + index + 1 ? 'is-active' : '',
                        currentBoss === floor.boss ? 'is-current' : '',
                    ]"
                    v-for="(floor, index) in item"
                    :key="index"
                    @click="setFloor(step * 10 + index + 1)"
                >
                    <div class="u-floor-content">
                        <div class="u-index" :class="floor.effect && 'u-effect'">
                            {{ step * 10 + index + 1 }}
                        </div>
                        <div class="u-img">
                            <img :src="getBossAvatar(floor.boss)" :alt="floor.boss || '未知'" />
                        </div>
                        <div class="u-name" :class="currentBoss === floor.boss && 'is-current'">
                            {{ floor.boss }}
                        </div>
                        <div class="u-desc">
                            <div v-if="getEffectInfo(floor.effect, 'sketch').length" class="u-sketch">
                                <div
                                    class="u-sketch-info"
                                    v-for="(sketch, si) in getEffectInfo(floor.effect, 'sketch')"
                                    :key="si"
                                >
                                    {{ sketch }}
                                </div>
                            </div>
                            <div v-if="getEffectInfo(floor.effect, 'coin')" class="u-coin">
                                <img class="u-coin-img" src="@/assets/img/baizhan/coin.svg" svg-inline />
                                <span>{{ getEffectInfo(floor.effect, "coin") }}</span>
                            </div>
                        </div>
                        <div v-if="floor.effect" class="u-icon">
                            <img :src="getEffectInfo(floor.effect)" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="u-watermark" ref="watermark">
                <h1 class="u-title">
                    <img svg-inline src="@/assets/img/logo.svg" fill="#deddd3" />百战异闻录 {{ startDate }} 至
                    {{ endDate }}
                </h1>
                <h1 class="u-title u-bottom-title">By: 魔盒 (https://www.jx3box.com)</h1>
                <div class="u-watermark-content">
                    <h1 v-for="item in 8" :key="item" class="u-title">
                        <img svg-inline src="@/assets/img/logo.svg" fill="#deddd3" />
                        <span>JX3BOX</span>
                    </h1>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { getMap } from "@/service/baizhan";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
import { arr1to2, isPhone, isQQ, isWeChat } from "@/utils";
import { getWeekStartDate, getWeekEndDate } from "@/utils/dateFormat";
import { cloneDeep } from "lodash";
import html2canvas from "html2canvas";
export default {
    name: "BaizhanMap",
    inject: ["__imgRoot"],
    props: ["bosses", "effects"],
    data() {
        return {
            loading: false,
            data: [],
            startDate: getWeekStartDate(),
            endDate: getWeekEndDate(),
            point: {
                level: 1,
                boss: "",
                effect: 0,
            },
            step: 6,
            row: 10,
            activeFloor: 1, // 当前层数 BOSS
            currentFloor: {
                level: 1,
                boss: "",
                effect: 0,
            },
            scale: 1,

            isDragging: false,
            startPosition: { x: 0, y: 0 },
            offset: { x: 0, y: 0 },
            position: { x: 0, y: 0 },
            velocity: { x: 0, y: 0 },
            lastPosition: { x: 0, y: 0 },
            lastTime: 0,
            dampingFactor: 0.9, // 越小速度衰减的越快
            momentumMultiplier: 0, // 根据鼠标移动的距离动态计算惯性效果的远近
            containerBounds: null,
        };
    },
    computed: {
        currentBoss() {
            return this.$store.state.baizhanBoss;
        },
        isEditor: function () {
            return User.isEditor();
        },
        list() {
            const data = cloneDeep(this.data);
            return arr1to2(data, this.row);
        },
    },
    watch: {
        activeFloor: {
            immediate: true,
            handler(index) {
                const point = cloneDeep(this.point);
                const data = cloneDeep(this.data);
                const floor = data?.[index - 1] || point;
                floor.level = Math.ceil(index / this.row);
                this.currentFloor = floor;
            },
        },
    },
    methods: {
        startDrag(event) {
            this.isDragging = true;
            this.startPosition.x = event.clientX;
            this.startPosition.y = event.clientY;
            this.offset.x = event.clientX - this.position.x;
            this.offset.y = event.clientY - this.position.y;
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.lastTime = Date.now();
            this.lastPosition.x = event.clientX;
            this.lastPosition.y = event.clientY;
        },
        drag(event) {
            if (this.isDragging) {
                const currentTime = Date.now();
                const deltaTime = currentTime - this.lastTime;

                this.velocity.x = (event.clientX - this.lastPosition.x) / deltaTime;
                this.velocity.y = (event.clientY - this.lastPosition.y) / deltaTime;

                this.position.x = event.clientX - this.offset.x;
                this.position.y = event.clientY - this.offset.y;
                this.lastTime = currentTime;
                this.lastPosition.x = event.clientX;
                this.lastPosition.y = event.clientY;

                this.updateMomentumMultiplier(event.clientX, event.clientY);
            }
        },
        stopDrag() {
            this.isDragging = false;
            this.applyMomentum();
        },
        updateMomentumMultiplier(currentX, currentY) {
            const distance = Math.sqrt(
                Math.pow(currentX - this.startPosition.x, 2) + Math.pow(currentY - this.startPosition.y, 2)
            );
            this.momentumMultiplier = distance * 0.01;
        },
        applyMomentum() {
            const momentumAnimation = () => {
                this.position.x += this.velocity.x * this.momentumMultiplier;
                this.position.y += this.velocity.y * this.momentumMultiplier;

                if (Math.abs(this.velocity.x) > 0.1 || Math.abs(this.velocity.y) > 0.1) {
                    this.velocity.x *= this.dampingFactor;
                    this.velocity.y *= this.dampingFactor;
                    requestAnimationFrame(momentumAnimation);
                }
            };

            requestAnimationFrame(momentumAnimation);
        },
        updateContainerBounds() {
            this.containerBounds = this.$refs.container.getBoundingClientRect();
        },
        preventClick(event) {
            if (this.isDragging) {
                event.stopPropagation();
            }
        },

        switchFloor(index) {
            if (this.activeFloor === this.data.length && index === 1) {
                return (this.activeFloor = 1);
            }
            if (this.activeFloor === 1 && index === -1) {
                return (this.activeFloor = this.data.length);
            }
            this.activeFloor += index;
        },
        getBossAvatar(name) {
            const avatar =
                this.bosses.find((item) => item.name === name)?.avatar || `${this.__imgRoot}fbcdpanel02_51.png`;
            return avatar;
        },
        getEffectInfo(id, type = "icon") {
            const item = this.effects.find((item) => item.nID === id);
            const iconId = item?.dwIconID || 18005;
            let str = iconLink(iconId);
            if (type === "name") {
                str = item?.szName;
            }
            if (type === "desc") {
                str = item?.szDescription;
            }
            if (type === "coin") {
                str = item?.coin;
            }
            if (type === "sketch") {
                str = item?.sketch.split("/")[0] ? item?.sketch.split("/") : [];
            }
            return str;
        },
        setFloor(index) {
            this.activeFloor = index;
        },
        iconLink,
        async load() {
            this.loading = true;
            await getMap()
                .then((res) => {
                    const data = res.data?.data?.data;
                    this.setData(data);
                })
                .finally(() => {
                    this.loading = false;
                });
        },
        setData(data) {
            const total = this.step * this.row;
            const point = cloneDeep(this.point);
            if (!data || data.length < total) {
                const list = new Array(total).fill(point);
                this.data = list;
            } else {
                this.data = data;
            }
            this.currentFloor = this.data[0];
        },
        handleScroll(event) {
            const delta = event.deltaY || event.detail || event.wheelDelta;

            let scaleNum = 0.05;
            if (delta < 0) {
                // 向上滚动，放大元素
                this.scale += scaleNum;
                if (this.scale > 1.8) {
                    this.scale = 1.8;
                }
            } else {
                // 向下滚动，缩小元素
                this.scale -= scaleNum;
                if (this.scale < 0.2) {
                    this.scale = 0.2;
                }
            }

            event.preventDefault();
        },
        exportToImage() {
            if (isPhone() && (isWeChat() || isQQ())) {
                return this.$message({
                    message: "请在游览器中打开",
                    type: "warning",
                });
            }
            const map = this.$refs.map;
            this.scale = 1;
            this.position = {
                x: 0,
                y: 0,
            };
            map.style.transform = `translate(${this.position.x}px, ${this.position.y}px) scale(${this.scale})`;
            const watermark = this.$refs.watermark;
            watermark.style.display = "block";
            html2canvas(map, {
                useCORS: true,
                width: map.offsetWidth,
                height: map.offsetHeight,
            })
                .then((canvas) => {
                    watermark.style.display = "none";
                    // 创建一个虚拟链接
                    const link = document.createElement("a");
                    link.href = canvas.toDataURL(); // 将 Canvas 转换为 Data URL
                    link.download = `魔盒百战${this.startDate}至${this.endDate}.png`; // 下载文件的名称

                    link.addEventListener("click", () => {
                        setTimeout(() => {
                            URL.revokeObjectURL(link.href); // 删除链接的资源
                        }, 100); // 延迟删除以确保下载完成

                        link.removeEventListener("click", () => {}); // 移除事件监听器
                        document.body.removeChild(link);
                    });
                    document.body.appendChild(link);
                    link.click();
                })
                .catch((error) => {
                    console.error("导出图片出错:", error);
                });
        },
    },
    mounted() {
        this.load().then(() => {
            this.$nextTick(() => {
                const map = this.$refs.map;
                map.addEventListener("wheel", this.handleScroll);

                this.containerBounds = this.$refs.container.getBoundingClientRect();
                window.addEventListener("resize", this.updateContainerBounds);
            });
        });
    },
    beforeDestroy() {
        window.removeEventListener("wheel", this.handleScroll);
        window.removeEventListener("resize", this.updateContainerBounds);
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/map.less";
</style>
