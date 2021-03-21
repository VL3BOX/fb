import { axios } from "@jx3box/jx3box-common/js/axios";
import { __server } from "@jx3box/jx3box-common/data/jx3box.json";

function getNews(type, limit = 5) {
    return axios
        .get(__server + "index/list", {
            params: {
                type,
                limit,
            },
        })
        .then((res) => {
            return res.data.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

function getConfig() {
    return axios.get(__server + "index/config");
}

export { getNews, getConfig };
