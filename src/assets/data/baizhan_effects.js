export const baizhanEffects = [
    {
        nID: 1,
        coin: 300,
        sketch: "",
        buffID: 24899,
        buffLevel: 1,
    },
    {
        nID: 2,
        coin: 80,
        sketch: "秒杀",
        buffID: 24900,
        buffLevel: 1,
    },
    {
        nID: 3,
        coin: 80,
        sketch: "稀有提高",
        buffID: 24901,
        buffLevel: 1,
    },
    {
        nID: 4,
        coin: 80,
        sketch: "免消耗",
        buffID: 24902,
        buffLevel: 1,
    },
    {
        nID: 5,
        coin: 50,
        sketch: "后退6步/骰子翻倍",
        buffID: 24903,
        buffLevel: 1,
    },
    {
        nID: 6,
        coin: 50,
        sketch: "前进6步/骰子减半",
        buffID: 24904,
        buffLevel: 1,
    },
    {
        nID: 7,
        coin: 100,
        sketch: "",
        buffID: 24905,
        buffLevel: 1,
    },
    {
        nID: 8,
        coin: 100,
        sketch: "后退3步",
        buffID: 24906,
        buffLevel: 1,
    },
    {
        nID: 9,
        coin: 0,
        sketch: "逆向前进",
        buffID: 26257,
        buffLevel: 0,
    },
];

export const effectsFilter = [
    {
        text: "额外奖励",
        key: "reward", // 对应coin以及获取id
        ids: [1, 2, 3, 4, 5, 6, 7, 8],
    },
    {
        text: "骰子提升",
        key: "touzi1",
        ids: [5],
    },
    {
        text: "骰子减弱",
        key: "touzi2",
        ids: [6],
    },
    {
        text: "秒杀",
        key: "fight",
        ids: [2],
    },
    {
        text: "前进",
        key: "forward",
        ids: [6, 9],
    },
    {
        text: "后退",
        key: "back",
        ids: [5, 8],
    },
    {
        text: "稀有提高",
        key: "reward1",
        ids: [3],
    },
];
