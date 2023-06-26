import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import("../views/Index.vue");
// const Drop = () => import('../views/Drop.vue')
const DropV2 = () => import("../views/Drop_v2.vue");
const JMap = () => import("../views/Map.vue");
const Npc = () => import("../views/Npc.vue");
const Skill = () => import("../views/Skill.vue");
const Attr = () => import("../views/Attr.vue");
const Story = () => import("../views/Story.vue");
const Cj = () => import("../views/Cj.vue");
// const Rank = () => import('../views/Rank.vue')
const Gem = () => import("../views/Gem.vue");
const Lua = () => import("../views/Lua.vue");
const Bahuang = () => import("../views/Bahuang.vue");
const Baizhan = () => import("../views/Baizhan.vue");
const ListLayout = () => import("@/layouts/ListLayout.vue");
const Post = () => import("@/views/Single.vue");

Vue.use(VueRouter);

// 解决重复点击路由报错的BUG
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const routes = [
    // default layout
    {
        name: "list",
        component: ListLayout,
        path: "/",
        redirect: {
            name: "index",
        },
        children: [
            { name: "index", path: "", component: Index, meta: { withoutRight: false } },
            { name: "drop", path: "/drop", component: DropV2, meta: { withoutRight: true } },
            { name: "drop_v2", path: "/drop_v2", component: DropV2, meta: { withoutRight: true } },
            { name: "map", path: "/map", component: JMap, meta: { withoutRight: true } },
            { name: "npc", path: "/npc", component: Npc, meta: { withoutRight: true } },
            { name: "skill", path: "/skill", component: Skill, meta: { withoutRight: true } },
            { name: "attr", path: "/attr", component: Attr, meta: { withoutRight: true } },
            { name: "story", path: "/story", component: Story, meta: { withoutRight: true } },
            { name: "cj", path: "/cj", component: Cj, meta: { withoutRight: true } },
            // { name: "rank", path: "/rank", component: Rank, meta: { withoutRight: true } },
            { name: "gem", path: "/gem", component: Gem, meta: { withoutRight: true } },
            { name: "lua", path: "/lua", component: Lua, meta: { withoutRight: true } },
        ],
    },

    { name: "bahuang", path: "/bahuang", component: Bahuang },

    { name: "baizhan", path: "/baizhan", component: Baizhan },

    { name: "post", path: "/:id(\\d+)", component: Post },
];

const router = new VueRouter({
    routes,
    mode: "history",
    base: "/fb",
});

export default router;
