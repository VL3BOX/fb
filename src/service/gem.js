import { $helper } from "@jx3box/jx3box-common/js/https";

export function getGemList(params) {
    return $helper().get('/api/item/prediction', {
        params: params,
    })
}

