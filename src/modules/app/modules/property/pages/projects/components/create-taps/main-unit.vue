<template>
  <div class="full-width">
    <div class="full-width justify-end row q-py-md">
      <div class="col-12 text-right">
        <q-btn
          label="Add"
          dense
          padding="0 50px"
          outline
          @click="addProperty"
        />
      </div>
    </div>
    <!-- table head -->
    <div class="row full-width justify-around text-left">
      <div class="cel-count">#</div>
      <div class="cel-width">property</div>
      <div class="cel-width">Type</div>
      <div class="cel-width">Building Area m2</div>
      <div class="cel-width">Blocks</div>
      <div class="cel-width">constr. year</div>
      <div class="cel-count"></div>
    </div>
    <q-separator spaced color="grey-5" class="full-width" />
    <!-- table body -->
    <template v-if="form_data.realEstates.length !== 0">
      <div
        class="row full-width justify-around text-left"
        v-for="(item, i) in form_data.realEstates"
        :key="i"
      >
        <div class="cel-count">{{ 1 + i }}</div>
        <div class="cel-width">{{ item.translations[0].name }}</div>
        <div class="cel-width">{{ item.propertyType }}</div>
        <div class="cel-width">{{ item.buildingAreaM2 }}</div>
        <div class="cel-width">{{ item.owners.length }}</div>
        <div class="cel-width">{{ item.constructionYear }}</div>
        <div class="cel-count">
          <q-btn
            flat
            icon="eva-more-vertical-outline"
            style="font-weight: 300; font-size: 12px"
          >
            <q-menu style="border-radius: 10px">
              <q-list class="rounded-borders more-list">
                <q-item clickable @click="addUnit(i)">
                  <q-item-section>Unit</q-item-section>
                </q-item>
                <q-item clickable @click="editProperty(i)">
                  <q-item-section>{{ $t("global.edit") }}</q-item-section>
                </q-item>
                <q-item clickable @click="deleteProperty(i)">
                  <q-item-section>{{ $t("global.delete") }}</q-item-section>
                </q-item>
                <q-item clickable @click="duplicateProperty(i)">
                  <q-item-section>Duplicate</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </template>
    <!-- //////////////////////// -->
    <!-- create realEstate dialog -->
    <!-- //////////////////////// -->
    <q-dialog
      v-model="dialogCreateProperty"
      transition-show="scale"
      transition-hide="scale"
      persistent
      full-width
      full-height
    >
      <createProperyDialog
        :propToEdit="isEditProperty"
        @createPropertyOfGroup="addRealEstate"
        @updatePropertyOfGroup="updateProperty"
      />
    </q-dialog>
    <!-- ////////////////// -->
    <!-- create unit dialog -->
    <!-- ////////////////// -->
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
        style="width: 1200px; max-width: 80vw; max-height: 80vh"
      >
        <q-card-section
          class="text-left"
          style="font-size: 17px; font-weight: 500"
        >
          Add Unit
        </q-card-section>

        <q-form @submit.prevent="createUnit">
          <q-card-actions class="flex justify-end q-my-lg">
            <q-btn
              color="blue-5"
              dense
              padding="0 40px"
              type="submit"
              label="Submit"
            />
            <q-btn
              dense
              padding="0 40px"
              label="Discard"
              outline
              color="grey-7"
              @click="unitDialog = false"
            />
          </q-card-actions>
          <q-card-section
            class="text-left row justify-between full-with"
            style="font-size: 17px; font-weight: 500"
          >
            <div class="row justify-between">
              <div class="col-6 row justify-between">
                <div class="col-8">
                  <q-input
                    type="text"
                    v-model="unitForm.translation[0].name"
                    :label="$t('global.name')"
                    @update:model-value="chaneAllLanguageUnit"
                    :rules="[
                      (val) => val.length > 0 || 'Property Name Id Is Required',
                    ]"
                  >
                    <template v-slot:append>
                      <q-btn
                        icon="eva-globe-outline"
                        @click="addNameInAllLanguagesUnit"
                      />
                    </template>
                  </q-input>
                </div>
                <div class="col-5">
                  <q-select
                    label="Model"
                    option-value="id"
                    map-options
                    emit-value
                  />
                </div>
                <div class="col-5">
                  <q-select
                    label="Type"
                    class="full-width"
                    v-model="unitForm.unitsTypeId"
                    option-value="id"
                    :options="unit_type_opstions"
                    map-options
                    emit-value
                    option-label="label"
                  />
                </div>
                <div class="col-5">
                  <q-select
                    label="Usage form"
                    :options="usage_form_opstions"
                    option-value="id"
                    map-options
                    emit-value
                  />
                </div>
                <div class="col-5">
                  <q-select
                    :options="unit_Categoty_opstions"
                    v-model="unitForm.unitCategoryId"
                    label="Category"
                    option-value="id"
                    map-options
                    emit-value
                  />
                </div>
                <!-- ///////// -->
                <!-- metr size -->
                <!-- ///////// -->
                <div class="col-5">
                  <q-input
                    type="number"
                    v-model="unitForm.sizeMater"
                    :label="
                      $t('app.administration.charts.chartsProperty.size_mater')
                    "
                    @update:model-value="updateSizeMeter"
                  />
                </div>
                <!-- ///////// -->
                <!-- metr foot -->
                <!-- ///////// -->
                <div class="col-5">
                  <q-input
                    type="number"
                    v-model="unitForm.sizeFoot"
                    :label="
                      $t('app.administration.charts.chartsProperty.size_foot')
                    "
                    @update:model-value="updateSizeFoot"
                  />
                </div>
                <!-- floors -->

                <div class="col-5">
                  <q-select
                    v-model="unitForm.floorId"
                    :options="floors_option"
                    emit-value
                    map-options
                    clearable
                    option-value="id"
                    :label="
                      $t('app.administration.charts.chartsProperty.floor')
                    "
                  ></q-select>
                </div>
                <!-- blocks -->
                <div class="col-5">
                  <q-select
                    v-model="unitForm.blockId"
                    :options="blocks_option"
                    emit-value
                    map-options
                    clearable
                    option-value="id"
                    :label="
                      $t('app.administration.charts.chartsProperty.block')
                    "
                  ></q-select>
                </div>
                <!-- usageForm -->
                <div class="col-5">
                  <!-- :options="blocks_option" -->
                  <q-select
                    v-model="unitForm.usageFormId"
                    emit-value
                    map-options
                    clearable
                    option-value="id"
                    label="Usage form"
                  ></q-select>
                </div>
                <!-- badrooms -->
                <div class="col-5">
                  <q-input
                    v-model="unitForm.badrooms"
                    :label="
                      $t('app.administration.settings.property_unit.badrooms')
                    "
                    type="number"
                  />
                </div>
                <!-- badrooms -->
                <div class="col-5">
                  <q-input
                    v-model="unitForm.bathrooms"
                    :label="
                      $t('app.administration.settings.property_unit.bathrooms')
                    "
                    type="number"
                  />
                </div>
                <div class="col-5">
                  <q-select
                    v-model="unitForm.amenityId"
                    :options="amenity_option"
                    emit-value
                    clearable
                    map-options
                    option-value="id"
                    :label="
                      $t('app.administration.charts.chartsProperty.amenity')
                    "
                  ></q-select>
                </div>
                <div class="col-5">
                  <q-input type="number" v-model="unitForm.area" labe="Area m">
                  </q-input>
                </div>
              </div>
              <!-- ///// -->
              <!-- image -->
              <!-- ///// -->
              <div class="col-5 row justify-between items-center">
                <obs-avatar-field
                  class="col-12"
                  :square="true"
                  @passUrl="getImage"
                />
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
                  <q-tab name="contact" label="Contact" />
                  <q-tab name="owners" label="Owners" />
                  <q-tab name="attachments" label="Attachments" />
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
                  <q-tab-panel name="owners">
                    <unitOwners />
                  </q-tab-panel>
                  <!-- /////////// -->
                  <!-- attachments -->
                  <!-- /////////// -->
                  <q-tab-panel name="attachments">
                    <unit-attachments />
                    <!-- <unit-owners /> -->
                  </q-tab-panel>
                </q-tab-panels>
              </div>
            </div>
          </q-card-section>
        </q-form>
        <q-dialog
          v-model="allLanguage_dialog_unit"
          persistent
          transition-show="slide-down"
          transition-hide="slide-up"
        >
          <q-card class="" style="width: 500px">
            <q-card-section class="set-dialog-bg q-pa-md">
              <div class="text-h5 text-white">
                {{
                  $t("app.administration.charts.chartsProperty.Prop_Translat")
                }}
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
  </div>
</template>

<script setup>
import dialogAllLanguage from "../../../../components/dialogAllLanguage.vue";
const { useActions: propertyAction } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
const { useActions: settingActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);
import createProperyDialog from "../create-property";
import { createNamespacedHelpers } from "vuex-composition-helpers";
// const { useActions } = createNamespacedHelpers(
//   "AppModule/AdministrationModule/ChartsModule/chartsProperty"
// );
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
} from "../../../charts-property/composables/use-unit";
import { unitForm } from "./unit-taps/unit-form";
import unitContact from "./unit-taps/unit-contact.vue";
import unitAttachments from "./unit-taps/unit-attachments.vue";
import unitOwners from "./unit-taps/unit-owners.vue";
import { form_data, language_options, $q } from "../../composables/reaquist";
import { DEFAULT_COMPANY_LANG, COUNTRY_CODE } from "src/configs/language.js";
import { create_item_model as propertyForm } from "../create-property/property-form.js";

import {
  id_for_created_prop,
  requist,
} from "../../../charts-property/composables/reaquist";
import { onMounted, ref } from "vue";
const props = defineProps({
  propToEdit: Boolean,
});
const isTranslate = ref(false);
const isEditProperty = ref(false);
const isTranslateUnit = ref(false);
const realestatIndexToPush = ref("");
const realestatIndexToEdit = ref("");
const floors_option = ref([]);
const blocks_option = ref([]);
const amenity_option = ref([]);
const allLanguage_dialog_unit = ref(false);
const unitDialog = ref(false);
const unitTabs = ref("contact");
const propType_opstions = ref([]);
const allLanguage_dialog = ref(false);
// const propertyForm = ref({
//   translations: [
//     {
//       languageId: null,
//       name: "",
//     },
//   ],
//   id: 0,
//   typeId: null,
//   buildingAreaM2: null,
//   // noOfBlocks: null,
//   constructionYear: null,
//   units: [],
// });

const dialogCreateProperty = ref(false);
const propertyDetails = ref({});
const {
  createProperty,
  propertyType,
  getFloorList,
  getBlockList,
  getAmenityList,
} = propertyAction([
  "createProperty",
  "propertyType",
  "getFloorList",
  "getBlockList",
  "getAmenityList",
]);
const { createPropertyOfGroup } = requist(
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  "",
  createProperty,
  "",
  "",
  "",
  ""
);
const addProperty = () => {
  isEditProperty.value = false;
  dialogCreateProperty.value = true;
};
// const getPropertyDetails = (payload) => {
//   createPropertyOfGroup(payload);
//   console.log(payload);
//   console.log(id_for_created_prop.value);
// };
const saveAllLanguage = () => {
  // let arr = [];
  if (!props.propToEdit) {
    let arr = language_options.value.map((el) =>
      Object.assign({}, { languageId: el.languageId }, { name: el.name })
    );
    let index = arr.findIndex((el) => el.languageId == DEFAULT_COMPANY_LANG);
    // GET elemet default value for user
    let element = arr[index];
    // delete it from immeditley index
    arr.splice(index, 1);
    // add it in inex 0
    arr.splice(0, 0, element);
    propertyForm.value.translations = [...arr];
  }
  allLanguage_dialog.value = false;
};
const addNameInAllLanguages = () => {
  if (!props.propToEdit) {
    // console.log(propToEdit.value + " ...." + "prop");
    if (!isTranslate.value) {
      language_options.value.forEach(
        (el) => (el.name = propertyForm.value.translations[0].name)
      );
      isTranslate.value = true;
    }
  }
  allLanguage_dialog.value = true;
};
const addRealEstate = (form) => {
  // saveAllLanguage();
  form_data.value.realEstates.push(propertyForm.value);
  dialogCreateProperty.value = false;
};
const getPropertyTypes = () => {
  propertyType()
    .then((res) => {
      console.log(res.data.value);
      propType_opstions.value = res.data.value;
    })
    .catch((err) => console.log(err));
};
const chaneAllLanguage = () => {
  if (!props.propToEdit) {
    // console.log($q.localStorage.getItem("defLanguage"));
    if (!isTranslate.value) {
      language_options.value.forEach(
        (el) => (el.name = propertyForm.value.translations[0].name)
      );
    } else {
      let index = language_options.value.findIndex(
        (el) => el.languageId == $q.localStorage.getItem("defLanguage")
      );
      // console.log(index);
      language_options.value[index].name =
        propertyForm.value.translations[0].name;
    }
  }
};
const saveAllLanguageUnit = () => {
  // let arr = [];
  if (!props.propToEdit) {
    let arr = language_options.value.map((el) =>
      Object.assign({}, { languageId: el.languageId }, { name: el.name })
    );
    let index = arr.findIndex((el) => el.languageId == DEFAULT_COMPANY_LANG);
    // GET elemet default value for user
    let element = arr[index];
    // delete it from immeditley index
    arr.splice(index, 1);
    // add it in inex 0
    arr.splice(0, 0, element);
    unitForm.value.translation = [...arr];
  }
  unitDialog.value = false;
};
const addNameInAllLanguagesUnit = () => {
  if (!props.propToEdit) {
    if (!isTranslateUnit.value) {
      language_options.value.forEach(
        (el) => (el.name = unitForm.value.translation[0].name)
      );
      isTranslateUnit.value = true;
    }
  }
  allLanguage_dialog_unit.value = true;
};
const chaneAllLanguageUnit = () => {
  if (!props.propToEdit) {
    // console.log($q.localStorage.getItem("defLanguage"));
    if (!isTranslateUnit.value) {
      language_options.value.forEach(
        (el) => (el.name = unitForm.value.translation[0].name)
      );
    } else {
      let index = language_options.value.findIndex(
        (el) => el.languageId == $q.localStorage.getItem("defLanguage")
      );
      // console.log(index);
      language_options.value[index].name = unitForm.value.translation[0].name;
    }
  }
};
const createUnit = () => {
  saveAllLanguageUnit();
  form_data.value.realEstates[realestatIndexToPush.value].units.push(
    unitForm.value
  );
  unitDialog.value = false;
  console.log(form_data.value.realEstates);
};
const getfloorsOptions = () => {
  getFloorList()
    .then((res) => {
      floors_option.value = res.data.value;
    })
    .catch((_error) => {
      console.log(_error);
    });
};
const getImage = (file) => {
  unitForm.value.urlImage;
};
const { getAllUnitCategory, getReUsageForms, getAllUnitTypes } = settingActions(
  ["getAllUnitCategory", "getReUsageForms", "getAllUnitTypes"]
);
const addUnit = (i) => {
  realestatIndexToPush.value = i;
  unitDialog.value = true;
};
const editProperty = (i) => {
  // realestatIndexToPush.value = i;
  propertyForm.value = form_data.value.realEstates[i];
  console.log(propertyForm.value);
  realestatIndexToEdit.value = i;
  isEditProperty.value = true;
  dialogCreateProperty.value = true;
};
const updateProperty = (formData) => {
  form_data.value.realEstates[realestatIndexToEdit] = formData;
  dialogCreateProperty.value = false;
};
const updateSizeFoot = () => {
  let objectModal = unitForm.value;
  objectModal.sizeMater = (objectModal.sizeFoot * 3.28).toFixed(0);
};
const updateSizeMeter = () => {
  let objectModal = unitForm.value;
  objectModal.sizeFoot = (objectModal.sizeMater / 3.28).toFixed(0);
};
const deleteProperty = (i) => {
  form_data.value.realEstates.splice(i, 1);
};
const duplicateProperty = (i) => {
  let copyOpj = { ...form_data.value.realEstates[i] };
  form_data.value.realEstates.push(copyOpj);
};
// get blocks dropdown
const getBlocksOptions = () => {
  getBlockList()
    .then((res) => {
      blocks_option.value = res.data.value;
    })
    .catch((_error) => {
      console.log(_error);
    });
};
// get Amenity
const getAmenityOptions = () => {
  getAmenityList()
    .then((res) => {
      amenity_option.value = res.data.value;
    })
    .catch((_error) => {
      console.log(_error);
    });
};
onMounted(() => {
  getPropertyTypes();
  getUnitCategory(getAllUnitCategory);
  getUsageForm(getReUsageForms);
  getUnitTypes(getAllUnitTypes);
  getfloorsOptions();
  getBlocksOptions();
  getAmenityOptions();
});
</script>

<style lang="scss" scoped>
.cel-width {
  width: calc(92% / 5);
}
.cel-count {
  width: 20px;
}
</style>
