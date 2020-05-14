import axios from "axios";
import {__node} from '@jx3box/jx3box-common/js/jx3box.json'
const API = __node + 'npc/map/'

function getPosts(params) {
    let query = {
        type: "fb",
    };
    if (params) {
        query = Object.assign(query, params);
    }

    return axios.get(API, {
        params: query,
    });
}

export { getPosts };
