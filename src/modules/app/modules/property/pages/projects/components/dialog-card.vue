<template>
  <q-card
    class="create-item"
    style="width: 1500px; max-width: 100vw; max-height: 100vh"
  >
    <!-- <q-card-section class="q-px-xl q-py-lg"> </q-card-section> -->
    <q-form
      @submit.prevent="submitForm"
      @validation-error="getErrorValidation"
      autofocus
      greedy
    >
      <q-card-section class="row">
        <generateProjectPdf
          v-if="isEdit"
          :ragionList="ragionList"
          :cuntriesOpstion="cuntriesOpstion"
        />
        <generateProjectPdf
          v-if="isEdit"
          :ragionList="ragionList"
          :cuntriesOpstion="cuntriesOpstion"
          :isTelegram="true"
        />
      </q-card-section>
      <q-card-actions
        class="row justify-between items-center full-width full-height bg-white q-px-xl q-py-lg"
      >
        <!-- v-if="!is_review_from_card" -->
        <!-- style="color: black" -->

        <!-- :label="propToEdit ? $t('global.edit') : $t('global.save')" -->
        <div class="col-6 text-left" style="font-size: 22px; font-weight: 600">
          Project Details
        </div>
        <div class="col-6 row justify-end">
          <q-btn
            class="q-ml-md btn-component"
            style="color: black"
            outline
            padding="7px 50px"
            unelevated
            flat
            no-caps
            label="Discard"
            v-close-popup
            @click="discard"
          />
          <q-btn
            v-if="!is_review_from_card"
            class="q-ml-md btn-component"
            type="submit"
            padding="7px 50px"
            :color="isEdit ? 'green' : 'blue-4'"
            no-caps
            :label="isEdit ? 'Update' : 'Save'"
          />
        </div>
      </q-card-actions>
      <q-card-section class="bg-white q-pa-xl">
        <!-- genral form -->
        <div class="row full-width">
          <div class="col-6">
            <!-- //// -->
            <!-- name -->
            <!-- //// -->

            <DialogAllLanguage
              v-model:modelInput="create_item_model.translation[0].name"
              v-model:modelLanguages="create_item_model.translation"
              title="Name in all languages"
              :propToEdit="false"
              :is_review="is_review_from_card"
            />
            <!-- //// -->
            <!-- disc -->
            <!-- //// -->
            <q-input
              label="Description"
              v-model="create_item_model.descraption"
              :readonly="is_review_from_card"
            />
          </div>
          <div class="col-sm-6 q-mt-sm row justify-center">
            <!-- name="fileAsBase64" -->
            <!-- <obs-avatar-field
              class="col-12"
              :disable="is_review_from_card"
              :square="true"
              @passUrl="getImage"
              v-model="create_item_model.image"
            /> -->
            <image-base-64
              :disable="is_review_from_card"
              :square="true"
              v-model:imageBase64="create_item_model.image"
              v-model:imageUrl="create_item_model.imageUrl"
            />
            <!-- v-model="create_item_model.image" -->
          </div>
          <!-- ///// -->
          <!-- taps  -->
          <!-- ///// -->
          <div class="row q-my-lg full-width">
            <div class="col-12">
              <q-tabs
                align="justify"
                v-model="ItemTab"
                dense
                class="bg-grey-2 text-black"
              >
                <q-tab name="main-unit" label="Property" />
                <!-- <q-tab name="manager" label="Manager" /> -->
                <q-tab name="drawings" label="Project drawings" />
                <q-tab name="location" label="Location" />
                <!-- <q-tab name="payment" label="Payment methods" /> -->
              </q-tabs>
              <!-- ////////////////////// -->
              <!-- taps content container -->
              <!-- ////////////////////// -->
              <q-tab-panels v-model="ItemTab" animated>
                <q-tab-panel name="main-unit">
                  <main-unit />
                </q-tab-panel>
                <q-tab-panel name="Manager"> </q-tab-panel>
                <q-tab-panel name="drawings">
                  <!-- <Attatchment
                    title="Drawing"
                    :attachmentData="create_item_model.drawingList"
                    :isEdit="isEdit"
                    @submitAttach="addToAttachment"
                  /> -->
                  <Attatchment
                    title="Attachment"
                    :attachmentData="create_item_model.drawingList"
                    :isEdit="propToEdit"
                    @submitAttach="addToAttachment"
                  />
                </q-tab-panel>
                <q-tab-panel name="location">
                  <div class="row">
                    <div class="col-6">
                      <div
                        class="full-height"
                        style="
                          display: flex;
                          flex-direction: column;
                          justify-content: space-between;
                        "
                      >
                        <ObsAdress
                          v-model:cityName="create_item_model.city"
                          v-model:addressLine="create_item_model.addressLine"
                          v-model:zipCode="create_item_model.zipCode"
                          v-model:countryId="create_item_model.countryId"
                          v-model:regionId="create_item_model.regionId"
                          :is_review_from_card="is_review_from_card"
                        />
                        <q-input
                          class="q-my-md"
                          label="Location link"
                          v-model="create_item_model.locationUrl"
                        >
                          <template v-slot:prepend>
                            <q-icon name="place" />
                          </template>
                          <template v-slot:append>
                            <q-btn
                              icon="share"
                              flat
                              @click="shareLocation()"
                              class="cursor-pointer"
                            />
                          </template>
                        </q-input>
                      </div>
                    </div>
                    <div class="col-6 q-pa-md">
                      <!-- <location-map
                        @emitLocation="getLocationUrl"
                        @updateLatLon="updateLatLon"
                        :lat="create_item_model.longitude"
                        :long="create_item_model.latitude"
                      /> -->
                      <LocationGMap
                        @emitLocation="getLocationUrl"
                        @updateLatLon="updateLatLon"
                        :lat="create_item_model.latitude"
                        :long="create_item_model.longitude"
                      />
                    </div>
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-form>
    <q-dialog
      v-model="allLanguage_dialog"
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
        <q-card-section v-if="propToEdit" class="row">
          <div
            class="col-12 row full-width justify-center items-center"
            v-for="(lang, index) in create_item_model.translation"
            :key="index"
          >
            <!-- <div class="q-pr-md">{{ lang.label }}</div> -->
            <!-- <div col-> -->

            {{ lang }}
            <q-input
              class="col-10 q-my-xs"
              type="text"
              v-model="lang.name"
              dense
              :label="getProperityName(lang)"
            />
            <!-- :readonly="
              is_review_from_card || checkTranslationIsTranslate(lang)
            " -->
            <!-- </div> -->
          </div>
        </q-card-section>
        <q-card-section v-else class="row">
          <div
            class="col-12 row full-width justify-center items-center"
            v-for="(lang, index) in language_options"
            :key="index"
          >
            <!-- <div class="q-pr-md">{{ lang.label }}</div> -->
            <!-- <div col-> -->
            <q-input
              class="col-10 q-my-xs"
              type="text"
              v-model="lang.name"
              dense
              :label="lang.label"
            />
            <!-- :readonly="is_review_from_card || lang.translatable" -->
            <!-- </div> -->
          </div>
        </q-card-section>
        <q-card-actions
          style="position: sticky; bottom: 0; background-color: white"
          align="right"
          class="row"
        >
          <q-btn
            unelevated
            style="border-radius: 10px"
            no-caps
            size="lg"
            padding="10px 30px"
            :label="$t('global.save')"
            outline
            @click="saveAllLanguage"
            v-close-popup
          />
          <q-btn
            class="q-mx-sm"
            flat
            size="lg"
            padding="10px 30px"
            label="close"
            v-close-popup
            @click="allLanguage_dialog = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-card>
</template>

<script>
const { useActions: propertyAction } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
import ObsAdress from "../../../components/obs-adress.vue";
import Attatchment from "../../../components/obs-attachment.vue";
import { DEFAULT_COMPANY_LANG, COUNTRY_CODE } from "src/configs/language.js";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { form_data, language_options, $q } from "../composables/reaquist.js";
import { computed, onMounted, ref } from "vue";
import { Loading, Notify, useQuasar, LocalStorage } from "quasar";
const { useActions: labguage } = createNamespacedHelpers("AppModule");
import mainUnit from "./create-taps/main-unit.vue";
import LocationMap from "./create-taps/location-map.vue";
import DialogAllLanguage from "../../../components/dialogAllLanguage.vue";
import ImageBase64 from "../../../components/image-base64.vue";
import LocationGMap from "../../../components/locationGMap.vue";
import generateProjectPdf from "./generate-project-pdf.vue";
// import Attatchment from "./create-taps/attatchment.vue";

export default {
  components: {
    mainUnit,
    // LocationMap,
    Attatchment,
    DialogAllLanguage,
    ObsAdress,
    ImageBase64,
    LocationGMap,
    generateProjectPdf,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    editData: {
      type: Object,
    },
    is_review_from_card: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const { getCountriesList, getRagionListById } = propertyAction([
      "getCountriesList",
      "getRagionListById",
    ]);
    const { getLaguages } = labguage(["getLaguages"]);
    const ragionList = ref([]);
    const isSelectCuntry = ref(false);
    const isTranslate = ref(false);
    const allLanguage_dialog = ref(false);
    const cuntriesOpstion = ref([]);
    const ItemTab = ref("main-unit");
    const imageModel = ref("");
    // const form_data = ref({
    //   name: "",
    //   descraption: "",
    //   addressLine: "",
    //   city: "",
    //   postCode: "",
    //   regionId: "",
    //   countryId: "",
    //   image: "",
    // });
    const create_item_model = computed(() => {
      // if (props.isEdit) {
      //   return props.editData;
      // } else {
      return form_data.value;
      // }
    });
    const cuntrieList = () => {
      getCountriesList()
        .then((res) => {
          cuntriesOpstion.value = res.data.value;
        })
        .catch((_error) => {
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const getRagionList = async (id) => {
      getRagionListById(id)
        .then((res) => {
          ragionList.value = res.data.value;
        })
        .catch((_error) => {
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const checkSelectCuntrie = (value) => {
      // contactModel.value.emailsList.splice(index, 1);
      if (value == "") {
        isSelectCuntry.value = false;
      } else {
        getRagionList(value);
        isSelectCuntry.value = true;
      }
    };
    const submitForm = () => {
      // let formData = new FormData();
      // formData.append("Name", `${create_item_model.value.name}`);
      // formData.append("Descraption", `${create_item_model.value.descraption}`);
      // formData.append("AddressLine", `${create_item_model.value.addressLine}`);
      // formData.append("City", `${create_item_model.value.city}`);
      // formData.append("PostCode", `${create_item_model.value.postCode}`);
      // formData.append("RegionId", `${create_item_model.value.regionId}`);
      // formData.append("CountryId", `${create_item_model.value.countryId}`);
      if (props.isEdit) {
        emit("submitEdit", form_data.value);
        // formData.append("Id", `${create_item_model.value.id}`);
      } else {
        // saveAllLanguage();
        emit("submitCreate", form_data.value);
      }
      // console.log(formData);
    };
    const getImage = (file) => {
      create_item_model.value.image = file;
      // console.log(create_item_model.value.image);
      let indexOfSemiColomn = create_item_model.value.image.indexOf(",");
      let base64Afterslice = create_item_model.value.image.slice(
        Number(indexOfSemiColomn + 1)
      );
      create_item_model.value.image = base64Afterslice;
      console.log(create_item_model.value.image);
    };
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
    const saveAllLanguage = () => {
      // let arr = [];
      if (!props.propToEdit) {
        let arr = language_options.value.map((el) =>
          Object.assign({}, { languageId: el.languageId }, { name: el.name })
        );
        let index = arr.findIndex(
          (el) => el.languageId == DEFAULT_COMPANY_LANG
        );
        // GET elemet default value for user
        let element = arr[index];
        // delete it from immeditley index
        arr.splice(index, 1);
        // add it in inex 0
        arr.splice(0, 0, element);
        create_item_model.value.translation = [...arr];
      }
      allLanguage_dialog.value = false;
    };
    const addNameInAllLanguages = () => {
      if (!props.propToEdit) {
        // console.log(propToEdit.value + " ...." + "prop");
        if (!isTranslate.value) {
          language_options.value.forEach(
            (el) => (el.name = create_item_model.value.translation[0].name)
          );
          isTranslate.value = true;
        }
      }
      allLanguage_dialog.value = true;
    };
    let getProperityName = (lang) => {
      let name = language_options.value.filter((obj) => {
        // console.log(obj);
        return obj.languageId === lang.languageId;
      })[0]?.label;
      return name;
    };
    const chaneAllLanguage = () => {
      if (!props.propToEdit) {
        // console.log($q.localStorage.getItem("defLanguage"));
        if (!isTranslate.value) {
          language_options.value.forEach(
            (el) => (el.name = create_item_model.value.translation[0].name)
          );
        } else {
          let index = language_options.value.findIndex(
            (el) => el.languageId == $q.localStorage.getItem("defLanguage")
          );
          console.log(index);
          language_options.value[index].name =
            create_item_model.value.translation[0].name;
          // $q.localStorage.getItem("defLanguage")
        }
      }
    };
    const discard = () => {
      form_data.value = {
        translation: [
          {
            languageId: LocalStorage.getItem("defLanguage"),
            name: "",
          },
        ],
        phoneObj: {
          phoneNumber: "",
          // countryCode: "EG",
          countryCode: COUNTRY_CODE,
        },
        descraption: "",
        addressLine: "",
        city: "",
        postCode: "",
        regionId: "",
        countryId: "",
        image: "",
        realEstates: [],
        drawingList: [],
        longitude: 25.6242618,
        latitude: 42.3528328,

        // recurring: "",
      };
    };
    const getLocationUrl = (link) => {
      create_item_model.value.locationUrl = link;
    };
    const updateLatLon = (altlang) => {
      console.log(altlang);
      form_data.value.longitude = altlang.lng;
      form_data.value.latitude = altlang.lat;
      // console.log(obj);
    };
    const addToAttachment = (data) => {
      form_data.value.drawingList.push(data);
    };
    const shareLocation = () => {
      if (create_item_model.value.address.locationUrl == "") {
        Notify.create({
          message: `not found link to copy it`,
          color: "white",
          textColor: "red",
          classes: "notify-size",
          position: "bottom",
          timeout: 8000,
          icon: "error",
        });
      } else {
        navigator.clipboard.writeText(
          create_item_model.value.address.locationUrl
        );
        Notify.create({
          message: `Copyed`,
          color: "white",
          textColor: "green-8",
          classes: "notify-size",
          position: "bottom",
          timeout: 8000,
          icon: "content_copy",
        });
      }
    };
    onMounted(() => {
      cuntrieList();
      getLanguageOptions();
    });
    return {
      create_item_model,
      updateLatLon,
      addToAttachment,
      getLocationUrl,
      cuntrieList,
      getProperityName,
      imageModel,
      shareLocation,
      getImage,
      discard,
      getLanguageOptions,
      allLanguage_dialog,
      addNameInAllLanguages,
      submitForm,
      getRagionList,
      ragionList,
      isSelectCuntry,
      ItemTab,
      cuntriesOpstion,
      checkSelectCuntrie,
      form_data,
      $q,
      chaneAllLanguage,
      isTranslate,
      saveAllLanguage,
      language_options,
    };
  },
};
</script>

<style scoped lang="scss">
.floor-container {
  border: 1px solid #9998;
  border-radius: 8px;
  margin: 20px 5px;
}
.unit-taple {
  &__head {
    background: white;
    font-weight: 700;
    font-size: 1rem;
    padding: 20px 0;
    border-bottom: 1px solid #9b9b9b46;
    z-index: 100;
  }
  &__body {
    font-size: 1rem;
    padding: 20px 0;
    color: #676767;
    font-weight: 500;
  }
}
</style>
