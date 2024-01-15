<template>
  <q-page>
    <transaction-form @searchInquiry="searchInquiry" />
    <taple-container
      :colums="colums"
      :rows="rows"
      :moreBtn="moreBtn"
      :isPendeng="isPendeng"
      @pagenationChanged="searchInquiry"
    />
  </q-page>
</template>

<script setup>
const propertyType = ref([]);
import { Loading } from "quasar";
const { useActions: unitSetting } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);

const { useActions: propertyActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
import { inquiryForm } from "../components/use";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import transactionForm from "../components/transaction-form.vue";
import tapleContainer from "../components/taple-container.vue";
import { onMounted, ref, watch } from "vue";
const moreBtn = ref(["edit", "duplicate", "delete"]);
const rows = ref([]);
const isPendeng = ref(false);
const { unitType } = propertyActions(["unitType"]);
const getUnitTypeList = () => {
  unitType().then((res) => {
    console.log(res);
    propertyType.value = res.data;
  });
};
const colums = ref([
  {
    name: "Project",
    label: "Project",
  },
  {
    name: "Property",
    label: "Property",
  },
  {
    name: "unit",
    label: "Unit",
    // badge: true,
  },
  {
    name: "price",
    label: "Price",
    // action: true,
  },
  {
    name: "bedrooms",
    label: "Bedrooms",
    // action: true,
  },
  {
    name: "bethrooms",
    label: "Bethrooms",
    // action: true,
  },
  {
    name: "aria",
    label: "Aria",
    // action: true,
  },
]);
const { postTransaction } = unitSetting(["postTransaction"]);
const searchInquiry = () => {
  Loading.show();
  isPendeng.value = true;
  postTransaction(inquiryForm.value)
    .then((res) => {
      Loading.hide();
      console.log(res);
      PagenationTotalPages.value = res.value.totalPages;
      rows.value = [...res.value.list];
      isPendeng.value = false;
    })
    .catch((err) => {
      isPendeng.value = false;
      Loading.hide();
    });
};
watch(inquiryForm.pagination, (val) => {
  searchInquiry();
  // if (val === true) {
  //   layout.value = "list";
  // }
});
onMounted(() => {
  getUnitTypeList();
});
</script>

<style>
</style>
