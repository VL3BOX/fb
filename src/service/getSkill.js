import axios from "axios";
import { __ossMirror } from "@jx3box/jx3box-common/js/jx3box.json";

function getLuaIndex() {
    return axios.get(__ossMirror + "lua/index.json?v=" + Date.now());
}
function getLua(fb,boss) {
    return axios.get(__ossMirror + `lua/${fb}/${boss}.json?v=` + Date.now());
}

export { getLuaIndex, getLua };
