export default [
  {
    path: "charts",
    component: () => import("../layouts/main"),
    meta: { label: "app.administration.charts.chartsLabel" },
    children: [
      {
        path: "",
        redirect: "/app/administration/charts/charts-items"
      },
      {
        path: "charts-items",
        meta: { label: "app.administration.charts.chartsAccounts.label" },
        component: () => import("../pages/charts-items"),
      },
      {
        path: "details",
        meta: { label: "app.administration.charts.chartsAccounts.details.addDetails" },
        component: () => import("../../account-group/pages/index.vue"),
      },
      {
        path: "edit-account/:id",
        meta: { label: "app.administration.charts.chartsAccounts.details.editAccount" },
        component: () => import("../../account-group/pages/index.vue"),
        name: 'account'
      },
      {
        path: "edit-group/:id",
        meta: { label: "app.administration.charts.chartsAccounts.details.editGroup" },
        component: () => import("../../account-group/pages/index.vue"),
        name: 'group'
      },
    ],
  },
];

