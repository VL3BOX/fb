import axios from "axios";
import { __next } from "@jx3box/jx3box-common/js/jx3box.json";
// const API = '/api/fb/rank/'
const API = __next + "api/fb/rank/"; //TODO:

function getDateRank(id) {
    return axios.get(API + id, {
        params: {
            pageSize: 100,
        },
    });
}

function getMiniRank(id) {
    return axios.get(API + id, {
        params: {
            pageSize: 10,
        },
    });
}

export { getDateRank, getMiniRank };
