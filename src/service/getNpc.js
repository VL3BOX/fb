import axios from "axios";
import { __node } from "@jx3box/jx3box-common/js/jx3box.json";
const API_MAP = __node + "npc/map/";
const API_NAME = __node + "npc/name/";

function getMapNpc(fb, page = 1) {
    return axios.get(API_MAP + fb, {
        params: {
            page,
        },
    });
}
function getNpc(name) {
    return axios.get(API_NAME + name);
}

export { getMapNpc, getNpc };
