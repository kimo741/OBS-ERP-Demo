<template>
  <q-page padding>
    <top-bar
      @glopalSearch="glopalSearch"
      @dialiogFilter="dialog_filter = true"
      @passGroupByv="getSelectedGroupBy"
      pageTitle="Fnention dimention"
    />
    <!-- :groupByOptions="groupByOptions" -->
    <charts-taple
      :dataIngroup="rows"
      :colums="colums"
      :select="false"
      :moreBtn="moreBtn"
      :isPendeng="isPendeng"
      :createBtn="true"
      @createDilaog="createDilaog"
    />

    <q-dialog
      v-model="dialog_filter"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <!-- <vendors-filter @passFilterData="confermFilter" /> -->
    </q-dialog>
  </q-page>
</template>

<script>
import { sellected_group } from "../../../components/chart-taple/use";
import { ref, shallowRef, reactive } from "@vue/reactivity";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { computed, onMounted, watch } from "@vue/runtime-core";
import { Loading, Notify, useQuasar } from "quasar";
import ChartsTaple from "../../../components/chart-taple";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);
import TopBar from "../../../components/top-bar.vue";
// import VendorsFilter from "../components/vendors-filter.vue";
export default {
  components: {
    TopBar,
    // VendorsFilter,
    ChartsTaple,
  },
  setup() {
    const moreBtn = ref(["edit", "duplicate", "delete"]);
    const rows = ref([]);
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
    const dialog_filter = ref(false);
    // methods
    const glopalSearch = (searchVal) => {
      // do search
    };
    const confermFilter = (filterData) => {
      // do filter
    };
    const getSelectedGroupBy = (sselected) => {
      // do filter
    };
    return {
      glopalSearch,
      dialog_filter,
      getSelectedGroupBy,
      moreBtn,
      rows,
      colums,
      isPendeng,
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
