<template>
  <q-page padding>
    <q-card class="my-card">
      <div class="bg-white shadow-1 q-pa-lg q-mb-md">
        <div class="row q-mt-lg items-center user-select select-component">
          <div class="col-md-5">
            <h3>Chart Of Accounts</h3>
          </div>
          <div class="col-md-7">
            <q-input
              outlined
              debounce="500"
              v-model="accountSearch"
              class="user-search"
              placeholder="Search"
              @keyup.enter="glopalSearch"
            >
              <template v-slot:append>
                <q-btn
                  icon="eva-search-outline"
                  class="cursor-pointer"
                  flat
                  label="Search"
                  @click="glopalSearch"
                />
              </template>
            </q-input>
          </div>
        </div>
        <!-- Actions -->
        <div class="row q-mt-lg items-center user-select select-component">
          <div class="col-md-4">
            <q-select
              outlined
              multiple
              :options="filters"
              label="Filters"
              style="margin-right: 1.5rem"
            />
          </div>
          <div class="col-md-4">
            <q-select
              outlined
              multiple
              :options="content"
              label="Content"
              style="margin-right: 1.5rem"
            />
          </div>
          <div class="col-md-4">
            <q-select
              outlined
              multiple
              :options="companies"
              label="Company"
              style="margin-right: 1.5rem"
            />
          </div>
        </div>
      </div>
    </q-card>
    <q-card class="my-card">
      <div class="q-pa-lg">
        <div class="row">
          <div class="col-6 q-mb-md">
            <q-btn outline class="btn-component-duplicate" padding="10px 25px">
              <img src="/images/duplicate.svg" class="q-mr-sm" />
              Duplicate
            </q-btn>
          </div>
          <div class="col-4 q-mb-md q-px-lg"></div>
          <div class="col-2 q-mb-md row">
            <!-- Add Button -->
            <q-btn
              label="Create"
              class="q-ml-md col btn-2 btn-component"
              padding="10px 60px"
              unelevated
              @click="openCreateFrom"
              no-caps
            />
            <q-btn
              text-color="grey-6"
              color="grey-7"
              size="1.3em"
              round
              flat
              class="float-right"
              icon="more_vert"
            >
              <q-menu
                fit
                auto-close
                transition-show="scale"
                transition-hide="scale"
              >
                <q-list style="min-width: 200px">
                  <q-item clickable @click="editeSellectedAccount">
                    <q-item-section>Edit</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Export</q-item-section>
                  </q-item>
                  <q-item clickable>
                    <q-item-section>Import</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </div>
        </div>
        <div class="row">
          <div class="col-10">
            <chart-tree
              :mainData="dataTaple"
              :data="tree"
              :layout="layout"
              :clipboard="clipboard"
              :filter="search"
              :tickedList="ticked"
              @duplicate-item="handleDuplicateItem"
              @copy-item="handleCopyItem"
              @cut-item="handleCutItem"
              @paste-item="handlePasteItem"
              @delete-item="handleDeleteItem"
              @select-items="handleSelectItems"
              @toggle-active="handleToggleItemActive"
            />
          </div>

          <div class="col-2">
            <div class="row q-col-gutter-sm q-mb-md">
              <div
                class="col-4 custom-style-tabs"
                v-for="({ icon, id }, i) in layouts"
                :key="i"
              >
                <q-btn
                  class="q-pa-sm"
                  :outline="id == layout"
                  @click="layout = id"
                >
                  <img :src="icon" />
                </q-btn>
              </div>
            </div>
            <q-select
              outlined
              multiple
              :options="filters"
              label="Level"
              class="q-mb-md"
            />
            <q-btn
              v-for="{ name, id } in groups"
              :key="id"
              flat
              @click="getItemInGroup(id)"
              style="width: 100%"
              class="q-mb-md q-pa-lg list-buttons"
              color="white"
              text-color="black"
              label=""
              >{{ name }}</q-btn
            >
            <q-btn
              flat
              @click="openCreateGroupForm"
              style="width: 100%"
              class="q-mb-md q-pa-lg list-buttons text-bold"
              color="white"
              text-color="black"
              label="Create Group"
            ></q-btn>
          </div>
        </div>
      </div>
    </q-card>
    <q-dialog
      v-model="create_group_dilaog"
      transition-show="scale"
      transition-hide="scale"
    >
      <DialogCreateGroup />
    </q-dialog>
    <q-dialog
      v-model="create_account_dilaog"
      transition-show="scale"
      transition-hide="scale"
    >
      <DialogCreateAccount :groups="groups" />
    </q-dialog>
    <!-- <obs-dialog-page
      ref="errorsDialog"
      @treeUpdate="handleRefresh"
    ></obs-dialog-page> -->
  </q-page>
</template>

<script>
import chartTree from "../components/chart-tree.vue";
import DialogCreateAccount from "../components/dialog-create-account.vue";
import DialogCreateGroup from "../components/dialog-create-group.vue";
import { ref, shallowRef, reactive } from "@vue/reactivity";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { computed, onMounted, watch } from "@vue/runtime-core";
import { Loading, Notify } from "quasar";
import { useDialog, useEntity } from "src/composables/hooks";
import { Router } from "src/router";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/MainPage"
);
const { useActions: useChartsActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule"
);

export default {
  components: {
    chartTree,
    DialogCreateGroup,
    DialogCreateAccount,
  },
  setup() {
    const create_group_dilaog = ref(false);
    const create_account_dilaog = ref(false);
    const accountSearch = ref("");
    // Store
    const { editGroup, editAccount } = useChartsActions([
      "editGroup",
      "editAccount",
    ]);
    const {
      filter,
      importTree,
      exportTree,
      getGroups,
      getTree,
      pastItem,
      deleteItem,
      duplicateItem,
      checkErrors,
      getItemsOfGroup,
      accountById,
      groupAccSearch,
    } = useActions([
      "filter",
      "importTree",
      "exportTree",
      "getGroups",
      "getTree",
      "pastItem",
      "deleteItem",
      "duplicateItem",
      "checkErrors",
      "accountById",
      "groupAccSearch",
    ]);
    const errorsDialog = ref();
    const search = ref("");
    const form = ref({});
    const { dialog, toggleDialog } = useDialog();
    // groups
    const group = ref();
    const dataTaple = ref([]);
    const groupsEntity = useEntity({ request: getGroups });
    const groups = computed(() => groupsEntity.data.value?.data?.value);

    const treeFilters = ref({
      mainGroupId: "",
      filters: {
        accType: [],
        typical: [],
        postingtype: [],
        accCategory: [],
      },
      creationType: null,
      isActive: true,
      level: null,
      typeView: 1,
    });
    const treeEntity = useEntity({ request: () => getTree(treeFilters.value) });
    const isFilteredMode = ref(false);
    const filteredTree = ref([]);
    const tree = computed(() => {
      if (isFilteredMode.value) {
        return filteredTree.value;
      }
      return treeEntity.data.value?.data?.value;
    });

    const layout = ref("list");
    const layouts = [
      {
        icon: "/images/grid.svg",
        id: "grid",
      },
      {
        icon: "/images/list.svg",
        id: "list",
      },
      {
        icon: "/images/tree.svg",
        id: "tree",
      },
    ];

    const ticked = ref([]);
    const clipboard = reactive({ id: [] });

    const importedFile = ref(null);

    // Methods
    const getItemsFlat = (items) => {
      const list = [];

      const generateListFromItem = (listItem) => {
        list.push(listItem);
        if (listItem.accounts && listItem.accounts.length > 0) {
          listItem.accounts.forEach((item) => {
            generateListFromItem(item);
          });
        }
      };

      items.forEach(generateListFromItem);

      return list;
    };
    const onCancel = () => {
      //
    };
    const handleRefresh = () => {
      treeEntity.refresh();
    };
    const handleDispatchAction = async (action, payload, handelType = null) => {
      try {
        // Loading
        Loading.show();

        // Call api
        await action(payload);

        // Refresh tree
        handleRefresh();
      } catch (error) {
        if (handelType === "import") {
          errorsDialog.value.dialogRows(error.response.data);
          errorsDialog.value.dialogShowValue = true;
          errorsDialog.value.groupId = group.value;
        }
      } finally {
        // Loading
        Loading.hide();
        ticked.value = [];
        clipboard.id = [];
      }
    };

    let tickedElemnts = [];
    const extractTickedFromData = (data) => {
      data.forEach((record) => {
        tickedElemnts.push(
          record.creationType === 0 ? record.mainGroupId : record.id
        );

        if (record.accounts && record.accounts.length > 0)
          extractTickedFromData(record.accounts);
      });
      ticked.value = [...tickedElemnts];
    };
    const handelCompyCutSelection = async (id) => {
      let oldMainId = treeFilters.value.mainGroupId;
      treeFilters.value.mainGroupId = id;
      const { data } = await getTree(treeFilters.value);
      tickedElemnts = [];
      extractTickedFromData(data.value);
      treeFilters.value.mainGroupId = oldMainId;
    };

    const handleCopyItem = ({ id }) => {
      // Set Clipboard
      clipboard.id = [...new Set([...clipboard.id, id])];
      clipboard.copy = true;

      handelCompyCutSelection(id);
    };
    const handleCutItem = ({ id }) => {
      // Set Clipboard
      clipboard.id = [...new Set([...clipboard.id, id])];
      clipboard.copy = false;

      handelCompyCutSelection(id);
    };
    const handlePasteItem = ({ id: mainGroupId }) => {
      const payload = {
        ...clipboard,
        mainGroupId,
      };

      handleDispatchAction(pastItem, payload);
    };
    const handleDeleteItem = ({ id }) => {
      clipboard.id = [...new Set(id ? [...clipboard.id, id] : clipboard.id)];

      handleDispatchAction(deleteItem, clipboard.id);
    };
    const handleDuplicateItem = ({ id }) => {
      handleDispatchAction(duplicateItem, id);
    };
    const handleEditItem = () => {
      const id = ticked.value[0];
      const items = getItemsFlat(tree.value);
      const selectedItem = items.find((i) => i.id === id);
      const isGroup = selectedItem.creationTypeName === "Group";
      const routeName = `edit-${isGroup ? "group" : "account"}`;
      Router.push(
        `/app/administration/charts/charts-accounts/${routeName}/${id}`
      );
    };
    const handleSelectItems = (items) => {
      clipboard.id = items;
      ticked.value = items;
    };
    const handleExport = async () => {
      try {
        Loading.show();

        const { data } = await exportTree();

        window.open(data, "_blank");
      } catch (error) {
      } finally {
        Loading.hide();
      }
    };
    const handleImport = async (file) => {
      const formData = new FormData();

      formData.append("File", file);

      await handleDispatchAction(importTree, formData, "import");

      importedFile.value = null;
    };
    const onSubmit = async () => {
      try {
        Loading.show();
        const { data } = await getTree(treeFilters.value);

        isFilteredMode.value = true;
        filteredTree.value = data.value;
      } catch (error) {
      } finally {
        Loading.hide();
      }
    };
    const resetFilters = () => {
      treeFilters.value.creationType = 0;
      treeFilters.value.level = 0;
      Object.keys(treeFilters.value.filters).forEach((key) => {
        treeFilters.value.filters[key] = [];
      });
    };
    const handleReset = () => {
      isFilteredMode.value = false;
      resetFilters();
      treeEntity.refresh();
    };
    const handleDownloadForm = () => {
      window.open("/form-template.xlsx", "_target");
    };
    const handleToggleItemActive = async ({ row }) => {
      const action = row.creationTypeName === "Group" ? editGroup : editAccount;

      try {
        await action(row);
        treeEntity.refresh();
      } catch (error) {
        console.log(error);
      }
    };
    const editeSellectedAccount = async () => {
      // 1 accountById( // selected account // )
      // 2 open create dialog by and pass data of account to crate dialog
    };
    // api
    ///////////////////////
    // get item of group
    //////////////////////
    const getItemInGroup = async (id) => {
      Loading.show();
      try {
        treeFilters.value.mainGroupId = id;
        const req = await getTree(treeFilters.value);
        dataTaple.value = await req.data.value;
        console.log(req.data);
        Loading.hide();
      } catch (_error) {
        Loading.hide();
        Notify.create({
          message: _error.data.errorMessage
            ? _error.data.errorMessage
            : _error.data,
          color: "red",
          position: "top",
        });
      }
      // try {
      //   const req = await getItemsOfGroup(id);
      //   dataTaple = await req.data.value;
      //   Loading.hide();
      // } catch (_error) {
      //   Notify.create({
      //     message: _error.data.errorMessage
      //       ? _error.data.errorMessage
      //       : _error.data,
      //     color: "red",
      //     position: "top",
      //   });
      // } finally {
      //   Loading.hide();
      // }
      // dataTaple = req.data.value?.data?.value;
    };
    // glopal search
    const glopalSearch = async () => {
      Loading.show();
      const req = await groupAccSearch(accountSearch.value);
      try {
        dataTaple.value = await req.data.value;
        Loading.hide();
      } catch (_error) {
        Notify.create({
          message: _error.data.errorMessage
            ? _error.data.errorMessage
            : _error.data,
          color: "red",
          position: "top",
        });
      }
    };
    // ////////////////
    // create form
    //////////////////
    const openCreateFrom = () => {
      create_account_dilaog.value = true;
    };
    const openCreateGroupForm = () => {
      create_group_dilaog.value = true;
    };
    // Lifecycle
    onMounted(() => {
      groupsEntity.on({
        pending: Loading.show,
        completed: Loading.hide,
        rejected(error) {
          Notify.create({
            message: error?.data?.errorMessage || error.message,
            color: "red",
            position: "top",
          });
        },
      });
      treeEntity.on({
        pending: Loading.show,
        completed: Loading.hide,
        rejected(error) {
          Notify.create({
            message: error?.data?.errorMessage || error.message,
            color: "red",
            position: "top",
          });
        },
      });

      groupsEntity.refresh();
      treeEntity.refresh();
    });

    // Watchers
    watch(group, () => {
      treeFilters.value.mainGroupId = group.value;
      treeEntity.refresh();
    });

    return {
      // State
      create_group_dilaog,
      create_account_dilaog,
      ticked,
      openCreateFrom,
      editeSellectedAccount,
      form,
      dataTaple,
      accountSearch,
      glopalSearch,
      getItemInGroup,
      openCreateGroupForm,
      layouts,
      layout,
      groups,
      tree,
      group,
      dialog,
      clipboard,
      importedFile,
      search,
      treeFilters,
      // Methods
      handleDownloadForm,
      toggleDialog,
      onCancel,
      onSubmit,
      handleRefresh,
      handleCopyItem,
      handleCutItem,
      handlePasteItem,
      handleDeleteItem,
      handleDuplicateItem,
      handleSelectItems,
      handleEditItem,
      handleExport,
      handleImport,
      handleReset,
      handleToggleItemActive,
      errorsDialog,
      content: ["group 1", "group 2", "group 3", "group 4", "group 5"],
      companies: [
        "company 1",
        "company 2",
        "company 3",
        "company 4",
        "company 5",
      ],
      filters: ["User Name", "User Type", "Email", "Language", "Company"],
      tab: ref("mails"),
    };
  },
};
</script>
<style>
.custom-style-tabs .q-btn:before {
  box-shadow: unset;
}
.border-chart {
  border: 2px solid #e6e8ec !important;
  border-radius: 20px;
}
.list-buttons {
  background: #ffffff;
  box-shadow: 0px 4px 39px rgba(81, 69, 159, 0.09);
  border-radius: 8px;
}
</style>
