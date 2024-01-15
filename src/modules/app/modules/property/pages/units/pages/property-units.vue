<template>
  <q-page>
    <!-- <GeneratePdf /> -->
    <FilterBar @SubmitFilter="submitFilterUnit" />
    <!-- /////////// -->
    <!-- upper taple -->
    <!-- /////////// -->
    <q-card class="taple-container">
      <q-card-section class="row">
        <div class="col-6 q-mb-md">
          <q-btn
            @click="duplicateItem"
            outline
            class="btn-component-duplicate"
            padding="10px 25px"
            :disable="sellected_row.length !== 1"
          >
            <q-icon name="img:/images/duplicate.svg" class="q-mr-sm" />
            {{ $t("app.administration.settings.duplicate") }}
          </q-btn>
        </div>
        <!-- {{ unitForm }} -->
        <div class="col-4 q-mb-md q-px-lg">
          <!-- <q-input
          outlined
          debounce="500"
          v-model="search_modal"
          class="user-search"
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
            />
          </template>
        </q-input> -->
        </div>
        <div class="col-2 q-mb-md row" style="flex-wrap: nowrap">
          <!-- ////////////// -->
          <!-- creat action -->
          <!-- ////////////// -->
          <q-btn
            :label="$t('app.administration.settings.create')"
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
                  @click="multiDelete"
                  :disable="sellected_row.length == 0"
                >
                  <q-item-section>{{ $t("global.delete") }}</q-item-section>
                </q-item>
                <q-item clickable @click="exportshreet('Units')">
                  <q-item-section>{{ $t("global.export") }}</q-item-section>
                </q-item>
                <q-item clickable @click="importshreet">
                  <q-item-section>{{ $t("global.import") }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-card-section>
      <q-card-section class="q-my-md prperty-taple">
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
        <!-- create -->
        <q-dialog
          v-model="create_dialog"
          persistent
          transition-show="scale"
          transition-hide="scale"
          full-width
          full-height
        >
          <create-dialog
            :propToEdit="isDialogEite"
            @submitCreate="submitForm"
            @closeDialog="create_dialog = false"
          />
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
          full-height
          full-width
          transition-show="scale"
          transition-hide="scale"
        >
          <importUnits
            @downloadTemplate="downloadUnitTemplate('unit_template')"
            @passFileToUpload="importUnits"
            @passDataToChech="chechImportError"
            @closeImportDialog="import_dialog = false"
            @handleDeleteSectorImport="handleDeleteSectorImport"
            :chchErrorResult="chchErrorResult"
            :responsFromImport="responsFromImport"
            :prpertyOptionsNo="prpertyOptionsNo"
            :prpertyOptions="prpertyOptions"
            :mainGroupNumberVal="mainGroupNumberVal"
          />
        </q-dialog>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import { ref, onBeforeMount, watch, computed } from "vue";
import createDialog from "../components/create-dialog";
import { Loading, Notify } from "quasar";
// import {unitForm} from "../components"
import { COUNTRY_CODE } from "src/configs/language.js";
import PropTaple from "src/modules/app/modules/administration/modules/settings/components/units-taple.vue";
import ImportUnits from "src/modules/app/modules/administration/modules/settings/components/importUnits.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);
const { useActions: propertyAction } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
import { LocalStorage } from "quasar";
import { unitForm } from "../components/create-dialog/form/unit-model-form.js";
import { useI18n } from "vue-i18n";
import {
  // unitForm,
  requist,
  mainData,
  pageSize,
  mainDataPagination,
  import_dialog,
  is_multi_del,
  search_modal,
  import_file,
  add_model_value,
  pagenation_page,
  save_delte_row,
  // create_unit_scima,
  save_edit_row,
  maxPages,
  sellected_row,
  isDialogEite,
  delete_dialog,
  // handelPagenation,
  create_dialog,
} from "../composaple/requist";
// import { sellected_row } from "src/modules/app/modules/administration/modules/settings/composaple/requist";
import FilterBar from "../components/filter-bar.vue";
// import GeneratePdf from "../../../components/generate-pdf.vue";
export default {
  setup() {
    // status
    const { t } = useI18n();
    // let col = [
    //   `${t("app.administration.settings.property_unit.col.name")}`,
    //   `${t("app.administration.settings.property_unit.col.status")}`,
    // ];
    const col = computed(() => {
      return [
        `${t("app.administration.settings.property_unit.col.name")}`,
        `${t("app.administration.settings.property_unit.col.status")}`,
      ];
    });
    watch(pageSize, (val) => {
      getMainData();
    });
    watch(pagenation_page, (val) => {
      getMainData();
    });
    const propToEdit = ref(false);
    const imageFile = ref("");
    const responsFromImport = ref([]);
    const prpertyOptions = ref([]);
    const prpertyOptionsNo = ref([]);
    const combany_options = ref([]);
    const chchErrorResult = ref([]);
    const avilableShipRat = ref(100);
    const mainGroupNumberVal = ref(100);
    const isAvilableRat = ref(false);
    const unit_type_option = ref([]);
    const unit_category_option = ref([]);
    const amenity_option = ref([]);
    const blocks_option = ref([]);
    const floors_option = ref([]);
    const owners_option = ref([]);
    // const Amenity_option = ref([]);
    // watch
    // watch(pagenation_page, (val) => {
    //   // handelPagenation(mainData.value, pageSize.value, val);
    // });
    // watch(pageSize, (val) => {
    //   // handelPagenation(mainData.value, val, pagenation_page.value);
    // });
    // methods
    const updateSizeFoot = () => {
      let objectModal = unitForm.value;
      objectModal.sizeMater = (objectModal.sizeFoot * 3.28).toFixed(0);
    };
    const updateSizeMeter = () => {
      let objectModal = unitForm.value;
      objectModal.sizeFoot = (objectModal.sizeMater / 3.28).toFixed(0);
    };
    // privpage button in pagenation
    const privpage = () => {
      pagenation_page.value !== 1 ? pagenation_page.value-- : "";
    };
    // next button in pagenation
    const nextpage = () => {
      maxPages.value == pagenation_page.value ? "" : pagenation_page.value++;
    };
    // change page size
    const changePageSize = (size) => {
      pageSize.value = size;
    };
    // create prototype
    const carteUnetCategory = () => {
      let scima = {
        realEstateId: null,
        description: "",
        actionsTypes: "1",
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
        owners: [],
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
        attachments: [],
        unitPhotos: [],
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
        calculateAmenitiesUnit: [],
      };
      unitForm.value = scima;
      isDialogEite.value = false;
      create_dialog.value = true;
    };
    // get sellected row from taple
    const getSellectedRow = (row) => {
      sellected_row.value = row;
    };
    const getRowToDelete = (row) => {
      delete_dialog.value = true;
      save_delte_row.value = row;
    };
    const getRowToEdit = async (row) => {
      isDialogEite.value = true;
      Loading.show();
      let ownderScima = [
        {
          vendorId: null,
          ownerShipRate: null,
        },
      ];
      let contentScima = {
        name: "",
        jopPostition: "",
        idType: "",
        companyId: null,
        idNo: "",
        phoneObj: { phoneNumber: "", countryCode: COUNTRY_CODE },
        email: "",
      };
      let attachmentScima = [
        {
          url: "",
          fileName: "",
        },
      ];
      let checkData;
      try {
        let req = await getUnitDetails(row.id);
        checkData = await req.value;
        Loading.hide();
        if (checkData.contact === null) {
          checkData.contact = contentScima;
        }
        if (checkData.contact.phoneObj === null) {
          checkData.contact.phoneObj = {
            phoneNumber: "",
            countryCode: COUNTRY_CODE,
          };
        }
        if (
          checkData.attachments === null ||
          checkData.attachments.length < 1
        ) {
          checkData.attachments = attachmentScima;
        }
        if (checkData.owners === null || checkData.owners.length < 1) {
          checkData.owners = ownderScima;
        }
        unitForm.value = await checkData;
        isDialogEite.value = true;
        create_dialog.value = true;
      } catch (_error) {
        Loading.hide();

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
      }
    };
    const importshreet = () => {
      import_dialog.value = true;
    };
    const handleDeleteSectorImport = (row) => {
      const index = responsFromImport.value.findIndex((el) => el == row);
      responsFromImport.value.splice(index, 1);
    };
    // api
    const {
      getAllUnits,
      createUnit,
      editUnit,
      deleteUnit,
      exportUnit,
      duplicateUnit,
      importUnit,
      searchUnit,
      getUnitDetails,
      chechImportErrors,
      dropdownListMainGroups,
      downloadUnitsTemplate,
      getFiltterUnits,
    } = useActions([
      "getAllUnits",
      "createUnit",
      "editUnit",
      "deleteUnit",
      "exportUnit",
      "duplicateUnit",
      "importUnit",
      "searchUnit",
      "getUnitDetails",
      "chechImportErrors",
      "dropdownListMainGroups",
      "downloadUnitsTemplate",
      "getFiltterUnits",
    ]);
    //
    // prop action
    const {
      unitType,
      unitCategory,
      getFloorList,
      getBlockList,
      getAmenityList,
      getVendorsList,
      getMainGroupById,
      getCompanyList,
      getPropertyList,
    } = propertyAction([
      "unitType",
      "unitCategory",
      "getFloorList",
      "getBlockList",
      "getAmenityList",
      "getVendorsList",
      "getMainGroupById",
      "getCompanyList",
      "getPropertyList",
    ]);
    // //////////////
    // dropDown lists
    /////////////////
    //  unit type
    const getunitTypes = () => {
      unitType()
        .then((res) => {
          unit_type_option.value = res.data.value;
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
    const downloadUnitTemplate = (title) => {
      Loading.show();
      downloadUnitsTemplate()
        .then((res) => res.blob())
        .then((res) => {
          Loading.hide();
          const url = window.URL.createObjectURL(new Blob([res.data]));
          console.log(url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `${title}.xlsx`);
          document.body.appendChild(link);
          link.click();
          Notify.create({
            message: `success export ${title}`,
          });
        })
        .catch((_error) => {
          Loading.hide();
          Notify.create({
            message: _error.data.errorMessage
              ? _error.data.errorMessage
              : _error.data,
            color: "red",
          });
        });
    };
    //  unit type
    const getunitCategory = () => {
      unitCategory()
        .then((res) => {
          unit_category_option.value = res.data.value;
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
    const {
      getMainData,
      duplicateItem,
      submitaddUnit,
      confirmDeleteRow,
      exportshreet,
      multiDelete,
      // submitImport,
      glopalSearch,
      downloadTemplate,
      submitFilterUnit,
    } = requist(
      getAllUnits, //done
      createUnit,
      editUnit,
      deleteUnit,
      "Unit",
      duplicateUnit,
      exportUnit,
      importUnit,
      searchUnit,
      "RE-UnitsTemplate",
      "",
      "",
      getFiltterUnits
    );
    // get floors dropdown
    const getfloorsOptions = () => {
      getFloorList()
        .then((res) => {
          floors_option.value = res.data.value;
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
    // get blocks dropdown
    const getBlocksOptions = () => {
      getBlockList()
        .then((res) => {
          blocks_option.value = res.data.value;
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
    // get blocks dropdown
    const getCombanyOptions = () => {
      getCompanyList()
        .then((res) => {
          combany_options.value = res.data.value;

          console.log(res.data.value);
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
            // timeout:
          });
        });
    };
    // get blocks dropdown
    const getAmenityOptions = () => {
      getAmenityList()
        .then((res) => {
          amenity_option.value = res.data.value;
        })
        .catch((_error) => {
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
    // get blocks dropdown
    const getOwnersOptions = () => {
      getVendorsList()
        .then((res) => {
          owners_option.value = res.data.value;
        })
        .catch((_error) => {
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
    // submit Edit Unit
    const submitEditUnit = async () => {
      Loading.show();
      // check owner if empty send it null
      let allOwndersNull = true;
      if (unitForm.value.owners.length === 0) {
        unitForm.value.owners = null;
      } else {
        for (let prop = 0; prop < unitForm.value.owners.length; prop++) {
          if (
            unitForm.value.owners[prop].vendorId === null ||
            unitForm.value.owners[prop].vendorId === ""
          ) {
            unitForm.value.owners[prop] = null;
          } else {
            allOwndersNull = false;
          }
        }
      }
      if (allOwndersNull) {
        unitForm.value.owners = null;
      }
      // if (
      //   unitForm.value.owners?.[0].vendorId === null ||
      //   unitForm.value.owners?.[0].vendorId === ""
      // ) {
      //   unitForm.value.owners = null;
      // }
      // check attachments if empty send it null
      // if (
      //   unitForm.value.attachments?.[0]?.url === null ||
      //   unitForm.value.attachments?.[0]?.url === ""
      // ) {
      //   unitForm.value.attachments = null;
      // }
      unitForm.value.attachments = null;

      let allContactIsNull = true;
      // check contact property if empty send it null and if all contact empty set = null
      for (const prop in unitForm.value.contact) {
        if (
          unitForm.value.contact[prop] === null ||
          unitForm.value.contact[prop] === ""
        ) {
          unitForm.value.contact[prop] = "";
        } else if (typeof unitForm.value.contact[prop] === "object") {
          console.log("iam object");
          if (
            unitForm.value.contact[prop].phoneNumber === "" ||
            unitForm.value.contact[prop].phoneNumber === null
          ) {
            unitForm.value.contact[prop] = null;
          } else {
            allContactIsNull = false;
          }
        } else {
          allContactIsNull = false;
        }
      }
      // if (unitForm.value.contact.phoneObj?.phoneNumber === "") {
      //   unitForm.value.contact.phoneObj = null;
      // } else {
      //   allContactIsNull = false;
      // }
      if (allContactIsNull) {
        unitForm.value.contact = null;
      }
      // const row = save_edit_row.value;
      editUnit(unitForm.value)
        .then((res) => {
          create_dialog.value = false;
          Loading.hide();
          getMainData();
          Notify.create({
            message: `success edit Unit  ${unitForm.value.name} `,
            color: "white",
            textColor: "green",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
            icon: "eva-done-all-outline",
          });
        })
        .catch((_error) => {
          Loading.hide();
          console.log(_error);
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
    // get
    const getItemGroupData = () => {
      Loading.show();
      getPropertyList()
        .then((res) => {
          // let arr = [...res.data.value];
          // let result = [];
          // arr.forEach((el) => {
          //   result.push(
          //     Object.assign(
          //       {},
          //       { name: el.no + " - " + el.name },
          //       { id: el.id },
          //       { no: el.no }
          //     )
          //   );
          // });
          // let propOption = res.data.value.map((el) => {
          //   return Object.assign(
          //     {},
          //     { name: el.name + " / " + el.no },
          //     { id: id }
          //   );
          // });
          // console.log(propOption);
          prpertyOptions.value = res.data.value;
          // prpertyOptionsNo.value = [
          //   ...arr.map((el) => {
          //     return Object.assign(
          //       {},
          //       { name: el.no + " - " + el.name },
          //       { id: el.no }
          //     );
          //   }),
          // ];
          Loading.hide();
        })
        .catch((_error) => {
          Loading.hide();
          console.log(_error);
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
    };
    const chechImportError = (obj) => {
      let clearErrors = [...obj];
      for (let i = 0; i < clearErrors.length; i++) {
        clearErrors[i].errors = [];
      }
      Loading.show();
      chechImportErrors({ dataList: clearErrors })
        .then((res) => {
          console.log(res.data);
          Loading.hide();
          if (res.data.value === true || res.data.value === null) {
            chchErrorResult.value = true;
          } else {
            responsFromImport.value = res.data.value;
            chchErrorResult.value = false;
          }
        })
        .catch((_error) => {
          Loading.hide();
          console.log(_error);
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
    };
    const getMainGroupLookUps = () => {
      dropdownListMainGroups()
        .then((res) => {
          mainGroupNumberVal.value = res.data.value;
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
    const importUnits = (file) => {
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
        importUnit(ImportformData)
          .then((res) => {
            Loading.hide();
            console.log(res.data);
            if (res.data.value === true || res.data.value === null) {
              chchErrorResult.value = true;
            } else {
              responsFromImport.value = res.data.value;
              chchErrorResult.value = false;
            }
          })
          .catch((_error) => {
            Loading.hide();
            import_dialog.value = false;
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
      } else {
        Notify.create({
          message: `Cannot upload file format ${import_file.value.type}  `,
          position: "top",
          color: "white",
          textColor: "red",
          position: "bottom",
          timeout: 8000,
          classes: "notify-size",
        });
      }
      // .finally(() => {
      //   Loading.hide();
      // });
    };
    const submitForm = () => {
      if (isDialogEite.value) {
        submitEditUnit();
      } else {
        submitaddUnit();
      }
    };
    const getErrorValidation = (val) => {
      // console.log(val);
      Notify.create({
        message: `${val.label} is required`,
        color: "white",
        textColor: "red",
        position: "bottom",
        timeout: 8000,
        classes: "notify-size",
      });
    };
    ///////////////////////////////
    ////////////////////////////////
    //////////////////////////////
    // //// owner calc
    const deleteOwner = (index) => {
      const obj = unitForm.value;
      obj.owners.splice(index, 1);
    };
    // add vendor
    const addOwner = () => {
      const obj = unitForm.value;
      const scima = {
        vendorId: "",
        ownerShipRate:
          avilableShipRat.value == 100 ? null : avilableShipRat.value,
      };
      obj.owners.push(scima);
    };
    const handelMaxRate = (e) => {
      let curentShipRat = 0;
      let opj = unitForm.value;
      // calc my all ships rate
      opj.owners.forEach((el) => {
        curentShipRat += Number(el.ownerShipRate);
      });
      // chech
      if (curentShipRat <= 100) {
        isAvilableRat.value = false;
        avilableShipRat.value = 100 - curentShipRat;
      } else {
        avilableShipRat.value = 100 - curentShipRat + Number(e.value);
        isAvilableRat.value = true;
      }
    };
    onBeforeMount(() => {
      getunitTypes();
      getfloorsOptions();
      getBlocksOptions();
      getAmenityOptions();
      getOwnersOptions();
      getunitCategory();
      getItemGroupData();
      getMainGroupLookUps();
      getCombanyOptions();
      console.log(unitForm.value);
    });
    return {
      mainData,
      exportshreet,
      getErrorValidation,
      responsFromImport,
      imageFile,
      prpertyOptions,
      mainGroupNumberVal,
      downloadUnitTemplate,
      unitForm,
      getItemGroupData,
      combany_options,
      submitEditUnit,
      updateSizeFoot,
      chechImportError,
      submitForm,
      importUnits,
      getMainGroupLookUps,
      // edit_unit_scima,
      getCombanyOptions,
      unit_type_option,
      add_model_value,
      // submitaddUnit,
      addOwner,
      carteUnetCategory,
      handleDeleteSectorImport,
      // submitImport,
      mainDataPagination,
      deleteOwner,
      // getAmenityOptions,
      // amenityList,
      maxPages,
      // create_unit_scima,
      // getOwnersOptions,
      blocks_option,
      updateSizeMeter,
      import_dialog,
      importshreet,
      // Amenity_option,
      import_file,
      unit_category_option,
      floors_option,
      pageSize,
      // handelPagenation,
      // submitImport,
      downloadTemplate,
      // submitEditRow,
      pagenation_page,
      col,
      isDialogEite,
      save_edit_row,
      delete_dialog,
      handelMaxRate,
      getMainData,
      prpertyOptionsNo,
      chchErrorResult,
      getRowToEdit,
      save_delte_row,
      changePageSize,
      propToEdit,
      owners_option,
      duplicateItem,
      is_multi_del,
      isAvilableRat,
      getRowToDelete,
      sellected_row,
      amenity_option,
      search_modal,
      getSellectedRow,
      avilableShipRat,
      submitaddUnit,
      submitFilterUnit,
      glopalSearch,
      confirmDeleteRow,
      // duplicateItem,
      create_dialog,
      privpage,
      multiDelete,
      nextpage,
      // col,
      ItemTab: ref("owners"),
      isActive: ref(false),
      statusOptions: ref([
        { label: "Vacant", id: 1 },
        { label: "Occupied", id: 2 },
        { label: "Under maintenance", id: 3 },
        { label: "Out of service", id: 4 },
      ]),
      idTypesOptions: ref([
        {
          id: 1,
          label: "Driver License",
        },
        {
          id: 2,
          label: "Natinal Identity Card",
        },
        {
          id: 3,
          label: "Passport",
        },
        {
          id: 4,
          label: "Resident Card",
        },
        {
          id: 5,
          label: "Refugee Card",
        },
        {
          id: 5,
          label: "Refugee Card",
        },
        {
          id: 6,
          label: "BirthCartificate",
        },
        {
          id: 7,
          label: "Student Card",
        },
        {
          id: 8,
          label: "Loyalty Card",
        },
        {
          id: 9,
          label: "Other",
        },
      ]),
      contentTypeOptions: ref([
        { label: "Main", id: 1 },
        { label: "Sub", id: 2 },
        { label: "Dashborad", id: 3 },
      ]),
    };
  },
  components: { PropTaple, ImportUnits, createDialog, FilterBar },
};
</script>

<style lang="scss" scoped>
.taple-container {
  margin: auto 20px;
  padding: 20px 25px;
  background: #ffffff;
  box-shadow: 0px 4px 39px 9px rgba(81, 69, 159, 0.09);
  border-radius: 15px;
  // height: calc(100% - 270px);
  height: calc(131vh - 270px);
  overflow: hidden;
}
</style>

