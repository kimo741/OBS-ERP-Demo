<template>
  <div class="row">
    <div class="col-8 row justify-between">
      <div class="col-5">
        <q-input v-model="unitForm.contact.name" label="name" />
      </div>
      <div class="col-5">
        <q-input
          v-model="unitForm.contact.jopPostition"
          label="job Postition"
        />
      </div>
      <div class="col-5">
        <q-select
          v-model="unitForm.contact.idType"
          emit-value
          map-options
          clearable
          option-value="id"
          label="Type"
        />
      </div>
      <div class="col-5">
        <q-input v-model="unitForm.contact.idNo" type="number" label="Id No" />
      </div>
      <div class="col-5">
        <obs-phone-field
          class="text-blue-5"
          clearable
          v-model="unitForm.contact.phoneObj"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { unitForm } from "./unit-form";
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
</style>
