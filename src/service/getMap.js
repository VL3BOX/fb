import axios from "axios";
import {__iconPath} from '@jx3box/jx3box-common/data/jx3box'

function getMaptree(){
    return axios.get(__iconPath + 'map/data/map_tree.json')
}

export {getMaptree}