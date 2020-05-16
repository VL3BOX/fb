import axios from "axios";
import {__server} from '@jx3box/jx3box-common/js/jx3box.json'
// const API_LIST = __server + 'post/list'
const API_LIST = 'http://localhost:5160/' + 'post/list'  //TODO:
// const API_SINGLE = __server + 'post/find'  //TODO:
const API_SINGLE = 'http://localhost:5160/' + 'post/find'  //TODO:

function getPosts(params) {
    let query = {
        type: "fb",
    };
    if (params) {
        query = Object.assign(query, params);
    }

    return axios.get(API_LIST, {
        params: query,
    });
}
function getPost(pid) {
    return axios.get(API_SINGLE, {
        params: {
            id : pid
        },
    });
}

export { getPosts ,getPost};
