<template>
  <q-page padding>
    <top-bar
      @glopalSearch="glopalSearch"
      @dialiogFilter="dialog_filter = true"
      @passGroupBy="getSelectedGroupBy"
      pageTitle="Customers"
      :groupByOptions="groupByOptions"
    />
    <charts-taple
      :dataIngroup="rows"
      :mainGroub="maingroup"
      :colums="colums"
      :select="false"
      :moreBtn="moreBtn"
      :isPendeng="isPendeng"
      :createBtn="true"
      @getItemGroupData="getItemGroupData"
      @createDilaog="createDilaog"
      @editeDialog="updateDialog"
    />
    <!-- dilaog filter -->
    <q-dialog
      v-model="dialog_filter"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <cusomer-filter @passFilterData="confermFilter" />
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, shallowRef, reactive } from "@vue/reactivity";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { computed, onMounted, watch } from "@vue/runtime-core";
import { Loading, Notify, useQuasar } from "quasar";
import TopBar from "../../../components/top-bar.vue";
import CusomerFilter from "../components/cusomer-filter.vue";
import ChartsTaple from "../../../components/chart-taple";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsCustomer"
);
import { sellected_group } from "../../../components/chart-taple/use";
export default {
  components: {
    TopBar,
    CusomerFilter,
    ChartsTaple,
  },
  setup() {
    const moreBtn = ref(["edit", "duplicate", "delete"]);
    const rows = ref([]);
    const maingroup = ref([]);
    const isPendeng = ref(false);
    const colums = ref([
      {
        name: "name",
        label: "name",
      },
      {
        name: "adress",
        label: "adress",
      },
      {
        name: "isActive",
        label: "isActive",
        badge: true,
      },
      {
        name: "action",
        label: "action",
        action: true,
      },
    ]);

    const { getCustomerList } = useActions(["getCustomerList"]);
    const dialog_filter = ref(false);
    // methods
    const glopalSearch = (searchVal) => {
      // do search
    };
    const confermFilter = (filterData) => {
      // do filter
    };
    // update
    const updateDialog = (data) => {
      //
    };
    const getSelectedGroupBy = (selected) => {
      // do filter
    };
    const getCustomerData = async () => {
      isPendeng.value = true;
      try {
        const req = await getCustomerList();
        rows.value = await req.data.value;
        isPendeng.value = false;
      } catch (err) {
        isPendeng.value = false;
        if (err.data.value == null) {
          rows.value = [];
        }
        console.log(err);
      }
    };
    const getItemGroupData = (data) => {
      if (data) {
        // get spasifc group  (data.id)
      } else {
        getCustomerData();
      }
    };
    onMounted(() => {
      getCustomerData();
    });
    return {
      glopalSearch,
      getCustomerData,
      getItemGroupData,
      updateDialog,
      dialog_filter,
      colums,
      getSelectedGroupBy,
      maingroup,
      moreBtn,
      isPendeng,
      rows,
      sellected_group,
      confermFilter,
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
/* .main-group_action {
  position: absolute;
  right: 5px;
  top: 10px;
} */
</style>
