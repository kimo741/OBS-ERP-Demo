<template>
  <!-- //// -->
  <!-- tree -->
  <!-- //// -->
  <div
    v-if="nodes.length > 0 && layout === 'tree'"
    class="border-chart q-pa-md q-mr-lg full-height"
  >
    <q-tree
      :nodes="simple"
      dense
      class="q-treee"
      node-key="label"
      v-model:expanded="expanded"
    />
    <q-tree
      :nodes="simple1"
      dense
      class="q-treee"
      node-key="label"
      v-model:expanded="expanded1"
    />
    <q-tree
      :nodes="simple2"
      dense
      class="q-treee"
      node-key="label"
      v-model:expanded="expanded2"
    />
  </div>
  <!-- list -->
  <div v-else-if="layout === 'list'" class="border-chart q-mr-lg full-height">
    <ChartList :data="mainData" @passSellectedGroup="passSellectedGroup" />
  </div>
  <!-- //// -->
  <!-- card -->
  <!-- //// -->
  <div v-else class="row">
    <div class="col col-3 q-ma-md" v-for="item in nodes" :key="item.id">
      <q-card
        class="cursor-pointer grid-card"
        flat
        bordered
        @click="() => handleRowSelect(item)"
      >
        <div class="text-right">
          <q-btn
            text-color="grey-6"
            color="grey-7"
            class="absolute fixed-top-right"
            size="1.3em"
            round
            flat
            icon="more_vert"
          >
            <q-menu cover auto-close>
              <q-list>
                <q-item clickable>
                  <q-item-section>Remove Card</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Send Feedback</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>Share</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
        <div class="q-pa-md">
          <q-card-section>
            <div class="text-OBS">{{ item.name }}</div>
            <div class="text-OBS">{{ item.creationTypeName }}</div>
          </q-card-section>
          <q-card-section class="q-pt-none text-OBS">
            - Postingtype: {{ item.postingtypeName }} <br />
            - Typical: {{ item.typicalName }} <br />
            - Type: {{ item.accTypeName }}
          </q-card-section>
        </div>
      </q-card>
    </div>
  </div>
</template>

<script>
import { Router } from "src/router";
import { computed, ref, toRefs, watch } from "vue";
import ChartList from "./chart/chart-list.vue";

export default {
  emits: [
    "cut-item",
    "copy-item",
    "duplicate-item",
    "paste-item",
    "delete-item",
    "select-items",
    "toggle-active",
  ],
  props: {
    mainData: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Array,
      default: () => [],
    },
    clipboard: {
      type: Object,
      default: () => ({ id: [] }),
    },
    filter: {
      type: String,
      default: "",
    },
    layout: {
      type: String,
      default: "tree",
    },
    tickedList: {
      type: [],
      default: [],
    },
  },
  setup(props, { emit }) {
    const ticked = ref([]);
    // Helpers
    const generateIds = (root) => {
      const selected = [root.id];
      const getSelectedNodeIds = (item) => {
        if (item.accounts && item.accounts.length > 0) {
          item.accounts.forEach((subItem) => {
            selected.push(subItem.id);
            getSelectedNodeIds(subItem);
          });
        }
      };
      getSelectedNodeIds(root);
      return selected;
    };
    // Methods
    const handleTickedItemsChange = (items) => {
      emit("select-items", items);
    };
    const handleSelectAllItem = (item) => {
      const ids = generateIds(item);
      ticked.value = ids;
      handleTickedItemsChange(ids);
    };
    const generateList = () => {
      const list = [];
      const generateListFromItem = (listItem) => {
        list.push(listItem);
        if (listItem.accounts && listItem.accounts.length > 0) {
          listItem.accounts.forEach((item) => {
            generateListFromItem(item);
          });
        }
      };
      props.data.forEach(generateListFromItem);
      return list;
    };
    const generateAccountsList = () => {
      const list = [];
      const generateListFromItem = (listItem) => {
        if (listItem.creationTypeName === "Account") {
          list.push(listItem);
        }
        if (listItem.accounts && listItem.accounts.length > 0) {
          listItem.accounts.forEach((item) => {
            generateListFromItem(item);
          });
        }
      };
      props.data.forEach(generateListFromItem);
      return list;
    };
    const handleIsActive = (item) => {
      emit("toggle-active", item);
    };
    const handleRowSelect = ({ id, creationTypeName }) => {
      const isGroup = creationTypeName === "Group";
      const route = `/app/administration/charts/charts-accounts/edit-${
        isGroup ? "group" : "account"
      }/${id}`;
      Router.push(route);
    };
    // Computed
    const nodes = computed(() => {
      if (props.layout === "list") {
        return generateList().map(({ accounts, ...rest }) => rest);
      }
      if (props.layout === "grid") {
        return generateAccountsList().map(({ accounts, ...rest }) => rest);
      }
      return props.data;
    });
    // watch(
    //   () => props.data,
    //   () => {
    //     ticked.value = [];
    //   }
    // );
    watch(
      () => props.tickedList,
      () => {
        ticked.value = props.tickedList;
      }
    );
    // const columns = [
    //   {
    //     name: "name",
    //     required: true,
    //     label: "LEVEL",
    //     align: "center",
    //     field: (row) => row.name,
    //     format: (val) => `${val}`,
    //   },
    //   {
    //     name: "calories",
    //     align: "center",
    //     label: "ACCOUNT",
    //     field: "calories",
    //   },
    //   { name: "fat", label: "TYPE", field: "fat", align: "center" },
    //   { name: "carbs", label: "POSTING", field: "carbs", align: "center" },
    //   { name: "protein", label: "TYPICAL", field: "protein", align: "center" },
    //   { name: "sodium", label: "CATOGORY", field: "sodium", align: "center" },
    //   {
    //     name: "isActive",
    //     label: "ACTIVE",
    //     field: "isActive",
    //     align: "center",
    //     sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    //   },
    //   {
    //     name: "iron",
    //     label: "ACTION",
    //     field: "iron",
    //     align: "center",
    //     sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
    //   },
    // ];
    // const rows = [
    //   {
    //     name: "Frozen Yogurt",
    //     calories: 159,
    //     fat: 6,
    //     carbs: 24,
    //     protein: 4,
    //     sodium: 87,
    //     calcium: "14%",
    //     iron: "1%",
    //   },
    //   {
    //     name: "Ice cream sandwich",
    //     calories: 237,
    //     fat: 9,
    //     carbs: 37,
    //     protein: 4.3,
    //     sodium: 129,
    //     calcium: "8%",
    //     iron: "1%",
    //   },
    //   {
    //     name: "Eclair",
    //     calories: 262,
    //     fat: 16,
    //     carbs: 23,
    //     protein: 6,
    //     sodium: 337,
    //     calcium: "6%",
    //     iron: "7%",
    //   },
    //   {
    //     name: "Cupcake",
    //     calories: 305,
    //     fat: 3.7,
    //     carbs: 67,
    //     protein: 4.3,
    //     sodium: 413,
    //     calcium: "3%",
    //     iron: "8%",
    //   },
    //   {
    //     name: "Gingerbread",
    //     calories: 356,
    //     fat: 16,
    //     carbs: 49,
    //     protein: 3.9,
    //     sodium: 327,
    //     calcium: "7%",
    //     iron: "16%",
    //   },
    //   {
    //     name: "Jelly bean",
    //     calories: 375,
    //     fat: 0,
    //     carbs: 94,
    //     protein: 0,
    //     sodium: 50,
    //     calcium: "0%",
    //     iron: "0%",
    //   },
    //   {
    //     name: "Lollipop",
    //     calories: 392,
    //     fat: 0.2,
    //     carbs: 98,
    //     protein: 0,
    //     sodium: 38,
    //     calcium: "0%",
    //     iron: "2%",
    //   },
    //   {
    //     name: "Honeycomb",
    //     calories: 408,
    //     fat: 3.2,
    //     carbs: 87,
    //     protein: 6.5,
    //     sodium: 562,
    //     calcium: "0%",
    //     iron: "45%",
    //   },
    //   {
    //     name: "Donut",
    //     calories: 452,
    //     fat: 25,
    //     carbs: 51,
    //     protein: 4.9,
    //     sodium: 326,
    //     calcium: "2%",
    //     iron: "22%",
    //   },
    //   {
    //     name: "KitKat",
    //     calories: 518,
    //     fat: 26,
    //     carbs: 65,
    //     protein: 7,
    //     sodium: 54,
    //     calcium: "12%",
    //     iron: "6%",
    //   },
    // ];
    return {
      nodes,
      ticked,
      selected: ref([]),
      handleSelectAllItem,
      handleTickedItemsChange,
      handleIsActive,
      handleRowSelect,
      // columns,
      // rows,
      expanded: ref(["1300000 - Stock", "1300000 - Stock"]),
      expanded1: ref(["1300000 - Stock", "1300000 - Stock"]),
      expanded2: ref(["1300000 - Stock", "1300000 - Stock"]),
      simple: [
        {
          label: "1300000 - Stock",
          children: [
            {
              label: "1300000 - Raw Materials & Comsumables",
              children: [
                { label: "13000 - Stock" },
                { label: "13000 - Stock" },
              ],
            },
            {
              label: "1300000 - Raw Materials & Comsumables",
              children: [
                { label: "13000 - Stock" },
                { label: "13000 - Stock" },
              ],
            },
            {
              label: "1300000 - Raw Materials & Comsumables",
              children: [
                {
                  label: "13000 - Stock",
                },
                { label: "13000 - Stock" },
                { label: "13000 - Stock" },
              ],
            },
          ],
        },
      ],
      simple1: [
        {
          label: "1300000 - Stock",
          children: [
            {
              label: "1300000 - Raw Materials & Comsumables",
              children: [
                { label: "13000 - Stock" },
                { label: "13000 - Stock" },
              ],
            },
            {
              label: "1300000 - Raw Materials & Comsumables",
              children: [
                { label: "13000 - Stock" },
                { label: "13000 - Stock" },
              ],
            },
            {
              label: "1300000 - Raw Materials & Comsumables",
              children: [
                {
                  label: "13000 - Stock",
                },
                { label: "13000 - Stock" },
                { label: "13000 - Stock" },
              ],
            },
          ],
        },
      ],
      simple2: [
        {
          label: "1300000 - Stock",
          children: [
            {
              label: "1300000 - Raw Materials & Comsumables",
              children: [
                { label: "13000 - Stock" },
                { label: "13000 - Stock" },
              ],
            },
            {
              label: "1300000 - Raw Materials & Comsumables",
              children: [
                { label: "13000 - Stock" },
                { label: "13000 - Stock" },
              ],
            },
            {
              label: "1300000 - Raw Materials & Comsumables",
              children: [
                {
                  label: "13000 - Stock",
                },
                { label: "13000 - Stock" },
                { label: "13000 - Stock" },
              ],
            },
          ],
        },
      ],
    };
  },
  components: { ChartList },
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
</style>
