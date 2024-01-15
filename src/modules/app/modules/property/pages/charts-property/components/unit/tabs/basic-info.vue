<template>
  <div class="row justify-between items-center">
    <div class="col-5 row justify-between items-center">
      <!-- facadeDirectionId -->
      <div class="input-width">
        <q-select
          v-model="unitForm.basicInfo.facadeDirectionId"
          emit-value
          clearable
          map-options
          option-value="id"
          label="Facade direction"
        ></q-select>
      </div>
      <!-- null speace -->
      <div class="col-5"></div>
      <!-- Bedrooms -->
      <div class="input-width">
        <q-input
          v-model="unitForm.basicInfo.badrooms"
          label="Bedrooms"
          type="number"
        />
      </div>
      <!-- Bathrooms -->
      <div class="input-width">
        <q-input
          v-model="unitForm.basicInfo.bathrooms"
          label="Bathrooms"
          type="number"
        />
      </div>
      <!-- lounge -->
      <!-- <div class="input-width">

      </div> -->
      <!-- kitchen -->
      <!-- <div class="input-width">
        <q-select
          v-model="unitForm.basicInfo.kitchen"
          emit-value
          clearable
          map-options
          option-value="id"
          label="Kitchen"
        ></q-select>
      </div> -->
      <!-- Street width - lm -->
      <div class="input-width">
        <q-input
          v-model="unitForm.basicInfo.streetWidth_LM"
          type="number"
          label="Street width - lm"
        />
      </div>
      <!-- Car parking -->
      <div class="input-width">
        <q-checkbox
          v-model="unitForm.basicInfo.carParking"
          label="Car parking"
          class="q-px-md"
        />
        <q-checkbox
          class="q-px-md"
          v-model="unitForm.basicInfo.lounge"
          label="Lounge"
        />
        <q-checkbox
          class="q-px-md"
          v-model="unitForm.basicInfo.kitchen"
          label="kitchen"
        ></q-checkbox>
      </div>
    </div>
    <!-- ////////// -->
    <!-- just space -->
    <!-- ////////// -->
    <div class="col-5"></div>
    <!-- ////////// -->
    <!-- ////////// -->
    <!-- ////////// -->
    <div
      class="col-5 row justify-between items-center"
      style="margin-top: 90px"
    >
      <!-- Construction year -->
      <div class="input-width">
        <q-input
          v-model="unitForm.basicInfo.constructionYear"
          label="Construction year"
          type="number"
        />
      </div>
      <!-- //////// -->
      <!-- just space -->
      <!-- //////// -->
      <div class="col-5"></div>
      <!-- //////// -->
      <!-- Bldg plan No. -->
      <div class="input-width">
        <q-input
          v-model="unitForm.basicInfo.bldgPlanNo"
          label="Bldg plan No."
          type="number"
        />
      </div>
      <!-- Parcel No. -->
      <div class="input-width">
        <q-input
          v-model="unitForm.basicInfo.parcelNo"
          label="Parcel No"
          type="number"
        />
      </div>
      <!-- Parcel No. -->
      <div class="input-width">
        <q-input
          v-model="unitForm.basicInfo.titleDeedNo"
          label="Title Deed No."
          type="number"
        />
      </div>
      <!-- Parcel No. -->
      <div class="input-width">
        <q-input
          v-model="unitForm.basicInfo.insPolicyNo"
          label="Ins. policy No."
          type="number"
        />
      </div>
    </div>
    <div
      class="col-5 row justify-start items-end"
      style="margin-top: 90px; justify-items: end"
    >
      <div class="col-9">
        <q-select
          multiple
          clearable
          v-model="unitForm.tags"
          :options="tag_list"
          option-value="id"
          emit-value
          map-options
          use-chips
          :label="$t('app.administration.charts.chartsProperty.tags')"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { unitForm } from "../unit-form";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { onBeforeMount, ref } from "vue";
const { useActions: propertySetting } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
const tag_list = ref([]);
const { getTagList } = propertySetting(["getTagList"]);
const handelTagList = () => {
  getTagList().then((res) => {
    tag_list.value = res.data.value;
  });
};
onBeforeMount(() => {
  handelTagList();
});
</script>

<style>
.input-width {
  width: 45%;
}
</style>
