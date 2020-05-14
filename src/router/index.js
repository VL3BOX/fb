import VueRouter from "vue-router";

import Index from "../views/Index.vue";
import Drop from "../views/Drop.vue";
import JMap from "../views/Map.vue";
import Npc from "../views/Npc.vue";
import Skill from "../views/Skill.vue";
import Story from "../views/Story.vue";
import Cj from "../views/Cj.vue";

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Index },
    { path: '/index', component: Index },
    { path: '/drop', component: Drop },
    { path: '/map', component: JMap },
    { path: '/npc', component: Npc },
    { path: '/skill', component: Skill },
    { path: '/story', component: Story },
    { path: '/cj', component: Cj },
]

const router = new VueRouter({
    routes
});

export default router;
