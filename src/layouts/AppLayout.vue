<template>
    <div>
        <Header></Header>
        <Breadcrumb name="副本" slug="fb" root="/fb" :feedbackEnable="true" :crumbEnable="false">
            <!-- <Info /> -->
        </Breadcrumb>
        <Main :withoutRight="true" :withoutLeft="true">
            <div class="m-main">
                <slot></slot>
            </div>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
export default {
    name: "App",
    props: [],
    data: function () {
        return {};
    },
    methods: {},
    components: {

    },
};
</script>

<style lang="less">
@import "~@/assets/css/list.less";
</style>
