// import chartProperty from "../pages/charts-property/router"
import customer from "../pages/customer/router"
import vendor from "../pages/vendor/router"
import fDymention  from "../pages/f-dimaention/router"
import salesPerson  from "../pages/sales-person/router"
export default [
  {
    path: "charts",
    component: () => import("../layouts/main"),
    meta: { label: "app.administration.charts.chartsLabel" },
    children: [
      {
        path: "",
        redirect: "/app/administration/charts/charts-accounts",
      },
      {
        path: "charts-accounts",
        meta: { label: "app.administration.charts.chartsAccounts.label" },
        component: () => import("../pages/charts-accounts/pages"),
      },
      {
        path: "charts-items",
        meta: { label: "app.administration.charts.charts-items.label" },
        component: () => import("../pages/charts-items/pages"),
      },
      {
        path: "charts-accounts/details",
        meta: { label: "app.administration.charts.details.addDetails" },
        component: () => import("../pages/account-group/pages/index.vue"),
      },
      {
        path: "charts-accounts/details/:id",
        meta: { label: "app.administration.charts.details.addDetails" },
        component: () => import("../pages/account-group/pages/index.vue"),
      },
      {
        path: "charts-accounts/edit-account/:id",
        meta: { label: "app.administration.charts.details.editAccount" },
        component: () => import("../pages/account-group/pages/index.vue"),
        name: "account",
      },
      {
        path: "charts-accounts/edit-group/:id",
        meta: { label: "app.administration.charts.details.editGroup" },
        component: () => import("../pages/account-group/pages/index.vue"),
        name: "group",
      },
      // ...chartProperty,
      ...customer,
      ...vendor,
      ...fDymention,
      ...salesPerson,
    ],
  },
];
