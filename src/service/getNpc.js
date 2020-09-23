import axios from "axios";
import { __node } from "@jx3box/jx3box-common/js/jx3box.json";
// const __node = "http://localhost:3001/"; //TODO:

function getMapNpc(fb, params) {
    return axios.get(__node + "npc/map/" + fb, {
        params: params,
    });
}

function getNpcList(params) {
    return axios.get(__node + "npc", {
        params: params,
    });
}

function getBossList(mapid){
    return axios.get(__node + 'fb/boss',{
        params : {
            MapID : mapid
        }
    })
}

function getBossIds(indexs){
    return axios.get(__node + 'fb/npc',{
        params : {
            Index : indexs
        }
    })
}

export { getNpcList, getMapNpc,getBossList,getBossIds };
