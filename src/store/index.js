import Vue from "vue";
import Vuex from "vuex";
import map from '@jx3box/jx3box-data/data/fb/fb_map.json'

Vue.use(Vuex);

let store = {
    state: {
        mode : 'list',
        
        map,
        fb : '',
        zlp : '',
        luaindex : {},

        pid : 0,
        post : {},
        meta : {},
        setting : {},
        author : {},
        status : false
    },
    mutations: {
    },
    getters: {
    },
    actions: {},
    modules: {}
};

export default new Vuex.Store(store);
