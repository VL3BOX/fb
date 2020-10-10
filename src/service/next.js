import { $next } from "@jx3box/jx3box-common/js/axios";

function getEvents() {
    return $next.get("team/rank/events", {
        // params: params,
    });
}

function getTeams() {
    return $next.get("team/public", {
        params: {
            recruit: 1, //有招募的
            pageSize : 10
        },
    });
}

export { getEvents, getTeams };
