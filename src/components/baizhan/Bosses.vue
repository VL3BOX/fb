<template>
    <div class="m-bosses">
        <div
            class="u-boss"
            :class="currentBoss === item.name && 'is-active'"
            v-for="item in bosses"
            :key="item.id"
            @click="setBoss(item)"
        >
            <div class="u-left">
                <img class="u-avatar" :src="item.avatar" :alt="item.name" />
            </div>
            <div class="u-right">
                <div class="u-name">
                    <span
                        >{{ item.name }}
                        <a v-if="item.link" :title="`${item.name}攻略`" :href="item.link" target="_blank">
                            <i class="el-icon-link"></i> </a
                    ></span>
                    <a v-if="isEditor" class="u-edit" @click.stop="toEdit(item)">
                        <i class="el-icon-edit-outline"></i>
                    </a>
                </div>
                <div class="u-skills">
                    <SkillIcon
                        :source="{
                            dwInSkillID: skill,
                        }"
                        v-for="skill in item.skills"
                        :key="skill"
                    ></SkillIcon>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import User from "@jx3box/jx3box-common/js/user";
import SkillIcon from "./SkillIcon.vue";
import { addBossInfo } from "@/service/baizhan";
export default {
    name: "Bosses",
    components: {
        SkillIcon,
    },
    props: {
        bosses: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            client: "std",
            level: 0,
        };
    },
    computed: {
        currentBoss() {
            return this.$store.state.baizhanBoss;
        },
        isEditor: function () {
            return User.isEditor();
        },
    },
    methods: {
        setBoss(item) {
            this.$store.commit("setState", {
                key: "baizhanBoss",
                val: item.name,
            });
        },
        toEdit(item) {
            this.$prompt(`请输入${item.name}攻略链接`, `${item.name}`, {
                inputValue: item.link,
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                closeOnClickModal: false,
            })
                .then(({ value }) => {
                    const data = { boss_name: item.name, link: value };
                    addBossInfo(data).then(() => {
                        this.$notify({
                            title: "添加成功",
                            type: "success",
                            duration: 2000,
                        });
                    });
                    this.$emit("update", data);
                })
                .catch(() => {});
        },
    },
};
</script>
