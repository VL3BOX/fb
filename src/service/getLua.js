import { $lua } from "@jx3box/jx3box-common/js/https";

function getLuaIndex(fbname, client = "std") {
    return $lua().get(`/lua/fb/src/${fbname}/index.json`, {
        params: {
            client: client,
        },
    });
}
function getLua(fbname, boss, filename, client = "std") {
    return $lua().get(`/lua/fb/src/${fbname}/${boss}/${filename}`, {
        params: {
            client: client,
        },
    });
}

export { getLuaIndex, getLua };
