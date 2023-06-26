import { $node } from "@jx3box/jx3box-common/js/https";

// 获取所有的百战BOSS列表
export function getBosses() {
    return $node().get("/monster/boss");
}

// 获取所有的百战Buff列表
export function getBuffs() {
    return $node().get("/monster/buffs");
}

// 获取所有的百战roll点效果
export function getEffects() {
    return $node().get("/monster/effects");
}

// 获取所有的百战技能类型列表
export function getTypes() {
    return $node().get("/monster/types");
}

// 百战技能查询
export function getSkills(params) {
    return $node().get("/monster/skills", {
        params,
    });
}
