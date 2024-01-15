<template>
  <q-card class="transaction-form">
    <q-card-section class="transaction-form__title"> Inquiry </q-card-section>
    <q-card-section class="">
      <q-radio
        v-model="inquiryForm.filter.actionsTypes"
        class="q-mr-lg"
        :val="1"
        label="For Sale"
      />
      <q-radio
        v-model="inquiryForm.filter.actionsTypes"
        :val="2"
        label="For Lease"
      />
    </q-card-section>
    <q-card-section class="q-py-xs">
      <div class="input-title">Location</div>
      <q-input
        placeholder="Country or State/Region or city or neighborhood or street"
        style="width: 50%"
        v-model="inquiryForm.filter.location"
        dense
      />
      <div class="full-width row">
        <div class="input-title q-mt-md">Unit Type & Category</div>
        <div class="row justify-between" style="width: 50%">
          <q-select
            dense
            label="U Type"
            v-model="inquiryForm.filter.unitsTypeId"
            style="width: 45%"
            :options="unit_type_opstions"
            option-value="id"
            map-options
            emit-value
            clearable
          />
          <q-select
            v-model="inquiryForm.filter.unitCategoryId"
            dense
            label="Category"
            style="width: 45%"
            :options="unit_Categoty_opstions"
            option-value="id"
            map-options
            emit-value
            clearable
          />
        </div>

        <div class="input-title q-mt-md">Price Range</div>
        <div class="row justify-between" style="width: 50%">
          <q-input
            v-model="inquiryForm.filter.minPrice"
            dense
            label="min Price"
            style="width: 45%"
            type="number"
          />
          <q-input
            v-model="inquiryForm.filter.maxPrice"
            dense
            label="Max Price"
            style="width: 45%"
            type="number"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="transaction-form__title-blue">
      More Filters & Amenities
    </q-card-section>
    <q-card-section class="row justify-between">
      <div class="col-6">
        <div class="input-title q-mt-md">Area Range</div>
        <div class="row justify-between">
          <q-input
            v-model="inquiryForm.filter.minArea"
            type="number"
            dense
            label="Min area"
            style="width: 45%"
          />
          <q-input
            v-model="inquiryForm.filter.maxArea"
            type="number"
            dense
            label="max area"
            style="width: 45%"
          />
          <q-select
            v-model="inquiryForm.filter.facadeDirectionId"
            dense
            label="Face direction"
            style="width: 45%"
            :options="face_direction_opstions"
            map-options
            emit-value
            clearable
          />
          <q-select
            v-model="inquiryForm.filter.view"
            :options="viewOptions"
            dense
            label="View"
            style="width: 45%"
            map-options
            emit-value
          />
          <q-input
            v-model="inquiryForm.filter.badrooms"
            dense
            label="Bedrooms"
            style="width: 45%"
          />
          <q-input
            v-model="inquiryForm.filter.bathrooms"
            dense
            label="Bathrooms"
            style="width: 45%"
          />
          <q-select
            v-model="inquiryForm.filter.lounge"
            dense
            label="Lounge"
            style="width: 45%"
            clearable
            map-options
            emit-value
          />
          <q-select
            v-model="inquiryForm.filter.kitchen"
            dense
            label="Kitchen"
            style="width: 45%"
            map-options
            emit-value
          />
        </div>
      </div>
      <div
        class="col-6 row justify-between items-start q-px-lg"
        style="margin-top: 38px"
      >
        <div class="col-5">
          <q-select
            v-model="inquiryForm.filter.projectId"
            dense
            :options="pojects_list"
            label="Project"
            style=""
            class="full-width"
            option-value="id"
            map-options
            emit-value
            clearable
          />
        </div>
        <div class="col-5">
          <q-select
            v-model="inquiryForm.filter.unitModelId"
            dense
            label="Model"
            style=""
            class="full-width"
            clearable
            :options="model_opstions"
            map-options
            emit-value
            option-value="id"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-actions class="justify-end q-pa-sm">
      <q-btn
        label="Search"
        padding="8px 35px"
        color="accent"
        style="border-radius: 12px"
        @click="$emit('searchInquiry')"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { inquiryForm } from "./use";
const { useActions: propertyActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
const { useActions: projectSetting } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { onMounted, ref } from "vue";
const unit_type_opstions = ref([]);
const unit_Categoty_opstions = ref([]);
const face_direction_opstions = ref([]);
const model_opstions = ref([]);
const pojects_list = ref([]);
const { getDropDownProjects } = propertyActions(["getDropDownProjects"]);
const {
  getUnitTypeList,
  getUnitCategoryList,
  getFaceDirectionsList,
  getModelList,
} = projectSetting([
  "getUnitTypeList",
  "getUnitCategoryList",
  "getFaceDirectionsList",
  "getModelList",
]);
const getUnitTypes = () => {
  getUnitTypeList()
    .then((req) => {
      // console.log(req);
      unit_type_opstions.value = req.value;
    })
    .catch((err) => console.log(err));
};
const getUnitCategory = () => {
  getUnitCategoryList()
    .then((res) => {
      // console.log(req);

      unit_Categoty_opstions.value = res.value;
    })
    .catch((err) => console.log(err));
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
      console.log(res);
      model_opstions.value = res.value;
    })
    .catch((err) => console.log(err));
};
const getProgectsList = () => {
  getDropDownProjects()
    .then((res) => {
      pojects_list.value = res.data.value;
    })
    .catch((err) => {
      console.log(err);
    });
};
const viewOptions = ref([
  {
    label: "Yes",
    value: true,
  },
  {
    label: "No",
    value: false,
  },
]);
onMounted(() => {
  getUnitTypes();
  getUnitCategory();
  getProgectsList();
  getFaceDirections();
  getModelOpstionsList();
});
</script>

<style lang="scss" scoped>
.transaction-form {
  margin: 30px 20px 20px 20px;
  padding: 40px 25px;
  background: #ffffff;
  box-shadow: 0px 4px 39px 9px rgba(81, 69, 159, 0.09);
  border-radius: 15px;
  height: 85vh;
  overflow: auto;
  &__title {
    font-family: "Poppins";
    display: flex;
    align-items: center;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: #355570;
  }
}
.input-title {
  font-size: 15px;
  font-style: normal;
  width: 100%;
  font-weight: 600;
  line-height: normal;
}
.transaction-form__title-blue {
  width: 316px;
  color: #0e40f1;
  font-family: Poppins;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  text-decoration-line: underline;
}
</style>
