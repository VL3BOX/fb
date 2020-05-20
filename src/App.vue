<template>
    <div id="app">
        <Header></Header>
        <Breadcrumb name="副本专栏" slug="fb" root="/fb" publishEnable="true">
            <img slot="logo" svg-inline src="./assets/img/fb.svg" />
            <Info />
        </Breadcrumb>
        <LeftSidebar>
            <Nav />
        </LeftSidebar>
        <Main :withoutRight="false">
            <list v-if="mode == 'list'" />
            <single v-if="mode == 'single'" />
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
import list from "@/components/list.vue";
import single from "@/components/single.vue";
import getRewrite from './utils/getRewrite'
import 'babel-polyfill';

export default {
    name: "App",
    props: [],
    data: function() {
        return {
            params : {}
        };
    },
    computed: {
        mode: function() {
            return this.$store.state.mode
        },
    },
    methods: {},
    created: function() {
        this.params = new URLSearchParams(location.search);
        this.$store.state.zlp = this.params.get("fb_zlp") || '世外蓬莱'
        this.$store.state.fb = this.params.get("fb_name") || '范阳夜变'
        this.$store.state.pid = this.params.get("pid") || getRewrite('pid')
        this.$store.state.mode = this.$store.state.pid ? 'single' : 'list'
    },
    components: {
        Info,
        Nav,
        Extend,
        list,
        single,
    },
};
</script>
