<template>
    <div class="m-boss-info">
        <div class="u-header">
            <div class="u-skills">
                <div
                    class="u-skill-item"
                    :class="[`u-skill-icon__${skill.skillColor}`, skillActive === index ? 'is-active' : '']"
                    v-for="(skill, index) in boss.skills"
                    :key="skill.skillId"
                    @click="skillActive = index"
                >
                    <div class="u-skill">
                        <img :src="skill.skillIcon" :alt="skill.skillName" />
                    </div>
                </div>
            </div>
            <div class="u-btn">
                <a v-if="boss.link" :title="`${boss.name}攻略`" :href="boss.link" target="_blank" @click.stop>
                    <i class="el-icon-link"></i>
                </a>
                <a v-if="isEditor" class="u-edit" title="编辑" @click.stop="toEdit(boss)">
                    <i class="el-icon-edit-outline"></i>
                </a>
            </div>
        </div>
        <div
            class="u-bottom"
            :class="`u-skill-bg__${boss.skills[skillActive].skillColor}`"
            v-if="boss.skills && boss.skills.length"
        >
            <div class="u-name">
                <a :href="getLink(boss.skills[skillActive].skillId)" target="_blank">{{
                    boss.skills[skillActive].skillName
                }}</a>
                <div class="u-id" @click="toCopy(boss.skills[skillActive].skillId)">
                    ID: {{ boss.skills[skillActive].skillId }}
                </div>
            </div>
            <div class="u-desc" v-if="getSkillDesc(boss.skills[skillActive].skillId, 'SimpleDesc')">
                {{ getSkillDesc(boss.skills[skillActive].skillId, "SimpleDesc") }}
            </div>
            <div class="u-desc">{{ getSkillDesc(boss.skills[skillActive].skillId) }}</div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import User from "@jx3box/jx3box-common/js/user";
import { addBossInfo } from "@/service/baizhan";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
import { __Root } from "@jx3box/jx3box-common/data/jx3box.json";
export default {
    name: "BossInfo",
    props: {
        boss: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            skillActive: 0,
        };
    },
    computed: {
        ...mapState({
            skills: (state) => state.baizhan.skills,
        }),
        isEditor: function () {
            return User.isEditor();
        },
    },
    watch: {
        boss: {
            immediate: true,
            deep: true,
            handler() {
                this.skillActive = 0;
            },
        },
    },
    methods: {
        iconLink,
        getLink(id) {
            const domain = process.env.NODE_ENV === "development" ? __Root : location.origin + "/";
            return domain + `app/database/?type=skill&query=${id}`;
        },
        toEdit(boss) {
            this.$prompt(`请输入${boss.name}攻略链接`, `${boss.name}`, {
                inputValue: boss.link,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnClickModal: false,
            })
                .then(({ value }) => {
                    const data = { boss_name: boss.name, link: value };
                    addBossInfo(data).then(() => {
                        this.$notify({
                            title: "添加成功",
                            type: "success",
                            duration: 2000,
                        });
                        this.$store.dispatch("baizhan/loadBosses", { isForce: true });
                    });
                })
                .catch(() => {});
        },
        toCopy(text) {
            navigator.clipboard.writeText(text).then(() => {
                this.$notify({
                    title: "复制成功",
                    message: `ID: ${text} 复制成功`,
                    type: "success",
                });
            });
        },
        getSkillDesc(id, type = "Desc") {
            // SimpleDesc
            return this.skills.find((skill) => skill.dwInSkillID === id)?.Skill?.[type];
        },
    },
};
</script>
