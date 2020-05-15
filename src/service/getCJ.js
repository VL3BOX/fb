import axios from "axios";
import {__helperUrl} from '@jx3box/jx3box-common/js/jx3box.json'
const API = __helperUrl + 'api/achievements'

function getCJ(fb,page=1) {
    let query = {
        dungeon_name : fb,
        page : page,
        limit : 10
    }

    return axios.get(API, {
        params: query,
        headers : {
            'Accept' : 'application/prs.helper.v2+json'	
        }
    });
}

export { getCJ };
