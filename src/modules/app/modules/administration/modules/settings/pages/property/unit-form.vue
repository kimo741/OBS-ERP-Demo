<template>
  <q-page padding>
    <div class="title-page q-pa-md text-h5">Model</div>
    <!-- /////////// -->
    <!-- upper taple -->
    <!-- /////////// -->
    <div class="row q-px-md">
      <div class="col-6 q-mb-md">
        <q-btn
          @click="duplicateItem"
          outline
          class="btn-component-duplicate"
          padding="10px 25px"
          :disable="sellected_row.length < 1"
        >
          <q-icon name="img:/images/duplicate.svg" class="q-mr-sm" />
          {{ $t("global.duplicate") }}
        </q-btn>
      </div>
      <div class="col-4 q-mb-md q-px-lg">
        <q-input
          outlined
          debounce="500"
          v-model="search_modal"
          :placeholder="$t('global.search')"
          @keyup.enter="glopalSearch"
        >
          <template v-slot:append>
            <q-btn
              icon="eva-search-outline"
              class="cursor-pointer"
              flat
              :label="$t('global.search')"
              @click="glopalSearch"
              @update:model-value="glopalSearch"
            />
          </template>
        </q-input>
      </div>
      <div class="col-2 q-mb-md row flex_no_wrab">
        <!-- ////////////// -->
        <!-- creat action -->
        <!-- ////////////// -->
        <q-btn
          :label="$t('global.create')"
          class="q-ml-md col btn-2 btn-component"
          padding="10px 60px"
          unelevated
          @click="carteUnetCategory"
          no-caps
        />
        <q-btn
          text-color="grey-6"
          color="grey-7"
          size="1.3em"
          round
          flat
          class="float-right col-2"
          icon="more_vert"
        >
          <!-- //////////////// -->
          <!-- menu more option -->
          <!-- //////////////// -->
          <q-menu
            fit
            auto-close
            transition-show="jump-down"
            transition-hide="jump-up"
          >
            <q-list style="min-width: 200px">
              <q-item
                clickable
                :disable="sellected_row.length == 0"
                @click="confirmationMuliDel"
              >
                <q-item-section>{{ $t("global.delete") }}</q-item-section>
              </q-item>
              <q-item clickable @click="exportshreet('unit-form')">
                <q-item-section>{{ $t("global.export") }}</q-item-section>
              </q-item>
              <q-item clickable @click="importshreet">
                <q-item-section>{{ $t("global.import") }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </div>
    <div class="q-my-md prperty-taple">
      <PropTaple
        :column="col"
        :rows="mainData"
        :maxPages="maxPages"
        :pageSize="pageSize"
        :pagenation_page="pagenation_page"
        @passRowToDelte="getRowToDelete"
        @passRowToEdit="getRowToEdit"
        @passSellectedRow="getSellectedRow"
        @changePageSize="changePageSize"
        @privpage="privpage"
        @nextpage="nextpage"
      />
      <!-- /////// -->
      <!-- dialogs -->
      <!-- /////// -->
      <q-dialog
        v-model="create_dialog"
        persistent
        transition-show="scale"
        transition-hide="scale"
        full-width
      >
        <q-card style="width: 50% !important">
          <q-card-section
            style="background-color: #edf4fc"
            class="row items-center"
          >
            <div class="text-h6">
              {{ isDialogEite ? $t("global.edit") : $t("global.add") }}
              Model
            </div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="row justify-between items-center">
            <div v class="col-4 text-body1">Model name</div>
            <div class="col-7">
              <q-input
                v-if="!isDialogEite"
                outlined
                debounce="500"
                v-model="add_model_obj['name']"
                class="user-search"
                placeholder="Name"
                @update:model-value="checkNameExist"
                :error="isNameExist"
                error-message="this name is exist"
              />
              <q-input
                v-else
                outlined
                debounce="500"
                v-model="save_edit_row['name']"
                class="user-search"
                placeholder="Name"
                @update:model-value="checkNameExist"
                :error="isNameExist"
                error-message="this name is exist"
              />
            </div>
          </q-card-section>
          <!-- file -->
          <q-card-section class="row justify-between items-center">
            <div class="col-4 text-body1">
              {{ $t("File") }}
            </div>
            <div class="col-7 flex items-center">
              <q-file
                v-if="!isDialogEite"
                v-model="add_model_obj['file']"
                label="File"
                outlined
                counter
                max-files="1"
                style="max-width: 300px"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              <q-file
                v-else
                v-model="save_edit_row['urlFile']"
                label="File"
                :hint="save_edit_row['urlFile']"
                outlined
                counter
                max-files="1"
                style="max-width: 300px"
              >
                <template v-slot:prepend>
                  <q-icon name="attach_file" />
                </template>
              </q-file>
              <q-btn
                v-if="isDialogEite"
                class="q-mx-md"
                icon="eva-close-outline"
                color="red"
                :label="$t('app.administration.settings.policies.dell_file')"
                size="lg"
                flat
                @click="clearFileData"
              />
            </div>
          </q-card-section>
          <q-card-section class="row justify-end">
            <q-btn
              class="q-mx-sm"
              flat
              size="md"
              padding="10px 25px"
              :label="$t('global.close')"
              @click="create_dialog = false"
            />
            <q-btn
              v-if="!isDialogEite"
              unelevated
              :disable="isNameExist"
              style="border-radius: 10px"
              no-caps
              size="md"
              padding="10px 25px"
              :label="$t('global.save')"
              outline
              color="accent"
              @click="createByFormData"
            />
            <q-btn
              v-else
              unelevated
              style="border-radius: 10px"
              :disable="isNameExist"
              no-caps
              size="md"
              padding="10px 25px"
              :label="$t('global.edit')"
              outline
              color="secondary"
              @click="editByFormData"
            />
          </q-card-section>
        </q-card>
      </q-dialog>
      <!-- ///////////////////////// -->
      <!-- deilog for confirm delete -->
      <!-- ///////////////////////// -->
      <q-dialog
        v-model="delete_dialog"
        persistent
        transition-show="scale"
        transition-hide="scale"
      >
        <q-card class="full-width">
          <q-card-section
            style="background-color: #edf4fc"
            class="row items-center"
          >
            <div class="text-h5">{{ $t("global.confirm_delete") }}</div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section class="row justify-between items-center">
            <div v-if="is_multi_del" class="col text-h6">
              Are will delete selected item
            </div>
            <div v-else class="col text-h6">
              {{ $t("global.will_b_delete") }}
              <span style="font-weight: bold">{{
                " " + save_delte_row.label
              }}</span>
            </div>
          </q-card-section>
          <q-card-actions class="row justify-end">
            <q-btn
              class="q-mx-sm"
              flat
              size="md"
              padding="10px 25px"
              :label="$t('global.close')"
              @click="delete_dialog = false"
            />
            <q-btn
              v-if="is_multi_del"
              unelevated
              style="border-radius: 10px"
              no-caps
              size="md"
              padding="10px 25px"
              :label="$t('global.delete')"
              outline
              color="red-8"
              @click="multiDelete"
            />
            <q-btn
              v-else
              unelevated
              style="border-radius: 10px"
              no-caps
              size="md"
              padding="10px 25px"
              :label="$t('global.delete')"
              outline
              color="red-8"
              @click="confirmDeleteRow"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
      <!-- //////////// -->
      <!-- dialog import -->
      <!-- //////////// -->
      <q-dialog
        v-model="import_dialog"
        persistent
        full-width
        transition-show="scale"
        transition-hide="scale"
      >
        <ImportSteper
          @downloadTemplate="downloadTemplate"
          @passFileToUpload="submitImport"
          @passDataToChech="chechImportErrors"
          @closeImportDialog="import_dialog = false"
          @handleDeletecSectorImport="handleDeleteSectorImport"
          titleImport="Import Policiy"
          :chchErrorResult="chchErrorResult"
          :responsFromImport="responsFromImport"
          :checkErrPending="checkErrPending"
          :isPolicy="true"
        />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { ref, watch } from "vue";
import PropTaple from "../../components/prop-taple.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);
import { useI18n } from "vue-i18n";

import {
  requist,
  mainData,
  import_dialog,
  import_file,
  search_modal,
  pageSize,
  mainDataPagination,
  add_model_value,
  isNameExist,
  is_multi_del,
  pagenation_page,
  save_delte_row,
  save_edit_row,
  maxPages,
  sellected_row,
  isDialogEite,
  delete_dialog,
  add_model_obj,
  // handelPagenation,
  create_dialog,
  chchErrorResult,
  responsFromImport,
  checkErrPending,
} from "../../composaple/requist";
import ImportSteper from "../../components/importSteper.vue";

export default {
  setup() {
    const { t } = useI18n();
    const col = ref([
      `${t("name")}`,
      `${t("app.administration.settings.policies.col.file")}`,
    ]);
    watch(pageSize, (val) => {
      getMainData();
    });
    watch(pagenation_page, (val) => {
      getMainData();
    });
    // methods
    const privpage = () => {
      pagenation_page.value !== 1 ? pagenation_page.value-- : "";
    };
    const nextpage = () => {
      maxPages.value == pagenation_page.value ? "" : pagenation_page.value++;
    };
    // change page size
    const changePageSize = (size) => {
      pageSize.value = size;
    };
    // create prototype
    const carteUnetCategory = () => {
      isDialogEite.value = false;
      create_dialog.value = true;
      isNameExist.value = false;
      add_model_obj.value.name = "";
      add_model_obj.value.terms = "";
      add_model_obj.value.file = "";
    };
    // get sellected row from taple
    const getSellectedRow = (row) => {
      sellected_row.value = row;
    };
    const getRowToDelete = (row) => {
      delete_dialog.value = true;
      save_delte_row.value = row;
    };
    const getRowToEdit = (row) => {
      save_edit_row.value = { ...row };
      isDialogEite.value = true;
      create_dialog.value = true;
      isNameExist.value = false;
    };
    const importshreet = () => {
      import_dialog.value = true;
    };
    const clearFileData = () => {
      save_edit_row.value["urlFile"] = "";
    };
    const confirmationMuliDel = () => {
      is_multi_del.value = true;
      delete_dialog.value = true;
    };
    // api
    const {
      getUnitForm,
      createUnitForm,
      deleteUnitForm,
      updateUnitForm,
      exportUnitForm,
      importUnitForm,
      dublicateUnitForm,
      searchUnitForm,
      chackNameUnitForm,
      chechErrorsUnitForm,
    } = useActions([
      "getUnitForm",
      "createUnitForm",
      "deleteUnitForm",
      "updateUnitForm",
      "exportUnitForm",
      "importUnitForm",
      "dublicateUnitForm",
      "searchUnitForm",
      "chackNameUnitForm",
      "chechErrorsUnitForm",
    ]);
    const {
      getMainData,
      exportshreet,
      createByFormData,
      confirmDeleteRow,
      submitEditRow,
      multiDelete,
      editByFormData,
      submitImport,
      downloadTemplate,
      duplicateItem,
      glopalSearch,
      checkNameExist,
      chechImportErrors,
      handleDeleteSectorImport,
    } = requist(
      getUnitForm,
      createUnitForm,
      updateUnitForm,
      deleteUnitForm,
      "Model",
      dublicateUnitForm,
      exportUnitForm,
      importUnitForm,
      searchUnitForm,
      "Temp-RE-Policy",
      chackNameUnitForm,
      chechErrorsUnitForm
    );

    return {
      editByFormData,
      mainData,
      exportshreet,
      multiDelete,
      add_model_value,
      importshreet,
      add_model_obj,
      confirmationMuliDel,
      is_multi_del,
      submitImport,
      duplicateItem,
      clearFileData,
      carteUnetCategory,
      getMainData,
      mainDataPagination,
      handleDeleteSectorImport,
      maxPages,
      pageSize,
      // handelPagenation,
      submitEditRow,
      pagenation_page,
      isDialogEite,
      save_edit_row,
      delete_dialog,
      changePageSize,
      getRowToEdit,
      save_delte_row,
      glopalSearch,
      checkNameExist,
      search_modal,
      getRowToDelete,
      sellected_row,
      getSellectedRow,
      downloadTemplate,
      createByFormData,
      import_dialog,
      isNameExist,
      import_file,
      chechImportErrors,
      confirmDeleteRow,
      create_dialog,
      privpage,
      nextpage,
      col,
      chchErrorResult,
      responsFromImport,
      checkErrPending,
    };
  },
  components: { PropTaple, ImportSteper, ImportSteper },
};
</script>

<style lang="scss" scoped></style>

