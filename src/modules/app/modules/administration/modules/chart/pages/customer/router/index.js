export default [
  {
    path: "customer-layout",
    component: () => import("../layouts/main.vue"),
    meta: { label: "customer" },
    children: [
      {
        path: "",
        redirect: "/app/administration/charts/customer-layout/customer-chart"
      },
      {
        path: "customer-chart",
        meta: { label: "customer" },
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

