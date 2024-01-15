<template>
  <q-page class="full-height" style="border-radius: 10px">
    <filteration-bar
      :ragionList="curentRegion"
      :countryList="curentCountry"
      :citys_list="citys_list"
      :yearsForFilter="yearsForFilter"
      @passFilerFormValue="submitFilterTable"
      @passSelectedGroupBy="getSelectedByOption"
    />
    <project-taple-container
      :curentCol="curentCol"
      :columnOption="columnOptions"
      :row="data_table"
      :moreBtn="moreBtn"
      :isPendeng="isPendeng"
      :pinding_of_unit="pinding_of_unit"
      :isByGroupTaple="isByGroupTaple"
      @chaeckCol="chaeckCol"
      @paginatiosChanged="paginatiosChanged"
      @exportChart="exportProjectsChart"
      @duplicateSingleProp="handelDuplicate"
      @passSingleGroupToEdit="passSingleGroupToEdit"
      @singleGroupToDel="heandelDeleteProject"
      @duplicSellected="handelDuplicate"
      @openDialogToCreate="handelCreateProject"
      @deleteSelected="deleteSelectedProjects"
      @openImportDialog="import_dialog = true"
      @passPropToReview="passSingleGroupToEdit"
      @getByGroupUnit="getCulomnOfGroupBy"
      @propertyInProject="propertyInProject"
    />
    <q-dialog
      v-model="createItemDialog"
      transition-show="scale"
      transition-hide="scale"
      persistent
      full-width
      full-height
    >
      <submitDialog
        :editData="editData"
        :isEdit="isEdit"
        :is_review_from_card="is_review_from_card"
        @submitCreate="handelCreate"
        @submitEdit="handelUpdate"
      />
    </q-dialog>
    <!-- dialog import -->
    <q-dialog
      v-model="import_dialog"
      persistent
      full-width
      transition-show="scale"
      transition-hide="scale"
    >
      <importStiperCard
        @downloadTemplate="downloadTemplate"
        @passFileToUpload="submitImport"
        @passDataToChech="chechImportErrors"
        @closeImportDialog="import_dialog = false"
        @handleDeleteSectorImport="handleDeleteSectorImport"
        titleImport="Import projects data"
        :chchErrorResult="chchErrorResult"
        :responsFromImport="responsFromImport"
        :checkErrPending="checkErrPending"
      />
    </q-dialog>
  </q-page>
</template>

<script>
import { onMounted, ref, watch } from "vue";
import FilterationBar from "../components/filteration-bar.vue";
import importStiperCard from "../components/importStiperCard.vue";
import submitDialog from "../components/dialog-card.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { Loading, Notify, Dialog, useQuasar, LocalStorage } from "quasar";
import ProjectTapleContainer from "../components/project-taple-container.vue";
import { form_data } from "../composables/reaquist.js";
const { useActions } = createNamespacedHelpers(
  "AppModule/PropertyModule/projects"
);
const { useActions: usePropertyActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
import {
  selectedCol,
  carete_form,
  data_table,
  useCRUD,
  createItemDialog,
} from "../composables/reaquist";
// import DialogCard from "../../charts-property/components/dialog-card.vue";
export default {
  components: {
    ProjectTapleContainer,
    FilterationBar,
    submitDialog,
    importStiperCard,

    // DialogCard,
  },
  setup() {
    const $q = useQuasar();
    const curentRegion = ref([]);
    const yearsForFilter = ref([]);
    const curentCountry = ref([]);
    const chchErrorResult = ref([]);
    const responsFromImport = ref([]);
    const checkErrPending = ref(false);
    const isByGroupTaple = ref(false);
    const isPendeng = ref(false);
    const pinding_of_unit = ref(false);
    const is_review_from_card = ref(false);
    // use
    const paginatiosChanged = () => {
      return handelGet();
    };
    const { getMainGroupById } = usePropertyActions(["getMainGroupById"]);
    const propertyInProject = (data) => {
      pinding_of_unit.value = true;
      let pojectId = data.id;
      let projectIndex = data_table.value.findIndex((el) => el.id == pojectId);
      getMainGroupById(pojectId)
        .then((res) => {
          pinding_of_unit.value = false;
          data_table.value[projectIndex]["property"] = res.data.value.list;
        })
        .catch((err) => {
          pinding_of_unit.value = false;
          console.log(err);
        });
    };
    const {
      getProjectList,
      crateProjects,
      updateProject,
      deleteProject,
      getCountysList,
      getRegionList,
      exportProject,
      duplicateProject,
      getProjectById,
      getCitysList,
      getYearForFilter,
      importProject,
      searchAndFilters,
      checkImportErrors,
      getTableByGroup,
      groupListByCulomn,
    } = useActions([
      "getProjectList",
      "crateProjects",
      "updateProject",
      "deleteProject",
      "getCountysList",
      "getRegionList",
      "exportProject",
      "duplicateProject",
      "getProjectById",
      "getCitysList",
      "getYearForFilter",
      "searchAndFilters",
      "importProject",
      "checkImportErrors",
      "getTableByGroup",
      "groupListByCulomn",
    ]);
    // state
    const isEdit = ref(false);
    const import_dialog = ref(false);
    const editData = ref({});
    const countrys_list = ref([]);
    const citys_list = ref([]);
    const ragion_list = ref([]);
    const { handelGet, handelCreate, handelDelete, handelUpdate } = useCRUD(
      getProjectList,
      crateProjects,
      updateProject,
      deleteProject
    );
    // watsh

    const getCurentRegion = () => {
      getRegionList()
        .then((res) => {
          curentRegion.value = res.data.value;
          console.log(res.data.value);
        })
        .catch((err) => {
          console.log(err.data);
        });
    };
    const getCurentCountry = () => {
      getCountysList()
        .then((res) => {
          console.log(res.data.value);
          curentCountry.value = res.data.value;
        })
        .catch((err) => {
          console.log(err.data);
        });
    };
    const moreBtn = ref(["edit", "delete"]);
    const curentCol = ref([
      { label: "project", name: "name" },
      { label: "Description", name: "descraption" },
      { label: "City", name: "city" },
      { label: "State/region", name: "regionName" },
      { label: "Country", name: "countryName" },
      { label: "", name: "action", action: true },
    ]);
    const columnOptions = ref([
      { label: "project", name: "name" },
      { label: "Description", name: "descraption" },
      { label: "City", name: "city" },
      { label: "State/region", name: "regionName" },
      { label: "Country", name: "countryName" },
      { label: "Adress", name: "addressLine" },
      // { label: "Creation Date", name: "creationDate" },
      // { label: "Creation by", name: "creationBy" },
    ]);
    const chaeckCol = (col) => {
      if (curentCol.value.some((el) => el.name == col.name)) {
        let filteration = curentCol.value.filter((el) => {
          return el.name !== col.name;
        });
        curentCol.value = filteration;
      } else {
        curentCol.value.splice(curentCol.value.length - 2, 0, col);
      }
    };
    const cuntryList = () => {
      getCountysList()
        .then((res) => {
          countrys_list.value = res.data.value;
        })
        .catch((err) => {
          console.log(err.data);
        });
    };
    const citysList = () => {
      getCitysList()
        .then((res) => {
          citys_list.value = res.data.value;
          console.log(res.data.value);
        })
        .catch((err) => {
          console.log(err.data);
        });
    };
    const ragionList = () => {
      getRegionList()
        .then((res) => {
          ragion_list.value = res.data.value;
        })
        .catch((err) => {
          console.log(err.data);
        });
    };
    const handelYearsForFilter = () => {
      getYearForFilter()
        .then((res) => {
          // ragion_list.value = res.data.value;
          yearsForFilter.value = res.data.value;
        })
        .catch((err) => {
          // console.log(err.data);
        });
    };
    const deleteSelectedProjects = () => {
      let selectedToDel = [];
      selectedCol.value.forEach((el) => {
        selectedToDel.push(el.id);
      });
      $q.dialog({
        title: "Confirm to delete",
        message: "Would you like to delete this project ? ",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        Loading.show();
        try {
          const response = await deleteProject(selectedToDel);
          if (response.data.value) {
            Loading.hide();
            handelGet();
            Notify.create({
              message: `Success delete`,
              classes: "notify-size",
              textColor: "green",
              position: "bottom",
              timeout: 8000,
            });
          }
        } catch (_error) {
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
      });
      console.log(data);
    };
    const heandelDeleteProject = (data) => {
      $q.dialog({
        title: "Confirm to delete",
        message: "Would you like to delete this project ? ",
        cancel: true,
        persistent: true,
      }).onOk(async () => {
        Loading.show();
        try {
          const response = await deleteProject([data.id]);
          if (response.data.value) {
            Loading.hide();
            handelGet();
            Notify.create({
              message: `Success delete`,
              classes: "notify-size",
              textColor: "green",
              position: "bottom",
              timeout: 8000,
            });
          }
        } catch (_error) {
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
      });
    };
    const exportProjectsChart = async () => {
      Loading.show();
      exportProject()
        .then((res) => {
          Loading.hide();
          Notify.create({
            message: `Success export`,
            classes: "notify-size",
            textColor: "green",
            position: "bottom",
            timeout: 8000,
          });
        })
        .catch((_error) => {
          Loading.hide();
          Notify.create({
            message: _error.data.ErrorMessage
              ? _error.data.ErrorMessage
              : _error.data,
            color: "white",
            textColor: "red",
            position: "bottom",
            timeout: 8000,
            classes: "notify-size",
          });
          console.log(_error);
        });
    };
    const handelDuplicate = (data) => {
      Loading.show();
      duplicateProject(selectedCol.value[0].id)
        .then((res) => {
          Loading.hide();
          Notify.create({
            message: `Success duplicate`,
            classes: "notify-size",
            textColor: "green",
            position: "bottom",
            timeout: 8000,
          });
        })
        .catch((_error) => {
          Loading.hide();
          Notify.create({
            message: _error.data.ErrorMessage
              ? _error.data.ErrorMessage
              : _error.data,
            color: "white",
            textColor: "red",
            position: "bottom",
            timeout: 8000,
            classes: "notify-size",
          });
        });
    };
    const passSingleGroupToEdit = (payload) => {
      Loading.show();
      isEdit.value = true;
      getProjectById(payload.id)
        .then((res) => {
          Loading.hide();
          form_data.value = res.data.value;
          // editData.value =
          createItemDialog.value = true;
        })
        .catch((el) => {
          Loading.hide();
          console.log(el.data);
        });
      // console.log(id);
    };
    const handelCreateProject = () => {
      isEdit.value = false;
      is_review_from_card.value = false;
      // editData.value = {};
      form_data.value = {
        translation: [
          {
            languageId: LocalStorage.getItem("defLanguage"),
            name: "",
          },
        ],
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
      };
      createItemDialog.value = true;
    };
    // import stteper methodth
    const downloadTemplate = () => {
      window.open(
        `https://obs-api-beta.azurewebsites.net/Templates/Import/Project-Template.xlsx`
      );
    };
    const submitImport = (file) => {
      let errOptions = {
        color: "white",
        textColor: "red",
        position: "bottom",
        // badgePosition:"left",
        // position: "bottom",

        timeout: 8000,
        classes: "notify-size",
        // ignoreDefaults:true
      };
      let sucOptions = {
        color: "white",
        textColor: "green",
        classes: "notify-size",
        // badgePosition:"left",
        position: "bottom",
        timeout: 8000,
        // ignoreDefaults:true
      };
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
        importProject(ImportformData)
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
          message: `${t("can not upload file with this extention")} ${
            file.type
          }  `,
          ...errOptions,
        }).finally(() => {
          Loading.hide();
        });
      }
    };
    const chechImportErrors = (data) => {
      let errOptions = {
        color: "white",
        textColor: "red",
        position: "bottom",
        // badgePosition:"left",
        // position: "bottom",

        timeout: 8000,
        classes: "notify-size",
        // ignoreDefaults:true
      };
      let sucOptions = {
        color: "white",
        textColor: "green",
        classes: "notify-size",
        // badgePosition:"left",
        position: "bottom",
        timeout: 8000,
        // ignoreDefaults:true
      };
      checkErrPending.value = true;
      let clearErrors = data;
      for (let i = 0; i < clearErrors.length; i++) {
        clearErrors[i].errors = [];
        // clearErrors[i].creationType =2;
      }
      console.log(clearErrors);
      Loading.show();
      checkImportErrors({ dataList: clearErrors })
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
    const handleDeleteSectorImport = (row) => {
      const index = responsFromImport.value.findIndex(
        (el) => el.name == row.name
      );
      responsFromImport.value.splice(index, 1);
    };
    // const passFilerFormValue = (form) => {
    //   console.log(form);
    // };
    const submitFilterTable = async (form) => {
      Loading.show();
      try {
        const req = await searchAndFilters(form);
        Loading.hide();
        data_table.value = await req.data.value;
      } catch (err) {
        console.log(err);
        Loading.hide();
      }
    };
    const getSelectedByOption = async (val) => {
      console.log(val);
      Loading.show();
      if (val == "none" || val === "") {
        isByGroupTaple.value = false;
        await handelGet();
        Loading.hide();
      } else {
        isByGroupTaple.value = true;
        try {
          const req = await getTableByGroup(val);
          data_table.value = await req.data.value;
          Loading.hide();
        } catch (err) {
          console.log(err);
          Loading.hide();
        }
      }
    };
    const getCulomnOfGroupBy = (group) => {
      // Loading.show();
      console.log(group);
      groupListByCulomn({ name: group.name, value: group.value })
        .then((res) => {
          // Loading.hide();
          let indx = form_data.value.findIndex((el) => el.id == group.id);
          form_data.value[indx]["property"] = res.data.value;
        })
        .catch((_error) => {
          // Loading.hide();
          console.log(_error);
          Notify.create({
            message: _error.data.errorMessage
              ? _error.data.errorMessage
              : _error.data,
            ...errOptions,
          });
        })
        .finally(() => {
          // Loading.hide();
        });
    };
    const passPropToReview = (payload) => {
      Loading.show();
      isEdit.value = false;
      is_review_from_card.value = true;
      getProjectById(payload.id)
        .then((res) => {
          Loading.hide();
          form_data.value = res.data.value;
          // editData.value =
          createItemDialog.value = true;
        })
        .catch((el) => {
          Loading.hide();
          console.log(el.data);
        });
    };
    // mounted
    onMounted(() => {
      handelGet();
      cuntryList();
      ragionList();
      citysList();
      getCurentRegion();
      getCurentCountry();
      handelYearsForFilter();
    });
    return {
      curentCol,
      import_dialog,
      handelYearsForFilter,
      getSelectedByOption,
      submitFilterTable,
      downloadTemplate,
      pinding_of_unit,
      // passFilerFormValue,
      is_review_from_card,
      checkErrPending,
      yearsForFilter,
      handleDeleteSectorImport,
      paginatiosChanged,
      chchErrorResult,
      responsFromImport,
      chechImportErrors,
      exportProjectsChart,
      submitImport,
      passPropToReview,
      getCulomnOfGroupBy,
      propertyInProject,
      handelCreateProject,
      chaeckCol,
      editData,
      getCurentRegion,
      getCurentCountry,
      deleteSelectedProjects,
      citys_list,
      handelDelete,
      curentRegion,
      curentCountry,
      passSingleGroupToEdit,
      handelCreate,
      isEdit,
      countrys_list,
      ragion_list,
      handelUpdate,
      cuntryList,
      createItemDialog,
      columnOptions,
      moreBtn,
      ragionList,
      selectedCol,
      heandelDeleteProject,
      handelDuplicate,
      // req
      carete_form,
      data_table,
      citysList,
      isByGroupTaple,
      isPendeng,
      // submitCreate,
      // submitEdit,
    };
  },
};
</script>

<style>
</style>

