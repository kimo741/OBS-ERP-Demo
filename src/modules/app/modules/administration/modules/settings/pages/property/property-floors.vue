<template>
  <q-page padding>
    <div class="title-page q-pa-md text-h5">
      {{ $t("app.administration.settings.floors.title") }}
    </div>
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
          class="user-search"
          :placeholder="$t('global.search')"
          @keyup.enter="glopalSearch"
          @update:model-value="glopalSearch"
        >
          <template v-slot:append>
            <q-btn
              icon="eva-search-outline"
              class="cursor-pointer"
              flat
              :label="$t('global.search')"
              @click="glopalSearch"
            />
          </template>
        </q-input>
      </div>
      <div class="col-2 q-mb-md row" style="flex-wrap: nowrap">
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
                @click="multiDelete"
                clickable
                :disable="sellected_row.length == 0"
              >
                <q-item-section>{{ $t("global.delete") }}</q-item-section>
              </q-item>
              <q-item clickable @click="exportshreet('Floors')">
                <q-item-section>{{ $t("global.export") }}</q-item-section>
              </q-item>
              <q-item clickable>
                <q-item-section @click="importshreet">{{
                  $t("global.import")
                }}</q-item-section>
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
      >
        <q-card class="full-width">
          <q-card-section
            style="background-color: #edf4fc"
            class="row items-center"
          >
            <div class="text-h6">
              {{ isDialogEite ? $t("global.edit") : $t("global.add") }}
              {{ $t("app.administration.settings.floors.title") }}
            </div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="row justify-between items-center">
            <!-- <div class="col-4 text-body1">
              {{ $t("app.administration.settings.floors.Property_Name") }}
            </div> -->
            <div class="col">
              <q-input
                v-if="!isDialogEite"
                outlined
                debounce="500"
                v-model="add_model_value"
                class="user-search"
                :placeholder="
                  $t('app.administration.settings.floors.Property_Name')
                "
                @update:model-value="checkNameExist"
                :error="isNameExist"
                :error-message="
                  $t('app.administration.settings.floors.err_msg.dublicate')
                "
              />
              <q-input
                v-else
                outlined
                debounce="500"
                v-model="save_edit_row.label"
                class="user-search"
                :placeholder="$t('app.administration.settings.floors.title')"
                @update:model-value="checkNameExist"
                :error="isNameExist"
                :error-message="
                  $t('app.administration.settings.floors.err_msg.dublicate')
                "
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
              style="border-radius: 10px"
              no-caps
              size="md"
              padding="10px 25px"
              :label="$t('global.save')"
              outline
              color="primary"
              @click="submitaddRequist"
              :disable="add_model_value === '' || isNameExist"
            />
            <!-- !add_model_value.length || -->
            <q-btn
              v-else
              unelevated
              :disable="save_edit_row.label === '' || isNameExist"
              style="border-radius: 10px"
              no-caps
              size="md"
              padding="10px 25px"
              :label="$t('global.edit')"
              outline
              color="primary"
              @click="submitEditRow"
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
              @click="confirmationMuliDel"
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
          @handleDeleteSectorImport="handleDeleteSectorImport"
          titleImport="Import Floors"
          :chchErrorResult="chchErrorResult"
          :responsFromImport="responsFromImport"
          :checkErrPending="checkErrPending"
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
  pageSize,
  import_dialog,
  isNameExist,
  import_file,
  mainDataPagination,
  add_model_value,
  search_modal,
  pagenation_page,
  is_multi_del,
  save_delte_row,
  save_edit_row,
  maxPages,
  sellected_row,
  isDialogEite,
  delete_dialog,
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
    const col = ref([`${t("app.administration.settings.floors.col")}`]);
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
      add_model_value.value = "";
      isNameExist.value = false;
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
    const confirmationMuliDel = () => {
      is_multi_del.value = true;
      delete_dialog.value = true;
    };
    // api
    const {
      getAllFloors,
      createFloors,
      deleteFloor,
      editFloor,
      duplicateFloor,
      exportFloors,
      importFloors,
      searchFloors,
      checkFloorNameExist,
      checkFloorimportError,
    } = useActions([
      "getAllFloors",
      "createFloors",
      "deleteFloor",
      "editFloor",
      "duplicateFloor",
      "exportFloors",
      "importFloors",
      "searchFloors",
      "checkFloorNameExist",
      "checkFloorimportError",
    ]);
    const {
      getMainData,
      submitaddRequist,
      confirmDeleteRow,
      submitEditRow,
      duplicateItem,
      exportshreet,
      submitImport,
      downloadTemplate,
      multiDelete,
      glopalSearch,
      checkNameExist,
      chechImportErrors,
      handleDeleteSectorImport,
    } = requist(
      getAllFloors,
      createFloors,
      editFloor,
      deleteFloor,
      "Floor",
      duplicateFloor,
      exportFloors,
      importFloors,
      searchFloors,
      "TempImportLookups",
      checkFloorNameExist,
      checkFloorimportError
    );

    return {
      mainData,
      exportshreet,
      add_model_value,
      multiDelete,
      carteUnetCategory,
      mainDataPagination,
      maxPages,
      importshreet,
      duplicateItem,
      import_dialog,
      handleDeleteSectorImport,
      import_file,
      confirmationMuliDel,
      pageSize,
      submitImport,
      downloadTemplate,
      isNameExist,
      // handelPagenation,
      submitEditRow,
      pagenation_page,
      isDialogEite,
      save_edit_row,
      delete_dialog,
      changePageSize,
      getRowToEdit,
      save_delte_row,
      getRowToDelete,
      sellected_row,
      getSellectedRow,
      submitaddRequist,
      is_multi_del,
      checkNameExist,
      confirmDeleteRow,
      create_dialog,
      getMainData,
      privpage,
      glopalSearch,
      nextpage,
      search_modal,
      col,
      chchErrorResult,
      responsFromImport,
      chechImportErrors,
      checkErrPending,
    };
  },
  components: { PropTaple, ImportSteper },
};
</script>

<style lang="scss" scoped></style>

