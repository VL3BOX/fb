import { $cms } from "@jx3box/jx3box-common/js/https.js";
import { $team } from "@jx3box/jx3box-common/js/https.js";
function getActs(params) {
    return $cms().get(`/api/cms/team/raids?server=&search=&time=-1&per=20&is_public=1`, {
        params: params,
    });
}
function getTeams(params) {
    return $team().get(`/api/team/public?pageIndex=1&pageSize=3&server=&name=&tag=&client=std&status=1`, {
        params: params,
    });
}

export {
    getActs,
    getTeams
};