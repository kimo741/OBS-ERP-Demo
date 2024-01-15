<template>
  <q-select
    :options="language_options"
    outlined
    v-model="lang"
    label="Quasar Language"
    dense
    borderless
    option-label="name"
    options-dense
    option-value="languageId"
    option-disable="translatable"
    emit-value
    map-options
    style="max-width: 200px"
  />
  <!-- option-disable="active" -->
</template>

<script>
import { useQuasar } from "quasar";
import languages from "quasar/lang/index.json";
import { ref, watch, onMounted, computed } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers("AppModule");
import { useI18n } from "vue-i18n";
import { i18n } from "src/boot/i18n";
import { DEFAULT_LANG } from "configs/language";
import { LocalStorage } from "quasar";
// const appLanguages = languages.filter((lang) =>
//   ["ar", "en-us"].includes(lang.isoName)
// );

export default {
  setup() {
    const $q = useQuasar();
    const $I18n = useI18n();
    const language_options = ref([]);
    const lang = ref($q.lang.isoName);
    // get lang lookUps
    const { getLaguages } = useActions(["getLaguages"]);

    watch(lang, (val) => {
      // console.log(language_options.value);
      // console.log(val);
      LocalStorage.set("defLanguage", val);
      // dynamic import, so loading on demand only
      if (val == 1) {
        import("quasar/lang/ar").then((lang) => {
          $q.lang.set(lang.default);
        });
        i18n.locale.value = "ar";
        // $I18n.locale = "ar";
        console.log($I18n.locale);
        // changeDEFAULT_LANG("ar");
      } else if (val == 4) {
        import("quasar/lang/en-US").then((lang) => {
          $q.lang.set(lang.default);
        });
        i18n.locale.value = "en";
        // .locale = "en-us";
        console.log($I18n.locale);
        // changeDEFAULT_LANG("en-us");
      }
      console.log(val);
    });

    const getLanguageOptions = async () => {
      try {
        let req = await getLaguages();
        language_options.value = req.data.value
          .map((el) =>
            Object.assign(
              {},
              { languageId: el.id },
              { name: el.nativeName },
              { active: el.active },
              { translatable: !el.translatable }
            )
          )
          .filter((el) => el.active);
        console.log(req.data.value);
      } catch (err) {
        console.log(err);
      }
    };
    onMounted(() => {
      getLanguageOptions();
      // if (prop.propToEdit) {
      // create_item_model.value = prop.propToEdit;
      // handelMaxRate();
      console.log("appLanguages");
      console.log(languages);

      console.log("languages");
      console.log(language_options.value);
      console.log(useI18n());

      // }
    });

    return {
      lang,
      getLanguageOptions,
      language_options,
      // changeDEFAULT_LANG,
      // langOptions,
      // appLanguages,
      // langOptions,
    };
  },
};
</script>
