import { $helper } from "@jx3box/jx3box-common/js/https";
function getMenuGroups(params) {
    return $helper({ mute: true }).get(`/api/menu_groups`, {
        params: params,
    });
}

export { getMenuGroups };
