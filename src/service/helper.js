import { $helper } from "@jx3box/jx3box-common/js/https";

function getCollection($collection_id, params = {}) {
    return $helper()({
        method: "GET",
        url: `/api/post/collection/${$collection_id}`,
        params: params,
    });
}

function getMenuGroup(name) {
    return $helper({ mute: true }).get(`/api/menu_group/${name}`);
}

function getBread(key) {
    return $helper({ mute: true }).get(`/api/breadcrumb/${key}`);
}

function getSkillGroup(key) {
    return $helper().get(`/api/skill_group/${key}`);
}

function getSkillGroups(keys) {
    return $helper().get(`/api/skill_groups`, {
        params: {
            keys,
        },
    });
}

function getMenuGroups(params) {
    return $helper({ mute: true }).get(`/api/menu_groups`, {
        params: params,
    });
}

export {
    getCollection,
    getMenuGroup,
    getBread,
    getSkillGroup,
    getMenuGroups,
    getSkillGroups,
};
