<template>
    <div class="m-boss-info">
        <div class="u-name">
            <span
                >{{ boss.name }}
                <a v-if="boss.link" :title="`${boss.name}攻略`" :href="boss.link" target="_blank" @click.stop>
                    <i class="el-icon-link"></i> </a
            ></span>
            <a v-if="isEditor" class="u-edit" @click.stop="toEdit(boss)">
                <i class="el-icon-edit-outline"></i>
            </a>
        </div>
        <div class="u-skills">
            <div
                class="u-skill"
                :class="`u-skill-icon__${skill.skillColor}`"
                v-for="skill in boss.skills"
                :key="skill.skillId"
            >
                <img :src="skill.skillIcon" :alt="skill.skillName" />
            </div>
        </div>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import { addBossInfo } from "@/service/baizhan";
import { iconLink } from "@jx3box/jx3box-common/js/utils";
export default {
    name: "BossInfo",
    props: {
        boss: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        isEditor: function () {
            return User.isEditor();
        },
    },
    methods: {
        iconLink,
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
    },
    mounted() {},
};
</script>
