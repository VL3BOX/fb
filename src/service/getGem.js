import axios from "axios";
import { __helperUrl } from "@jx3box/jx3box-common/js/jx3box.json";

const API = __helperUrl + "api/item/prediction";
function getGemList(params) {
    return axios.get(API, {
        params:params,
        headers: {
            Accept: "application/prs.helper.v2+json",
        }
    }).catch((err) => {
        console.log(err)
    })
}

export { getGemList };
