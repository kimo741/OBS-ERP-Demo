<template>
  <!-- v-if="create_item_model.address !== null" -->
  <div class="row">
    <div
      class="col-12"
      style="
        font-style: normal;
        font-weight: 500;
        font-size: 16px;
        padding-top: 10px;
      "
    >
      Address
    </div>
    <!-- adress line -->
    <div
      class="full-width row items-center"
      v-if="typeof buildingNo == 'undefined'"
    >
      <q-input
        v-model="adress"
        class="col"
        clearable
        :label="$t('app.administration.charts.chartsProperty.address_line')"
        :readonly="is_review_from_card"
      />
    </div>
    <div class="full-width row justify-between items-center" v-else>
      <q-input
        v-model="buildingNumber"
        class="col-2"
        clearable
        label="B.No"
        :readonly="is_review_from_card"
      />
      <q-input
        v-model="adress"
        class="col-9"
        clearable
        :label="$t('app.administration.charts.chartsProperty.address_line')"
        :readonly="is_review_from_card"
      />
    </div>
    <div class="col-12 row">
      <div class="full-width row justify-between">
        <!-- cityName -->
        <q-input
          v-model="city"
          option-value="id"
          class="col-5"
          :readonly="is_review_from_card"
          :label="$t('app.administration.charts.chartsProperty.city')"
        ></q-input>
        <!-- zipCode -->
        <q-input
          type="number"
          :readonly="is_review_from_card"
          v-model="zCode"
          class="col-5"
          :label="$t('app.administration.charts.chartsProperty.zip_code')"
        />
      </div>
      <!-- regionId -->
      <div class="full-width row justify-between">
        <q-select
          v-model="country"
          :options="cuntries_List"
          emit-value
          map-options
          @update:model-value="checkSelectCuntrie"
          clearable
          option-value="id"
          class="col-5"
          :label="$t('app.administration.charts.chartsProperty.country')"
          :readonly="is_review_from_card"
        ></q-select>
        <q-select
          v-model="ragion"
          :options="ragion_list"
          class="col-5"
          emit-value
          clearable
          :disable="!isSelectCuntry"
          :loading="loadRagion"
          map-options
          option-value="id"
          :readonly="is_review_from_card"
          :label="$t('app.administration.charts.chartsProperty.state_ragion')"
        ></q-select>
        <!-- :rules="[(val) => val || 'Region Is Required']" -->

        <!-- :rules="[(val) => val || 'Country Is Required']" -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onBeforeMount, ref } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
const cuntries_List = ref([]);
const ragion_list = ref([]);
const props = defineProps({
  addressLine: {
    type: String,
    deafult: "",
  },
  cityName: {
    type: String,
    deafult: "",
  },
  zipCode: Number,
  regionId: Number,
  countryId: Number,
  buildingNo: {
    type: String || null,
    deafult: null,
  },
  is_review_from_card: Boolean,
});
const emit = defineEmits([
  "update:addressLine",
  "update:cityName",
  "update:zipCode",
  "update:regionId",
  "update:countryId",
  "update:buildingNo",
]);
// computed
const adress = computed({
  get() {
    return props.addressLine;
  },
  // setter
  set(newValue) {
    return emit("update:addressLine", newValue);
  },
});
const city = computed({
  get() {
    return props.cityName;
  },
  // setter
  set(newValue) {
    return emit("update:cityName", newValue);
  },
});
const zCode = computed({
  get() {
    return props.zipCode;
  },
  // setter
  set(newValue) {
    return emit("update:zipCode", newValue);
  },
});
const ragion = computed({
  get() {
    return props.regionId;
  },
  // setter
  set(newValue) {
    return emit("update:regionId", newValue);
  },
});
const country = computed({
  get() {
    return props.countryId;
  },
  // setter
  set(newValue) {
    return emit("update:countryId", newValue);
  },
});
const buildingNumber = computed({
  get() {
    return props.buildingNo;
  },
  // setter
  set(newValue) {
    return emit("update:buildingNo", newValue);
  },
});
const isSelectCuntry = ref(false);
const loadRagion = ref(false);
const checkSelectCuntrie = (value) => {
  if (value == "" || value == null) {
    isSelectCuntry.value = false;
  } else {
    getRagionList(value);
    isSelectCuntry.value = true;
  }
};
// api
const { getCountriesList, getRagionListById } = useActions([
  "getCountriesList",
  "getRagionListById",
]);
const getCuntriesList = () => {
  getCountriesList()
    .then((res) => {
      cuntries_List.value = res.data.value;
    })
    .catch((_error) => {
      Loading.hide();
      console.log(
        _error.data.errorMessage ? _error.data.errorMessage : _error.data
      );
      //       Notify.create({
      //         message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // ...errOptions
      //       });
    });
};
const getRagionList = async (id) => {
  loadRagion.value = true;
  getRagionListById(id)
    .then((res) => {
      ragion_list.value = res.data.value;
      loadRagion.value = false;
    })
    .catch((_error) => {
      loadRagion.value = false;

      console.log(
        _error.data.errorMessage ? _error.data.errorMessage : _error.data
      );
    });
};
onBeforeMount(() => {
  getCuntriesList();
  checkSelectCuntrie();
});
</script>

<style>
</style>
