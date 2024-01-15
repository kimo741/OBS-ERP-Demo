import dashboardRoutes from "../modules/dashboard/router";
import administrationRoutes from "../modules/administration/router";
import profileRoutes from "../modules/profile/router";
import property from "../modules/property/router";

export default [
  // Default Route
  {
    path: "",
    redirect: "/app/dashboard",
  },
  {
    path: "app",
    component: () => import("../layouts/main"),
    meta: { label: "app.home", icon: "home" },
    children: [
      {
        path: "",
        redirect: "/app/dashboard",
      },
      {
        path: "/app/messages",
        component: () => import("../components/messages/index.vue"),
      },

      // Modules
      ...property,
      ...dashboardRoutes,
      ...administrationRoutes,
      ...profileRoutes,
    ],
  },
];
