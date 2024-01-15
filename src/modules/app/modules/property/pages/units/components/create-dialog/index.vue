<template>
  <!-- dialog add unit  -->
  <q-card
    class="q-pa-lg"
    style="width: 1200px; max-width: 80vw; max-height: 80vh"
  >
    <q-card-section
      class="text-left row"
      style="font-size: 17px; font-weight: 500"
    >
      <generateUnitPdf
        v-if="propToEdit"
        :unitForm="unitForm"
        :realestateList="realestateList"
        :unitStatusList="unitStatusList"
        :unit_type_opstions="unit_type_opstions"
        :unit_Categoty_opstions="unit_Categoty_opstions"
        :floors_option="floors_option"
        :blocks_option="blocks_option"
      />
      <generateUnitPdf
        v-if="propToEdit"
        :isTelegram="true"
        :unitForm="unitForm"
        :realestateList="realestateList"
        :unitStatusList="unitStatusList"
        :unit_type_opstions="unit_type_opstions"
        :unit_Categoty_opstions="unit_Categoty_opstions"
        :floors_option="floors_option"
        :blocks_option="blocks_option"
      />
    </q-card-section>
    <q-card-section class="text-left" style="font-size: 17px; font-weight: 500">
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
            <div class="col-12 row items-center">
              <div class="col-8">
                <!-- <q-select
                  v-model="unitForm.realEstateId"
                  emit-value
                  map-options
                  :options="realestateList"
                  clearable
                  option-value="id"
                  option-label="name"
                  label="Property Name"
                  :rules="[(val) => val || 'must select property']"
                ></q-select> -->
                <DropdownSearchCreate
                  :modelOpstions="realestateList"
                  v-model="unitForm.realEstateId"
                  @emitCreateNew="submitCreatePropertyDropDown"
                  valueOpstion="id"
                  labelOpstion="label"
                  title="Real estate"
                  :isRequired="true"
                />
              </div>
              <!-- <div class="q-px-md col row">
                <q-btn icon="add" flat @click="addPropertyDialog" />
              </div> -->
            </div>

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
                <q-input
                  style="width: 40%"
                  label="Recurring"
                  :readonly="is_review_from_card"
                  v-model="unitForm.depulicateNumber"
                  :rules="[
                    (val) =>
                      (val < 100 && val !== '') ||
                      'max recur is 100 , Must type recurring number or leace it (0) ',
                  ]"
                  type="number"
                />
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
                  :options="usage_for_opstions"
                ></q-select>
                <!-- <DropdownSearchCreate
                  :modelOpstions="usage_for_opstions"
                  v-model="unitForm.usageFormsId"
                  @emitCreateNew="submitCreateUsageForm"
                  valueOpstion="id"
                  labelOpstion="label"
                  title="Usage form"
                /> -->
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
                  :readonly="is_review_from_card"
                  @emitCreateNew="submitCreateNewCategory"
                  valueOpstion="id"
                  labelOpstion="label"
                  class="full-width"
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
                  :label="$t('app.administration.charts.chartsProperty.floor')"
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
                  :label="$t('app.administration.charts.chartsProperty.block')"
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
          <q-dialog
            v-model="createPropertyDialog"
            persistent
            transition-show="slide-down"
            transition-hide="slide-up"
          >
            <q-card class="" style="width: 50vw">
              <q-form @submit.prevent="submitCreateProperty">
                <q-card-section class="q-pa-xl">
                  <DialogAllLanguage
                    v-model:modelInput="
                      create_property_form.translations[0].name
                    "
                    v-model:modelLanguages="create_property_form.translations"
                    title="Name in all languages"
                    :propToEdit="false"
                    :is_review="is_review_from_card"
                  />
                </q-card-section>
                <q-card-actions class="q-pa-lg row justify-end">
                  <q-btn
                    flat
                    label="close"
                    padding="5px 20px"
                    @click="createPropertyDialog = false"
                  />
                  <q-btn
                    label="Submit"
                    padding="5px 20px"
                    color="blue-5"
                    type="submit"
                  />
                  <!-- @click="submitCreateProject = false" -->
                </q-card-actions>
              </q-form>
            </q-card>
          </q-dialog>
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>
<script setup>
import { unitForm } from "./form/unit-model-form.js";
const emit = defineEmits(["submitCreate", "closeDialog"]);
const prop = defineProps({
  propToEdit: Boolean,
  is_review_from_card: {
    type: Boolean,
    default: false,
  },
});
const { useActions: propertySetting } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
const { useActions: propertyActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
const { useActions: projectSetting } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);
import { DEFAULT_COMPANY_LANG, COUNTRY_CODE } from "src/configs/language.js";
import { LocalStorage, Loading, Notify } from "quasar";
import unitContact from "./tabs/contact.vue";
import unitOwners from "./tabs/owner.vue";
import unitModel from "./tabs/unit-model";
import basicInfo from "./tabs/basic-info.vue";
import policies from "./tabs/policies.vue";
import leaseCost from "./tabs/lease-cost.vue";
import generateUnitPdf from "../generate-unit-pdf.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions: labguage } = createNamespacedHelpers("AppModule");
import unitAttachments from "./tabs/attachments.vue";
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
  // create from dropdownlist,
} from "../../../charts-property/composables/use-unit";
import { onBeforeMount, onMounted, ref } from "vue";
import ObsAttachment from "../../../../components/obs-attachment.vue";
import DialogAllLanguage from "../../../../components/dialogAllLanguage.vue";
import ImageBase64 from "../../../../components/image-base64.vue";
import DropdownSearchCreate from "../../../../components/dropdownSearchCreate.vue";
// const unitDialog = ref(false);
const allLanguage_dialog_unit = ref(false);
const unitTabs = ref("basicInfo");
const isTranslateUnit = ref(false);
const language_options = ref([]);
const createPropertyDialog = ref(false);
const realestateList = ref([]);
const blocks_option = ref([]);
const usage_for_opstions = ref([]);
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
const create_property_form = ref({
  typeId: null,
  noOfBlocks: null,
  policiesId: null,
  isActive: true,
  isFavorite: true,
  depulicateNumber: 0,
  constructionYear: "",
  landAreaM2: null,
  buildingAreaM2: null,
  gardenM2: "",
  surface: "",
  garage: "",
  elevators: "",
  northernBorderBy: "",
  southernBorderBy: "",
  easternBorderBy: "",
  westernBorderBy: "",
  projectId: null,
  image: "",
  address: null,
  contact: null,
  tags: [],
  owners: [],
  translations: [
    {
      languageId: LocalStorage.getItem("defLanguage"),
      name: "",
    },
  ],
  attachments: [],
  blocksFloorsList: [
    {
      blockId: null,
      floors: [],
    },
  ],
  units: [],
});
const floors_option = ref([]);
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
  emit("submitCreate");
};
const discardUnit = () => {
  unitForm.value = {
    realEstateId: 0,
    description: "",
    actionsTypes: 1,
    depulicateNumber: 1,

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
      carParking: false,
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
  emit("closeDialog");
  // create_item_model.value.units.push(unitForm.value);
  // unitDialog.value = false;
};
const { getLaguages } = labguage(["getLaguages"]);
const getLanguageOptions = async () => {
  try {
    let req = await getLaguages();

    language_options.value = req.data.value.map((el) => {
      return Object.assign(
        {},
        { languageId: el.id },
        { name: "" },
        { label: el.nativeName },
        { translatable: !el.translatable }
      );
    });
    console.log(req.data.value);
  } catch (err) {
    console.log(err);
  }
};
const {
  getBlockList,
  getFloorList,
  getPropertyList,
  propertyType,
  getVendorsList,
  createProperty,
  createRealestateDropdown,
} = propertySetting([
  "getBlockList",
  "getFloorList",
  "getPropertyList",
  "propertyType",
  "getVendorsList",
  "createProperty",
  "createRealestateDropdown",
]);
const {
  getUnitCategoryList,
  getReUsageForms,
  getAllUnitTypes,
  addUnitCategory,
  createFloors,
  createBlock,
  createUnitType,
  getUsageFormList,
  createReUsageForms,
} = projectSetting([
  "getUnitCategoryList",
  "getReUsageForms",
  "getAllUnitTypes",
  "addUnitCategory",
  "createFloors",
  "createBlock",
  "createUnitType",
  "getUsageFormList",
  "createReUsageForms",
]);
const { unitType } = propertyActions(["unitType"]);
const handelBlockList = () => {
  getBlockList()
    .then((res) => {
      blocks_option.value = res.data.value;
    })
    .catch((err) => {
      console.log(err);
    });
};
const handelUsageFormList = () => {
  getUsageFormList()
    .then((res) => {
      console.log(res);
      usage_for_opstions.value = res.value;
    })
    .catch((err) => {
      console.log(err);
    });
};
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
//////////////////////////
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
        textColor: "red",
        classes: "notify-size",
        position: "bottom",
        timeout: 8000,
      });
    });
};
const addToAttachment = (obj) => {
  unitForm.value.attachments.push(obj);
};
const addToPhoto = (obj) => {
  unitForm.value.unitPhotos.push(obj);
};
const addPropertyDialog = () => {
  create_property_form.value.translations = [
    {
      languageId: LocalStorage.getItem("defLanguage"),
      name: "",
    },
  ];
  createPropertyDialog.value = true;
};
const submitCreateProperty = (inputValue) => {
  create_property_form.value.translations[0].name = inputValue;
  Loading.show();
  createProperty(create_property_form.value)
    .then((res) => {
      Loading.hide();
      getRealEstateList();
      createPropertyDialog.value = false;
      Notify.create({
        message: "A property has been created",
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
        color: "red",
        classes: "notify-size",
        position: "bottom",
        timeout: 8000,
      });
    });
};
const submitCreatePropertyDropDown = (inputValue) => {
  // create_property_form.value.translations[0].name = inputValue;
  Loading.show();
  createRealestateDropdown({ name: inputValue })
    .then((res) => {
      Loading.hide();
      getRealEstateList();
      createPropertyDialog.value = false;
      Notify.create({
        message: "A property has been created",
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
        color: "red",
        classes: "notify-size",
        position: "bottom",
        timeout: 8000,
      });
    });
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
const submitCreateUsageForm = (value) => {
  Loading.show();
  // const obj = {
  //   translations: [
  //     { languageId: LocalStorage.getItem("defLanguage") && 1, name: value },
  //   ],
  // };
  createReUsageForms(obj)
    .then((res) => {
      handelUsageFormList(getUnitCategoryList);
      Loading.hide();
      Notify.create({
        message: "A usage-form has been created",
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
onMounted(() => {
  handelBlockList();
  handelFloorList();
  getRealEstateList();
  getLanguageOptions();
  getUsageForm(getReUsageForms);
  getUnitTypes(unitType);
  getUnitCategory(getUnitCategoryList);
  handelUsageFormList();
});
</script>

<style>
</style>
