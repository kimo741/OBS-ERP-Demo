<template>
  <q-card class="q-pa-lg" style="width: 80vw">
    <q-form @submit.prevent="submitVisitForm">
      <q-card-section class="row">
        <div class="col-5 text-h5">Visit permit</div>
        <div class="col-7 row justify-end">
          <q-btn
            label="Submit"
            class="q-mr-lg"
            color="accent"
            padding="7px 20px"
            type="submit"
          />
          <q-btn
            label="Reset"
            class="q-mr-lg"
            text-color="black"
            color="grey-2"
            padding="7px 20px"
            @click="resetInputs"
          />
          <q-btn
            label="Close"
            class="q-mr-lg"
            text-color="black"
            color="grey-2"
            v-close-popup
            padding="7px 20px"
          />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="justify-between">
          <div class="row">
            <q-input
              class="col-4"
              v-model="modelForm.no"
              label="permit No"
              type="number"
              :rules="[(val) => val > 0 || 'No Is Required']"
            />
          </div>
          <div class="row">
            <q-select
              class="col-4"
              label="Property Name"
              :options="realestateList"
              option-value="id"
              emit-value
              map-options
              v-model="modelForm.realEstateId"
              @update:model-value="gatUnitOfRealestate"
              :rules="[(val) => val || 'Property Is Required']"
            />
          </div>
          <div class="row">
            <q-select
              class="col-4"
              label="Unit Name"
              :options="unitList"
              :loading="loadingUnit"
              v-model="modelForm.unitId"
              :rules="[(val) => val || 'unit Is Required']"
            >
              <template v-slot:no-option>
                <q-item>
                  <q-item-section class="text-italic text-grey">
                    Unit table is null
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </div>
          <div class="row">
            <q-select class="col-4" label="Person to Meet" />
          </div>
          <div class="row">
            <q-input
              class="col-4"
              v-model="modelForm.contactNumber"
              label="Contact Number"
              type="number"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <div class="row">
          <q-input class="col-4" label="Visitor" v-model="modelForm.visitor" />
        </div>
        <div class="row">
          <q-select class="col-4 q-mr-lg" label="Id type" />
          <q-input class="col-4" label="Id Number" />
        </div>
        <div class="row">
          <!-- name="phone" -->
          <obs-phone-field label="Contact Number" class="q-mr-lg col-4" />
          <obs-text-field
            name="email"
            :label="$t('Email')"
            class="col-4"
            v-model="modelForm.email"
          />
        </div>
        <div class="row">
          <q-select class="col-4" label="Parking" />
        </div>
        <div class="row">
          <q-select
            class="col-4"
            v-model="modelForm.noOfVisitors"
            label="No. of Visitors"
          />
        </div>
        <div class="row">
          <q-select class="col-4" label="Primit type" />
        </div>
        <div class="row">
          <q-input
            type="date"
            v-model="modelForm.fromDate"
            class="col-4 q-mr-lg"
            hint="Primit type from"
          />

          <q-input
            type="date"
            class="col-4"
            hint="To"
            v-model="modelForm.toDate"
          />
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script setup>
const { useActions: propertySetting } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
import { onMounted, ref } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { APP_SETTINGS_KEY } from "configs/storage";
import { LocalStorage, Notify, Loading } from "quasar";
const emit = defineEmits(["closeDialog"]);
const realestateList = ref([]);
const unitList = ref([]);

const { getPropertyList, getUnitOfProperty, createVisitPremit } =
  propertySetting([
    "getPropertyList",
    "getUnitOfProperty",
    "createVisitPremit",
  ]);
const loadingUnit = ref(false);
const modelForm = ref({
  no: null,
  realEstateId: null,
  unitId: null,
  companyId: null,
  visitor: "",
  idType: "",
  idNumber: "",
  email: "",
  contactNumber: "",
  parking: true,
  noOfVisitors: null,
  permitType: null,
  fromDate: "",
  toDate: "",
});
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
const resetInputs = () => {
  modelForm.value = {
    no: null,
    realEstateId: null,
    unitId: null,
    companyId: null,
    visitor: "",
    idType: "",
    idNumber: "",
    email: "",
    contactNumber: "",
    parking: true,
    noOfVisitors: null,
    permitType: null,
    fromDate: "",
    toDate: "",
  };
};
const gatUnitOfRealestate = (value) => {
  getUnitListOfProperty(value);
};
const getUnitListOfProperty = (value) => {
  loadingUnit.value = true;
  getUnitOfProperty(value)
    .then((res) => {
      loadingUnit.value = false;
      console.log(res);
      unitList.value = res.data.value;
      // console.log(res);
    })
    .catch((err) => {
      loadingUnit.value = false;
      console.log(err);
    });
};
const getCompanyId = () => {
  const setting = LocalStorage.getItem(APP_SETTINGS_KEY);
  modelForm.value.companyId = setting.profile.companyId;
};
const submitVisitForm = () => {
  Loading.show();
  createVisitPremit(modelForm.value)
    .then((res) => {
      Loading.hide();
      emit("closeDialog");
      Notify.create({
        message: `Success create Visit premit`,
        color: "green",
        position: "bottom",
      });
    })
    .catch((err) => {
      Loading.hide();
      Notify.create({
        message: err.data?.errorMessage,
        color: "red",
        position: "bottom",
      });
    });
};
onMounted(() => {
  getCompanyId();
  getRealEstateList();
});
</script>

<style>
</style>
