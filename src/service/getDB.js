import axios from "axios";
import {__node} from '@jx3box/jx3box-common/js/jx3box.json'
const API = __node

function getDB() {
    return axios.get(API);
}

export { getDB };
