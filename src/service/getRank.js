import axios from "axios";
const API = 'https://bkr.uploads.j3cx.com/api/fb-rank/achieve/'

function getDateRank(id) {
    return axios.get(API + id, {
        params: {
            pageSize : 100
        },
    });
}

function getMiniRank(id) {
    return axios.get(API + id, {
        params: {
            pageSize : 10
        },
    });
}

export { getDateRank, getMiniRank };


