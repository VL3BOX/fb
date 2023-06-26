<template>
    <div class="u-skill-item">
        <el-popover placement="right-start" trigger="hover" :visible-arrow="false" popper-class="u-item__popup">
            <template slot="reference">
                <img class="u-skill-icon" :src="iconLink(iconId, client)" />
            </template>
            <jx3-skill v-if="id" :client="client" :id="id" :level="level"></jx3-skill>
        </el-popover>
        <div class="u-item-name">
            {{ source.szSkillName }}
        </div>
    </div>
</template>

<script>
import { iconLink } from "@jx3box/jx3box-common/js/utils";
import Jx3Skill from "@jx3box/jx3box-editor/src/Skill";
export default {
    name: "SkillIcon",
    props: {
        source: {
            type: Object,
            required: true,
        },
    },
    components: {
        Jx3Skill,
    },
    watch: {
        source: {
            immediate: true,
            deep: true,
            handler(source) {
                const data = source?.InSkill || {};
                if (data.SkillID) {
                    // 将数据放入 sessionStorage
                    sessionStorage.setItem(`skill-${this.client}-${this.id}-${this.level}`, JSON.stringify(data));
                }
            },
        },
    },
    computed: {
        iconId() {
            return ~~this.source?.InSkill?.IconID || 0;
        },
        id() {
            return ~~this.source?.dwInSkillID || 0;
        },
        level() {
            return ~~this.source?.InSkill?.level || 0;
        },
    },
    data() {
        return {
            client: "std",
        };
    },
    methods: {
        iconLink,
    },
};
</script>
