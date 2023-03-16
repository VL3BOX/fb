<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="副本专栏" slug="fb" :publishEnable="true" :feedbackEnable="true" :adminEnable="false"
            :crumbEnable="true">
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav class="m-nav" />
        </LeftSidebar>
        <Main :withoutRight="false">
            <div class="m-fb">
                <tabs />
                <router-view />
            </div>
            <RightSidebar>
                <Side class="m-extend" />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/list/list_nav.vue";
import Side from "@/components/list/list_side.vue";
import tabs from "@/components/tabs";
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    computed: {},
    methods: {
    },
    components: {
        Info,
        Nav,
        Side,
        tabs,
    },
    beforeCreate: function () {
        this.$store.state.zlp = this.$route.query.fb_zlp;
        this.$store.state.fb = this.$route.query.fb_name;
    },
};
</script>

<style lang="less">
@import "./assets/css/app.less";
</style>
