<template>
    <div
        id="app"
        :class="{ 'p-list': mode == 'list', 'p-single': mode == 'single' }"
    >
        <Header></Header>
        <Breadcrumb
            name="副本专栏"
            slug="fb"
            root="/fb"
            :publishEnable="true"
            :feedbackEnable="true"
            :adminEnable="true"
        >
            <img slot="logo" svg-inline src="./assets/img/fb.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="false">
            <single v-if="mode == 'single'" />
            <div class="m-fb" v-else>
                <tabs />
                <router-view />
            </div>
            <RightSidebar>
                <Extend />
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from "@/components/Info.vue";
import Nav from "@/components/Nav.vue";
import Extend from "@/components/Extend.vue";
import tabs from "@/components/tabs";
import single from "@/components/single.vue";
const { getRewrite } = require("@jx3box/jx3box-common/js/utils");

export default {
    name: "App",
    props: [],
    data: function() {
        return {
            params: {},
        };
    },
    computed: {
        mode: function() {
            return this.$store.state.mode;
        },
    },
    methods: {},
    beforeCreate: function() {
        this.params = new URLSearchParams(location.search);
        this.$store.state.pid = this.params.get("pid") || getRewrite("pid");
        this.$store.state.mode = this.$store.state.pid ? "single" : "list";
        this.$store.state.zlp = this.params.get("fb_zlp") || this.$store.state.default_zlp;
        this.$store.state.fb = this.params.get("fb_name") || this.$store.state.default_fb;
    },
    components: {
        Info,
        Nav,
        Extend,
        single,
        tabs,
    },
};
</script>

<style lang="less">
@import "./assets/css/layout.less";
</style>