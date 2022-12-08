import { $node } from "@jx3box/jx3box-common/js/https";
const $ = $node();

export function getResource(type, client, data) {
    return $.post(`/resource/${client}/${type}`, data)
}