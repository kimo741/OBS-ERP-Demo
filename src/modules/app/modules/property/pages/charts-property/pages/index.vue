<template>
  <q-page class="q-px-md q-my-md">
    <!-- //////// -->
    <!-- top side -->
    <!-- //////// -->
    <!-- {{ href }} -->
    <q-card class="filter-card">
      <!-- favorit action -->
      <!-- <div class="full-width">
        <q-btn
          @click="unFavoritPage()"
          icon="eva-bookmark"
          color="warning"
          flat
          size="lg"
          v-if="favorits_list.some((el) => el.url == href)"
        />
        <q-btn
          v-else
          @click="addToFavorits"
          icon="eva-bookmark-outline"
          color="warning"
          flat
          size="lg"
        />
      </div> -->
      <div class="bg-white shadow-1 q-pa-md q-mb-md">
        <div class="row q-mt-lg items-center user-select">
          <div class="col-md-4 col-12 text-bold">
            <h3>
              {{ $t("Property Details") }}
            </h3>
          </div>
          <!-- <div class="col-md-2"></div> -->
          <div class="col-md-8 col-12 q-pa-md select-component">
            <!-- //////////// -->
            <!-- input search -->
            <!-- //////////// -->
            <q-input
              outlined
              v-model="propertySearch"
              class=""
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
            </q-input>
            <!-- //////////// -->
            <!-- //////////// -->
            <!-- //////////// -->
          </div>
        </div>
        <!-- ///////////////////////// -->
        <!-- sellect to filter  -->
        <!-- ///////////////////////// -->
        <div
          class="row q-mt-lg items-center justify-end user-select select-component"
        >
          <div class="col-md-4 col-6 q-px-md" @click="dialog_filter = true">
            <q-select
              outlined
              multiple
              use-chips
              v-model="slected_filter"
              option-value="id"
              dense
              map-options
              :disable="isByGroupTaple"
              :label="$t('app.administration.charts.chartsProperty.filters')"
              style="margin: 0 1rem 0 0"
              @update:model-value="slectedFilterIsChanged"
            >
              <template v-slot:append>
                <q-avatar square>
                  <img src="images/icon-filter.png" />
                </q-avatar>
              </template>
            </q-select>
          </div>
          <div class="col-md-4 col-6 q-px-md">
            <!-- //////////////// -->
            <!-- sellect group by -->
            <!-- //////////////// -->
            <!-- <q-select
              outlined
              v-model="groupByModel"
              :options="groupByOptions"
              :label="$t('app.administration.charts.chartsProperty.group_by')"
              debounce="500"
              emit-value
              option-value="id"
              map-options
            /> -->
            <q-btn
              class="q-mr-md"
              size="md"
              flat
              label="Group by"
              icon="img:images/groupB.png"
              color="#606060"
            >
              <q-menu style="padding: 15px !important ; width: 250px">
                <q-list
                  style="border: 1px solid #e5e4e4 !important"
                  class="rounded-borders more-list"
                >
                  <q-item
                    v-for="(group, i) in groupByOptions"
                    :key="i"
                    class="full-width flex"
                  >
                    <!-- <q-item-section class="full-width q-my-lg">
                      <q-separator
                        v-if="i == 4"
                        class="full-width"
                        color="gray-2"
                      />
                    </q-item-section> -->
                    <div style="cursor: pointer; width: 30px">
                      <q-icon
                        v-show="groupByModel == group.id"
                        name="eva-checkmark-outline"
                        @click="selectGroupBy(group)"
                      />
                    </div>
                    <div style="cursor: pointer" @click="selectGroupBy(group)">
                      {{ group.label }}
                    </div>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-btn
              @click="unFavoritPage"
              icon="eva-bookmark"
              color="warning"
              label="Favorites"
              flat
              v-if="favorits_list.some((el) => el.url == href)"
            />
            <!-- size="lg" -->
            <q-btn
              v-else
              class="q-mr-md"
              flat
              label="Unfavorites"
              icon="img:images/fav-icon.png"
              color="#606060"
              @click="addToFavorits"
            />
            <!-- <q-btn
              class="q-mr-md"
              flat
              label="Add visit"
              @click="handelCreateVisit"
            /> -->
          </div>
          <!-- <div class="col-md-4 col-12">
            <q-select
              :options="company_list"
              outlined
              v-model="user_company"
              :label="$t('app.administration.charts.chartsProperty.company')"
              option-value="id"
              fill-input
              emit-value
              map-options
            />
          </div> -->
        </div>
      </div>
    </q-card>
    <!-- ////////////////////////////////// -->
    <!-- action taple (add , edit , delete) -->
    <!-- ////////////////////////////////// -->
    <q-card class="my-card table-card">
      <div class="">
        <div class="row">
          <div class="col-6 q-mb-md">
            <!-- ////////////// -->
            <!-- duplica action -->
            <!-- ////////////// -->
            <q-btn
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
              :label="$t('global.create')"
              class="q-ml-md btn-2 btn-component"
              :padding="q.screen.lt.md ? ' 8px 50px' : '10px 60px'"
              size="md"
              unelevated
              @click="openDialogToCreate"
              no-caps
            />
            <!-- ///////////// -->
            <!-- sellect view -->
            <!-- ///////////// -->
            <div
              class="q-px-md custom-style-tabs"
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
                transition-show="scale"
                transition-hide="scale"
              >
                <q-list bordered separator style="min-width: 200px">
                  <q-item clickable @click="expostChart">
                    <q-item-section>{{ $t("global.export") }}</q-item-section>
                  </q-item>
                  <q-item clickable @click="startImportSteper">
                    <q-item-section>{{ $t("global.import") }}</q-item-section>
                  </q-item>
                  <q-item
                    clickable
                    @click="copyselectedProperty"
                    :disable="sellected_group.length == 0"
                  >
                    <q-item-section>{{ $t("global.copy") }}</q-item-section>
                  </q-item>
                  <q-item
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
                    @click="confirmPastProperty"
                  >
                    <q-item-section>{{ $t("global.paste") }}</q-item-section>
                  </q-item>
                  <q-item
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
          <div class="col-sm-12 col-9 table-review full-height">
            <!-- ///// -->
            <!-- taple -->
            <!-- ///// -->
            <chart-tree
              :layout="layout"
              :data="dataIngroup"
              :isPendeng="isPendeng"
              :pinding_of_unit="pinding_of_unit"
              :isByGroupTaple="isByGroupTaple"
              @passSellectedGroup="getSellectedGroup"
              @changePagentaion="changePagentaion"
              @passSellectedItems="getSellectedItems"
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
          </div>

          <!-- <div class="col-3 col-sm-2 select-group">
            <div
              class="row q-col-gutter-sm q-mb-md justify-between text-center"
            > -->
          <!-- //////////////////////////////////////////// -->
          <!-- sellected design for taple (tree or listed) -->
          <!-- //////////////////////////////////////////// -->
          <!-- <div
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
              </div> -->
          <!-- </div> -->
          <!-- ///////////////////// -->
          <!-- sellected group -->
          <!-- ///////////////////// -->
          <!-- <q-btn
              flat
              @click="getAllItemGroupData()"
              style="width: 100%"
              class="q-mb-md q-pa-md list-buttons btn-trans text-bold border-add-main"
              :class="selectedGroup == null ? 'selected-group' : ''"
              color="white"
              text-color="black"
              >{{
                $t("app.administration.charts.chartsProperty.all_property")
              }}</q-btn
            > -->
          <!--  group item -->
          <!-- <q-btn
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
              <q-btn
                text-color="grey-6"
                color="grey-7"
                round
                flat
                class="col-1 float-right col-2 main"
                icon="more_vert"
              >
                <q-menu
                  fit
                  auto-close
                  transition-show="jump-down"
                  transition-hide="jump-up"
                >
                  <q-list style="min-width: 200px">
                    <q-item clickable @click="editMainGroup(group)">
                      <q-item-section>{{ $t("global.edit") }}</q-item-section>
                    </q-item>
                    <q-item clickable @click="singleGroupToDell(group)">
                      <q-item-section>{{ $t("global.delete") }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-btn> -->
          <!-- //////////////// -->
          <!-- create group btn -->
          <!-- //////////////// -->
          <!-- <q-btn
              flat
              style="width: 100%"
              class="q-mb-md q-pa-lg list-buttons border-add-main"
              color="white"
              text-color="black"
              :label="$t('app.administration.charts.chartsProperty.group.add')"
              @click="createNewMainGroup"
            />
          </div>-->
        </div>
      </div>
    </q-card>
  </q-page>
  <!-- /////////////////// -->
  <!-- dialog create group -->
  <!-- /////////////////// -->
  <q-dialog
    v-model="create_dialog"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <!-- //////////////////// -->
    <!-- create group content -->
    <!-- //////////////////// -->
    <q-card class="set-dialog-bg" style="width: 800px">
      <q-card-section class="q-pa-lg">
        <div v-if="!isEditMainGroup" class="text-h4 text-white">
          {{ $t("app.administration.charts.chartsItems.group.create.title") }}
        </div>
        <div v-else class="text-h4 text-white">
          {{
            $t(
              "app.administration.charts.chartsItems.group.create.title_update"
            )
          }}
        </div>
      </q-card-section>

      <q-card-section
        v-if="!isEditMainGroup"
        class="text-h6 q-pt-none text-white q-pa-lg"
      >
        {{
          $t("app.administration.charts.chartsItems.group.create.dicruption")
        }}
      </q-card-section>
      <q-card-section v-else class="text-h6 q-pt-none text-white q-pa-lg">
        {{
          $t(
            "app.administration.charts.chartsItems.group.create.dicruption_update"
          )
        }}
      </q-card-section>

      <q-card-section class="bg-white q-pa-lg">
        <!-- no -->
        <q-input
          v-model="create_maingroup_scima.no"
          class="q-my-sm"
          type="number"
          :label="
            $t(
              'app.administration.charts.chartsItems.group.create.group_number'
            )
          "
        />
        <!-- <q-input
          v-model="create_maingroup_scima.noStr"
          class="q-my-sm"
          type="text"
          label="Character"
        /> -->
        <!-- translate -->
        <!-- <q-select
          class="q-my-sm"
          v-model="create_maingroup_scima.translations[0].languageId"
          :options="translateOpstions"
          :label="$t('app.administration.charts.chartsProperty.language')"
          emit-value
          map-options
          option-value="id"
        /> -->
        <!-- name -->
        <q-input
          class="q-my-sm"
          v-model="create_maingroup_scima.translations[0].name"
          :label="$t('global.name')"
        />
      </q-card-section>
      <q-card-actions align="right" class="bg-white text-teal q-pa-md">
        <q-btn
          v-if="!isEditMainGroup"
          class="q-ml-md btn-2 btn-component"
          size="md"
          padding="15px 30px"
          unelevated
          :to="to"
          no-caps
          :label="$t('global.create')"
          v-close-popup
          @click="createGroup"
        />
        <q-btn
          v-else
          class="q-ml-md btn-2 btn-component"
          padding="15px 20px"
          color="green"
          unelevated
          :to="to"
          no-caps
          :label="$t('global.edit')"
          v-close-popup
          @click="confirmUpdateMainGroup"
        />
        <q-btn
          class="q-ml-md btn-component"
          size="md"
          padding="15px 30px"
          style="color: black"
          unelevated
          :to="to"
          no-caps
          :label="$t('global.cancel')"
          outline
          v-close-popup
          @click="create_dialog = false"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- /////////////////////// -->
  <!-- property Create Dialog  -->
  <!-- /////////////////////// -->
  <q-dialog
    v-model="createItemDialog"
    transition-show="scale"
    transition-hide="scale"
    full-width
    full-height
    persistent
  >
    <!-- //////////////////////// -->
    <!-- create realestat content -->
    <!-- //////////////////////// -->
    <DialogCard
      :translateOpstions="translateOpstions"
      :vendorslist="vendors_list"
      :cuntriesList="cuntries_List"
      :ragion_list="ragion_list"
      :customer_list="customer_list"
      :propToEdit="propToEdit"
      :propTypes="property_types"
      :tag_list="tag_list"
      :blocks_options="blocks_options"
      :cashed_block_options="cashed_block_options"
      :floor_options="floor_options"
      :company_list="company_list"
      :is_review_from_card="is_review_from_card"
      :mainGroupOpsions="mainGroupOpsions"
      @updatePropertyOfGroup="updatePropertyOfGroup"
      @createPropertyOfGroup="createPropertyOfGroup"
      @changeSelectedBlock="changeSelectedBlock"
    />
  </q-dialog>
  <!-- ///////////// -->
  <!-- delete dialog -->
  <!-- ///////////// -->
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
        <div class="text-h5">
          {{ $t("app.administration.charts.chartsProperty.confirm_dell") }}
        </div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="row justify-between items-center">
        <div v-if="deleteIsMulti" class="col text-h6">
          {{
            $t("app.administration.charts.chartsProperty.confirm_dell_title")
          }}
          <!-- <span style="font-weight: bold">{{
            " " + prop_to_del.creationTypeName
          }}</span> -->
        </div>
        <div v-else class="col text-h6">
          {{
            $t("app.administration.charts.chartsProperty.confirm_dell_title")
          }}
          <!-- <span style="font-weight: bold">{{
            " " + prop_to_del.creationTypeName
          }}</span> -->
        </div>
      </q-card-section>
      <q-card-actions class="row">
        <q-btn
          class="q-mx-sm"
          flat
          size="lg"
          padding="10px 30px"
          label="close"
          v-close-popup
          @click="delete_dialog = false"
        />
        <q-btn
          unelevated
          style="border-radius: 10px"
          no-caps
          size="md"
          padding="15px 30px"
          :label="$t('global.delete')"
          outline
          color="red-8"
          @click="deleteProperty"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- dilaog filter -->
  <q-dialog
    v-model="dialog_filter"
    persistent
    transition-show="scale"
    transition-hide="scale"
  >
    <dialog-card-filter @passSelectedFilter="getSelectedFilters" />
  </q-dialog>
  <!-- dialog import -->
  <q-dialog
    v-model="dialog_import"
    full-width
    persistent
    full-height
    transition-show="scale"
    transition-hide="scale"
  >
    <import-stiper-card
      @downloadTemplate="downloadTemplate('Property_template')"
      @passFileToUpload="importChartFile"
      @passDataToChech="chechImportErrors"
      @closeImportDialog="dialog_import = false"
      @handleDeleteSectorImport="handleDeleteSectorImport"
      :mainGroub="mainGroupOpsions"
      :chchErrorResult="chchErrorResult"
      :responsFromImport="responsFromImport"
      :mainGroupNumberVal="mainGroupNumberVal"
      :checkErrPending="checkErrPending"
      :property_types="property_types"
    />
  </q-dialog>
  <!-- <q-dialog
    v-model="visitDialogModel"
    persistent
    full-width
    transition-show="scale"
    transition-hide="scale"
  >
    <visitDialog @closeDialog="visitDialogModel = false" />
  </q-dialog> -->
</template>

<script>
import chartTree from "../components/chart-tree.vue";
import { useRouter } from "vue-router";
import DialogCard from "../components/dialog-card.vue";
import dialogCardFilter from "../components/dialog-card-filter.vue";
import importStiperCard from "../components/importStiperCard.vue";
import { ref, shallowRef, reactive } from "@vue/reactivity";
// import visitDialog from "../components/visit-dialog.vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { computed, onMounted, watch, onBeforeMount } from "@vue/runtime-core";
const { useActions: useFavoritAction } = createNamespacedHelpers("AppModule");
import { Loading, Notify, useQuasar, LocalStorage } from "quasar";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
import {
  translateOpstions,
  realestate_types_list,
  create_maingroup_scima,
  vendors_list,
  mainGroub,
  chchErrorResult,
  checkErrPending,
  blocks_options,
  cashed_block_options,
  responsFromImport,
  mainGroupNumberVal,
  floor_options,
  immediatly_filter,
  isPendeng,
  pinding_of_unit,
  mainGroupOpsions,
  ragion_list,
  is_review_from_card,
  propToEdit,
  propertySearch,
  isBySingleProperty,
  customer_list,
  selectedGroup,
  tag_list,
  // t,
  sellected_group,
  createItemDialog,
  property_types,
  groupByModel,
  prop_to_del,
  isByGroupTaple,
  copy_saved,
  company_list,
  requist,
  // groupByModel,
  companyModel,
  cuntries_List,
  create_dialog,
  is_cut,
  immediately_group_id,
  dataIngroup,
  drobDowns,
} from "../composables/reaquist.js";

export default {
  components: {
    chartTree,
    importStiperCard,
    DialogCard,
    dialogCardFilter,
    // visitDialog,
  },
  setup() {
    // Store
    const { createFavorits, getFavorits, deleteFavorits } = useFavoritAction([
      "createFavorits",
      "getFavorits",
      "deleteFavorits",
    ]);
    const {
      getGroups,
      createMainGroup,
      updateMainGroup,
      getTranslateList,
      getCountriesList,
      getRealestateTypes,
      getVendorsList,
      getRagionList,
      mainSearchRealState,
      exportChart,
      getCustomersList,
      getMainGroupById,
      pastProperty,
      duplicateRealState,
      deleteRealState,
      getCompanyList,
      getByGroup,
      getByGroupUint,
      getUnitOfProperty,
      getPropertyById,
      createProperty,
      updateProperty,
      importChart,
      propertyType,
      getTagList,
      filtersForTaple,
      getBlockList,
      getFloorList,
      chechErrors,
      dropdownListMainGroups,
      downloadPropertyTemplate,
    } = useActions([
      "getGroups",
      "createMainGroup",
      "updateMainGroup",
      "getTranslateList",
      "getCountriesList",
      "getRealestateTypes",
      "getVendorsList",
      "getRagionList",
      "mainSearchRealState",
      "exportChart",
      "getCustomersList",
      "getMainGroupById",
      "pastProperty",
      "duplicateRealState",
      "deleteRealState",
      "getCompanyList",
      "getByGroup",
      "getByGroupUint",
      "getUnitOfProperty",
      "getPropertyById",
      "createProperty",
      "updateProperty",
      "importChart",
      "propertyType",
      "getTagList",
      "filtersForTaple",
      "getBlockList",
      "getFloorList",
      "chechErrors",
      "dropdownListMainGroups",
      "downloadPropertyTemplate",
    ]);

    // Lifecycle
    // ref
    const q = useQuasar();
    const groups = ref([]);
    // const href = useRoute().name;
    const favorits_list = ref([]);
    const visitDialogModel = ref(false);
    const isEditMainGroup = ref(false);
    const keyWillChange = ref("");
    const slected_filter = ref([]);
    const user_company = ref("");
    const dialog_filter = ref(false);
    const dialog_import = ref(false);
    const sellected_item = ref([]);
    const single_item_del = ref({});
    const delete_dialog = ref(false);
    // to review all data from card
    // const is_review_from_card = ref(false);
    // const groupByModel = ref();
    // toggle to handel dialog to delete Item or group
    const deleteIsMulti = ref(true);
    //////////////////////////////
    const search = ref("");

    const groupNo = ref();
    const groupName = ref("");
    const href = computed(() => {
      return window.location.pathname;
    });
    // const createItemDialog = ref(false);
    // const seletedItem = ref([]);
    // watch
    watch(groupByModel, (val) => {
      // req api to get groupby
      if (val === "" || val == "None") {
        // getItemGroupData({ id: immediately_group_id.value });
        getItemGroupData();
        // isByGroupTaple.value = false;
      } else {
        selectByGroups();
        // isByGroupTaple.value = true;
      }
    });
    watch(slected_filter, (newVal, oldVal) => {
      let model = immediatly_filter.value;
      // req api to get groupby
      if (newVal.length < oldVal.length) {
        // let keyWillChange;
        let chngedVal = oldVal.filter((x) => !newVal.includes(x));
        console.log(model);
        getKeyByValue(model, chngedVal);
        model[keyWillChange.value] = "";
        filterPropertys(model);
      }
    });
    // handel broub by => disaple view as card
    watch(isByGroupTaple, (val) => {
      // ItemsOfGroup.value = [];
      if (val === true) {
        layout.value = "list";
      }
    });
    // api
    // all dropdown req
    const {
      translate,
      floorList,
      blockList,
      cuntriesList,
      realestateTypes,
      vendorList,
      propertyTypes,
      ragionList,
      customersList,
      companyList,
      tagList,
      // getMainGroupLookUps,
    } = drobDowns(
      getTranslateList,
      "", //polices //
      getCountriesList,
      getRealestateTypes,
      getVendorsList,
      "", //city //
      getRagionList,
      getCustomersList,
      propertyType,
      "",
      "",
      getCompanyList,
      getTagList,
      getBlockList,
      getFloorList,
      dropdownListMainGroups
    );
    ////////////////////////
    // requist api
    ///////////////////////
    const {
      getMainGroub,
      createGroup,
      confirmUpdateMainGroup,
      getPropertyBysearch,
      expostChart,
      getItemGroupData,
      confirmPastProperty,
      duplicateProperty,
      deleteProperty,
      glopalSearch,
      getByGroupUnit,
      selectByGroups,
      UnitOfProperty,
      singleGroupToEdit,
      updatePropertyOfGroup,
      createPropertyOfGroup,
      importChartFile,
      filterPropertys,
      chechImportErrors,
    } = requist(
      getGroups,
      createMainGroup,
      updateMainGroup,
      mainSearchRealState,
      exportChart,
      getMainGroupById,
      pastProperty,
      duplicateRealState,
      deleteRealState,
      mainSearchRealState,
      getByGroup,
      getByGroupUint,
      getUnitOfProperty,
      getPropertyById,
      createProperty,
      updateProperty,
      importChart,
      filtersForTaple,
      chechErrors
    );
    // methodth
    const handelCreateVisit = () => {
      visitDialogModel.value = true;
    };
    const changePagentaion = () => {
      getItemGroupData();
    };
    const getKeyByValue = (obj, val) => {
      return (keyWillChange.value = Object.keys(obj).find(
        (key) => obj[key] == val[0].id
      ));
    };
    const getSellectedGroup = (item) => {
      sellected_group.value = item;
    };
    const getSellectedItems = (item) => {
      sellected_item.value = item;
    };
    const singleItemToDell = (item) => {
      single_item_del.value = item;
      deleteIsMulti.value = false;
      delete_dialog.value = true;
    };
    const singleGroupToDell = (group) => {
      prop_to_del.value[0] = group.id;
      deleteIsMulti.value = false;
      delete_dialog.value = true;
      // console.log(group);
    };
    // get selected filter
    const getSelectedFilters = (filterValue) => {
      slected_filter.value = filterValue.result;
      dialog_filter.value = false;
      console.log(filterValue);
      filterPropertys(filterValue.scima);
      immediatly_filter.value = { ...filterValue.scima };
    };
    //get all property of all groups
    const getAllItemGroupData = () => {
      getItemGroupData();

      selectedGroup.value = null;
      immediately_group_id.value = null;
    };
    // const getByGroupUint = () => {};
    // const confirmDeleteGroup = (prop) => {};/
    // get By group property
    // const getByGroupProperty = (group) => {

    //   selectByGroups(group)
    // };
    const confirmDeleteItem = () => {};
    const singleItemToEdit = (group) => {
      // get all data about item to edit it
      // opem dialog to edit
    };
    const openDialogToCreate = (group) => {
      propToEdit.value = false;
      createItemDialog.value = true;
      is_review_from_card.value = false;
    };

    const slectedFilterIsChanged = (val) => {};
    // copy single property
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
    // copy multi property
    const copyselectedProperty = () => {
      copy_saved.value = sellected_group.value.map((el) => el.id);
      is_cut.value = false;
      Notify.create({
        message: `copy selected property`,
        color: "white",
        textColor: "green",
        classes: "notify-size",
        position: "bottom",
        timeout: 8000,
        icon: "eva-checkmark-square-2",
      });
    };
    // cut multi property
    const cutselectedProperty = () => {
      copy_saved.value = sellected_group.value.map((el) => el.id);
      is_cut.value = true;
      Notify.create({
        message: `cut selected property`,
        color: "white",
        textColor: "green",
        classes: "notify-size",
        position: "bottom",
        timeout: 8000,
        icon: "eva-checkmark-square-2",
      });
    };
    // start import steper
    const startImportSteper = () => {
      dialog_import.value = true;
    };
    // download template
    const downloadTemplate = (title) => {
      Loading.show();
      downloadPropertyTemplate()
        .then((res) => {
          Loading.hide();
          const url = window.URL.createObjectURL(new Blob([res.data]));
          console.log(res);
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
    // delete  selected property
    const deleteSellectedProp = () => {
      prop_to_del.value = sellected_group.value.map((el) => el.id);
      deleteIsMulti.value = true;
      delete_dialog.value = true;
    };
    // duplicate Single Property
    const duplicateSingleProp = (prop) => {
      isBySingleProperty.value = true;
      duplicateProperty(prop);
    };
    // duplicate selected Property
    const duplicSellectedProp = (prop) => {
      isBySingleProperty.value = false;
      let selected = sellected_group.value.map((el) => el.id);
      // console.log(...selected);
      duplicateProperty(sellected_group.value);
    };
    // data  review
    const passPropToReview = (prop) => {
      is_review_from_card.value = true;
      singleGroupToEdit(prop);
    };
    const passSingleGroupToEdit = (prop) => {
      is_review_from_card.value = false;
      propToEdit.value = true;
      singleGroupToEdit(prop);
    };
    //////////////// change selected block
    const changeSelectedBlock = (filterSelected) => {
      blocks_options.value = filterSelected;
    };
    // glopal Past
    // const confirmPastProperty = () => {
    //   Loading.show();
    //   pastProperty();
    // };
    const getMyCompanyId = () => {
      const app_setting = LocalStorage.getItem("@APP_SETTINGS");
      console.log(app_setting);
      if (app_setting.profile.companyId !== "") {
        user_company.value = app_setting.profile.companyId;
      }
    };
    const handleDeleteSectorImport = (row) => {
      const index = responsFromImport.value.findIndex((el) => el.no == row.no);
      responsFromImport.value.splice(index, 1);
    };
    const deleteMainGroup = (data) => {};
    const createNewMainGroup = () => {
      create_maingroup_scima.value = {
        no: "",
        // noStr: "",
        isActive: true,
        translations: [
          {
            languageId: 1,
            name: "",
          },
        ],
      };
      isEditMainGroup.value = false;
      create_dialog.value = true;
    };
    const editMainGroup = (payload) => {
      // console.log(payload);
      // let obj = Object.create(payload);
      const obj = { ...payload };
      console.log(obj);
      create_maingroup_scima.value = {
        id: obj.id,
        no: obj.no,
        // noStr: obj.noStr,
        isActive: true,
        translations: [
          {
            languageId: 1,
            name: obj.translations[0].name,
          },
        ],
      };
      create_dialog.value = true;
      isEditMainGroup.value = true;
    };
    const addToFavorits = () => {
      // const path = useRoute().name;
      const app_setting = LocalStorage.getItem("@APP_SETTINGS");
      const payload = {
        comapnyId: app_setting.profile.companyId,
        url: window.location.pathname,
      };
      createFavorits(payload)
        .then((res) => {
          getFavoritsList();
          Notify.create({
            message: `Success add ${window.location.pathname} to favorits`,
            classes: "notify-size",
            textColor: "green",
            position: "bottom",
            timeout: 8000,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const getFavoritsList = async () => {
      const app_setting = LocalStorage.getItem("@APP_SETTINGS");
      const company = await app_setting.profile.companyId;
      getFavorits(company)
        .then((res) => {
          favorits_list.value = res.data.value;
          console.log(res.data.value);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const unFavoritPage = () => {
      const selected_fav = favorits_list.value.filter(
        (el) => el.url == href.value
      );
      const { id } = selected_fav[0];
      deleteFavorits(id)
        .then((res) => {
          getFavoritsList();
          Notify.create({
            message: `Success delete ${selected_fav[0].url} from favorits`,
            textColor: "red",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const selectGroupBy = (select) => {
      groupByModel.value = select.id;
    };
    // Mounted
    onBeforeMount(() => {
      getFavoritsList();
      // getMainGroub();
      floorList();
      blockList();
      getItemGroupData();
      translate();
      cuntriesList();
      tagList();
      realestateTypes();
      vendorList();
      customersList();
      propertyTypes();
      ragionList();
      companyList();
      // getMainGroupLookUps();
      getMyCompanyId();
    });
    onMounted(() => {
      // if (LocalStorage.getItem("defLanguage")) {
      LocalStorage.set("defLanguage", 4);
      // console.log("if" + "-----" + LocalStorage.getItem("defLanguage"));
      // }
      getMyCompanyId();
      console.log(q);
      if (q.screen.lt.md) {
        layout.value = "grid";
      }
    });
    // Some logics
    // Layout with tabs code here
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

    return {
      //using State
      getKeyByValue,
      user_company,
      groups,
      deleteMainGroup,
      createGroup,
      confirmUpdateMainGroup,
      getSellectedGroup,
      propertyTypes,
      handleDeleteSectorImport,
      changeSelectedBlock,
      downloadTemplate,
      keyWillChange,
      createPropertyOfGroup,
      propToEdit,
      chechImportErrors,
      selectGroupBy,
      updateMainGroup,
      responsFromImport,
      isEditMainGroup,
      getMyCompanyId,
      blocks_options,
      floor_options,
      passPropToReview,
      visitDialogModel,
      passSingleGroupToEdit,
      isByGroupTaple,
      deleteSellectedProp,
      updatePropertyOfGroup,
      startImportSteper,
      mainGroupNumberVal,
      duplicateSingleProp,
      company_list,
      changePagentaion,
      createNewMainGroup,
      openDialogToCreate,
      importChartFile,
      isPendeng,
      UnitOfProperty,
      duplicSellectedProp,
      glopalSearch,
      propertySearch,
      immediately_group_id,
      pinding_of_unit,
      tag_list,
      groupByModel,
      copyselectedProperty,
      ragion_list,
      confirmPastProperty,
      deleteProperty,
      href,
      isBySingleProperty,
      is_review_from_card,
      getItemGroupData,
      dialog_import,
      cashed_block_options,
      slectedFilterIsChanged,
      dialog_filter,
      property_types,
      cutselectedProperty,
      singleGroupToEdit,
      customer_list,
      q,
      checkErrPending,
      copySingleProperty,
      // confirmDeleteGroup,
      copy_saved,
      cutSingleProperty,
      handelCreateVisit,
      getSelectedFilters,
      is_cut,
      delete_dialog,
      chchErrorResult,
      confirmDeleteItem,
      deleteIsMulti,
      selectByGroups,
      singleItemToDell,
      singleItemToEdit,
      immediatly_filter,
      getSellectedItems,
      single_item_del,
      expostChart,
      favorits_list,
      mainGroub,
      editMainGroup,
      groupByOptions: [
        {
          label: "None",
          id: "None",
        },
        {
          label: "p.type",
          id: "Type",
        },
        {
          label: "Unit Type",
          id: "Unit Type",
        },
        {
          label: "Unit Category",
          id: "Unit Category",
        },
        {
          label: "Units’ status",
          id: "Units status",
        },
        {
          label: "City ",
          id: "City",
        },
        {
          label: "State/ Region",
          id: " State/Region",
        },
        {
          label: "Country",
          id: "Country",
        },
        {
          label: "Activation",
          id: "Activation",
        },
        {
          label: "Creation Date",
          id: "Creation Date",
        },
        {
          label: "Created by",
          id: "Created by",
        },
      ],
      // groupByModel,
      companies: [
        "company 1",
        "company 2",
        "company 3",
        "company 4",
        "company 5",
      ],
      companyModel,
      filters: ["User Name", "User Type", "Email", "Language", "Company"],
      tab: ref("mails"),
      dataIngroup,
      getAllItemGroupData,
      search,
      layouts,
      prop_to_del,
      sellected_group,
      addToFavorits,
      getByGroupUnit,
      mainGroupOpsions,
      sellected_item,
      getPropertyBysearch,
      // t,
      singleGroupToDell,
      vendors_list,
      cuntries_List,
      cuntriesList,
      getFavoritsList,
      realestate_types_list,
      layout,
      unFavoritPage,
      slected_filter,
      selectedGroup,
      create_dialog,
      createItemDialog,
      groupNo,
      create_maingroup_scima,
      groupName,
      translateOpstions,

      // CreateItemDialog
      teal: ref(true),
      orange: ref(true),
      model: ref(null),
      options: [
        {
          label: "google",
          id: "1",
        },
        {
          label: "google",
          id: "2",
        },
        {
          label: "google",
          id: "3",
        },
        {
          label: "google",
          id: "4",
        },
        {
          label: "google",
          id: "5",
        },
      ],
      modelMultiple: ref([]),
      ItemTab: ref("general"),

      // Methods
      // getItemGroupData,
      // createGroup,
      // handleDuplicateItem,
      // duplicateItem,
      // /////////////////////
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
.selected-group {
  background-color: #e8e8e8;
}
.set-dialog-bg {
  background-color: #2b4c6b;
}
.btn-trans {
  text-transform: unset;
}
.border-add-main {
  border: 1px solid black;
}
.create-item .avatar-picker-cover {
  font-size: 250px !important;
}
.create-item .q-tab__label {
  font-size: 15px;
}
.tag-style {
  right: 160px !important;
}
.select-group {
  height: 100%;
  overflow-y: auto;
}
.table-card {
  height: calc(130vh - 270px);
  overflow-y: auto;
  box-shadow: 0px 4px 39px 9px rgba(81, 69, 159, 0.09);
  margin: 20px 10px 15px 10px;
  padding: 40px 25px;
}
.filter-card {
  border-radius: 15px;
  /* box-shadow: none; */
  box-shadow: 0px 4px 39px 9px rgba(81, 69, 159, 0.09);
  margin: 20px 10px 15px 10px;
}
/* .main-group_action {
  position: absolute;
  right: 5px;
  top: 10px;
} */
</style>
