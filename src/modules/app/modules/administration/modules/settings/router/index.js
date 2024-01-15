export default [
  {
    path: "settings",
    component: () => import("../layouts/main"),
    meta: { label: "app.administration.settings.settingsLabel" },
    children: [
      {
        path: "",
        redirect: "/app/administration/settings/languages"
      },
      {
        path: "languages",
        meta: { label: "app.administration.settings.languages.languages" },
        component: () => import("../pages/languages"),
      },
      {
        path: "currencies",
        meta: { label: "app.administration.settings.currency.currencyList" },
        component: () => import("../pages/currency-list.vue")
      },
      {
        path: "addresses",
        meta: { label: "app.administration.settings.addressesList" },
        component: () => import("../pages/addresses-list.vue")
      },
      {
        path: "tags",
        meta: { label: "app.administration.settings.tags.tagsList" },
        component: () => import("../pages/tags.vue"),
      },
      {
        path: "series",
        meta: { label: "app.administration.settings.series.label" },
        component: () => import("../pages/series.vue")
      },
      {
        path: "Customer&vendor Groups",
        meta: { label: "app.administration.settings.groups.label" },
        component: () => import("../pages/customer&vendor-groups.vue")
      },
      {
        path: "business-sector",
        meta: { label: "app.administration.settings.businessSectors.businessSector" },
        component: () => import("../pages/business-sector.vue"),
      },
      {
        path: "accounting-periods",
        meta: { label: "app.administration.settings.accountingPeriods.accountingPeriods" },
        component: () => import("../pages/accounting-periods.vue"),
      },
      {
        path: "dimensions-types",
        meta: { label: "app.administration.settings.dimensionsTypes.label" },
        component: () => import("../pages/dimensions-types.vue"),
      },
      {
        path: "taxes",
        meta: { label: "app.administration.settings.taxes.label" },
        component: () => import("../pages/taxes.vue")
      },
      {
        path: "property-amenities",
        meta: { label: "app.administration.settings.property.amenities" },
        component: () => import("../pages/property/property-amenities.vue")
      },
      {
        path: "property-blocks",
        meta: { label: "app.administration.settings.property.blocks" },
        component: () => import("../pages/property/property-blocks.vue")
      },
      {
        path: "property-floors",
        meta: { label: "app.administration.settings.property.floors" },
        component: () => import("../pages/property/property-floors.vue")
      },
      {
        path: "property-types",
        meta: { label: "app.administration.settings.property.types" },
        component: () => import("../pages/property/property-types.vue")
      },
      {
        path: "property-unit-categories",
        meta: { label: "app.administration.settings.property.unit-categories" },
        component: () => import("../pages/property/property-unit-categories.vue")
      },
      {
        path: "property-unit-types",
        meta: { label: "app.administration.settings.property.property-unit-types" },
        component: () => import("../pages/property/property-unit-types.vue")
      },
      {
        path: "property-Policies",
        meta: { label: "app.administration.settings.property.property-Policies" },
        component: () => import("../pages/property/property-Policies.vue")
      },
      {
        path: "reusage-forms",
        meta: { label: "reusage forms" },
        component: () => import("../pages/property/reuageForm.vue")
      },
      {
        path: "unit-form",
        meta: { label: "Unit form" },
        component: () => import("../pages/property/unit-form.vue")
      },
      {
        path: "face-direction",
        meta: { label: "Face direction" },
        component: () => import("../pages/property/faceDirection.vue")
      },
      {
        path: "visit-Premit-type",
        meta: { label: "Visit Premit type" },
        component: () => import("../pages/property/visit-permit.vue")
      },
      // {
      //   path: "units",
      //   meta: { label: "app.administration.settings.property.units" },
      //   component: () => import("../pages/property/property-units.vue")
      // },
      {
        path: "customer&vendor",
        meta: { label: "app.administration.settings.groups.label" },
        component: () => import("../pages/customer&vendor-groups.vue")
      },
    ],
  },
];
