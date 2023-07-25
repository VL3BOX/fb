<template>
    <div v-if="current.dwBossID" class="m-right-info">
        <div class="u-boss-info">
            <div class="u-name-wrap">
                <img class="u-avatar" :src="current.bossAvatar" :alt="current.bossName" />
                <div class="u-name-info">
                    <div class="u-floor">
                        <span>第{{ current.floor }}层</span>
                        <a
                            v-if="current.bossLink"
                            class="u-link"
                            :title="`${current.bossName}攻略`"
                            :href="current.bossLink"
                            target="_blank"
                            @click.stop
                        >
                            攻略
                        </a>
                    </div>
                    <div class="u-name">{{ current.bossName }}</div>
                </div>
            </div>
            <div v-if="current.nEffectID" class="u-effect-wrap">
                <div class="u-header">层数效果</div>
                <div class="u-title">
                    <img
                        class="u-effect-icon"
                        :src="current.effectIcon"
                        :alt="current.effectName"
                        @click.stop="toBuff(current)"
                    />
                    <div class="u-name">{{ current.effectName }}</div>
                </div>
                <div class="u-desc" v-html="current.effectDesc"></div>
            </div>
            <div class="u-skill-wrap">
                <div class="u-header">掉落</div>
                <div class="u-skill-list">
                    <a
                        class="u-skill-item"
                        :class="`u-skill-icon__${skill.skillColor}`"
                        v-for="skill in current.skills"
                        :key="skill.skillId"
                        :href="getUrl(skill.skillId)"
                        target="_blank"
                    >
                        <img class="u-skill-icon" :src="skill.skillIcon" :alt="skill.skillName" />
                        <span>{{ skill.skillName }}</span>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "BInfo",
    computed: {
        ...mapState({
            currentBoss: (state) => state.baizhan.currentBoss,
            skills: (state) => state.baizhan.skills,
        }),
        current() {
            const skills = this.currentBoss?.boss?.skills || [];
            return {
                ...this.currentBoss,
                effectIcon: iconLink(this.currentBoss.effect?.dwIconID || 18005),
                effectName: this.currentBoss.effect?.szName,
                effectDesc: this.currentBoss.effect?.szDescription,
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
        },
    },
    methods: {
        getUrl(id) {
            return `https://jx3box.com/app/database/?type=skill&query=${id}`;
        },
        toBuff(floor) {
            window.open(
                `https://jx3box.com/app/database/?type=buff&query=${floor.effect.buffID}&level=${floor.effect.buffLevel}`,
                "_blank"
            );
        },
    },
};
</script>

<style lang="less">
@import "~@/assets/css/baizhan/info.less";
</style>
