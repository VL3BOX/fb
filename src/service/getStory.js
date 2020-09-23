import axios from "axios";
import {__node} from '@jx3box/jx3box-common/js/jx3box.json'
const API = __node

function getInfo(fb) {
    return axios.get(API + 'fb/info',{
        params : {
            OtherName : fb
        }
    });
}

function getBoss(mapid){
    return axios.get(API + 'fb/boss',{
        params : {
            MapID : mapid
        }
    });
}

export { getInfo,getBoss };
