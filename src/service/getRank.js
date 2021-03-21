import axios from "axios";
import { __next } from "@jx3box/jx3box-common/data/jx3box.json";
const API = __next + "api/fb/rank/"; 

function getDateRank(id) {
    let limit = 100
    if(id == 7529) limit = 66
    return axios.get(API + id, {
        params: {
            pageSize: limit,
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
