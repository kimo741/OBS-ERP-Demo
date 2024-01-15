<template>
  <q-card class="full-width">
    <q-card-section style="background-color: #edf4fc" class="row items-center">
      <div class="text-h5">Filter</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="row justify-around items-center">
      <!-- <div class="col-12 text-body1">Filter By</div> -->
      <div class="col-12">
        <q-select
          class="q-my-sm"
          clearable
          v-model="filter_scima.typeChart"
          :options="typeChartOptions"
          :label="$t('app.administration.charts.chartsProperty.filter_by')"
          emit-value
          map-options
          option-value="id"
        />
      </div>
    </q-card-section>
    <!-- /////////// -->
    <!-- if property -->
    <!-- /////////// -->
    <q-card-section
      v-if="filter_scima.typeChart == 1"
      class="row justify-around items-center"
    >
      <!-- <div class="col-12 text-body1">Property Type</div> -->
      <div class="col-12">
        <q-select
          class="q-my-sm"
          clearable
          v-model="filter_scima.type"
          :options="property_types"
          :label="$t('app.administration.charts.chartsProperty.property_type')"
          emit-value
          map-options
          option-value="id"
        />
      </div>
      <div class="col-12">
        <q-select
          class="q-my-sm"
          clearable
          v-model="filter_scima.type"
          :options="property_types"
          :label="$t('app.administration.charts.chartsProperty.property_type')"
          emit-value
          map-options
          option-value="id"
        />
      </div>
    </q-card-section>
    <!-- /////// -->
    <!-- if unit -->
    <!-- /////// -->
    <q-card-section v-else-if="filter_scima.typeChart == 2">
      <div class="row justify-around items-center">
        <!-- <div class="col-12 text-body1">Unit Type</div> -->
        <div class="col-12">
          <q-select
            class="q-my-sm"
            clearable
            v-model="filter_scima.unitType"
            :options="unit_types"
            :label="$t('app.administration.charts.chartsProperty.unit_type')"
            emit-value
            map-options
            option-value="id"
          />
        </div>
        <!-- <div class="col-12 text-body1">Unit Category</div> -->
        <div class="col-12">
          <q-select
            class="q-my-sm"
            v-model="filter_scima.unitCategory"
            :options="unit_category"
            :label="
              $t('app.administration.charts.chartsProperty.unit_category')
            "
            emit-value
            clearable
            map-options
            option-value="id"
          />
        </div>
        <!-- <div class="col-12 text-body1">Units status</div> -->
        <div class="col-12">
          <q-select
            class="q-my-sm"
            v-model="filter_scima.unitsStatus"
            :options="unitStatusList"
            :label="$t('app.administration.charts.chartsProperty.unit_status')"
            emit-value
            clearable
            map-options
            option-value="id"
          />
        </div>
      </div>
    </q-card-section>
    <q-card-section class="row">
      <div class="q-gutter-sm">
        <q-checkbox
          v-model="filter_scima.isActive"
          :label="$t('app.administration.charts.chartsProperty.active')"
        />
        <q-checkbox
          v-model="filter_scima.isFavorite"
          :label="$t('app.administration.charts.chartsProperty.is_favorite')"
        />
      </div>
      <div v-if="err_message !== ''" class="q-pt-sm col-12 text-red text-body1">
        {{ err_message }}
      </div>
    </q-card-section>
    <!-- action -->
    <q-card-actions class="row justify-end">
      <q-btn
        class="q-mx-sm"
        flat
        size="md"
        padding="15px 30px"
        label="close"
        v-close-popup
      />
      <q-btn
        unelevated
        style="border-radius: 10px"
        no-caps
        size="md"
        padding="15px 30px"
        :label="$t('app.administration.charts.chartsProperty.confirm')"
        outline
        color="primary"
        @click="confirmFilter"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref, onBeforeMount, onMounted } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions, useState, useMutations } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
import {
  property_types,
  unit_types,
  unit_category,
  drobDowns,
} from "../composables/reaquist.js";
export default {
  setup(prop, { emit }) {
    const err_message = ref("");
    const filter_scima = ref({
      typeChart: "",
      type: "",
      isActive: false,
      isFavorite: false,
      unitType: "",
      unitCategory: "",
      unitsStatus: "",
    });
    // dropdown type chart
    const typeChartOptions = ref([
      { label: "Property", id: 1 },
      { label: "Unit", id: 2 },
    ]);
    const unitStatusList = ref([
      { label: "Vacant", id: 1 },
      { label: "Occupied ", id: 2 },
      { label: "Under maintenance", id: 3 },
    ]);
    // action
    const { propertyType, unitType, unitCategory } = useActions([
      "propertyType",
      "unitType",
      "unitCategory",
    ]);
    // mutation
    const { CHACH_FILTER } = useMutations(["CHACH_FILTER"]);

    // state
    const { filterScimaCached } = useState(["filterScimaCached"]);
    // console.log(filter_scima);
    // api
    const { propertyTypes, unitTypes, unitCaregorys } = drobDowns(
      "",
      "", //polices //
      "",
      "",
      "",
      "", //city //
      "",
      "",
      propertyType,
      unitType,
      unitCategory,
      ""
    );
    // methods
    const confirmFilter = () => {
      if (filter_scima.value.typeChart === "") {
        err_message.value = "Must Select Property/Unit To Filter";
      } else {
        let result = [];
        let opj = filter_scima.value;
        // handel old value
        if (opj.typeChart == 1) {
          opj.unitType = "";
          opj.unitCategory = "";
          opj.unitsStatus = "";
        } else {
          opj.type = "";
        }
        // add all in array
        const isFoundIndex = (id, array) => {
          array.forEach((el) => {
            el.id == id ? result.push(el) : "";
          });
        };
        isFoundIndex(opj.typeChart, typeChartOptions.value);
        isFoundIndex(opj.type, property_types.value);
        isFoundIndex(opj.unitType, unit_types.value);
        isFoundIndex(opj.unitCategory, unit_category.value);
        isFoundIndex(opj.unitsStatus, unitStatusList.value);
        // console.log(result);
        emit("passSelectedFilter", { result: result, scima: opj });
        CHACH_FILTER(filter_scima.value);
      }
    };
    //  before mount
    onBeforeMount(() => {
      propertyTypes();
      unitTypes();
      unitCaregorys();
    });
    // mountd
    onMounted(() => {
      filter_scima.value = { ...filterScimaCached.value };
    });
    return {
      model: ref(""),
      confirmFilter,
      unit_types,
      unitStatusList,
      filter_scima,
      filterScimaCached,
      err_message,
      unit_category,
      property_types,
      groupByOptions: [
        "p.type",
        "Unit Type",
        "Unit Category",
        "Units’ status",
        "City",
        "State/ Region",
        "Country",
        "Creation Date",
        "Created by",
      ],
      typeChartOptions,
    };
  },
};
</script>

<style>
</style>
