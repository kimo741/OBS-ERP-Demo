<template>
  <div v-show="layout === 'list'" class="border-chart q-mr-lg">
    <!-- ///////////////// -->
    <!-- if property taple -->
    <!-- ///////////////// -->
    <div v-if="!isByGroupTaple" class="main-taple full-width">
      <!-- head -->
      <div class="full-width">
        <div
          class="flex col-12 justify-around items-center text-left main-taple__head"
        >
          <div v-if="select" style="width: 10px" class="flex justify-start">
            <q-checkbox
              class="col-6"
              :true-value="mainData"
              :false-value="sellected_group"
              :model-value="sellected_group"
              @click="sellectAll"
            />
          </div>
          <div class="" style="width: 10px">#</div>
          <div
            v-for="(col, index) in colums"
            :key="index"
            class="q-px-xs"
            :style="'width: calc(100% / ' + (colums.length + 1) + ');'"
          >
            {{ $t(`${col.label}`) }}
          </div>
        </div>
        <!-- style="width: ;" -->
        <!-- body -->
        <template v-if="mainData.length">
          <div
            class="row col-12 justify-around items-center text-left main-taple__body"
            v-for="(gorop, i) in mainData"
            :key="i"
          >
            <div class="text-center" style="width: 10px">{{ i + 1 }}</div>

            <!-- <div class="row col-12 main-taple__body-group"> -->
            <!-- group -->
            <div
              v-if="select"
              style="flex-wrap: nowrap; width: 10px"
              class="row justify-start"
            >
              <q-checkbox
                class="col-6"
                v-model="sellected_group"
                :val="gorop"
                @update:model-value="chooseActiveGroup(gorop)"
              />
            </div>
            <div
              class="row justify-around items-left text-left main-taple__body"
              v-for="(col, index) in colums"
              :key="index"
              :style="'width: calc(100% / ' + (colums.length + 1) + ');'"
            >
              <div
                class="row full-width text-left justify-left"
                v-if="col.badge"
              >
                <!-- <div class="col-12"> -->
                <!-- <div class="row justify-around"> -->
                <div v-if="gorop[col.name]" class="col-3">
                  <q-badge
                    rounded
                    :label="
                      $t('app.administration.charts.chartsProperty.active')
                    "
                    color="green"
                  />
                </div>
                <div class="col-3" v-else>
                  <q-badge
                    rounded
                    color="warning"
                    :label="
                      $t('app.administration.charts.chartsProperty.not_active')
                    "
                  />
                </div>
                <!-- </div> -->
                <!-- </div> -->
              </div>

              <div class="full-width" v-else-if="col.action">
                <!-- size="1.3em" -->
                <q-btn
                  text-color="grey-6"
                  color="grey-7"
                  round
                  flat
                  class="col-2"
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
                    <q-list style="min-width: 200px">
                      <q-item
                        v-if="moreBtn.includes('duplicate')"
                        @click="$emit('duplicateSingleProp', gorop)"
                        clickable
                      >
                        <q-item-section>{{
                          $t("global.duplicate")
                        }}</q-item-section>
                      </q-item>
                      <q-item
                        v-if="moreBtn.includes('edit')"
                        @click="$emit('singleGroupToEdit', gorop)"
                        clickable
                      >
                        <q-item-section>{{ $t("global.edit") }}</q-item-section>
                      </q-item>
                      <q-item
                        v-if="moreBtn.includes('delete')"
                        @click="$emit('singleGroupToDel', gorop)"
                        clickable
                      >
                        <q-item-section>{{
                          $t("global.delete")
                        }}</q-item-section>
                      </q-item>
                      <q-item
                        v-if="moreBtn.includes('copy')"
                        @click="$emit('copySingleProperty', gorop)"
                        clickable
                      >
                        <q-item-section>{{ $t("global.copy") }}</q-item-section>
                      </q-item>
                      <q-item
                        v-if="moreBtn.includes('cut')"
                        @click="$emit('cutSingleProperty', gorop)"
                        clickable
                      >
                        <q-item-section>{{ $t("global.cut") }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn>
              </div>
              <div
                v-else
                :class="see_more.includes(item) ? 'handel-wrab' : ''"
                @click="seeMore(item)"
                class="q-px-xs full-width"
              >
                {{ gorop[col.name] }}
              </div>
            </div>
            <!-- </div> -->
          </div>
        </template>
        <SkettlonTaple v-else-if="isPendeng" />
        <!-- no data  -->
        <div v-else class="col-12 row justify-center items-center">
          <div class="text-h5 text-grey">
            {{ $t("app.administration.charts.chartsProperty.no_data") }}
          </div>
        </div>
        <div class="paaenation row justify-end items-center">
          <div class="row items-center">
            <div class="q-mx-md">Records per page:</div>
            <div>
              <q-select
                style="max-width: 80px"
                dense
                behavior
                color="accent"
                v-model="inquiryForm.pagination.pageSize"
                :options="recordsOptions"
                @update:model-value="$emit('pagenationChanged')"
              />
            </div>
          </div>
          <div class="q-mx-md">
            <q-pagination
              v-model="inquiryForm.pagination.currentPage"
              :max="PagenationTotalPages"
              input
              color="accent"
              @update:model-value="$emit('pagenationChanged')"
            />
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-show="layout !== 'list'">
    <div
      v-if="mainData.length > 0"
      class="full-width row items center main-taple"
    >
      <!-- v-for="(row, index) in mainData"
    :key="index" -->
      <chart-as-card
        :data="data"
        :colums="colums"
        :select="select"
        :moreBtn="moreBtn"
        class="handel_transetion"
        @passToReview="passToReview"
        @copySinglePropertyCard="copyPropertyFromCard"
        @cutSinglePropertyCard="cutPropertyFromCard"
        @singleGroupToDelCard="delFromCard"
        @singleGroupToEditCard="editeFromCard"
        @duplicateSinglePropCard="duplicatFromCard"
        :isByGroupTaple="isByGroupTaple"
        :class="sellected_group.includes(row) ? 'active-card' : ''"
      />
      <!-- @passSelectedCard="cardActiveGroup" -->
    </div>
    <div v-else class="text-h5 text-grey text-center">
      {{ $t("app.administration.charts.chartsProperty.no_data") }}
    </div>
  </div>
</template>

<script>
import { inquiryForm, PagenationTotalPages } from "./use";
import { computed, ref, onMounted, toRefs, watch } from "vue";
import chartAsCard from "./chart-as-card.vue";
// import chartAsCard from "./chart-as-card.vue";
import { sellected_group } from "./use.js";
import SkettlonTaple from "./skettlon-taple.vue";
import { DEFAULT_COMPANY_LANG } from "src/configs/language.js";
export default {
  components: { chartAsCard, SkettlonTaple },
  emits: ["passSellectedItems", "passSellectedGroup", "getByGroupProperty"],

  props: {
    data: {
      type: Array,
      default: () => [],
    },
    layout: {
      type: String,
      default: "list",
    },
    isByGroupTaple: {
      type: Boolean,
      default: false,
    },
    isPendeng: {
      type: Boolean,
      default: false,
    },
    pinding_of_unit: {
      type: Boolean,
      required: false,
      default: false,
    },
    select: {
      type: Boolean,
      default: false,
    },
    moreBtn: {
      type: Array,
      default: () => [],
    },
    // select: {
    //   type: Array,
    //   default: () => [],
    // },
    colums: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const selectedItem = ref([]);
    const selectedGroup = ref([]);
    const ItemsOfGroup = ref([]);
    const see_more = ref([]);
    //

    // Mounted
    onMounted(() => {});

    // Computed
    const mainData = computed(() => {
      return props.data;
    });
    // whach
    watch(props.isByGroupTaple, (val) => {
      ItemsOfGroup.value = [];
      // if (val === true) {
      //   layout.value = "list";
      // }
    });
    // watch(props.data, (val) => {
    //   console.log();
    // });
    // wach sellected group to pass it
    // watch(selectedGroup, (val) => {
    //   emit("passSellectedGroup", val);
    //   console.log(val);
    // });
    //Methods
    // sellect group
    const chooseActiveGroup = () => {
      // emit("passSellectedGroup", selectedGroup.value);
    };
    // sellect group
    // const cardActiveGroup = (row) => {
    //   if (sellected_group.value.includes(row)) {
    //     var index = sellected_group.value.findIndex((el, i) => {
    //       return el.id == row.id;
    //     });
    //     sellected_group.value.splice(index, 1);
    //     // emit("passSellectedGroup", sellected_group.value);
    //   } else {
    //     sellected_group.value.push(row);
    //     // emit("passSellectedGroup", selectedGroup.value);
    //   }
    // };
    // select item
    const chooseActiveItem = async () => {
      emit("passSellectedItems", ItemsOfGroup.value);
    };
    // toggle items
    const toggleItems = (group) => {
      if (ItemsOfGroup.value.includes(group.id)) {
        let index = ItemsOfGroup.value.indexOf(group.id);
        ItemsOfGroup.value.splice(index, 1);
      } else {
        emit("getUnitOfProperty", group);
        ItemsOfGroup.value.push(group.id);
      }
    };
    // toggle Items In group
    const toggleItemsIngroup = (group) => {
      if (ItemsOfGroup.value.includes(group.id)) {
        let index = ItemsOfGroup.value.indexOf(group.id);
        ItemsOfGroup.value.splice(index, 1);
        // console.log(group);
      } else {
        emit("getByGroupUnit", group);
        // console.log(group);
        ItemsOfGroup.value.push(group.id);
      }
    };
    // sellect all
    const sellectAll = () => {
      sellected_group.value !== mainData.value
        ? (sellected_group.value = mainData.value)
        : (sellected_group.value = []);
      // emit("passSellectedGroup", sellected_group.value);
    };
    const passToReview = (data) => {
      emit("passPropToReview", data);
    };
    // events pass from card
    // copy
    const copyPropertyFromCard = (data) => {
      emit("copySingleProperty", data);
    };
    // cut
    const cutPropertyFromCard = (data) => {
      emit("cutSingleProperty", data);
    };
    // del
    const delFromCard = (data) => {
      emit("singleGroupToDel", data);
    };

    // edit
    const editeFromCard = (data) => {
      emit("singleGroupToEdit", data);
    };
    // duplicate
    const duplicatFromCard = (data) => {
      emit("duplicateSingleProp", data);
    };
    const seeMore = (row) => {
      if (see_more.value.includes(row)) {
        let index = see_more.value.indexOf(row);
        see_more.value.splice(index, 1);
      } else {
        see_more.value.push(row);
      }
    };
    return {
      // mainData,
      mainData,
      seeMore,
      copyPropertyFromCard,
      editeFromCard,
      duplicatFromCard,
      see_more,
      sellected_group,
      selectedGroup,
      inquiryForm,
      delFromCard,
      cutPropertyFromCard,
      // cutSingleProperty,
      passToReview,
      toggleItems,
      selectAll: ref(false),
      selectedItem,
      toggleItemsIngroup,
      ItemsOfGroup,
      chooseActiveItem,
      sellectAll,
      // cardActiveGroup,
      chooseActiveGroup,
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
.paaenation {
  height: 100px;
}
</style>
