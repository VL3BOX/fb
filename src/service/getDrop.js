import axios from "axios";
import { __node } from "@jx3box/jx3box-common/data/jx3box.json";
const API = __node;
// const API = "http://localhost:7002/";   //TODO:

function getDrop(bossindex, client = "std") {
    return axios
        .get(API + "fb/drop/" + bossindex, {
            params: {
                client: client,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function getMapid(fbname) {
    return axios
        .get(API + "fb/info", {
            params: {
                OtherName: fbname,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function getBossid(mapid) {
    return axios
        .get(API + "fb/boss", {
            params: {
                MapID: mapid,
            },
        })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export { getDrop, getMapid, getBossid };
