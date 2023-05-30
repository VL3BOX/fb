<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="副本专栏" slug="fb" :publishEnable="true" :feedbackEnable="true" :adminEnable="true">
            <template #op-prepend>
                <AdminDirectMessage :user-id="user_id" :sourceId="post.ID" :sourceType="post.post_type"></AdminDirectMessage>
            </template>
        </Breadcrumb>
        <LeftSidebar :uid="user_id">
            <Nav :id="id" class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <slot></slot>
            <RightSidebar :show-toggle="true">
                <Side :id="id" class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/single/single_nav.vue";
import Side from "@/components/single/single_side.vue";
import { getAppIcon, getAppID } from "@jx3box/jx3box-common/js/utils";
import AdminDirectMessage from "@jx3box/jx3box-common-ui/src/bread/AdminDirectMessage.vue"
export default {
    name: "SingleLayout",
    props: [],
    data: function() {
        return {
            id: getAppID(),
        };
    },
    computed: {
        user_id: function () {
            return this.$store.state.user_id;
        },
        post: function (){
            return this.$store.state.post;
        }
    },
    methods: { getAppIcon },
    components: {
        Nav,
        Side,
        AdminDirectMessage
    },
};
</script>

<style lang="less">
@import "~@/assets/css/app.less";
</style>

