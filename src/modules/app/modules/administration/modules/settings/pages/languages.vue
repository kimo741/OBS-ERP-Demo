<template>
  <q-page padding>
    <obs-table
      :title="$t('app.administration.settings.languages.languages')"
      row-key="id"
      :searchable="false"
      :duplicate="false"
      :defaultCreate="false"
      tableheight="100vh"
      :userAdd="false"
      action="AppModule/AdministrationModule/SettingsModule/getLanguages"
      :columns="[
        {
          name: 'id',
          label: '#',
          field: 'id',
          align: 'left',
          headerClasses: 'text-uppercase',
          // style: 'width: 200px',
          headerStyle: 'width: 5%',
        },
        {
          // sortable: true,
          name: 'nativeName',
          label: $t('app.administration.settings.languages.languages'),
          field: 'nativeName',
          align: 'left',
          headerClasses: 'text-uppercase',
          // style: 'width: 200px',
          headerStyle: 'width:20%',
        },
        {
          name: 'isoName',
          label: $t('app.administration.settings.languages.isoCode'),
          align: 'left',
          field: 'isoName',
          headerClasses: 'text-uppercase',
          // style: 'width: 200px',
          headerStyle: 'width: 20% ; text-align: left ',
          style: 'text-align: left !important',
        },
        {
          name: 'direction',
          label: $t('app.administration.settings.languages.direction'),
          align: 'center',
          field: 'rtl',
          headerClasses: 'text-uppercase',
          headerStyle: 'width: 20% ; text-align: left ',
          style: 'text-align: left !important',
        },
        {
          name: 'translatable',
          label: $t('app.administration.settings.languages.translatable'),
          align: 'center',
          sortable: true,
          field: 'translatable',
          headerClasses: 'text-uppercase',
          headerStyle: 'width: 10%  ; text-align: center ',
          // style: 'text-align: center !important',
        },
        {
          name: 'active',
          sortable: true,
          label: $t('app.administration.settings.languages.active'),
          align: 'center',
          field: 'active',
          headerClasses: 'text-uppercase',
          headerStyle: 'width: 13% ; text-align: center',
          // style: 'text-align: center !important',
        },
      ]"
    >
      <template #cell-rowIndex="item">
        {{ item.rowIndex + 1 }}
      </template>
      <template #cell-direction="item">
        {{
          item.row.rtl
            ? $t("app.administration.settings.languages.rtl")
            : $t("app.administration.settings.languages.ltr")
        }}
      </template>
      <template
        #cell-translatable="item"
        class="flex justify-center text-center"
        style="text-align: center !important"
      >
        <q-toggle
          v-model="item.row.translatable"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
          :disable="!item.row.active"
          @update:model-value="toggleIsTranslatable(item.row)"
        />
      </template>
      <template
        #cell-active="item"
        class="flex justify-start"
        style="text-align: left !important"
      >
        <q-toggle
          v-model="item.row.active"
          checked-icon="check"
          color="green"
          unchecked-icon="clear"
          @click="toggleIsActive(item)"
        />
      </template>
    </obs-table>
  </q-page>
</template>
<script>
import { Loading, Notify } from "quasar";
import { useI18n } from "vue-i18n";
import { createNamespacedHelpers } from "vuex-composition-helpers";

const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);

export default {
  setup() {
    const { toggleIsLanguageActive, updateTranslatable } = useActions([
      "toggleIsLanguageActive",
      "updateTranslatable",
    ]);
    const i18n = useI18n();

    const toggleIsTranslatable = (row) => {
      updateTranslatable({ id: row.id })
        .then(() => {})
        .catch((error) => {
          row.translatable = !row.translatable;
          Notify.create({
            message: error.response
              ? error.response.data.errorMessage
              : error.message,
            color: "red",
            position: "top",
          });
        });
    };

    const toggleIsActive = (item) => {
      // don't toggle active if it is the app language
      if (
        i18n.locale.value == item.row.isoCode ||
        (i18n.locale.value == "en-US" && item.row.isoCode == "en")
      ) {
        item.row.active = !item.row.active;
        Notify.create({
          message: i18n.t("app.administration.settings.languages.errActiveMsg"),
          color: "red",
          position: "top",
        });
      } else {
        toggleIsLanguageActive({ id: item.row.id }).catch((error) => {
          item.row.active = !item.row.active;
          Notify.create({
            message: error.response
              ? error.response.data.errorMessage
              : error.message,
            color: "red",
            position: "top",
          });
        });
      }
    };

    return {
      toggleIsTranslatable,
      toggleIsActive,
    };
  },
};
</script>
<style scoped>
/* .dsd{
  text-align: left;
} */
</style>
