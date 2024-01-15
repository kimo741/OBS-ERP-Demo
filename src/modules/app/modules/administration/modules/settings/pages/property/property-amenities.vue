<template>
  <q-page padding>
    <div class="title-page q-pa-md text-h5">
      {{ $t("app.administration.settings.amenities_types.title") }}
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
                clickable
                @click="confirmationMuliDel"
                :disable="sellected_row.length == 0"
              >
                <q-item-section>{{ $t("global.delete") }}</q-item-section>
              </q-item>
              <q-item clickable @click="exportshreet('Amenite')">
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
              {{ $t("app.administration.settings.amenities_types.title") }}
            </div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-form @submit.prevent="submitAmities">
            <q-card-section class="row justify-between items-center">
              <!-- <div class="col-4 text-body1">
              {{
                $t("app.administration.settings.amenities_types.Property_Name")
              }}
            </div> -->
              <div class="col-12 row justify-between">
                <q-input
                  v-if="!isDialogEite"
                  outlined
                  debounce="500"
                  v-model="amenityForm.name"
                  class="user-search col-12"
                  :placeholder="
                    $t(
                      'app.administration.settings.amenities_types.Property_Name'
                    )
                  "
                  @update:model-value="checkNameExist"
                  :error="isNameExist"
                  :error-message="
                    $t(
                      'app.administration.settings.amenities_types.err_msg.dublicate'
                    )
                  "
                />
                <q-input
                  v-else
                  outlined
                  debounce="500"
                  v-model="save_edit_row.name"
                  class="user-search col-12"
                  :placeholder="
                    $t(
                      'app.administration.settings.amenities_types.Property_Name'
                    )
                  "
                  :error="isNameExist"
                  :error-message="
                    $t(
                      'app.administration.settings.amenities_types.err_msg.dublicate'
                    )
                  "
                />
                <q-select
                  v-if="!isDialogEite"
                  v-model="amenityForm.rentTypes"
                  :options="rentTypesOpstions"
                  emit-value
                  clearable
                  class="col-12"
                  dense
                  map-options
                  label="Rent Types"
                ></q-select>
                <q-select
                  v-else
                  v-model="save_edit_row.rentTypes"
                  :options="rentTypesOpstions"
                  emit-value
                  class="col-12"
                  clearable
                  map-options
                  label="Rent Types"
                ></q-select>
                <!-- /////// -->
                <!-- default -->
                <!-- /////// -->

                <q-toggle
                  v-if="!isDialogEite"
                  v-model="amenityForm.isDefault"
                  label="Set as default"
                  class="col-12"
                />
                <q-toggle
                  v-else
                  v-model="save_edit_row.isDefault"
                  label="Don't set as default"
                  class="col-12"
                />
                <!-- v-show="!isDialogEite" -->
                <q-select
                  v-if="amenityForm.rentTypes == 3 && !isDialogEite"
                  v-model="amenityForm.durationTypes"
                  :options="durationTypesOpstions"
                  emit-value
                  dense
                  map-options
                  style="width: 45%"
                  class="q-mt-md"
                  label="Duration Type"
                  :rules="[(val) => val || 'Duration type Required']"
                ></q-select>
                <!-- v-show="isDialogEite" -->
                <q-select
                  v-else-if="amenityForm.rentTypes == 3 && isDialogEite"
                  style="width: 45%"
                  class="q-mt-md"
                  v-model="save_edit_row.durationTypes"
                  :options="durationTypesOpstions"
                  emit-value
                  dense
                  map-options
                  label="Duration Type"
                  :rules="[(val) => val || 'Duration type Required']"
                ></q-select>
                <!-- :rules="[(val) => val || 'Duration type Required']" -->
                <!-- ////// -->
                <!-- amount -->
                <!-- ////// -->
                <!-- v-show="!isDialogEite" -->
                <q-input
                  v-if="amenityForm.rentTypes == 3 && !isDialogEite"
                  v-model="amenityForm.amount"
                  type="number"
                  label="Rental price per m2"
                  style="width: 45%"
                  lazy-rules
                  :rules="[(val) => !!val || 'Rental price Required']"
                />
                <!-- v-show="isDialogEite" -->
                <!-- :rules="[(val) => val > 1 || 'Rental price Is Required']" -->
                <q-input
                  v-else-if="amenityForm.rentTypes == 3 && isDialogEite"
                  v-model="save_edit_row.amount"
                  type="number"
                  label="Rental price per m2"
                  style="width: 45%"
                  lazy-rules
                  :rules="[(val) => !!val || 'Rental price Required']"
                />
                <!-- :rules="[(val) => val > 1 || 'Rental price Is Required']" -->
              </div>
            </q-card-section>
            <q-card-actions class="row justify-end">
              <q-btn
                class="q-mx-sm"
                flat
                padding="10px 25px"
                size="md"
                :label="$t('global.close')"
                @click="closeAmenitieDialog"
              />
              <!-- :disable="add_model_value === '' || isNameExist" -->
              <q-btn
                v-if="!isDialogEite"
                unelevated
                style="border-radius: 10px"
                no-caps
                type="submit"
                size="md"
                padding="10px 25px"
                :label="$t('global.save')"
                outline
                color="primary"
              />
              <!-- @click="submitaddAmenity" -->
              <!-- :disable="save_edit_row.label === '' || isNameExist" -->
              <q-btn
                v-else
                unelevated
                style="border-radius: 10px"
                no-caps
                type="submit"
                size="md"
                padding="10px 25px"
                :label="$t('global.edit')"
                outline
                color="primary"
              />
              <!-- @click="submitEditRow" -->
            </q-card-actions>
          </q-form>
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
        transition-show="scale"
        transition-hide="scale"
        full-width
      >
        <importSteper
          @downloadTemplate="downloadTemplate"
          @passFileToUpload="submitImport"
          @passDataToChech="chechImportErrors"
          @closeImportDialog="import_dialog = false"
          @handleDeleteSectorImport="handleDeleteSectorImport"
          titleImport="Import Amenities"
          :chchErrorResult="chchErrorResult"
          :responsFromImport="responsFromImport"
          :checkErrPending="checkErrPending"
        />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { ref, computed, watch } from "vue";
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
  // mainDataPagination,
  add_model_value,
  checkErrPending,
  isNameExist,
  import_file,
  is_multi_del,
  import_dialog,
  responsFromImport,
  search_modal,
  pagenation_page,
  chchErrorResult,
  save_delte_row,
  save_edit_row,
  maxPages,
  sellected_row,
  amenityForm,
  isDialogEite,
  delete_dialog,
  // handelPagenation,
  create_dialog,
} from "../../composaple/requist";
import ImportSteper from "../../components/importSteper.vue";

export default {
  setup() {
    const rentTypesOpstions = ref([
      { label: "Excluded", value: 1 },
      { label: "Free", value: 2 },
      { label: "Excluded (Fixed cost)", value: 3 },
      { label: "Unavailable", value: 4 },
    ]);
    const durationTypesOpstions = ref([
      { label: "Annually", value: 1 },
      { label: "Biannual", value: 2 },
      { label: "Monthly", value: 3 },
      { label: "Quarterly", value: 4 },
      { label: "OneTime", value: 5 },
    ]);
    const { t } = useI18n(); // use as global scope
    watch(pageSize, (val) => {
      getMainData();
    });
    watch(pagenation_page, (val) => {
      getMainData();
    });
    // methods
    // const col = ref([
    //   `${t("app.administration.settings.amenities_types.col")}`,
    // ]);
    const col = computed(() => {
      return [`${t("app.administration.settings.amenities_types.col")}`];
    });
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
      is_multi_del.value = false;
      delete_dialog.value = true;
      save_delte_row.value = row;
    };
    const getRowToEdit = (row) => {
      console.log(row);
      save_edit_row.value = { ...row };
      s;
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
    const closeAmenitieDialog = () => {
      amenityForm.value = ref({
        name: "",
        isDefault: true,
        rentTypes: null,
        durationTypes: null,
        amount: null,
      });
      create_dialog.value = false;
    };
    const submitAmities = () => {
      if (isDialogEite.value) {
        return submitEditRow();
      } else {
        return submitaddAmenity();
      }
    };
    // api
    const {
      getAllAmenity,
      createAmenity,
      deleteAmenity,
      editAmenity,
      exportAmenity,
      importAmenity,
      duplicateAmenity,
      searchAmenity,
      checkAmenityNameExist,
      checkAmenityImportError,
    } = useActions([
      "getAllAmenity",
      "createAmenity",
      "deleteAmenity",
      "editAmenity",
      "exportAmenity",
      "importAmenity",
      "duplicateAmenity",
      "searchAmenity",
      "checkAmenityNameExist",
      "checkAmenityImportError",
    ]);
    const {
      getMainData,
      submitaddAmenity,
      confirmDeleteRow,
      submitEditRow,
      exportshreet,
      submitImport,
      downloadTemplate,
      duplicateItem,
      multiDelete,
      glopalSearch,
      checkNameExist,
      handleDeleteSectorImport,
      chechImportErrors,
    } = requist(
      getAllAmenity,
      createAmenity,
      editAmenity,
      deleteAmenity,
      "Amenities",
      duplicateAmenity,
      exportAmenity,
      importAmenity,
      searchAmenity,
      "TempImportLookups",
      checkAmenityNameExist,
      checkAmenityImportError
    );

    return {
      mainData,
      add_model_value,
      exportshreet,
      carteUnetCategory,
      // mainDataPagination,
      submitImport,
      closeAmenitieDialog,
      downloadTemplate,
      glopalSearch,
      import_file,
      chchErrorResult,
      responsFromImport,
      search_modal,
      maxPages,
      submitAmities,
      importshreet,
      checkErrPending,
      pageSize,
      // searchAmenity,
      // handelPagenation,
      chechImportErrors,
      submitEditRow,
      pagenation_page,
      isNameExist,
      multiDelete,
      isDialogEite,
      save_edit_row,
      amenityForm,
      import_dialog,
      is_multi_del,
      confirmationMuliDel,
      delete_dialog,
      changePageSize,
      rentTypesOpstions,
      durationTypesOpstions,
      handleDeleteSectorImport,
      getRowToEdit,
      save_delte_row,
      duplicateItem,
      getRowToDelete,
      sellected_row,
      getSellectedRow,
      submitaddAmenity,
      confirmDeleteRow,
      checkNameExist,
      create_dialog,
      privpage,
      nextpage,
      col,
    };
  },
  components: { PropTaple, ImportSteper },
};
</script>

<style lang="scss" scoped></style>

