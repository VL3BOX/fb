import Vue from "vue";
import Vuex from "vuex";
import map from '@jx3box/jx3box-data/data/fb/fb_map.json'

Vue.use(Vuex);

let store = {
    state: {
        map,
        mode : 'list',
        fb : '',
        zlp : '',
        pid : 0,
        luaindex : {},
        post : {},
    },
    mutations: {
    },
    getters: {
    },
    actions: {},
    modules: {}
};

export default new Vuex.Store(store);
