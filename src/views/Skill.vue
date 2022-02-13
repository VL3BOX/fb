<template>
    <div class="v-skill">
        <v1 v-if="hasRight && client == 'std'"></v1>
        <v2 v-else></v2>
    </div>
</template>

<script>
import v1 from "./Skill_v1.vue";
import v2 from "./Skill_v2.vue";
import User from "@jx3box/jx3box-common/js/user";
export default {
    name: "Skill",
    props: [],
    components: {
        v1,
        v2,
    },
    data: function() {
        return {
            hasRight: false,
        };
    },
    computed: {
        client: function() {
            return this.$store.state.client;
        },
    },
    methods: {},
    filters: {},
    created: function() {
        let hasRight = User.isAdmin();
        this.hasRight = hasRight;
        if (!hasRight) {
            User.isPRO().then((data) => {
                this.hasRight = data;
            });
        }
    },
    mounted: function() {},
};
</script>
