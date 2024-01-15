 <template>
  <q-card class="my-card">
    <div class="q-pa-lg">
      <div class="row">
        <div class="col-6 q-mb-md">
          <!-- ////////////// -->
          <!-- duplica action -->
          <!-- ////////////// -->
          <q-btn
            v-if="duplicate && select"
            @click="duplicSellectedProp"
            outline
            class="btn-component-duplicate"
            padding="10px 25px"
            :disable="sellected_group.length !== 1"
          >
            <img src="/images/duplicate.svg" class="q-mr-sm" />
            {{ $t("app.administration.charts.chartsProperty.duplicate") }}
          </q-btn>
        </div>
        <!-- <div class="col-4 q-mb-md q-px-lg"></div> -->
        <div class="col-6 q-mb-md row justify-end" style="flex-wrap: nowrap">
          <!-- ////////////// -->
          <!-- creat action -->
          <!-- ////////////// -->
          <q-btn
            v-if="createBtn"
            :label="$t('global.create')"
            class="q-ml-md btn-2 btn-component"
            :padding="q.screen.lt.md ? ' 8px 50px' : '10px 60px'"
            size="md"
            unelevated
            @click="openDialogToCreate"
            no-caps
          />
          <q-btn
            v-if="moreBtn.length"
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
              transition-show="scale"
              transition-hide="scale"
            >
              <q-list bordered separator style="min-width: 200px">
                <q-item
                  v-if="moreBtn.includes('export')"
                  clickable
                  @click="expostChart"
                >
                  <q-item-section>{{ $t("global.export") }}</q-item-section>
                </q-item>
                <q-item
                  v-if="moreBtn.includes('import')"
                  clickable
                  @click="startImportSteper"
                >
                  <q-item-section>{{ $t("global.import") }}</q-item-section>
                </q-item>
                <q-item
                  v-if="moreBtn.includes('copy')"
                  clickable
                  @click="copyselectedProperty"
                  :disable="sellected_group.length == 0"
                >
                  <q-item-section>{{ $t("global.copy") }}</q-item-section>
                </q-item>
                <q-item
                  v-if="moreBtn.includes('cut')"
                  :disable="sellected_group.length == 0"
                  clickable
                  @click="cutselectedProperty"
                >
                  <q-item-section>{{ $t("global.cut") }}</q-item-section>
                </q-item>
                <q-item
                  clickable
                  :disable="
                    copy_saved.length == 0 || immediately_group_id == null
                  "
                  v-if="moreBtn.includes('cut' || 'copy')"
                  @click="confirmPastProperty"
                >
                  <q-item-section>{{ $t("global.paste") }}</q-item-section>
                </q-item>
                <q-item
                  v-if="moreBtn.includes('delete')"
                  clickable
                  :disable="
                    sellected_group.length == 0 || sellected_group === []
                  "
                  @click="deleteSellectedProp"
                >
                  <q-item-section>{{ $t("global.delete") }}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
      <div class="row">
        <div class="col-sm-10 col-9">
          <!-- ///// -->
          <!-- taple -->
          <!-- ///// -->
          <dynamicTable
            :layout="layout"
            :data="dataIngroup"
            :colums="colums"
            :select="select"
            :filter="search"
            :isPendeng="isPendeng"
            :moreBtn="moreBtn"
            :isByGroupTaple="isByGroupTaple"
            @passSellectedGroup="getSellectedGroup"
            @singleItemToDel="singleItemToDell"
            @singleItemToEdit="singleItemToEdit"
            @singleGroupToDel="singleGroupToDell"
            @cutSingleProperty="cutSingleProperty"
            @copySingleProperty="copySingleProperty"
            @getByGroupUnit="getByGroupUnit"
            @singleGroupToEdit="passSingleGroupToEdit"
            @duplicateSingleProp="duplicateSingleProp"
            @getUnitOfProperty="UnitOfProperty"
            @passPropToReview="passPropToReview"
          />
          <!-- @passSellectedItems="getSellectedItems" -->
          <!-- :pinding_of_unit="pinding_of_unit" -->
        </div>
        <!-- ///////////// -->
        <!-- sellect group -->
        <!-- ///////////// -->
        <div class="col-3 col-sm-2 select-group">
          <div class="row q-col-gutter-sm q-mb-md justify-between text-center">
            <!-- //////////////////////////////////////////// -->
            <!-- sellected design for taple (tree or listed) -->
            <!-- //////////////////////////////////////////// -->
            <div
              class="col-6 custom-style-tabs"
              v-for="({ icon, id }, i) in layouts"
              :key="i"
            >
              <q-btn
                :disable="q.screen.lt.md || isByGroupTaple"
                :class="q.screen.lt.md ? 'q-pa-xs' : 'q-pa-sm'"
                :size="q.screen.lt.md ? 'sm' : 'md'"
                :outline="id == layout"
                @click="layout = id"
              >
                <img :src="icon" />
              </q-btn>
            </div>
          </div>
          <!-- ///////////////////// -->
          <!-- sellected group -->
          <!-- ///////////////////// -->
          <q-btn
            flat
            @click="getAllItemGroupData"
            style="width: 100%"
            class="q-mb-md q-pa-md list-buttons btn-trans text-bold border-add-main"
            :class="selectedGroup == null ? 'selected-group' : ''"
            color="white"
            text-color="black"
            >{{
              $t("app.administration.charts.chartsProperty.all_property")
            }}</q-btn
          >
          <!--  group item -->
          <template v-if="mainGroub.length">
            <q-btn
              v-for="(group, index) in mainGroub"
              :key="index"
              flat
              @click.self="getItemGroupData(group)"
              style="width: 100%; font-size: 16px"
              class="q-mb-md q-pa-md list-buttons btn-trans row justify-between"
              :class="group.id == selectedGroup ? 'selected-group' : ''"
              color="white"
              text-color="black"
            >
              <div @click.self="getItemGroupData(group)" class="col text-body1">
                {{ group.no + " - " }}
                {{
                  +group.translations.length !== 0
                    ? group.translations[0]?.name
                    : "N/A"
                }}
              </div>
            </q-btn>
          </template>
          <div
            v-else
            class="text-center text-body1 q-mb-md q-pa-md btn-trans row justify-center"
          >
            <span class="col"> Not found data </span>
          </div>
          <q-btn
            flat
            style="width: 100%"
            class="q-mb-md q-pa-lg list-buttons border-add-main"
            color="white"
            text-color="black"
            :label="$t('app.administration.charts.chartsProperty.group.add')"
            @click="createNewMainGroup"
          />
        </div>
      </div>
    </div>
  </q-card>
</template>

 <script>
import { useStore } from "vuex";
import { Loading, Notify, useQuasar } from "quasar";
import dynamicTable from "./table.vue";
import { sellected_group } from "./use";
import { ref } from "vue";
export default {
  components: { dynamicTable },
  props: {
    dataIngroup: {
      type: Array,
      default: () => [],
    },
    colums: {
      type: Array,
      default: () => [],
    },
    isPendeng: {
      type: Boolean,
      default: false,
    },
    isByGroupTaple: {
      type: Boolean,
      default: false,
    },
    duplicate: {
      type: String,
      default: null,
    },
    deleteAction: {
      type: String,
      default: null,
    },
    createBtn: {
      type: Boolean,
      default: false,
    },
    select: {
      type: Boolean,
      default: false,
    },
    mainGroub: {
      type: Array,
      default: () => [],
    },
    moreBtn: {
      type: Array,
      default: () => [],
    },
    // expostBtn:{
    //   type: Boolean,
    //   default:false
    // },
  },
  setup(prop, { emit }) {
    const q = useQuasar();
    const Store = useStore();
    const copy_saved = ref([]);
    const is_cut = ref(false);
    const layout = ref("list");

    const layouts = [
      {
        icon: "/images/list.svg",
        id: "list",
      },
      {
        icon: "/images/grid.svg",
        id: "grid",
      },
    ];
    const duplicateSingleProp = async (group) => {
      if (prop.duplicate !== null) {
        Loading.show();
        try {
          const response = await Store.dispatch(
            prop.duplicate,
            { id: group.id },
            { root: true }
          );

          if (response.data.value) {
            Loading.hide();
            remount();
            Notify.create({
              message: `Success duplicated`,
              classes: "notify-size",
              textColor: "green",
              position: "bottom",
              timeout: 8000,
            });
          }
        } catch (err) {
          Loading.hide();
          Notify.create({
            message: _error.data.errorMessage
              ? _error.data.errorMessage
              : _error.data,
            ...errOptions,
          });
        }
      }
    };
    const singleGroupToDell = async (group) => {
      Loading.show();
      if (prop.deleteAction !== null) {
        try {
          const response = await Store.dispatch(
            prop.deleteAction,
            { id: group.id },
            { root: true }
          );
          if (response.data.value) {
            Loading.hide();
            remount();
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
            ...errOptions,
          });
        }
      }
    };
    const duplicSellectedProp = async () => {
      Loading.show();
      if (prop.duplicate !== null) {
        try {
          const response = await Store.dispatch(
            prop.duplicate,
            { id: sellected_group.value.id },
            { root: true }
          );

          if (response.data.value) {
            Loading.hide();
            remount();
            Notify.create({
              message: `Success duplicated`,
              classes: "notify-size",
              textColor: "green",
              position: "bottom",
              timeout: 8000,
            });
          }
        } catch (err) {
          Loading.hide();
          Notify.create({
            message: _error.data.errorMessage
              ? _error.data.errorMessage
              : _error.data,
            ...errOptions,
          });
        }
      }
    };
    const openDialogToCreate = (group) => {
      emit("createDilaog");
    };
    const expostChart = () => {
      emit("exportDialog");
    };
    const passSingleGroupToEdit = (data) => {
      emit("editeDialog", data);
    };
    const passPropToReview = (data) => {
      emit("passItemToReview", data);
    };
    const getSellectedGroup = (item) => {
      sellected_group.value = item;
    };
    const cutSingleProperty = (property) => {
      copy_saved.value = [];
      copy_saved.value[0] = property.id;
      is_cut.value = true;
      Notify.create({
        message: `cut ${property.name}`,
        color: "white",
        textColor: "green",
        classes: "notify-size",
        position: "bottom",
        timeout: 8000,
        icon: "eva-checkmark-square-2",
      });
    };
    // cut single property
    const copySingleProperty = (property) => {
      copy_saved.value = [];
      copy_saved.value[0] = property.id;
      is_cut.value = false;
      Notify.create({
        message: `copy ${property.name}`,
        color: "white",
        textColor: "green",
        classes: "notify-size",
        position: "bottom",
        timeout: 8000,
        icon: "eva-checkmark-square-2",
      });
    };
    const remount = () => {
      emit("remount");
    };
    const getItemGroupData = (data) => {
      emit("getItemGroupData", data);
    };
    const getAllItemGroupData = () => {
      emit("getItemGroupData");
    };
    const createNewMainGroup = (data) => {
      emit("createNewMainGroup", data);
    };
    return {
      Store,
      getItemGroupData,
      createNewMainGroup,
      remount,
      layouts,
      getAllItemGroupData,
      duplicSellectedProp,
      cutSingleProperty,
      duplicateSingleProp,
      layout,
      copySingleProperty,
      passPropToReview,
      is_cut,
      passSingleGroupToEdit,
      copy_saved,
      getSellectedGroup,
      sellected_group,
      q,
      singleGroupToDell,
      expostChart,
      openDialogToCreate,
    };
  },
};
</script>

<style lang="scss" scoped>
.grid-card {
  border: 2px solid #e6e8ec;
  border-radius: 20px;
}

.text-OBS {
  font-weight: 500;
  font-size: 18px;
  line-height: 18px;
  color: #606060;
}

.q-treee .q-tree__node-header-content {
  font-weight: 500;
  font-size: 22px;
  line-height: 40px;
}

.q-treee .q-tree__arrow {
  font-size: 22px;
}

.q-treee .q-tree__arrow--rotate {
  color: green;
}

.table-chart {
  border-radius: 20px;
}

.table-chart thead tr th {
  border-bottom: 2px solid #e0e9f4;
}

.table-chart thead {
  background-color: #ffffff;
}

.table-chart .q-checkbox__inner--truthy .q-checkbox__bg {
  background-color: #ca79c6;
  border-color: #ca79c6;
}

.table-chart .text-grey-8 {
  color: #ca79c6 !important;
}

.card-heading {
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #9b9b9b;
}

.card-type {
  font-weight: 400;
  font-size: 16px;
  line-height: 20px;
  color: #000000;
}

.custome-toggle-dark .q-toggle__thumb:after,
.custome-toggle-dark .q-toggle__inner--truthy .q-toggle__thumb .q-icon {
  display: none;
}

.custome-toggle-dark .q-toggle__inner--truthy .q-toggle__track {
  opacity: 1;
}

.custome-toggle-dark .text-green {
  color: #00d92f !important;
}

.q-toggle__inner {
  font-size: 45px;
  padding: 0.325em 0.1em;
}

.custome-toggle-dark .q-toggle__track {
  opacity: 1;
  /* color: #F75C6C; */
}

.custome-toggle-dark .non-selectable {
  color: #e0e0e8;
}

.taxes-table .my-sticky-header-table .q-td {
  text-align: center;
}
.main-taple {
  max-height: 90vh;
  overflow-y: auto;
  &__head {
    position: sticky;
    top: 0;
    background: #ffffff;
    left: 0;
    font-weight: 700;
    font-size: 1.1rem;
    padding: 20px 0;
    border-bottom: 1px solid #9b9b9b46;
    z-index: 100;
  }
  &__body {
    // overflow-y: scroll;
    // max-height: 100%;s

    // border-bottom: 1px solid #9b9b9b46;
    &-group {
      font-size: 1rem;
      padding: 20px 0;
      color: #676767;
      font-weight: 500;
    }
    &-item {
      // background-color: #67676722;
      // background: #e0e0e862;
      font-weight: 500;
      font-size: 0.9rem;
      color: #000000;
      // padding: 10px 0;
    }
  }
}
.slide-fade-enter-active {
  transition: all 0.2s linear;
}

.slide-fade-leave-active {
  transition: all 0.2s linear;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
// .card-chart {
//   width: 10%;
//   flex: 1 1 30%;
// }
.chart-card {
  width: 30%;
  // flex: 1 1 30%;
  margin: 5px;
}
.active-card {
  transform: scale(0.95);
  background-color: #00000033;
}
.handel_transetion {
  transition: all 0.1s ease-in-out;
  cursor: pointer;
}
.handel-wrab {
  white-space: normal;
  overflow: hidden;
  word-break: break-all;
}
.chart-taple_height {
  height: 90vh;
}
</style>
