import { getBosses, getBossInfo, getTypes, getSkills, getSkillInfo, getEffects, getMap } from "@/service/baizhan";
import { __imgPath } from "@jx3box/jx3box-common/data/jx3box.json";
import { baizhanEffects } from "@/assets/data/baizhan_effects.js";

export default {
    namespaced: true,
    state: {
        // 当前页面
        activeTab: "map",

        currentEffect: [],
        currentBoss: {},
        types: {},
        bosses: [],
        skills: [],
        skillExtraList: [],
        effects: [],

        map: "",
        maps: [],
    },
    mutations: {
        setState(state, val) {
            state[val.key] = val.val;
        },
    },
    actions: {
        resetCurrent({ commit }) {
            commit("setState", {
                key: "currentBoss",
                val: {},
            });
            commit("setState", {
                key: "currentEffect",
                val: [],
            });
        },
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
        async loadBosses({ commit, dispatch }, payLoad) {
            const cache = sessionStorage.getItem(`baizhan-bosses`);
            if (!payLoad?.isForce && cache) {
                const data = JSON.parse(cache);
                commit("setState", {
                    key: "bosses",
                    val: data,
                });
            } else {
                // 手动强制替换 或没有存storage
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
                        if (payLoad?.isForce) {
                            dispatch("loadMap");
                        }
                    });
                });
            }
        },
        async loadSkills({ commit }) {
            const cache = sessionStorage.getItem(`baizhan-skills`);
            const extraCache = sessionStorage.getItem(`baizhan-skillExtraList`);
            if (cache && extraCache) {
                const data = JSON.parse(cache);
                commit("setState", {
                    key: "skills",
                    val: data,
                });
                const extraData = JSON.parse(extraCache);
                commit("setState", {
                    key: "skillExtraList",
                    val: extraData,
                });
            } else {
                await getSkills().then((res) => {
                    const list = res.data?.data?.list || [];
                    const ids = list.map((item) => item.dwInSkillID).join(",");
                    getSkillInfo({ ids: ids }).then((resInfo) => {
                        const skillExtraList = resInfo.data?.data || [];
                        const newList = list.map((item) => {
                            const extra = skillExtraList.find((extra) => extra.skill_id === item.dwInSkillID) || {};
                            item.extra = extra;
                            item.skillIconId = item?.Skill?.IconID;
                            return item;
                        });
                        commit("setState", {
                            key: "skills",
                            val: newList,
                        });
                        commit("setState", {
                            key: "skillExtraList",
                            val: skillExtraList,
                        });
                        sessionStorage.setItem(`baizhan-skills`, JSON.stringify(newList));
                        sessionStorage.setItem(`baizhan-skillExtraList`, JSON.stringify(skillExtraList));
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
                        buffID: 24848,
                    });
                    const effects = list.map((item) => {
                        return {
                            ...item,
                            coin: baizhanEffects.find((effect) => effect.nID === item.nID)?.coin || 0,
                            sketch: baizhanEffects.find((effect) => effect.nID === item.nID)?.sketch || "",
                            buffID: baizhanEffects.find((effect) => effect.nID === item.nID)?.buffID || 24848,
                            buffLevel: baizhanEffects.find((effect) => effect.nID === item.nID)?.buffLevel || 1,
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
                if (res.data?.code !== 0) return;
                state.map = res.data?.data || "";
                
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
