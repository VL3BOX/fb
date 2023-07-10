// 第三方UI组件
import Vue from "vue";
// Vue.config.productionTip = false;
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import VueClipboard from "vue-clipboard2";
Vue.use(VueClipboard);

// 通用UI模块
import JX3BOX_UI from "@jx3box/jx3box-common-ui";
import "@jx3box/jx3box-common/css/element.css";
import "@jx3box/jx3box-common/css/normalize.css";
Vue.use(JX3BOX_UI);

import reporter from "@jx3box/jx3box-common/js/reporter";
reporter.install(Vue);

import ListLayout from "@/layouts/ListLayout.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import SingleLayout from "@/layouts/SingleLayout.vue";

Vue.component("AppLayout", AppLayout);
Vue.component("ListLayout", ListLayout);
Vue.component("SingleLayout", SingleLayout);

/**
 * 数据组件
 */
import router from "./router";
import store from "./store";

import App from "./App.vue";
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
