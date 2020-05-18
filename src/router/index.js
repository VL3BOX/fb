import Vue from "vue";
import VueRouter from "vue-router";

import Index from "../views/Index.vue";
import Drop from "../views/Drop.vue";
import JMap from "../views/Map.vue";
import Npc from "../views/Npc.vue";
import Skill from "../views/Skill.vue";
import Story from "../views/Story.vue";
import Cj from "../views/Cj.vue";
import Rank from "../views/Rank.vue";

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
