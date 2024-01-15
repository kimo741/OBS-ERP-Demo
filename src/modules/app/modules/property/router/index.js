// import chartProperty from "../pages/charts-property/router"
// import units from "../pages/units/pages/property-units.vue"
export default [
  {
    path: "property",
    component: () => import("../layouts/main"),
    meta: { label: "property" },
    children: [
      {
        path: "",
        redirect: "/app/property/charts-property"
      },
      {
        path: "charts-property",
        meta: { label: "charts-property" },
        component: () => import("../pages/charts-property/pages/index.vue"),
      },
      {
        path: "units",
        meta: { label: "units" },
        component: () => import("../pages/units/pages/property-units.vue"),
      },
      {
        path: "projects",
        meta: { label: "projects" },
        component: () => import("../pages/projects/pages/index.vue"),
      },
      {
        path: "transaction",
        meta: { label: "transaction" },
        component: () => import("../pages/transaction/pages/index.vue"),
      },
      {
        path: "visits",
        meta: { label: "visits" },
        component: () => import("../pages/visits/pages/index.vue"),
      },
      // ...chartProperty,
    ]
  }
];
