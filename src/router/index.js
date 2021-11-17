import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import('../views/Index.vue')
const Drop = () => import('../views/Drop.vue')
const DropV2 = () => import('../views/Drop_v2.vue')
const JMap = () => import('../views/Map.vue')
const Npc = () => import('../views/Npc.vue')
const Skill = () => import('../views/Skill.vue')
const Attr = () => import('../views/Attr.vue')
const Story = () => import('../views/Story.vue')
const Cj = () => import('../views/Cj.vue')
const Rank = () => import('../views/Rank.vue')
const Team = () => import('../views/Team.vue')
const Gem = () => import('../views/Gem.vue')

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "drop", path: "/drop", component: Drop },
    { name: "drop_v2", path: "/drop_v2", component: DropV2 },
    { name: "map", path: "/map", component: JMap },
    { name: "npc", path: "/npc", component: Npc },
    { name: "skill", path: "/skill", component: Skill },
    { name: "attr", path: "/attr", component: Attr },
    { name: "story", path: "/story", component: Story },
    { name: "cj", path: "/cj", component: Cj },
    { name: "rank", path: "/rank", component: Rank },
    { name: "team", path: "/team", component: Team },
    { name: "gem", path: "/gem", component: Gem },
];

const router = new VueRouter({
    routes,
});

export default router;
