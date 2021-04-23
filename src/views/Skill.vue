<template>
    <div class="v-skill">
        <v1 v-if="isAdmin"></v1>
        <v2 v-else></v2>
    </div>
</template>

<script>
import v1 from './Skill_v1.vue'
import v2 from './Skill_v2.vue'
import User from '@jx3box/jx3box-common/js/user'
export default {
    name: "Skill",
    props: [],
    components: {
        v1,
        v2
    },
    data: function () {
        return {
            isAdmin : User.isAdmin()
        };
    },
    computed: {},
    methods: {},
    filters: {},
    created: function () {},
    mounted: function () {},
};
</script>