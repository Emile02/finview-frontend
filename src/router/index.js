import { createRouter, createWebHistory } from "vue-router";


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
    },
    {
      path: "/dashboard",
      component: () => import("@layout/DashboardLayout.vue"),
      children: [
        {
          path: "",
          name: "Dashboard",
          component: () => import("@/views/UserDashboard.vue"),
        },
      ],
    }
    /*{
      path: "/:pathMatch(.*)*",
      name: "NotFound",
      component: () => import("@/views/NotFound.vue"),
    },*/
  ],
});


export default router;