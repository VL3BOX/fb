import { getBosses, getBossInfo, getTypes, getSkills, getSkillInfo, getEffects, getMap } from "@/service/baizhan";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { baizhanEffects } from "@/assets/data/baizhan_effects.js";

export default {
    namespaced: true,
    state: {
        currentEffect: [],
        currentBoss: {},
        types: {},
        bosses: [],
        skills: [],
        effects: [],
        maps: [],
    },
    mutations: {
        setState(state, val) {
            state[val.key] = val.val;
        },
    },
    actions: {
        async loadTypes({ commit }) {
            const cache = sessionStorage.getItem(`baizhan-types`);
            if (cache) {
                const data = JSON.parse(cache);
                commit("setState", {
                    key: "types",
                    val: data,
                });
            } else {
                await getTypes().then((res) => {
                    const data = res.data?.data || {};
                    const types = {
                        szTypes: data?.[1] || [],
                        costs: data?.[2] || [],
                        colors: data?.[3] || [],
                    };
                    commit("setState", {
                        key: "types",
                        val: types,
                    });
                    sessionStorage.setItem(`baizhan-types`, JSON.stringify(types));
                });
            }
        },
        async loadBosses({ commit }) {
            const cache = sessionStorage.getItem(`baizhan-bosses`);
            if (cache) {
                const data = JSON.parse(cache);
                commit("setState", {
                    key: "bosses",
                    val: data,
                });
            } else {
                await getBosses().then((res) => {
                    let list = res.data?.data || [];
                    list = list.map((item) => {
                        return {
                            id: item.dwNpcID,
                            avatar: item.ImagePath
                                ? `${__imgPath}pve/baizhan/${item.ImagePath.match(/\\([^\\]*)\./)[1].toLowerCase()}_${
                                      item.ImageFrame
                                  }.png`
                                : `${__imgPath}pve/baizhan/fbcdpanel02_51.png`,
                            name: item.szName,
                            skills: item.szSkill,
                        };
                    });
                    let map = new Map();
                    let mapList = list.filter((v) => !map.has(v.name) && map.set(v.name, 1));
                    const names = mapList.map((item) => item.name).join(",");
                    getBossInfo({ names: names }).then((resInfo) => {
                        const bossExtraList = resInfo.data?.data || [];
                        const bosses = list.map((item) => {
                            item.link = bossExtraList.find((boss) => boss.boss_name === item.name)?.link || "";
                            return item;
                        });
                        commit("setState", {
                            key: "bosses",
                            val: bosses,
                        });
                        sessionStorage.setItem(`baizhan-bosses`, JSON.stringify(bosses));
                    });
                });
            }
        },
        async loadSkills({ commit }) {
            const cache = sessionStorage.getItem(`baizhan-skills`);
            if (cache) {
                const data = JSON.parse(cache);
                commit("setState", {
                    key: "skills",
                    val: data,
                });
            } else {
                await getSkills().then((res) => {
                    const list = res.data?.data?.list || [];
                    const ids = list.map((item) => item.dwInSkillID).join(",");
                    getSkillInfo({ ids: ids }).then((resInfo) => {
                        const skillExtraList = resInfo.data?.data || [];
                        const newList = list.map((item) => {
                            item.extra = skillExtraList.find((extra) => extra.skill_id === item.dwInSkillID) || {};
                            return item;
                        });
                        commit("setState", {
                            key: "skills",
                            val: newList,
                        });
                        sessionStorage.setItem(`baizhan-skills`, JSON.stringify(newList));
                    });
                });
            }
        },
        async loadEffects({ commit }) {
            const cache = sessionStorage.getItem(`baizhan-effects`);
            if (cache) {
                const data = JSON.parse(cache);
                commit("setState", {
                    key: "effects",
                    val: data,
                });
            } else {
                await getEffects().then((res) => {
                    const list = res.data?.data || [];
                    list.unshift({
                        nID: 0,
                        dwIconID: 18505,
                        szName: "无",
                        szDescription: "",
                        coin: 0,
                        sketch: "",
                    });
                    const effects = list.map((item) => {
                        return {
                            ...item,
                            coin: baizhanEffects.find((effect) => effect.nID === item.nID)?.coin || 0,
                            sketch: baizhanEffects.find((effect) => effect.nID === item.nID)?.sketch || "",
                        };
                    });
                    commit("setState", {
                        key: "effects",
                        val: effects,
                    });
                    sessionStorage.setItem(`baizhan-effects`, JSON.stringify(effects));
                });
            }
        },
        async loadMap({ commit, state }) {
            await getMap().then((res) => {
                const bosses = state.bosses;
                const effects = state.effects;
                const data = res.data?.data?.data || [];
                const list = data.map((item) => {
                    return {
                        ...item,
                        boss: bosses.find((boss) => boss.id === item.dwBossID),
                        bossName: bosses.find((boss) => boss.id === item.dwBossID)?.name,
                        bossLink: bosses.find((boss) => boss.id === item.dwBossID)?.link,
                        bossAvatar: bosses.find((boss) => boss.id === item.dwBossID)?.avatar,
                        effect: effects.find((effect) => effect.nID === item.nEffectID),
                    };
                });
                commit("setState", {
                    key: "maps",
                    val: list,
                });
            });
        },
    },
};
