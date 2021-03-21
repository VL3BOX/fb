import axios from "axios";
import {__node} from '@jx3box/jx3box-common/data/jx3box.json'
const API = __node

function getInfo(fb) {
    return axios.get(API + 'fb/info',{
        params : {
            OtherName : fb
        }
    }).catch((err) => {
        console.log(err)
    })
}

function getBoss(mapid){
    return axios.get(API + 'fb/boss',{
        params : {
            MapID : mapid
        }
    }).catch((err) => {
        console.log(err)
    })
}

export { getInfo,getBoss };
