<template>
  <!-- app.administration.settings -->
  <q-page padding>
    <div class="title-page q-pa-md text-h5">
      {{ $t("app.administration.settings.property_types.title") }}
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
          @update:model-value="glopalSearch"
          @keyup.enter="glopalSearch"
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
          @click="carteNewProtoType"
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
              <q-item clickable @click="exportshreet('property-types')">
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
      >
        <q-card class="full-width">
          <q-card-section
            style="background-color: #edf4fc"
            class="row items-center"
          >
            <div class="text-h6">
              {{ isDialogEite ? $t("global.edit") : $t("global.add") }}
              {{ $t("app.administration.settings.property_types.title") }}
            </div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>

          <q-card-section class="row justify-between items-center">
            <!-- <div class="col-4 text-body1">
              {{
                $t("app.administration.settings.property_types.Property_Name")
              }}
            </div> -->
            <div class="col-12">
              <q-input
                v-if="!isDialogEite"
                outlined
                debounce="500"
                v-model="prototyp_name"
                class="user-search"
                @update:model-value="checkNameExist"
                :placeholder="
                  $t('app.administration.settings.property_types.Property_Name')
                "
                :error="isNameExist"
                :error-message="
                  $t(
                    'app.administration.settings.property_types.err_msg.dublicate'
                  )
                "
              />
              <q-input
                v-else
                outlined
                autofocus
                debounce="500"
                v-model="save_edit_row.name"
                class="user-search"
                :placeholder="
                  $t('app.administration.settings.property_types.Property_Name')
                "
                @update:model-value="checkNameExist"
                :error="isNameExist"
                :error-message="
                  $t(
                    'app.administration.settings.property_types.err_msg.dublicate'
                  )
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
              :disable="prototyp_name === '' || isNameExist"
              unelevated
              style="border-radius: 10px"
              no-caps
              size="md"
              padding="10px 25px"
              :label="$t('global.save')"
              outline
              color="primary"
              @click="submitNewProtoType"
            />
            <q-btn
              v-else
              unelevated
              :disable="save_edit_row.name === '' || isNameExist"
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
      <!-- dialog edite -->
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
          titleImport="Import Property Type"
          :chchErrorResult="chchErrorResult"
          :responsFromImport="responsFromImport"
          :checkErrPending="checkErrPending"
        />
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import {
  computed,
  watchEffect,
  ref,
  onMounted,
  onBeforeMount,
  toRefs,
  watch,
} from "vue";
import PropTaple from "../../components/prop-taple.vue";
import { Loading, Notify } from "quasar";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);
import { useI18n } from "vue-i18n";
import { sellected_row } from "../../composaple/requist";
import ImportSteper from "../../components/importSteper.vue";
export default {
  setup() {
    // states
    const { t } = useI18n();
    const col = ref([`${t("app.administration.settings.property_types.col")}`]);
    const chchErrorResult = ref([]);
    const responsFromImport = ref([]);
    const checkErrPending = ref(false);
    const create_dialog = ref(false);
    const delete_dialog = ref(false);
    const isDialogEite = ref(false);
    const isNameExist = ref(true);
    const is_multi_del = ref(false);
    const search_modal = ref("");
    const mainData = ref([]);
    const maxPages = ref("");
    const pageSize = ref(5);
    const pagenation_page = ref(1);
    const mainDataPagination = ref([]);
    const prototyp_name = ref("");
    // const sellected_row = ref([]);
    const save_delte_row = ref("");
    const save_edit_row = ref({});
    // v-model to toggle import deialog
    const import_dialog = ref(false);
    // v-model import file
    const import_file = ref("");
    // watch
    watch(pagenation_page, (val) => {
      getMainData();
    });
    watch(pageSize, (val) => {
      getMainData();
      // handelPagenation(mainData.value, val, pagenation_page.value);
    });

    // methods
    const privpage = () => {
      pagenation_page.value !== 1 ? pagenation_page.value-- : "";
    };
    const nextpage = () => {
      maxPages.value == pagenation_page.value ? "" : pagenation_page.value++;
    };
    // const handelPagenation = async (array, page_size, page_number) => {
    //   const max_pages =
    //     page_size >= array.length ? 1 : Math.ceil(array.length / page_size);
    //   const val = array.slice(
    //     (page_number - 1) * page_size,
    //     page_number * page_size
    //   );
    //   mainDataPagination.value = val;
    //   maxPages.value = max_pages;
    //   if (mainDataPagination.value.length < 1 && page_number > 1) {
    //     // console.log(pagenation_page.value);
    //     pagenation_page.value--;
    //     // console.log(pagenation_page.value);
    //   }
    // };
    // change page size
    const changePageSize = (size) => {
      pageSize.value = size;
    };
    // create prototype
    const carteNewProtoType = () => {
      isDialogEite.value = false;
      create_dialog.value = true;
      prototyp_name.value = "";
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
      // console.log(row);
      save_edit_row.value = { name: row.label, id: row.id };
      isDialogEite.value = true;
      create_dialog.value = true;
      isNameExist.value = false;
    };
    const importshreet = () => {
      import_dialog.value = true;
    };
    // api
    const {
      getAllPropertyTypes,
      addPropertyType,
      deletePrototype,
      editPropertyType,
      exportPropertyType,
      importPropertyType,
      duplicatePropertyType,
      searchPropertyType,
      checkPropTypeNameExist,
      checkPropTypeImportError,
    } = useActions([
      "getAllPropertyTypes",
      "addPropertyType",
      "deletePrototype",
      "editPropertyType",
      "exportPropertyType",
      "duplicatePropertyType",
      "importPropertyType",
      "searchPropertyType",
      "checkPropTypeNameExist",
      "searchPropertyType",
      "checkPropTypeImportError",
    ]);
    // create prtotype
    const submitNewProtoType = () => {
      Loading.show();
      addPropertyType({ name: prototyp_name.value })
        .then((res) => {
          Loading.hide();
          getMainData();
          create_dialog.value = false;
          Notify.create({
            message: `success create prototype name ${prototyp_name.value}`,
            color: "white",
            textColor: "green",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
          });
        })
        .catch((_error) => {
          Loading.hide();
          Notify.create({
            message: _error.response
              ? _error.response.data.errorMessage
              : _error.message,
            color: "white",
            textColor: "red",
            position: "bottom",
            timeout: 8000,
            classes: "notify-size",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    };
    // get main data
    const getMainData = () => {
      Loading.show();
      getAllPropertyTypes({ page: pagenation_page.value, size: pageSize.value })
        .then((res) => {
          maxPages.value = res.value.totalPages + 1;
          mainData.value = res.value.list;

          // handelPagenation(res.value, pageSize.value, pagenation_page.value);
          Loading.hide();
        })
        .catch((_error) => {
          Loading.hide();
          Notify.create({
            message: _error.response
              ? _error.response.data.errorMessage
              : _error.message,
            color: "white",
            textColor: "red",
            position: "bottom",
            timeout: 8000,
            classes: "notify-size",
          });
        })
        .finally(() => {
          Loading.hide();
        });
    };
    // req delete prototypes
    const confirmDeleteRow = () => {
      Loading.show();
      deletePrototype(save_delte_row.value.id)
        .then((res) => {
          Loading.hide();
          getMainData();
          delete_dialog.value = false;
          Notify.create({
            message: `success delete prototype name ${save_delte_row.value["name"]}`,
            color: "white",
            textColor: "green",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
          });
        })
        .catch((_error) => {
          Loading.hide();
          Notify.create({
            message: _error.response
              ? _error.response.data.errorMessage
              : _error.message,
            color: "white",
            textColor: "red",
            position: "bottom",
            timeout: 8000,
            classes: "notify-size",
          });
        });
    };

    // req edit prototypes
    const submitEditRow = () => {
      Loading.show();
      const row = save_edit_row.value;
      let handel_row = Object.assign(
        {},
        { id: row.id },
        { name: row.label ? row.label : row.name }
      );
      console.log(handel_row);
      editPropertyType(handel_row)
        .then((res) => {
          create_dialog.value = false;
          Loading.hide();
          getMainData();
          Notify.create({
            message: `success edit prototype name to " ${
              row.label ? row.label : row.name
            } "`,
            color: "white",
            textColor: "green",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
          });
        })
        .catch((_error) => {
          Loading.hide();
          Notify.create({
            message: _error.response
              ? _error.response.data.errorMessage
              : _error.message,
            color: "white",
            textColor: "red",
            position: "bottom",
            timeout: 8000,
            classes: "notify-size",
          });
        });
    };
    const exportshreet = (title) => {
      Loading.show();
      exportPropertyType()
        .then((res) => {
          Loading.hide();
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${title}.xlsx`);
          document.body.appendChild(link);
          link.click();
          Notify.create({
            message: `success export ${title}`,
            color: "white",
            textColor: "green",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
          });
        })
        .catch((_error) => {
          Loading.hide();
          Notify.create({
            message: _error.response
              ? _error.response.data.errorMessage
              : _error.message,
            color: "white",
            textColor: "red",
            position: "bottom",
            timeout: 8000,
            classes: "notify-size",
          });
        });
    };
    const duplicateItem = () => {
      Loading.show();
      let val = sellected_row.value;
      duplicatePropertyType(val)
        .then((res) => {
          create_dialog.value = false;
          Loading.hide();
          getMainData();
          sellected_row.value = [];
          Notify.create({
            message: `success duplicated `,
            color: "white",
            textColor: "green",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
          });
        })
        .catch((_error) => {
          Loading.hide();
          Notify.create({
            message: _error.response
              ? _error.response.data.errorMessage
              : _error.message,
            color: "white",
            textColor: "red",
            position: "bottom",
            timeout: 8000,
            classes: "notify-size",
          });
        });
    };
    const submitImport = (file) => {
      Loading.show();
      const allwoedType = [
        "application/xlsx",
        " application/vnd.ms-excel",
        "application/xlsm",
        "application/xlsb",
        "application/xltx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (allwoedType.indexOf(file.type) !== -1) {
        let ImportformData = new FormData();
        ImportformData.append("File", file);
        Loading.show();
        importPropertyType(ImportformData)
          .then((res) => {
            Loading.hide();
            if (res.data.value === true || res.data.value === null) {
              chchErrorResult.value = true;
            } else {
              responsFromImport.value = res.data;
              chchErrorResult.value = false;
              console.log(res.data?.value);
            }
          })
          .catch((_error) => {
            Loading.hide();
            console.log(_error);
            Notify.create({
              message: _error.data.errorMessage
                ? _error.data.errorMessage
                : _error.data,
              ...errOptions,
            });
          });
      } else {
        Notify.create({
          message: `${t(
            "app.administration.charts.chartsProperty.notify_messages.import_validation"
          )} ${file.type}  `,
          ...errOptions,
        }).finally(() => {
          Loading.hide();
        });
      }
    };
    // multi dell
    const multiDelete = () => {
      Loading.show();
      let getId = sellected_row.value.map(({ id }) => id);
      deletePrototype(getId)
        .then((res) => {
          Loading.hide();
          getMainData();
          sellected_row.value = [];
          Notify.create({
            message: `success delte row `,
            color: "white",
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
            color: "white",
            textColor: "red",
            position: "bottom",
            timeout: 8000,
            classes: "notify-size",
          });
        });
    };
    const chechImportErrors = (data) => {
      checkErrPending.value = true;
      let clearErrors = data;
      for (let i = 0; i < clearErrors.length; i++) {
        clearErrors[i].errors = [];
        // clearErrors[i].creationType =2;
      }
      console.log(clearErrors);
      Loading.show();
      checkPropTypeImportError({ dataList: clearErrors })
        .then((res) => {
          checkErrPending.value = false;
          if (res.data.value === true || res.data.value === null) {
            chchErrorResult.value = true;
          } else {
            responsFromImport.value = res.data?.value;
            chchErrorResult.value = false;
          }
          console.log(res);
          getMainData();
          Loading.hide();
        })
        .catch((_error) => {
          checkErrPending.value = false;
          Loading.hide();
          console.log(_error);
          Notify.create({
            message: _error.data.errorMessage
              ? _error.data.errorMessage
              : _error.data,
            ...errOptions,
          });
        })
        .finally(() => {
          checkErrPending.value = false;
          Loading.hide();
        });
    };
    // search
    const glopalSearch = () => {
      if (search_modal.value === "") {
        getMainData();
      } else {
        Loading.show();
        searchPropertyType(search_modal.value)
          .then((res) => {
            mainData.value = res.value;
            // handelPagenation(res.value, pageSize.value, pagenation_page.value);
            Loading.hide();
          })
          .catch((_error) => {
            Loading.hide();
            Notify.create({
              message: _error.data.errorMessage
                ? _error.data.errorMessage
                : _error.data,
              color: "white",
              textColor: "red",
              position: "bottom",
              timeout: 8000,
              classes: "notify-size",
            });
          })
          .finally(() => {
            Loading.hide();
          });
      }
    };
    const confirmationMuliDel = () => {
      is_multi_del.value = true;
      delete_dialog.value = true;
    };
    const checkNameExist = (val) => {
      checkPropTypeNameExist(val)
        .then((res) => {
          isNameExist.value = res.data.value;
          console.log(res.data.value);
        })
        .catch((_error) => {
          isNameExist.value = _error.data.value;
        });
    };
    // download template to import data by exel sheet
    const downloadTemplate = () => {
      window.open(
        `https://obs-api-beta.azurewebsites.net/Templates/Import/TempImportLookups.xlsx`
      );
    };
    const handleDeleteSectorImport = (row) => {
      const index = responsFromImport.value.findIndex(
        (el) => el.name == row.name
      );
      responsFromImport.value.splice(index, 1);
    };
    // onBeforeMount
    onBeforeMount(() => {
      getMainData();
    });
    return {
      mainData,
      multiDelete,
      handleDeleteSectorImport,
      exportshreet,
      checkNameExist,
      glopalSearch,
      is_multi_del,
      search_modal,
      confirmationMuliDel,
      downloadTemplate,
      isNameExist,
      submitImport,
      duplicateItem,
      prototyp_name,
      import_file,
      carteNewProtoType,
      import_dialog,
      mainDataPagination,
      maxPages,
      importshreet,
      chechImportErrors,
      pageSize,
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
      submitNewProtoType,
      checkErrPending,
      chchErrorResult,
      confirmDeleteRow,
      create_dialog,
      privpage,
      nextpage,
      responsFromImport,
      col,
      row: ref([
        {
          id: "1",
          name: "aas223",
          file_link: "url sdsad",
        },
        {
          id: "2",
          name: "aasqwe",
          file_link: "url sdsad",
        },
        {
          id: "3",
          name: "aasasda",
          file_link: "url sdsad",
        },
        {
          id: "4",
          name: "asdas",
          file_link: "url sdsad",
        },
      ]),
    };
  },
  components: { PropTaple, ImportSteper },
};
</script>

<style lang="scss" scoped></style>

