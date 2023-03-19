<template>
    <div>
        <Header></Header>
        <Breadcrumb name="副本" slug="fb" root="/fb" :publishEnable="true" :adminEnable="false" :feedbackEnable="true"
            :crumbEnable="true">
            <!-- <Info /> -->
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <div class="m-main m-fb">
                <tabs />
                <slot></slot>
            </div>
            <RightSidebar>
                <Side class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Nav from "@/components/list/list_nav.vue";
import tabs from "@/components/tabs.vue";
import Side from "@/components/list/list_side.vue";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    methods: {},
    components: {
        Nav,
        tabs,
        Side,
    },
};
</script>

<style lang="less">
@import "~@/assets/css/list.less";
</style>
