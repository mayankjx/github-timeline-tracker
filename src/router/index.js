import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Timeline from "../views/Timeline.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      enterClass: "animate__animated animate__fadeInLeft",
      leaveClass: "animate__animated animate__fadeOutRight",
    },
  },
  {
    path: "/timeline",
    name: "Timeline",
    component: Timeline,
    meta: {
      enterClass: "animate__animated animate__fadeInRight",
      leaveClass: "animate__animated animate__fadeOutLeft",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
