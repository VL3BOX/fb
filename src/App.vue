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
import {getPID,getAppID,getQuery,getAppType} from '@jx3box/jx3box-common/js/utils'
import {__Root} from '@jx3box/jx3box-common/data/jx3box.json'

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
        let id = getAppID()
        let pid = getPID()

        // 旧单页链接跳转
        if(!id && pid){
            let type = getAppType()
            let test = __Root + type + '/' + pid
            location.href = __Root + type + '/' + pid
        }

        // 处理模式 & 文章ID
        this.$store.state.mode = id ? 'single' : 'list'
        this.$store.state.pid = id

        // 捕获subtype
        this.params = new URLSearchParams(location.search);
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