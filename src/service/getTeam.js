import { $team } from "@jx3box/jx3box-common/js/https.js";
function getTeams(params, achieveId = 10374, zlp = 6) {
    //默认参数为西津渡
    return $team().get(`/api/team/race/achieve/` + achieveId + `/top100?server=&event_id=` + zlp + `&limit=10`, {
        params: params,
    });
}
export {
    getTeams,
};