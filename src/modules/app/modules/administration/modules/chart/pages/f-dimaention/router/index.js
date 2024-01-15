export default [
  {
    path: "fynention-dimention-layout",
    component: () => import("../layouts/main.vue"),
    meta: { label: "fynention-dimention" },
    children: [
      {
        path: "",
        redirect: "/app/administration/charts/fynention-dimention-layout/fynention-dimention-chart"
      },
      {
        path: "fynention-dimention-chart",
        meta: { label: "fynention-dimention" },
        component: () => import("../pages/index.vue"),
      },
      // {
      //   path: "details",
      //   meta: { label: "app.administration.charts.chartsAccounts.details.addDetails" },
      //   component: () => import("../../account-group/pages/index.vue"),
      // },
      // {
      //   path: "edit-account/:id",
      //   meta: { label: "app.administration.charts.chartsAccounts.details.editAccount" },
      //   component: () => import("../../account-group/pages/index.vue"),
      //   name: 'account'
      // },
      // {
      //   path: "edit-group/:id",
      //   meta: { label: "app.administration.charts.chartsAccounts.details.editGroup" },
      //   component: () => import("../../account-group/pages/index.vue"),
      //   name: 'group'
      // },
    ],
  },
];

