<template>
  <div class="row justify-end full-width">
    <q-btn
      label="Add"
      dense
      padding="5px 30px"
      outline
      @click="unitDialog = true"
    />
  </div>
  <div class="row">
    <div style="8px" class="q-ma-md">#</div>
    <div class="col-1 q-ma-md">Unit</div>
    <div class="col-1 q-ma-md">Model</div>
    <div class="col-1 q-ma-md">Type</div>
    <div class="col-1 q-ma-md">Usage Form</div>
    <div class="col-1 q-ma-md">Category</div>
    <div class="col-1 q-ma-md">Area m2</div>
  </div>
  <q-separator class="full-width" color="grey-4" />
  <template v-if="create_item_model.units.length !== 0">
    <div class="row" v-for="(unit, i) in create_item_model.units" :key="i">
      <div style="8px" class="q-ma-md">{{ i + 1 }}</div>
      <div class="col-1 q-ma-md">{{ unit.name }}</div>
      <div class="col-1 q-ma-md">Model</div>
      <div class="col-1 q-ma-md">
        {{ getLabelById(unit.unitsTypeId, unit_type_opstions) }}
      </div>
      <div class="col-1 q-ma-md">Usage Form</div>
      <div class="col-1 q-ma-md">
        {{ getLabelById(unit.unitCategoryId, unit_Categoty_opstions) }}
      </div>
      <div class="col-1 q-ma-md">{{ unitForm.area }}</div>
      <div class="col-1 q-ma-md">
        <q-btn
          flat
          :disable="is_review_from_card"
          icon="eva-close-circle-outline"
          @click="deleteUnit(i)"
        />
      </div>
    </div>
  </template>
  <!-- dialog add unit  -->
  <q-dialog
    v-model="unitDialog"
    transition-show="scale"
    transition-hide="scale"
    persistent
    full-width
    full-height
  >
    <q-card
      class="q-pa-lg"
      style="max-width: 80% !important; max-height: 80% !important"
    >
      <q-card-section
        class="text-left"
        style="font-size: 17px; font-weight: 500"
      >
        Add Unit
      </q-card-section>

      <q-form @submit.prevent="addUnit">
        <q-card-actions class="flex justify-end q-my-lg">
          <q-btn
            dense
            padding="10px 30px"
            label="Discard"
            outline
            color="grey-7"
            @click="discardUnit"
          />
          <q-btn
            dense
            color="blue-5"
            padding="10px 30px"
            type="submit"
            label="Submit"
          />
        </q-card-actions>
        <q-card-section
          class="text-left row justify-between full-with"
          style="font-size: 17px; font-weight: 500"
        >
          <!-- name -->
          <div class="row justify-between">
            <div class="col-6 row justify-between">
              <div class="col-8">
                <DialogAllLanguage
                  v-model:modelInput="unitForm.translation[0].name"
                  v-model:modelLanguages="unitForm.translation"
                  title="Name in all languages"
                  :propToEdit="false"
                  :is_review="is_review_from_card"
                />
              </div>
              <!-- description -->
              <div class="col-5">
                <q-input
                  type="text"
                  v-model="unitForm.description"
                  label="Description"
                />
              </div>
              <div class="col-8 test-start">
                <q-radio
                  v-model="unitForm.actionsTypes"
                  val="1"
                  class="q-mr-md"
                  label="For Sale"
                />
                <q-radio
                  v-model="unitForm.actionsTypes"
                  val="0"
                  label="For Lease"
                />
              </div>
              <div class="col-5 q-gutter-sm">
                <q-checkbox
                  v-model="unitForm.publishOnWebSite"
                  label="Publish on real estate website"
                />
              </div>
            </div>
            <!-- ///// -->
            <!-- image -->
            <!-- ///// -->
            <div class="col-5 row justify-between items-center">
              <!-- <obs-avatar-field
              class="col-12"
              :square="true"
              @passAssFile="getImage"
            /> -->
              <ImageBase64
                class="col-12"
                :disable="is_review_from_card"
                :square="true"
                v-model:imageBase64="unitForm.image"
                v-model:imageUrl="unitForm.imageUrl"
              />
            </div>
            <div class="col-12 row justify-between items-center q-pb-md">
              <div class="col-5 row justify-between items-center">
                <div class="col-5">
                  <!-- <q-select
                    label="U type"
                    class="full-width"
                    v-model="unitForm.unitsTypeId"
                    option-value="id"
                    :options="unit_type_opstions"
                    map-options
                    emit-value
                    option-label="label"
                  /> -->
                  <DropdownSearchCreate
                    :modelOpstions="unit_type_opstions"
                    v-model="unitForm.unitsTypeId"
                    :autofocus="false"
                    :readonly="is_review_from_card"
                    @emitCreateNew="submitCreateUnitType"
                    valueOpstion="id"
                    labelOpstion="label"
                    class="full-width"
                    :title="$t('U type')"
                  />
                </div>
                <div class="col-5">
                  <q-input type="text" style="width: 40%" label="Recurring" />
                </div>
                <div class="col-5">
                  <!-- :options="blocks_option" -->
                  <q-select
                    v-model="unitForm.usageFormsId"
                    emit-value
                    map-options
                    clearable
                    option-value="id"
                    label="Usage form"
                  ></q-select>
                </div>
                <!--  -->
                <div class="col-5">
                  <!-- <q-select
                    :options="unit_Categoty_opstions"
                    v-model="unitForm.unitCategoryId"
                    label="Category"
                    option-value="id"
                    map-options
                    emit-value
                  /> -->
                  <DropdownSearchCreate
                    :modelOpstions="unit_Categoty_opstions"
                    v-model="unitForm.unitCategoryId"
                    :autofocus="false"
                    @emitCreateNew="submitCreateNewCategory"
                    valueOpstion="id"
                    labelOpstion="label"
                    :title="$t('Category')"
                  />
                </div>
                <!-- floors -->
                <div class="col-5">
                  <!-- <q-select
                    v-model="unitForm.floorId"
                    :options="floors_option"
                    emit-value
                    map-options
                    clearable
                    option-value="id"
                    :label="
                      $t('app.administration.charts.chartsProperty.floor')
                    "
                  ></q-select> -->
                  <DropdownSearchCreate
                    :modelOpstions="floors_option"
                    v-model="unitForm.floorId"
                    @emitCreateNew="submitCreateFloor"
                    valueOpstion="id"
                    labelOpstion="label"
                    title="Floor"
                  />
                </div>
                <!-- floors -->
                <div class="col-5">
                  <!-- <q-select
                    v-model="unitForm.blockId"
                    :options="blocks_option"
                    emit-value
                    map-options
                    clearable
                    option-value="id"
                    :label="
                      $t('app.administration.charts.chartsProperty.block')
                    "
                  ></q-select> -->
                  <DropdownSearchCreate
                    :modelOpstions="blocks_option"
                    v-model="unitForm.blockId"
                    @emitCreateNew="submitCreateBlock"
                    valueOpstion="id"
                    title="Block"
                    labelOpstion="label"
                  />
                </div>
                <!-- ////////////////// -->
                <!-- will use soooooon -->
                <!-- ////////////////// -->
                <!-- <div class="col-5">
                <q-input
                  v-model="unitForm.badrooms"
                  :label="
                    $t('app.administration.settings.property_unit.badrooms')
                  "
                  type="number"
                />
              </div>
              <div   class="col-5">
                <q-input
                  type="number"
                  v-model="unitForm.sizeMater"
                  :label="
                    $t('app.administration.charts.chartsProperty.size_mater')
                  "
                  @update:model-value="updateSizeMeter"
                />
              </div>
              <div class="col-5">
                <q-input
                  type="number"
                  v-model="unitForm.sizeFoot"
                  :label="
                    $t('app.administration.charts.chartsProperty.size_foot')
                  "
                  @update:model-value="updateSizeFoot"
                />
              </div> -->
                <!-- ////////////////// -->
                <!-- ////////////////// -->
              </div>
              <div class="col-5 row justify-between items-center">
                <div class="col-8">
                  <!-- <q-input
                  v-model="unitForm.bathrooms"
                  :label="
                    $t('app.administration.settings.property_unit.bathrooms')
                  "
                  type="number"
                /> -->
                  <q-select
                    style="width: 50%"
                    v-model="unitForm.status"
                    emit-value
                    map-options
                    :option-disable="(item) => (item.value == 4 ? true : false)"
                    :options="unitStatusList"
                    label="U. Status"
                  ></q-select>
                </div>
                <div class="col-8">
                  <!-- :options="amenity_option" -->
                  <q-select
                    v-model="unitForm.incomeAccount"
                    emit-value
                    clearable
                    map-options
                    option-value="id"
                    label="Income account"
                  ></q-select>
                </div>
                <div class="col-8">
                  <q-select
                    v-model="unitForm.financialDimensionsId"
                    emit-value
                    clearable
                    map-options
                    option-value="id"
                    label="Financial dimension"
                  ></q-select>
                </div>
              </div>
            </div>
            <!-- //// -->
            <!-- taps -->
            <!-- //// -->
            <div class="col-12">
              <q-tabs
                align="justify"
                v-model="unitTabs"
                dense
                class="bg-grey-2 text-black"
              >
                <q-tab name="basicInfo" label="Basic info" />
                <q-tab name="contact" label="Contact" />
                <q-tab name="model" label="Model" />
                <q-tab name="policies" label="Policies" />
                <q-tab name="leaseCostinfo" label="lease Cost Info" />
                <q-tab name="unitPhotos" label="Unit Photos" />
                <q-tab name="owners" label="Owners" />
                <q-tab name="attachments" label="Attachments" />
                <!-- <q-tab name="calcAmenities" label="calculate Amenities" /> -->
              </q-tabs>
              <q-tab-panels v-model="unitTabs" animated>
                <!-- /////////// -->
                <!-- contact -->
                <!-- /////////// -->
                <q-tab-panel name="contact">
                  <!-- /////////// -->
                  <!-- owners -->
                  <!-- /////////// -->
                  <unit-contact />
                </q-tab-panel>
                <q-tab-panel name="basicInfo">
                  <basic-info />
                </q-tab-panel>
                <q-tab-panel name="model">
                  <unit-model />
                </q-tab-panel>
                <q-tab-panel name="leaseCostinfo">
                  <lease-cost />
                </q-tab-panel>
                <q-tab-panel name="policies">
                  <policies />
                </q-tab-panel>
                <q-tab-panel name="unitPhotos">
                  <!-- <unit-photo /> -->
                  <ObsAttachment
                    title="Photo"
                    :attachmentData="unitForm.unitPhotos"
                    :isEdit="propToEdit"
                    @submitAttach="addToPhoto"
                  />
                </q-tab-panel>
                <q-tab-panel name="owners">
                  <unitOwners />
                </q-tab-panel>
                <!-- /////////// -->
                <!-- attachments -->
                <!-- /////////// -->
                <q-tab-panel name="attachments">
                  <!-- <unit-attachments /> -->
                  <ObsAttachment
                    title="Attachment"
                    :attachmentData="unitForm.attachments"
                    :isEdit="propToEdit"
                    @submitAttach="addToAttachment"
                  />
                </q-tab-panel>
                <!-- <q-tab-panel name="calcAmenities"> </q-tab-panel> -->
              </q-tab-panels>
            </div>
          </div>
        </q-card-section>
      </q-form>
      <!-- translate dialog -->
      <q-dialog
        v-model="allLanguage_dialog_unit"
        persistent
        transition-show="slide-down"
        transition-hide="slide-up"
      >
        <q-card class="" style="width: 500px">
          <q-card-section class="set-dialog-bg q-pa-md">
            <div class="text-h5 text-white">
              {{ $t("app.administration.charts.chartsProperty.Prop_Translat") }}
            </div>
          </q-card-section>
          <q-card-section class="row">
            <div
              class="col-12 row full-width justify-center items-center"
              v-for="(lang, index) in language_options"
              :key="index"
            >
              <q-input
                class="col-10 q-my-xs"
                type="text"
                v-model="lang.name"
                dense
                :readonly="is_review_from_card || lang.translatable"
                :label="lang.label"
              />
            </div>
          </q-card-section>
          <q-card-actions class="q-pa-lg row justify-end">
            <q-btn
              flat
              label="close"
              @click="allLanguage_dialog_unit = false"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-card>
  </q-dialog>
</template>

<script setup>
const prop = defineProps({
  propToEdit: Boolean,
  is_review_from_card: Boolean,
});

import { onMounted, onUnmounted } from "vue";
import { create_item_model } from "../property-form.js";
import { unitForm } from "./unit-form.js";
import {
  // var
  unit_Categoty_opstions,
  usage_form_opstions,
  unit_type_opstions,
  // fun api
  getUsageForm,
  getUnitTypes,
  getUnitCategory,
  // helper fun
  getLabelById,
} from "../../../../charts-property/composables/use-unit";
import { onBeforeMount, ref } from "vue";
import DialogAllLanguage from "src/modules/app/modules/property/components/dialogAllLanguage.vue";
import { LocalStorage, Loading, Notify } from "quasar";
import unitContact from "./tabs/contact.vue";
import unitOwners from "./tabs/owner.vue";
import unitModel from "./tabs/unit-model";
const { useActions: propertySetting } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
const { useActions: projectSetting } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);
const { useActions: propertyActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
import basicInfo from "./tabs/basic-info.vue";
import policies from "./tabs/policies.vue";
import leaseCost from "./tabs/lease-cost.vue";
import ImageBase64 from "src/modules/app/modules/property/components/image-base64.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import ObsAttachment from "src/modules/app/modules/property/components/obs-attachment.vue";
import DropdownSearchCreate from "src/modules/app/modules/property/components/dropdownSearchCreate.vue";
const unitDialog = ref(false);
const allLanguage_dialog_unit = ref(false);
const unitTabs = ref("contact");
const blocks_option = ref([]);
const floors_option = ref([]);
const isTranslateUnit = ref(false);
const language_options = ref([]);
const unitStatusList = ref([
  {
    value: 1,
    label: "UnderConstruction",
  },
  {
    value: 2,
    label: "Available",
  },
  {
    value: 3,
    label: "Booked",
  },
  {
    value: 4,
    label: "Sold",
  },
  {
    value: 5,
    label: "Rented",
  },
  {
    value: 6,
    label: "UnderMaintenance",
  },
  {
    value: 7,
    label: "OutOfService",
  },
]);
const {
  getBlockList,
  getFloorList,
  getMainGroupById,
  propertyType,
  getVendorsList,
  createProperty,
} = propertySetting([
  "getBlockList",
  "getFloorList",
  "getMainGroupById",
  "propertyType",
  "getVendorsList",
  "createProperty",
]);
const {
  getUnitCategoryList,
  getReUsageForms,
  getAllUnitTypes,
  addUnitCategory,
  createFloors,
  createBlock,
  createUnitType,
} = projectSetting([
  "getUnitCategoryList",
  "getReUsageForms",
  "getAllUnitTypes",
  "addUnitCategory",
  "createFloors",
  "createBlock",
  "createUnitType",
]);
const { unitType } = propertyActions(["unitType"]);
const addToAttachment = (obj) => {
  unitForm.value.attachments.push(obj);
};

const addToPhoto = (obj) => {
  unitForm.value.unitPhotos.push(obj);
};
const updateSizeMeter = () => {
  let objectModal = unitForm.value;
  objectModal.sizeFoot = (objectModal.sizeMater / 3.28).toFixed(0);
};
const updateSizeFoot = () => {
  let objectModal = unitForm.value;
  objectModal.sizeMater = (objectModal.sizeFoot * 3.28).toFixed(0);
};
const getImage = (file) => {
  unitForm.value.urlImage;
};
const deleteUnit = (index) => {
  create_item_model.value.units.splice(index, 1);
};
const addUnit = () => {
  // saveAllLanguageUnit();
  create_item_model.value.units.push(unitForm.value);
  unitDialog.value = false;
  // console.log(create_item_model.value.units);
};
const submitCreateNewCategory = (value) => {
  Loading.show();
  addUnitCategory({ name: value })
    .then((res) => {
      getUnitCategory(getUnitCategoryList);
      Loading.hide();
      Notify.create({
        message: "A category has been created",
        textColor: "green-7",
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
const submitCreateFloor = (value) => {
  Loading.show();
  createFloors({ name: value })
    .then((res) => {
      handelFloorList();
      Loading.hide();
      Notify.create({
        message: "A floor has been created",
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
const submitCreateBlock = (value) => {
  Loading.show();
  createBlock({ name: value })
    .then((res) => {
      handelBlockList();
      Loading.hide();
      Notify.create({
        message: "A block has been created",
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
const discardUnit = () => {
  unitForm.value = {
    id: 0,
    description: "",
    actionsTypes: 1,
    publishOnWebSite: true,
    isActive: true,
    unitsTypeId: null,
    usageFormsId: null,
    unitModelId: null,
    unitCategoryId: null,
    blockId: null,
    floorId: null,
    status: 2,
    incomeAccount: null,
    financialDimensionsId: null,
    image: "",
    policyId: null,
    owners: [
      {
        vendorId: null,
        ownerShipRate: null,
      },
    ],
    contact: {
      name: "",
      jopPostition: "",
      idType: null,
      idNo: null,
      department: "",
      companyName: "",
      addressLine: "",
      cityName: "",
      poCode: "",
      regionId: 0,
      countryId: 0,
      email: "",
      phoneObj: {
        phoneNumber: "",
        countryCode: "",
      },
    },
    attachments: [
      {
        id: 0,
        fileBase64: "",
        docNum: "",
        docName: "",
        date: "",
        url: "",
      },
    ],
    unitPhotos: [
      {
        id: 0,
        fileBase64: "",
        docNum: "",
        docName: "",
        date: "",
        url: "",
      },
    ],
    translation: [
      {
        languageId: LocalStorage.getItem("defLanguage"),
        name: "",
      },
    ],
    leaseCostInfo: {
      areaM2: "",
      pu: "",
      netAreaM2: "",
      gardenAreaM2: "",
      balconiesAreaM2: "",
      rentalPriceParM2: null,
      paymentMethod: "",
      monthlyLease: null,
      annualRent: null,
      insurance: null,
      commissionPercentage: null,
      commission: null,
    },
    basicInfo: {
      facadeDirectionId: null,
      badrooms: null,
      bathrooms: null,
      kitchen: false,
      lounge: false,
      streetWidth_LM: null,
      carParking: true,
      constructionYear: "",
      bldgPlanNo: null,
      parcelNo: null,
      titleDeedNo: null,
      insPolicyNo: null,
    },
    calculateAmenitiesUnit: [
      {
        id: 0,
        amenityId: null,
        rentTypes: null,
        durationTypes: null,
        amount: null,
        unitId: null,
      },
    ],
  };
  // emit("closeDialog");
  // create_item_model.value.units.push(unitForm.value);
  unitDialog.value = false;
};
const handelFloorList = () => {
  getFloorList()
    .then((res) => {
      floors_option.value = res.data.value;
    })
    .catch((_error) => {
      Notify.create({
        message: _error.data.errorMessage
          ? _error.data.errorMessage
          : _error.data,
        color: "red",
        classes: "notify-size",
        position: "bottom",
        timeout: 8000,
      });
    });
};
const handelBlockList = () => {
  getBlockList()
    .then((res) => {
      blocks_option.value = res.data.value;
    })
    .catch((err) => {
      console.log(err);
    });
};
const submitCreateUnitType = (value) => {
  Loading.show();
  createUnitType({ name: value })
    .then((res) => {
      getUnitTypes(unitType);
      Loading.hide();
      Notify.create({
        message: "A Unit Type has been created",
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
  getUsageForm(getReUsageForms);
  getUnitTypes(unitType);
  handelBlockList();
  handelFloorList();
  getUnitCategory(getUnitCategoryList);
});
// onUnmounted(() => {
//   unitForm.value = {
//     id: 0,
//     realEstateId: 0,
//     unitsTypeId: null,
//     sizeMater: null,
//     sizeFoot: null,
//     unitCategoryId: null,
//     blockId: null,
//     floorId: null,
//     usageFormId: null,
//     badrooms: null,
//     bathrooms: null,
//     amenityId: null,
//     status: null,
//     urlImage: "",
//     owners: [
//       // {
//       //   vendorId: null,
//       //   ownerShipRate: null,
//       // },
//     ],
//     contact: {
//       name: "",
//       jopPostition: "",
//       idType: null,
//       idNo: null,
//       email: "",
//       phoneObj: {
//         phoneNumber: "",
//         countryCode: "",
//       },
//     },
//     attachments: [
//       // {
//       //   id: 0,
//       //   fileBase64: "",
//       //   docNum: "",
//       //   docName: "",
//       //   date: "",
//       //   url: "",
//       // },
//     ],
//     translations: [
//       {
//         languageId: 0,
//         name: "",
//       },
//     ],
//   };
// });
</script>

<style>
</style>
