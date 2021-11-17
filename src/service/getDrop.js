// import { $node } from "@jx3box/jx3box-common/js/https";
// const $ = $node();

import axios from "axios";
const $ = axios.create({
    baseURL: "http://localhost:7002/",
});

function getBoss(map_id, client = "std") {
    return $.get("/fb/boss", {
        params: {
            MapID: map_id,
            client: client,
        },
    });
}

function getDrop(bossindex, client = "std") {
    return $.get("/fb/drop/" + bossindex, {
        params: {
            client: client,
        },
    })
}

export { getDrop, getBoss };
