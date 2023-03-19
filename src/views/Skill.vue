<template>
    <ListLayout>
        <div class="v-skill">
            <v1 v-if="hasRight && client == 'std'"></v1>
            <v2 v-else></v2>
        </div>
    </ListLayout>
</template>

<script>
import v1 from "./Skill_v1.vue";
import v2 from "./Skill_v2.vue";
import User from "@jx3box/jx3box-common/js/user";
import { getIsSuperAuthor } from "@/service/getSkill.js";
export default {
    name: "Skill",
    props: [],
    components: {
        v1,
        v2,
    },
    data: function () {
        return {
            isAdmin: false,
            isSuperAuthor: false,
        };
    },
    computed: {
        client: function () {
            return this.$store.state.client;
        },
        hasRight: function () {
            return this.isAdmin || this.isSuperAuthor;
        },
    },
    mounted: function () {
        getIsSuperAuthor(User.getInfo().uid).then((res) => {
            this.isSuperAuthor = res.data?.data;
        });
    },
};
</script>
