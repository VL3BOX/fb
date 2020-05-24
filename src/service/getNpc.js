import axios from "axios";
import {
    __node
} from "@jx3box/jx3box-common/js/jx3box.json";
import {
    getLocalForage,
    setLocalForage
} from './localForage.js';
import {
    axios as myAxios
} from './axios/api.js';

const API_MAP = __node + "npc/map/";
const API_MAP_ALL_NPC = __node + "npc2/"
const API_NAME = __node + "npc/";

async function getMapNpc(fb, version = "20200524") {
    return await checkVersion(fb, version)
    // return axios.get(API_MAP + fb);
}

function getNpc(name) {
    return axios.get(API_NAME + name);
}

async function checkVersion(fb, version) {
    return new Promise((resolve, reject) => {
        let result = null
        getLocalForage('fbnpc', 'version', async (value, err) => {
            if (err) {
                console.log('读取version错误')
                result = await getRemoteNpc(fb, true)
                resolve(result)
            }
            if (value === null) {
                console.log('没有version')
                setLocalForage(
                    'fbnpc',
                    'version',
                    version,
                    async () => {
                        result = await getRemoteNpc(fb)
                        resolve(result)
                    },
                    err => {}
                )
            } else {
                if (value === version) {
                    result = await retrieveNpcFromLocal(fb)
                } else {
                    result = await getRemoteNpc(fb)
                }
                resolve(result)
            }
        })

    })
}

async function retrieveNpcFromLocal(fb) {
    let result = null
    return new Promise((resolve, reject) => {
        getLocalForage('fbnpc', fb, async (value, err) => {
            if (err) {
                console.log('读取fb错误')
                result = await getRemoteNpc(fb, true)
                resolve(result)
            }
            if (value === null) {
                result = await getRemoteNpc(fb)
                resolve(result)
            } else {
                result = await value
                resolve(result)
            }
        })
    })
}

async function getRemoteNpc(fb, skipLocalForage = false) {
    return new Promise((resolve, reject) => {
        myAxios(API_MAP_ALL_NPC + fb)
            .then((res) => {
                console.log(res)
                if (!skipLocalForage) {
                    setLocalForage(
                        'fbnpc',
                        fb,
                        res,
                        () => {},
                        err => {}
                    )
                }
                resolve(res)
            })
            .catch((e) => {
                resolve([])
            })
    })
}

export {
    getMapNpc,
    getNpc
};
