<template>
  <div class="row">
    <div class="col-4">
      <!-- <q-select
        label="Model"
        :options="moedlOpstions"
        option-label="name"
        emit-value
        v-model="unitForm.unitModelId"
        option-value="id"
        map-options
        @update:model-value="getCurentModel"
      /> -->
      <DropdownSearchCreate
        :modelOpstions="moedlOpstions"
        v-model="unitForm.unitModelId"
        @emitCreateNew="submitCreatModel"
        valueOpstion="id"
        labelOpstion="label"
        title="Model"
        @valueUpdated="getCurentModel"
      />
    </div>

    <div class="col-12 row">
      <!-- <div class="col-4">
        <obs-avatar-field name="fileAsBase64" v-model="curent_model" />
      </div> -->
      <!-- //////////////////// ////// //////////////////// -->
      <!-- //////////////////// images //////////////////// -->
      <!-- //////////////////// ////// //////////////////// -->
      <div
        class="fils-container__file image-container row"
        v-if="curent_model.urlFile"
      >
        <div class="text-center image-container__bar col-4 row">
          <div class="col-4 text-left flex">
            <!-- <q-icon
            style="color: #53b9ea; cursor: pointer"
            size="xs"
            name="eva-close-outline"
            @click="deleteFile(i)"
          /> -->
          </div>
          <!-- <div class="col-4 text-center">{{ file.docName }}</div> -->
        </div>
        <div class="image-container__img col-12">
          <img :src="curent_model.urlFile" />
        </div>
        <div class="col-12 text-right flex justify-center">
          <q-icon
            style="color: #53b9ea; cursor: pointer"
            size="xs"
            color="#53B9EA"
            name="download"
            @click="downloadFile()"
          />
        </div>
      </div>
      <!-- //////////////////// ////// //////////////////// -->
      <!-- //////////////////// images //////////////////// -->
      <!-- //////////////////// ////// //////////////////// -->
    </div>
  </div>
</template>

<script setup>
import { unitForm } from "../form/unit-model-form.js";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { Loading, Notify } from "quasar";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);
const curent_model = ref({
  name: "",
  urlFile: "",
});
const getCurentModel = () => {
  if (unitForm.value.unitModelId !== null) {
    // let curentId = unitForm.value.unitModelId;
    // console.log(curentId);
    // let index = moedlOpstions.value.findIndex((el) => {
    //   return el.id == curentId;
    // });
    // curent_model.value = moedlOpstions.value[index];
    // console.log(curent_model.value);
    getModelById(unitForm.value.unitModelId).then((res) => {
      // console.log(res);
      curent_model.value = res.value;
    });
  }
};
const { getModelList, getModelById, createUnitForm } = useActions([
  "getModelList",
  "getModelById",
  "createUnitForm",
]);
const downloadFile = () => {
  var link = document.createElement("a");
  link.href = curent_model.value.urlFile;
  link.download = `${curent_model.value.name}.jpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
import { onMounted, ref } from "vue";
import DropdownSearchCreate from "src/modules/app/modules/property/components/dropdownSearchCreate.vue";

const moedlOpstions = ref([]);
const handelGetUnitForm = () => {
  getModelList()
    .then((res) => {
      console.log(res);
      return (moedlOpstions.value = res.value);
    })
    .then((res) => {
      getCurentModel();
    });
};
const submitCreatModel = (value) => {
  Loading.show();
  let formD = new FormData();
  formD.append("Name", value);
  // formD.append("Attachments", "");s
  // let formD = { Name: value, Attachments: "" };
  createUnitForm(formD)
    .then((res) => {
      handelGetUnitForm();
      Loading.hide();
      Notify.create({
        message: "A Model has been created",
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
  handelGetUnitForm();
  // getCurentModel();
});
</script>

<style lang="scss" scoped>
.image-container {
  // position: relative;
  height: 100%;
  width: calc(95% / 4);
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  &__img {
    // position: absolute;
    // left: 0;
    // top: 10%;
    // width: 100%;
    height: 90%;
    img {
      width: 100%;
      height: 100%;
    }
    // transform: translate(-10%, -50%);
  }
  &__bar {
    // position: absolute;
    // top: 0;
    // left: 0;
    height: 10%;
    width: 100%;
  }
}
</style>
