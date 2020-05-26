import axios from "axios";
import {__api} from '@jx3box/jx3box-common/js/jx3box.json'
const API = __api + 'api/fb-rank/achieve/'

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


