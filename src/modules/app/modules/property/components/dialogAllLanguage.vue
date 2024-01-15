<template>
  <!-- :readonly="is_review_from_card" -->
  <q-input
    type="text"
    v-model="localInput"
    :label="$t('global.name')"
    :rules="[(val) => val !== '' || 'Property Name Id Is Required']"
    @update:model-value="chaneAllLanguage"
    @blur="addNameInAllLanguages"
    :readonly="is_review"
  >
    <!-- @input="$emit('update:modelInput', $event.target.value)" -->
    <!-- @input="chaneAllLanguage" -->
    <!-- @input="chaneAllLanguage" -->
    <!-- @update:model-value="chaneAllLanguage" -->
    <!-- :rules="[
                    (val) => val.length || 'Property Name Id Is Required',
                  ]" -->
    <template v-slot:append>
      <q-btn icon="eva-globe-outline" @click="showLangDialog" />
    </template>
  </q-input>
  <!-- DIALOG -->
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
            :readonly="is_review || lang.translatable"
          />
          <!-- </div> -->
        </div>
      </q-card-section>
      <q-card-actions
        style="position: sticky; bottom: 0; background-color: white"
        align="right"
        class="row"
      >
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
</template>

<script>
import { Notify, Loading, Dialog } from "quasar";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { DEFAULT_COMPANY_LANG, COUNTRY_CODE } from "src/configs/language.js";
const { useActions: labguage } = createNamespacedHelpers("AppModule");
import { computed, onBeforeMount, onMounted, ref } from "vue";
import { LocalStorage } from "quasar";
// [
//   id:"1"
//   name :sds
// ]
export default {
  props: {
    titele: {
      type: String,
      default: "Name in all languages",
    },
    modelInput: {
      type: String,
      default: "",
    },
    modelLanguages: {
      type: Array,
      default: () => [],
    },
    propToEdit: {
      type: Boolean,
      default: false,
    },
    is_review: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelInput", "update:modelLanguages"],
  setup(props, { emit }) {
    // const localInput = ref("");
    // const $q = useQuasar();

    const localInput = computed({
      get() {
        return props.modelInput;
      },
      // setter
      set(newValue) {
        return emit("update:modelInput", newValue);
      },
    });
    const allLanguage_dialog = ref(false);
    const language_options = ref([]);
    const isTranslate = ref(false);
    const { getLaguages } = labguage(["getLaguages"]);
    const getLanguageOptions = async () => {
      Loading.show();
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
        Loading.hide();
      } catch (err) {
        Notify.create({
          message: err.erro,
        });
        Loading.hide();
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
        emit("update:modelLanguages", [...arr]);
        console.log([...arr]);
      }
      // allLanguage_dialog.value = false;
    };
    const showLangDialog = () => {
      addNameInAllLanguages();
      allLanguage_dialog.value = true;
    };
    const addNameInAllLanguages = () => {
      if (!props.propToEdit) {
        if (!isTranslate.value) {
          language_options.value.forEach((el) => (el.name = localInput.value));
        }
        if (localInput.value !== "") {
          isTranslate.value = true;
        }
      }
      saveAllLanguage();
    };
    let getProperityName = (lang) => {
      let name = language_options.value.filter((obj) => {
        // console.log(obj);
        return obj.languageId === lang.languageId;
      })[0]?.label;
      return name;
    };
    const chaneAllLanguage = (value) => {
      // console.log(props.modelLanguages);
      // console.log(props.modelInput);
      // emit("update:modelInput", localInput.value);
      if (!props.propToEdit) {
        // console.log($q.localStorage.getItem("defLanguage"));
        if (!isTranslate.value) {
          language_options.value.forEach((el) => (el.name = localInput.value));
          // console.log("!props.propToEdit");
        } else {
          let index = language_options.value.findIndex(
            (el) => el.languageId == LocalStorage.getItem("defLanguage")
          );
          // console.log(LocalStorage.getItem("defLanguage"));
          language_options.value[index].name = localInput.value;

          console.log("else");
        }
      } else {
        let index = language_options.value.findIndex(
          (el) => el.languageId == LocalStorage.getItem("defLanguage")
        );
        console.log("else");

        console.log(index);
        language_options.value[index].name = localInput.value;
      }
      // isTranslate.value = true;
      // emit("update:modelLanguages", language_options.value);
    };
    // const updateDefaultLang = (value) => {
    //   console.log(value);
    //   let oldLang = [...props.nameInLangs];
    //   let oldLangAfterUpdate = (oldLang[0].name = defaultName.value);
    //   emit("update:nameInLangs", [...oldLangAfterUpdate]);
    // };
    onBeforeMount(() => {
      getLanguageOptions();
    });
    return {
      getLanguageOptions,
      saveAllLanguage,
      addNameInAllLanguages,
      getProperityName,
      showLangDialog,
      language_options,
      allLanguage_dialog,
      chaneAllLanguage,
      // defaultName,
      localInput,
      // updateDefaultLang,
    };
  },
};
</script>

<style>
</style>
