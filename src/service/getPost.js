import axios from "axios";
import {__server} from '@jx3box/jx3box-common/js/jx3box.json'
// const API = __server + 'post/list'
const API = 'http://localhost:5160/' + 'post/list'  //TODO:

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
