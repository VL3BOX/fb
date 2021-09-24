import Vue from "vue";
import Vuex from "vuex";
import { getAppID } from "@jx3box/jx3box-common/js/utils";
import map from "@jx3box/jx3box-data/data/fb/fb_map.json";

Vue.use(Vuex);

let store = {
    state: {
        // client
        client: location.href.includes("origin") ? "origin" : "std",
        // post
        id: getAppID(),
        user_id: 0,
        post: "",
        // list
        map,
        fb: "奉天证道",
        zlp: "白帝江关",
        luaindex: {},
        default_zlp: location.href.includes("origin") ? "风起稻香" : "奉天证道",
        default_fb: location.href.includes("origin") ? "战宝迦兰" : "雷域大泽", //雷域大泽

        // collections
        collectionInfo: '',
        maptree : ''
    },
    mutations: {
        switchClient: function(state, val) {
            state.client = val || "std";
        },
        SET_COLLECTION: function (state, val) {
            state.collectionInfo = val
        }
    },
    getters: {},
    actions: {},
    modules: {},
};

export default new Vuex.Store(store);
