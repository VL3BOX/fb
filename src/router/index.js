import Vue from "vue";
import VueRouter from "vue-router";

const Index = () => import('../views/Index.vue')
const Drop = () => import('../views/Drop.vue')
const JMap = () => import('../views/Map.vue')
const Npc = () => import('../views/Npc.vue')
const Skill = () => import('../views/Skill.vue')
const Story = () => import('../views/Story.vue')
const Cj = () => import('../views/Cj.vue')
const Rank = () => import('../views/Rank.vue')

Vue.use(VueRouter);

const routes = [
    { name: "index", path: "/", component: Index },
    { name: "list", path: "/index", component: Index },
    { name: "drop", path: "/drop", component: Drop },
    { name: "map", path: "/map", component: JMap },
    { name: "npc", path: "/npc", component: Npc },
    { name: "skill", path: "/skill", component: Skill },
    { name: "story", path: "/story", component: Story },
    { name: "cj", path: "/cj", component: Cj },
    { name: "rank", path: "/rank", component: Rank },
];

const router = new VueRouter({
    routes,
});

export default router;
