import { createRouter, createWebHistory } from "vue-router";
import { fetchDataBeforeEnter } from "./fetchDataBeforeEnter";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "Login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/home",
      name: "Home",
      component: () => import("../views/Home.vue"),
      beforeEnter: fetchDataBeforeEnter,
    },
    {
      path: "/post/:id",
      name: "Post",
      component: () => import("../views/Post.vue"),
      beforeEnter: fetchDataBeforeEnter,
    },
    {
      path: "/:pathMatch(.*)*",
      redirect: "/login",
    },
  ],
});

export default router;