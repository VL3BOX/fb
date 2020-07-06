import axios from "axios";
import { __helperUrl } from "@jx3box/jx3box-common/js/jx3box.json";

const API = __helperUrl + "api/item/prediction";
function getGemlist(fb, page = 1) {
    return axios.get(API, {
        params: {
            dungeon: fb,
            page: page,
        },
        headers: {
            Accept: "application/prs.helper.v2+json",
        },
    });
}

function searchItem(kw, page = 1) {
    return axios.get(API, {
        params: {
            keyword: kw,
            page: page,
        },
        headers: {
            Accept: "application/prs.helper.v2+json",
        },
    });
}

export { getGemlist, searchItem };
