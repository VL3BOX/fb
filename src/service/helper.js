import { $helper, $cms } from "@jx3box/jx3box-common/js/https";

function getCollection($collection_id, params = {}) {
    return $helper()({
        method: "GET",
        url: `/api/post/collection/${$collection_id}`,
        params: params,
    });
}

function getMenuGroup(name) {
    return $cms({ mute: true }).get(`/api/cms/menu-group/${name}`);
}

function getBread(key) {
    return $cms({ mute: true }).get(`/api/cms/breadcrumb/${key}`);
}

function getSkillGroups(key) {
    return $cms({ mute: true }).get(`/api/cms/bps/pvp/specialskill`, {
        params: {
            group: key,
        },
    });
}

function getMenuGroups(params) {
    return $cms({ mute: true }).get(`/api/cms/menu-group`, {
        params: params,
    });
}

export { getCollection, getMenuGroup, getBread, getMenuGroups, getSkillGroups };
