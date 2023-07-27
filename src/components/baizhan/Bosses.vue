<template>
    <div class="p-bosses">
        <div class="m-boss-wrap" :class="isInfo ? 'is-info' : ''">
            <div class="m-boss-list">
                <div
                    class="u-boss"
                    :class="topic === item.name && 'is-active'"
                    v-for="item in bossList"
                    :key="item.id"
                    @click="setBoss(item)"
                >
                    <img class="u-avatar" :src="item.avatar" :alt="item.name" />
                    <div class="u-name">{{ item.name }}</div>
                </div>
            </div>
            <BossInfo :boss="current"></BossInfo>
        </div>
        <BRaider :topic="topic"></BRaider>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
import BRaider from "./BRaider.vue";
import BossInfo from "./BossInfo.vue";
export default {
    name: "Bosses",
    data() {
        return {
            bossList: [],
            bossNames: [],
            topic: "",
        };
    },
    components: {
        BRaider,
        BossInfo,
    },
    computed: {
        ...mapState({
            bosses: (state) => state.baizhan.bosses,
            currentBoss: (state) => state.baizhan.currentBoss,
            skills: (state) => state.baizhan.skills,
        }),
        isInfo() {
            return this.bossNames.includes(this.topic);
        },
        current() {
            const currentName = this.isInfo ? this.topic : "";
            return this.bossList.find((item) => item.name === currentName) || {};
        },
    },
    watch: {
        "$route.query": {
            deep: true,
            immediate: true,
            handler(query) {
                const { topic } = query;
                this.topic = topic === "全部" ? "" : topic;
                if (topic === "全部" || !topic) {
                    this.$store.commit("baizhan/setState", {
                        key: "currentBoss",
                        val: {},
                    });
                }
            },
        },
        bosses: {
            immediate: true,
            deep: true,
            handler(list) {
                const bossNames = Array.from(new Set(list.map((item) => item.name)));
                this.bossNames = bossNames;
                this.bossList = bossNames
                    .map((name) => {
                        return {
                            name,
                            ...list.find((item) => item.name === name),
                        };
                    })
                    .map((boss) => {
                        const skills = boss?.skills || [];
                        return {
                            ...boss,
                            skills: skills.map((skill) => {
                                const skillObj = this.skills.find((item) => item.dwInSkillID === skill);
                                return {
                                    skillId: skill,
                                    skillName: skillObj?.szSkillName,
                                    skillColor: skillObj?.nColor,
                                    skillIcon: iconLink(skillObj?.skillIconId || 13),
                                };
                            }),
                        };
                    });
            },
        },
        currentBoss(boss) {
            const { bossName } = boss;
            this.setBoss({ name: bossName });
        },
    },
    methods: {
        iconLink,
        setBoss(item) {
            let { name } = item;
            if (name === this.topic) {
                name = "";
            }
            this.$router.push({
                query: name
                    ? {
                          topic: name,
                      }
                    : {},
            });
        },
    },
    beforeDestroy() {
        this.$router.push({ query: {} });
    },
};
</script>
<style lang="less">
@import "~@/assets/css/list.less";
@import "~@/assets/css/baizhan/bosses.less";
</style>
