import { $helper } from "@jx3box/jx3box-common/js/https";

export function getAchievements(params) {
    return $helper.get('/api/achievements', {
        params: params,
        // headers: {
        //     Accept: "application/prs.helper.v2+json",
        // },
    })
}
