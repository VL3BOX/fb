<template>
    <div>
        <Header></Header>
        <Breadcrumb
            name="副本专栏"
            slug="fb"
            root="/fb"
            :publishEnable="true"
            :adminEnable="false"
            :feedbackEnable="true"
            :crumbEnable="true"
        >
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="withoutRight">
            <div class="m-main m-fb">
                <tabs />
                <router-view />
            </div>
            <RightSidebar class="m-fb-right-side" :show-toggle="true">
                <Side class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/list/list_nav.vue";
import tabs from "@/components/tabs.vue";
import Info from "@/components/Info.vue";
import Side from "@/components/baizhan/map_side.vue";
export default {
    name: "App",
    data: function () {
        return {
            withoutRight: false,
        };
    },
    components: {
        Nav,
        tabs,
        Side,
        Info
    },
    watch: {
        $route: {
            deep: true,
            immediate: true,
            handler: function (to, from) {
                this.withoutRight = to?.meta?.withoutRight;
            },
        },
    },
};
</script>

<style lang="less">
.m-fb-right-side {
//     &.c-sidebar-right.is-close {
//         transform: translateX(0) !important;
//     }
.c-sidebar-right-inner {
    background: #fff;
}
}
@import "~@/assets/css/list.less";
</style>
