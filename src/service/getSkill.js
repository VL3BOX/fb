import axios from "axios";
import { __ossMirror, __luaPath } from "@jx3box/jx3box-common/data/jx3box.json";

function getLuaIndex(fbname) {
    // return axios.get(__ossMirror + "lua/index.json?v=" + Date.now());
    return axios.get(__luaPath + `fb/${fbname}/index.json?v=` + Date.now());
}
function getLua(fbname, boss) {
    // return axios.get(__ossMirror + `lua/${fb}/${boss}.json?v=` + Date.now());
    return axios.get(__luaPath + `fb/${fbname}/${boss}.json?v=` + Date.now());
}

export { getLuaIndex, getLua };
