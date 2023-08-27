import Vue from "vue";
import VueRouter from "vue-router";
import HelloWorld from "../components/HelloWorld.vue";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    redirect: "/Region",
  },
  {
    path: "/home",
    name: "home",
    component: HelloWorld,
    children: [
      {
        path: "/Region",
        name: "Region",
        component: () => import("../components/Region.vue"),
      },
      {
        path: "/Citys",
        name: "Citys",
        component: () => import("../components/Citys.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
export default router;
