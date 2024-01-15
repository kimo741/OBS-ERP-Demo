<template>
  <div class="row">
    <div class="col-sm-6 col-12 row justify-between">
      <div class="col-12">
        <q-input v-model="unitForm.contact.name" label="name" />
      </div>
      <!-- ID Type -->
      <div class="input-width">
        <q-select
          v-model="unitForm.contact.idType"
          emit-value
          map-options
          :options="unit_type_list"
          clearable
          option-value="id"
          label="ID Type"
        />
      </div>
      <!--  -->
      <!-- Id No -->
      <div class="input-width">
        <q-input v-model="unitForm.contact.idNo" type="number" label="Id No" />
      </div>
      <!-- job Postition -->
      <div class="input-width">
        <q-input
          v-model="unitForm.contact.jopPostition"
          label="job Postition"
        />
      </div>
      <!-- title -->
      <!-- <div class="input-width">
        <q-input v-model="unitForm.contact.title" label="Title" />
      </div> -->
      <!-- Department -->
      <div class="input-width">
        <q-input v-model="unitForm.contact.department" label="Department" />
      </div>
      <!-- Company

      -->
      <div class="input-width">
        <q-input v-model="unitForm.contact.companyName" label="Company" />
      </div>
      <!-- phone -->
      <div class="input-width">
        <obs-phone-field
          class="text-blue-5"
          clearable
          v-model="unitForm.contact.phoneObj"
        />
      </div>
      <!-- email -->
      <div class="input-width">
        <obs-text-field
          name="email"
          v-model="unitForm.contact['email']"
          rules="email"
          :label="$t('app.administration.charts.chartsProperty.email')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { unitForm } from "../unit-form.js";

import { createNamespacedHelpers } from "vuex-composition-helpers";
import { onBeforeMount, ref } from "vue";
const { useActions: propertyAction } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
const unit_type_list = ref([]);
const { unitType } = propertyAction(["unitType"]);
const getUnitTypes = () => {
  unitType()
    .then((res) => {
      unit_type_list.value = res.data.value;
      // console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
onBeforeMount(() => {
  getUnitTypes();
});
</script>

<style>
.input-width {
  width: 45%;
}
</style>
