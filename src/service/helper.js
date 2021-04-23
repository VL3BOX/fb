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

export { getCollection, getMenuGroup, getBread };
