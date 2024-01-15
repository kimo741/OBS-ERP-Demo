<template>
  <div class="row full-width">
    <div class="col-6 row items-center">
      <div class="col-10">
        <!-- v-model="unitForm.contact.idType" -->
        <!-- <q-select
          v-model="unitForm.policyId"
          :options="policiesList"
          emit-value
          map-options
          option-label="name"
          option-value="id"
          label="Police"
          @update:model-value="handelChangeSelectedPolicey"
        /> -->
        <dropdown-search-create
          :modelOpstions="policiesList"
          v-model="unitForm.policyId"
          @emitCreateNew="submitCreatePolicy"
          valueOpstion="id"
          labelOpstion="label"
          title="Police"
          @valueUpdated="handelChangeSelectedPolicey"
        />
      </div>
      <div class="col-12 q-mt-xl">
        <q-input
          label="Terms"
          v-model="selectedPolicy.terms"
          outlined
          style=""
          :input-style="{ height: '300px' }"
          type="textarea"
          disable
        />
      </div>
      <div class="col-10 q-mt-xl">
        <q-btn
          color="primary"
          icon="download"
          flat
          class="pointer"
          @click="clickDoc"
          >Document link</q-btn
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { unitForm } from "../form/unit-model-form";

const { useActions: propertySetting } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);
import { Loading, Notify } from "quasar";
import { ref, onMounted } from "vue";
import DropdownSearchCreate from "src/modules/app/modules/property/components/dropdownSearchCreate.vue";
const selectedPolicy = ref({
  id: null,
  name: "",
  terms: "",
  urlFile: "",
});
const policiesList = ref([]);
const { getPoliciesList, createPolicies, getPolicyById } = propertySetting([
  "getPoliciesList",
  "createPolicies",
  "getPolicyById",
]);
const handelGetPolicies = async () => {
  getPoliciesList()
    .then((req) => {
      console.log(req);
      policiesList.value = req.value;
    })
    .then((res) => {
      handelChangeSelectedPolicey();
    })
    .catch((err) => {
      console.log(err);
    });
};
const handelChangeSelectedPolicey = () => {
  // console.log("ok");
  // if (unitForm.value.policyId !== null) {
  // let index = policiesList.value.findIndex(
  //   (el) => (el.id = unitForm.value.policyId)
  // );
  getPolicyById(unitForm.value.policyId)
    .then((res) => {
      console.log(res.value);
      selectedPolicy.value = res.value;
    })
    .catch((err) => {
      console.log(err);
    });
  // }
  // console.log(el);
};
const clickDoc = () => {
  if (selectedPolicy.value.id !== null) {
    var link = document.createElement("a");
    link.href = selectedPolicy.value.urlFile;
    link.download = "policies.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};
const submitCreatePolicy = (value) => {
  Loading.show();
  const formD = new FormData();
  formD.append("Name", value);
  formD.append("Terms", "Type terms here");
  formD.append("File", "");
  createPolicies(formD)
    .then((res) => {
      handelGetPolicies();
      Loading.hide();
      Notify.create({
        message: "A Policy has been created",
        textColor: "green",
        classes: "notify-size",
        position: "bottom",
        timeout: 8000,
      });
    })
    .catch((_error) => {
      Loading.hide();
      Notify.create({
        message: _error.data.errorMessage
          ? _error.data.errorMessage
          : _error.data,
        textColor: "red",
        classes: "notify-size",
        position: "bottom",
        timeout: 8000,
      });
    });
};
onMounted(() => {
  handelGetPolicies();
});
</script>

<style>
</style>
