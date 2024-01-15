<template>
  <div v-if="layout === 'list'" class="border-chart q-mr-lg full-height">
    <q-markup-table flat class="table-chart">
      <thead>
        <tr>
          <th class="text-center">
            <q-checkbox v-model="selectAll" />
          </th>
          <th class="text-center">#</th>
          <th class="text-center">
            {{ $t("app.administration.charts.chartsItems.taple.prop_name") }}
          </th>
          <th class="text-center">
            {{ $t("app.administration.charts.chartsItems.taple.type") }}
          </th>
          <th class="text-center">
            {{ $t("app.administration.charts.chartsItems.taple.status") }}
          </th>
          <th class="text-center">
            {{ $t("app.administration.charts.chartsItems.taple.address") }}
          </th>
          <th class="text-center">
            {{ $t("app.administration.charts.chartsItems.taple.active") }}
          </th>
        </tr>
      </thead>
      <tbody v-if="mainData.length > 0">
        <tr v-for="(row, index) in mainData" :key="index">
          <td class="text-center">
            <q-checkbox
              v-model="selectedRow"
              :val="row.no"
              @update:model-value="chooseActive()"
            />
          </td>
          <td class="text-center">{{ row.no }}</td>
          <td class="text-center">{{ row.translations[0].name }}</td>
          <td class="text-center">{{ row.barCode }}</td>
          <td class="text-center">{{ row.type }}</td>
          <td class="text-center">{{ row.uomName ? row.uomName : "--" }}</td>
          <td class="text-center">
            <q-toggle
              class="custome-toggle-dark"
              checked-icon="check"
              color="green"
              :model-value="row.isActive"
              @update:model-value="toggleActive()"
            />
          </td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td class="text-center">No Data Found</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>

  <div v-else>
    <div v-if="mainData.length > 0" class="row">
      <div
        v-for="(row, index) in mainData"
        :key="index"
        class="col col-3 q-ma-md"
      >
        <q-card class="grid-card" bordered>
          <q-card-section class="rounded-borders" horizontal>
            <q-img
              class="col-6"
              src="https://cdn.quasar.dev/img/parallax2.jpg"
            />

            <q-card-actions vertical class="justify-around q-py-xl q-px-md">
              <p class="no-margin card-heading">Item No: {{ row.no }}</p>
              <p class="q-mb-xl card-heading">
                Item Name: {{ row.translations[0].name }}
              </p>
              <p class="card-type no-margin">Type: {{ row.type }}</p>
            </q-card-actions>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div v-else class="text-center">No Data Found</div>
  </div>
</template>

<script>
import { Router } from "src/router";
import { computed, ref, onMounted, toRefs, watch } from "vue";

export default {
  emits: ["duplicate-row"],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    layout: {
      type: String,
      default: "tree",
    },
  },
  setup(props, { emit }) {
    const selectedItem = ref([]);
    const selectedRow = ref([]);

    // Mounted
    onMounted(() => {});

    const mainData = computed(() => {
      return props.data;
    });

    //Methods
    const chooseActive = async () => {
      emit("duplicate-row", selectedRow.value);
    };

    return {
      mainData,
      selectedRow,
      selectAll: ref(false),
      selectedItem,

      chooseActive,
    };
  },
};
</script>
<style>
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
</style>
