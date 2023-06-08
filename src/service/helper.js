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

function getSkillGroup(key, client = "std") {
    return $helper({
        headers: {
            "JX3-Client-Type": client == "std" ? 1 : 2,
        },
    }).get(`/api/skill_group/${key}`);
}

function getSkillGroups(keys, client = "std") {
    return $helper({
        headers: {
            "JX3-Client-Type": client == "std" ? 1 : 2,
        },
    }).get(`/api/skill_groups`, {
        params: {
            keys,
        },
    });
}

function getMenuGroups(params) {
    return $cms({ mute: true }).get(`/api/cms/menu-group`, {
        params: params,
    });
}

export { getCollection, getMenuGroup, getBread, getSkillGroup, getMenuGroups, getSkillGroups };
