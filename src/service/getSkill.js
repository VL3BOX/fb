import axios from "axios";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";
const API_INDEX = __ossMirror + "lua/index.json";
const API_BOSS = __ossMirror + "lua/";

function getLuaIndex() {
    return axios.get(API_INDEX);
}
function getLua(fb,boss) {
    return axios.get(`${API_BOSS}${fb}/${boss}.json?=` + Date.now());
}

export { getLuaIndex, getLua };
