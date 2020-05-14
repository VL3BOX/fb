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
            primary content
            <!-- <Comment post-id="100"/> -->
            <RightSidebar>
                <Extend/>
            </RightSidebar>
            <Footer></Footer>
        </Main>
    </div>
</template>

<script>
import Info from '@/components/Info.vue';
import Nav from '@/components/Nav.vue';
import Extend from '@/components/Extend.vue';

    export default {
        name : 'App',
        props:[],
        data : function(){
            return {
                
            }
        },
        computed:{},
        methods:{},
        mounted:function(){},
        components:{
            Info,
            Nav,
            Extend,
        }
    }
</script>