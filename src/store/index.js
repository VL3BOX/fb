import Vuex from "vuex";
import map from '@jx3box/jx3box-data/data/fb/fb_map.json'

Vue.use(Vuex);

let store = {
    state: {
        map,
        mode : 'list',
        fb : '范阳夜变',
        zlp : '世外蓬莱',
        pid : 0
    },
    mutations: {
    },
    getters: {
    },
    actions: {},
    modules: {}
};

export default new Vuex.Store(store);
