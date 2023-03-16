import { $team } from "@jx3box/jx3box-common/js/https.js";
function getEvents(params) {
    return $team().get(`/api/team/rank/events`, {
        params: params,
    });
}
export {
    getEvents,
};