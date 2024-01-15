<template>
  <q-card class="unit-filter full-width q-pa-lg">
    <q-card-section>
      <q-item-section>
        <q-item-label style="font-size: 18px; font-weight: 500; color: #355570"
          >Units Filter</q-item-label
        >
      </q-item-section>
    </q-card-section>
    <q-separator spaced class="full-width" color="grey" />
    <q-card-section class="row justify-between items-center">
      <div class="unit-filter__input-width q-my-sm">
        <q-select
          v-model="filterObj.actionsTypes"
          emit-value
          clearable
          map-options
          label="Actions types"
          :options="acction_type_opstions"
        ></q-select>
      </div>
      <div class="unit-filter__input-width q-my-sm">
        <q-select
          v-model="filterObj.projectId"
          emit-value
          clearable
          map-options
          option-value="id"
          :options="realestateList"
          label="Project"
        ></q-select>
      </div>
      <div class="unit-filter__input-width q-my-sm">
        <q-select
          v-model="filterObj.unitsTypeId"
          emit-value
          clearable
          map-options
          :options="unit_type_opstions"
          option-value="id"
          label="Units Type"
        ></q-select>
      </div>

      <div class="unit-filter__input-width q-my-sm">
        <q-select
          v-model="filterObj.unitCategoryId"
          label="Category"
          emit-value
          :options="unit_Categoty_opstions"
          clearable
          map-options
          option-value="id"
        ></q-select>
      </div>
      <div class="col-12 q-my-sm">
        <q-input v-model="filterObj.location" label="Location"></q-input>
      </div>
      <div class="unit-filter__input-width q-my-sm">
        <q-select
          v-model="filterObj.unitModelId"
          label="Model"
          emit-value
          clearable
          map-options
          option-value="id"
          :options="model_opstions"
        ></q-select>
      </div>
      <div class="unit-filter__input-width q-my-sm">
        <q-select
          v-model="filterObj.facadeDirectionId"
          label="Facade direction"
          emit-value
          clearable
          map-options
          option-value="id"
          :options="face_direction_opstions"
        ></q-select>
      </div>
      <div class="unit-filter__input-width q-my-sm">
        <q-input
          v-model="filterObj.badrooms"
          type="number"
          label="Badrooms"
        ></q-input>
      </div>
      <div class="unit-filter__input-width row justify-between q-my-sm">
        <q-input
          class="unit-filter__input-width"
          v-model="filterObj.minPrice"
          label="Min price"
          type="number"
        ></q-input>
        <q-input
          class="unit-filter__input-width"
          v-model="filterObj.maxPrice"
          label="max price"
          type="number"
        ></q-input>
      </div>
      <div class="unit-filter__input-width row justify-between q-my-sm">
        <q-input
          class="unit-filter__input-width"
          v-model="filterObj.minArea"
          label="Min area"
          type="number"
        ></q-input>
        <q-input
          class="unit-filter__input-width"
          v-model="filterObj.maxArea"
          label="Max area"
          type="number"
        ></q-input>
      </div>

      <div class="unit-filter__input-width q-my-sm">
        <q-input
          v-model="filterObj.bathrooms"
          type="number"
          label="bathrooms"
        ></q-input>
      </div>
      <div class="unit-filter__input-width q-my-sm">
        <q-select
          v-model="filterObj.lounge"
          label="lounge"
          emit-value
          clearable
          map-options
          option-value="id"
        ></q-select>
      </div>
      <div class="unit-filter__input-width q-my-sm">
        <q-select
          v-model="filterObj.kitchen"
          label="Kitchen"
          emit-value
          clearable
          map-options
          option-value="id"
        ></q-select>
      </div>
    </q-card-section>
    <q-card-actions class="row justify-end items-center">
      <q-btn
        label="clear"
        padding="5px 20px"
        @click="clearFilter"
        flat
        color="blue-6"
      />
      <q-btn label="close" padding="5px 20px" v-close-popup flat />
      <q-btn
        label="Save"
        padding="5px 20px"
        @click="$emit('SubmitFilter')"
        outline
        color="accent"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { filterObj } from "../composaple/requist";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions: propertySetting } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);
const { useActions: propertyActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
import {
  unit_Categoty_opstions,
  unit_type_opstions,
  // func
  getUnitTypes,
  getUnitCategory,
} from "../../charts-property/composables/use-unit";
import { onBeforeMount, ref } from "vue";
const { getUnitCategoryList, getFaceDirectionsList, getModelList } =
  propertySetting([
    "getUnitCategoryList",
    "getFaceDirectionsList",
    "getModelList",
  ]);
const { unitType, getPropertyList } = propertyActions([
  "unitType",
  "getPropertyList",
]);
///////////
// state
//////////
const acction_type_opstions = ref([
  { label: "For sale", value: 1 },
  { label: "For rent", value: 2 },
]);
const realestateList = ref([]);
const face_direction_opstions = ref([]);
const model_opstions = ref([]);
const clearFilter = () => {
  filterObj.value.filter = {
    actionsTypes: null,
    location: "",
    unitsTypeId: null,
    unitCategoryId: null,
    unitModelId: null,
    minPrice: null,
    maxPrice: null,
    minArea: null,
    maxArea: null,
    facadeDirectionId: null,
    view: true,
    badrooms: null,
    bathrooms: null,
    lounge: null,
    kitchen: null,
    projectId: null,
  };
};
//////////
// methods
//////////

const getRealEstateList = () => {
  getPropertyList()
    .then((res) => {
      // console.log(res);
      realestateList.value = res.data.value;
      // console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};
const getFaceDirections = () => {
  getFaceDirectionsList()
    .then((res) => {
      // console.log(req);

      face_direction_opstions.value = res.value;
    })
    .catch((err) => console.log(err));
};
const getModelOpstionsList = () => {
  getModelList()
    .then((res) => {
      // console.log(res);
      model_opstions.value = res.value;
    })
    .catch((err) => console.log(err));
};
onBeforeMount(() => {
  getRealEstateList();
  getFaceDirections();
  getModelOpstionsList();
  getUnitTypes(unitType);
  getUnitCategory(getUnitCategoryList);
});

// const handelFloorList = () => {
//   getFloorList()
//     .then((res) => {
//       floors_option.value = res.data.value;
//     })
//     .catch((_error) => {
//       Notify.create({
//         message: _error.data.errorMessage
//           ? _error.data.errorMessage
//           : _error.data,
//         textColor: "red",
//         classes: "notify-size",
//         position: "bottom",
//         timeout: 8000,
//       });
//     });
// };
</script>

<style lang="scss" scoped>
.unit-filter {
  &__input-width {
    width: 47%;
  }
}
</style>
