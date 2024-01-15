<template>
  <q-card class="taple-container">
    <q-card-section class="row justify-between items-center table-metholds">
      <div class="col-5 text-left">
        <!-- ///////////// -->
        <!-- ////duplicate btn ////// -->
        <!-- ///////////// -->
        <q-btn
          @click="duplicSellected"
          outline
          class="btn-component-duplicate"
          padding="10px 25px"
          :disable="selectedCol.length !== 1"
        >
          <img src="/images/duplicate.svg" class="q-mr-sm" />
          {{ $t("app.administration.charts.chartsProperty.duplicate") }}
        </q-btn>
      </div>
      <div class="col-5 text-right flex justify-end" style="flex-wrap: nowrap">
        <!-- /////////// -->
        <!-- create btn -->
        <!-- /////////// -->
        <q-btn
          :label="$t('global.create')"
          class="q-ml-md btn-2 btn-component"
          :padding="$q.screen.lt.md ? ' 8px 50px' : '10px 60px'"
          size="md"
          unelevated
          @click="openDialogToCreate"
          no-caps
        />
        <!-- ///////// -->
        <!-- taple view as  -->
        <!-- ///////////// -->
        <div
          class="custom-style-tabs q-mx-md"
          v-for="({ active, icon, id }, i) in layouts"
          :key="i"
        >
          <q-btn
            :disable="$q.screen.lt.md || isByGroupTaple"
            :class="$q.screen.lt.md ? 'q-pa-xs' : 'q-pa-sm'"
            :size="$q.screen.lt.md ? 'sm' : 'md'"
            :outline="id == layout"
            @click="layout = id"
          >
            <img :src="id == layout ? active : icon" />
          </q-btn>
        </div>
        <!-- //////////////////// -->
        <!-- more actions (import , export , edit , delete) -->
        <!-- ///////////////////////////// -->
        <q-btn class="q-mr-md" flat icon="eva-more-vertical-outline">
          <q-menu
            style="padding: 15px !important ; width: 250px; border-radius: 10px"
          >
            <!-- <div class="row no-wrap q-pa-md">
                  <div class="column">
                    <div class="text-h6 q-mb-md">Settings</div>
                    <q-toggle v-model="mobileData" label="Use Mobile Data" />
                    <q-toggle v-model="bluetooth" label="Bluetooth" />
                  </div>
                </div> -->
            <q-list
              style="border: 1px solid #e5e4e4 !important"
              class="rounded-borders more-list"
            >
              <q-item clickable @click="importChart">
                <q-item-section>{{ $t("global.import") }}</q-item-section>
              </q-item>
              <q-item clickable @click="expostChart">
                <q-item-section>{{ $t("global.export") }}</q-item-section>
              </q-item>
              <!-- <q-item clickable @click="editChart">
                <q-item-section>{{ $t("global.edit") }}</q-item-section>
              </q-item> -->
              <q-separator
                spaced
                class="q-my-md"
                style="width: 70%; margin: auto"
                color="grey-3"
              />
              <q-item
                clickable
                @click="deleteSelected"
                :disable="selectedCol.length == 0"
              >
                <q-item-section>{{ $t("global.delete") }}</q-item-section>
              </q-item>
              <q-separator
                style="width: 70%; margin: auto"
                spaced
                color="grey-3"
                class="q-my-md"
              />
              <q-item>
                <q-item-label>Columns</q-item-label>
              </q-item>
              <q-item
                dense
                v-for="(col, i) in columnOptions"
                :key="i"
                clickable
                class="q-ml-sm more-list__item"
                @click="chaeckCol(col)"
              >
                <div class="flex">
                  <span class="q-mx-md">
                    <q-icon
                      size="xs"
                      name="eva-checkmark-outline"
                      v-if="curentCol.some((el) => el.name == col.name)"
                    />
                    <q-icon v-else size="xs" name="eva-close-outline" />
                  </span>
                  <span>
                    {{ col.label }}
                  </span>
                </div>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div>
    </q-card-section>
    <q-card-section class="table-review">
      <project-taple
        :layout="layout"
        :data="dataIngroup"
        :colums="curentCol"
        :select="true"
        :filter="search"
        :isPendeng="isPendeng"
        :pinding_of_unit="pinding_of_unit"
        :moreBtn="moreBtn"
        :isByGroupTaple="isByGroupTaple"
        @paginatiosChanged="paginatiosChanged"
        @passSellectedGroup="getSellectedGroup"
        @singleItemToDel="singleItemToDell"
        @singleItemToEdit="singleItemToEdit"
        @singleGroupToDel="singleGroupToDell"
        @cutSingleProperty="cutSingleProperty"
        @copySingleProperty="copySingleProperty"
        @getByGroupUnit="getByGroupUnit"
        @singleGroupToEdit="passSingleGroupToEdit"
        @duplicateSingleProp="duplicateSingleProp"
        @getUnitOfProperty="propertyInProject"
        @passPropToReview="passPropToReview"
      />
      <!-- {{ columnOptions }} -->
    </q-card-section>
  </q-card>
</template>

<script>
import { computed, ref, watch } from "vue";
import projectTaple from "./project-taple.vue";
import { selectedCol } from "../composables/reaquist";
export default {
  components: { projectTaple },
  props: {
    curentCol: {
      type: Array,
      default: () => [],
    },
    columnOption: {
      type: Array,
      required: true,
      default: () => [],
    },
    row: {
      type: Array,
      default: () => [],
    },
    moreBtn: {
      type: Array,
      default: () => [],
    },
    isPendeng: {
      type: Array,
      default: () => [],
    },
    pinding_of_unit: {
      type: Boolean,
      default: false,
    },
    isByGroupTaple: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const columnOptions = computed(() => {
      return props.columnOption;
    });
    const dataIngroup = computed(() => {
      return props.row;
    });
    const passPropToReview = (data) => {
      emit("passPropToReview", data);
    };
    const layout = ref("list");
    const layouts = ref([
      {
        icon: "/images/list.svg",
        id: "list",
        active: "/images/asTable.png",
      },
      {
        icon: "/images/asCard.png",
        id: "grid",
        active: "/images/asCard.png",
      },
    ]);
    watch(props.isByGroupTaple, (val) => {
      // ItemsOfGroup.value = [];

      if (val) {
        layout.value = "list";
      }
    });
    const chaeckCol = (col) => {
      emit("chaeckCol", col);
    };
    const duplicateSingleProp = (id) => {
      emit("duplicateSingleProp", id);
    };
    const passSingleGroupToEdit = (payload) => {
      emit("passSingleGroupToEdit", payload);
    };
    const singleGroupToDell = (id) => {
      emit("singleGroupToDel", id);
      // console.log(id);
    };
    const duplicSellected = () => {
      emit("duplicSellected");
    };
    const paginatiosChanged = () => {
      emit("paginatiosChanged");
    };
    const openDialogToCreate = () => {
      emit("openDialogToCreate");
    };
    const expostChart = () => {
      emit("exportChart");
    };
    const deleteSelected = () => {
      emit("deleteSelected");
    };
    const getByGroupUnit = (data) => {
      emit("getByGroupUnit", data);
    };
    const importChart = () => {
      emit("openImportDialog");
    };
    const propertyInProject = (data) => {
      emit("propertyInProject", data);
    };
    return {
      dataIngroup,
      expostChart,
      importChart,
      getByGroupUnit,
      deleteSelected,
      paginatiosChanged,
      propertyInProject,
      layout,
      layouts,
      chaeckCol,
      columnOptions,
      duplicateSingleProp,
      passSingleGroupToEdit,
      singleGroupToDell,
      passPropToReview,
      duplicSellected,
      openDialogToCreate,
      selectedCol,
    };
  },
};

// const dataIngroup = ref([]);
// const emit = defineEmits(["chaeckCol"]);
// const layout = ref("list");
// const layouts = ref([
//   {
//     icon: "/images/list.svg",
//     id: "list",
//   },
//   {
//     icon: "/images/grid.svg",
//     id: "grid",
//   },
// ]);
// const chaeckCol = (col) => {
//   // if (curentCol.value.some((el) => el.feild == col.feild)) {
//   //   let filteration = curentCol.value.filter((el) => {
//   //     return el.feild !== col.feild;
//   //   });
//   //   curentCol.value = filteration;
//   // } else {
//   //   curentCol.value.push(col);
//   // }
//   emit("chaeckCol", col);
// };
</script>

<style lang="scss" scoped>
.taple-container {
  margin: auto 20px;
  padding: 40px 25px;
  background: #ffffff;
  box-shadow: 0px 4px 39px 9px rgba(81, 69, 159, 0.09);
  border-radius: 15px;
  // height: calc(100% - 270px);
  height: 103vh;
  overflow: hidden;
}
.more-list {
  text-transform: capitalize;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.795);
  &__item {
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 15px;
  }
}
.table-metholds {
  height: 70px;
}
.table-review {
  height: 100%;
  overflow-y: auto;
}
</style>
