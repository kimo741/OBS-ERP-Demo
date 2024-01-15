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
            <!-- <q-btn flat label="+" /> -->
            <!-- <span>+</span> -->
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
      </div>
    </div>
    <!-- ///////////////// -->
    <!-- if by group taple -->
    <!-- ///////////////// -->
    <div v-else class="main-taple full-width full-height">
      <!-- head -->

      <div
        class="row main-taple__head q-col-gutter-sm justify-around items-center text-center"
      >
        <div class="col-1"></div>
        <div class="col-1">#</div>
        <div class="col-2">
          {{ $t("app.administration.charts.chartsProperty.group_by") }}
        </div>
        <div class="col-1"></div>
        <div class="col-2"></div>
        <div class="col-2"></div>
        <div class="col-1"></div>
        <div class="col-1"></div>
      </div>
      <!-- body -->
      <div
        class="row full-width main-taple__body justify-around items-center text-center"
      >
        <div class="col-12" v-if="mainData.length">
          <div
            class="row main-taple__body-group col"
            v-for="(gorop, i) in mainData"
            :key="i"
          >
            <!-- group -->
            <div class="col-12 row justify-around items-center">
              <div class="col-1">
                <!-- <q-checkbox
                  v-model="selectedGroup"
                  :val="gorop"
                  @update:model-value="chooseActiveGroup(gorop)"
                /> -->
                <q-btn
                  color="dark"
                  style="color: black !important"
                  size="sm"
                  @click="toggleItemsIngroup(gorop)"
                  flat
                  :icon="
                    ItemsOfGroup.includes(gorop.id)
                      ? 'eva-minus-outline'
                      : 'eva-plus-outline'
                  "
                />
                <!-- label="+" -->
                <!-- <span>+</span> -->
              </div>
              <div class="col-1">#</div>
              <div class="col-2">
                {{ gorop.name + "" }}
                <span class="text-bold">({{ gorop.counts }})</span>
              </div>
              <div class="col-1"></div>
              <div class="col-2"></div>
              <div class="col-2">
                <!-- <div style="display: block">Adress Line</div> -->

                <div style="display: block"></div>
              </div>
              <div class="col-1">
                <div class="row justify-around items-center text-body1">
                  <div class="col-10"></div>
                  <!-- more btn -->
                </div>
              </div>
              <div class="col-1">
                <!-- <q-btn
                  text-color="grey-6"
                  color="grey-7"
                  round
                  flat
                  class="col-2"
                  icon="more_vert"
                >
                  <q-menu
                    fit
                    auto-close
                    transition-show="scale"
                    transition-hide="scale"
                  >
                    <q-list style="min-width: 200px">
                      <q-item
                        @click="$emit('duplicateSingleProp', gorop)"
                        clickable
                      >
                        <q-item-section>{{
                          $t("global.duplicate")
                        }}</q-item-section>
                      </q-item>
                      <q-item
                        @click="$emit('singleGroupToEdit', gorop)"
                        clickable
                      >
                        <q-item-section>{{ $t("global.edit") }}</q-item-section>
                      </q-item>
                      <q-item
                        @click="$emit('singleGroupToDel', gorop)"
                        clickable
                      >
                        <q-item-section>{{
                          $t("global.delete")
                        }}</q-item-section>
                      </q-item>
                      <q-item
                        @click="$emit('copySingleProperty', gorop)"
                        clickable
                      >
                        <q-item-section>{{ $t("global.copy") }}</q-item-section>
                      </q-item>
                      <q-item
                        @click="$emit('cutSingleProperty', gorop)"
                        clickable
                      >
                        <q-item-section>{{ $t("global.cut") }}</q-item-section>
                      </q-item>
                    </q-list>
                  </q-menu>
                </q-btn> -->
              </div>
            </div>
            <!-- items -->
            <transition-group name="slide-fade" class="full-width">
              <div
                v-if="ItemsOfGroup.includes(gorop.id) && gorop.property"
                class="full-width bg-grey-4 q-my-sm"
              >
                <div
                  class="col-12 bg-white row q-py-md full-width justify-around items-center text-bold"
                >
                  <div class="col-1"></div>
                  <div class="col-1">#</div>
                  <div class="col-2">
                    {{ $t("app.administration.charts.chartsProperty.name") }}
                  </div>
                  <div class="col-1">
                    {{ $t("app.administration.charts.chartsProperty.type") }}
                  </div>
                  <div class="col-2">
                    {{
                      $t(
                        "app.administration.charts.chartsProperty.taple.address"
                      )
                    }}
                  </div>
                  <div class="col-2">
                    {{ $t("app.administration.charts.chartsProperty.status") }}
                  </div>
                  <div class="col-1"></div>
                </div>
                <div
                  class="full-width row q-py-sm"
                  v-for="(item, j) in gorop.property"
                  :key="j"
                >
                  <transition-group name="slide-fade" class="full-width">
                    <div
                      class="col-12 row full-width main-taple__body-item justify-around items-center"
                      v-if="ItemsOfGroup.includes(gorop.id)"
                    >
                      <div class="col-1">
                        <q-checkbox
                          v-model="selectedItem"
                          :val="item"
                          @update:model-value="chooseActiveItem(item)"
                        />
                      </div>
                      <div class="col-1">
                        {{ j + 1 }}
                      </div>
                      <div class="col-2">{{ item.no + " - " + item.name }}</div>
                      <div class="col-1">
                        {{ item.typeName }}
                      </div>
                      <div class="col-2">
                        {{ item.addressLine }}
                      </div>
                      <div class="col-2">
                        <div class="col-1">
                          <div
                            class="row justify-around items-center text-body1"
                          >
                            <div class="col-10">
                              <!-- <div  class="text-green text-body1"> -->
                              <q-badge v-if="item.isActive" color="green">
                                {{
                                  $t(
                                    "app.administration.charts.chartsProperty.active"
                                  )
                                }}</q-badge
                              >
                              <!-- </div> -->
                              <!-- <div  class="text-body1 text-red"> -->
                              <q-badge v-else color="red">
                                {{
                                  $t(
                                    "app.administration.charts.chartsProperty.not_active"
                                  )
                                }}</q-badge
                              >
                              <!-- </div> -->
                            </div>
                            <!-- more btn -->
                          </div>
                        </div>
                      </div>
                      <div class="col-1 row justify-center">
                        <!-- more btn -->
                        <!-- <q-btn
                          text-color="grey-6"
                          color="grey-7"
                          round
                          flat
                          class="col-6"
                          icon="more_vert"
                        >
                          <q-menu
                            fit
                            auto-close
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-list style="min-width: 200px">
                              <q-item
                                clickable
                                @click="$emit('singleItemToDel', item)"
                              >
                                <q-item-section>{{
                                  $t("global.delete")
                                }}</q-item-section>
                              </q-item>
                              <q-item
                                clickable
                                @click="$emit('singleItemToEdit', item)"
                              >
                                <q-item-section>{{
                                  $t("global.edit")
                                }}</q-item-section>
                              </q-item>
                            </q-list>
                          </q-menu>
                        </q-btn> -->
                      </div>
                    </div>
                  </transition-group>
                </div>
              </div>

              <div
                v-else-if="ItemsOfGroup.includes(gorop.id)"
                class="col-12 q-py-md row justify-center items-center"
              >
                <div class="text-body1 text-grey">
                  {{ $t("app.administration.charts.chartsProperty.no_data") }}
                </div>
              </div>
            </transition-group>
          </div>
        </div>
        <div v-else class="col-12 row justify-center items-center">
          <div class="text-h5 text-grey">
            {{ $t("app.administration.charts.chartsProperty.no_data") }}
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
</style>
