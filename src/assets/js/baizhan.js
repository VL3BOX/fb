import { iconLink } from "@jx3box/jx3box-common/js/utils";

export function getEffectInfo(effects, id, type = "icon") {
    const item = effects.find((item) => item.nID === id);
    const iconId = item?.dwIconID || 18005;
    let str = iconLink(iconId);
    if (type === "name") {
        str = item?.szName;
    }
    if (type === "desc") {
        str = item?.szDescription;
    }
    if (type === "coin") {
        str = item?.coin;
    }
    if (type === "sketch") {
        str = item?.sketch.split("/")[0] ? item?.sketch.split("/") : [];
    }
    return str;
}
