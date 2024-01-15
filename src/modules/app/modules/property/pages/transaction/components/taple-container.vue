<template>
  <q-card class="transaction-taple-container">
    <q-card-section class="row">
      <div class="col-6 q-mb-sm">
        <!-- ////////////// -->
        <!-- duplica action -->
        <!-- ////////////// -->
        <!-- <q-btn
          v-if="duplicate && select"
          @click="duplicSellectedProp"
          outline
          class="btn-component-duplicate"
          padding="10px 25px"
          :disable="sellected_group.length !== 1"
        >
          <img src="/images/duplicate.svg" class="q-mr-sm" />
          {{ $t("app.administration.charts.chartsProperty.duplicate") }}
        </q-btn> -->
      </div>
      <!-- <div class="col-4 q-mb-md q-px-lg"></div> -->
      <div
        class="col-6 q-mb-md row justify-end items-center"
        style="flex-wrap: nowrap"
      >
        <!-- ////////////// -->
        <!-- creat action -->
        <!-- ////////////// -->
        <div
          class="custom-style-tabs"
          v-for="({ icon, id }, i) in layouts"
          :key="i"
        >
          <!-- :disable="$q.screen.lt.md"
                      :class="$q.screen.lt.md ? 'q-pa-xs' : 'q-pa-sm'"
            :size="$q.screen.lt.md ? 'sm' : 'md'"
          -->
          <q-btn :outline="id == layout" @click="layout = id">
            <img :src="icon" />
          </q-btn>
        </div>
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
                v-if="moreBtn.includes('delete')"
                clickable
                :disable="sellected_group.length == 0 || sellected_group === []"
                @click="deleteSellectedProp"
              >
                <q-item-section>{{ $t("global.delete") }}</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </div></q-card-section
    >
    <q-card-section>
      <dynamicTable
        :layout="layout"
        :data="rows"
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
        @pagenationChanged="pagenationChanged"
      />
    </q-card-section>
  </q-card>
</template>

<script setup>
import dynamicTable from "./table.vue";
import { ref } from "vue";
import { sellected_group } from "./use.js";

import { useQuasar } from "quasar";
const emit = defineEmits(["pagenationChanged"]);
const props = defineProps({
  rows: {
    type: Array,
  },
  colums: {
    type: Array,
  },
  moreBtn: {
    type: Array,
  },
  isPendeng: {
    type: Boolean,
  },
});
const pagenationChanged = () => {
  emit("pagenationChanged");
};
const maingroup = ref([]);
const colums = ref([
  {
    name: "Project",
    label: "Project",
  },
  {
    name: "Property",
    label: "Property",
  },
  {
    name: "unit",
    label: "Unit",
    // badge: true,
  },
  {
    name: "price",
    label: "Price",
    // action: true,
  },
  {
    name: "bedrooms",
    label: "Bedrooms",
    // action: true,
  },
  {
    name: "bethrooms",
    label: "Bethrooms",
    // action: true,
  },
  {
    name: "aria",
    label: "Aria",
    // action: true,
  },
]);
const layout = ref("list");
const $q = useQuasar();
const layouts = ref([
  {
    icon: "/images/list.svg",
    id: "list",
  },
  {
    icon: "/images/grid.svg",
    id: "grid",
  },
]);
</script>

<style lang="scss" scoped>
.transaction-taple-container {
  margin: 30px 20px 20px 20px;
  padding: 20px 25px;
  background: #ffffff;
  box-shadow: 0px 4px 39px 9px rgba(81, 69, 159, 0.09);
  border-radius: 15px;
  height: 40vh;
  overflow: auto;
}
</style>
