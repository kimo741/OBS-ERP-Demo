<template>
  <div class="main-taple full-width full-height">
    <!-- head -->
    <div class="row main-taple__head justify-around items-center text-center">
      <div class="col-1">
        <q-checkbox
          :true-value="mainData"
          :false-value="selectedGroup"
          :model-value="selectedGroup"
          @click="sellectAll"
        />
        <!-- <q-btn flat label="+" /> -->
        <!-- <span>+</span> -->
      </div>
      <div class="col-1">Level</div>
      <div class="col-2">Account</div>
      <div class="col-1">Type</div>
      <div class="col-2">POSTING</div>
      <div class="col-2">TYPICAL</div>
      <div class="col-1">Category</div>
      <div class="col-1">ACTIVE</div>
      <div class="col-1">ACTION</div>
    </div>
    <!-- body -->
    <div class="row main-taple__body justify-around items-center text-center">
      <div class="col-12" v-if="mainData.length">
        <div
          class="row main-taple__body-group"
          v-for="(gorop, i) in mainData"
          :key="i"
        >
          <!-- group -->
          <div class="col-12 row justify-around items-center">
            <div class="col-1">
              <q-checkbox
                v-model="selectedGroup"
                :val="gorop"
                @update:model-value="chooseActiveGroup(gorop)"
              />
              <q-btn
                color="dark"
                style="color: black !important"
                size="sm"
                @click="toggleItems(gorop)"
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
            <div class="col-1">{{ gorop.accLevel ? gorop.accLevel : "" }}</div>
            <div class="col-2">
              {{ gorop.name ? gorop.name : "" }}
            </div>
            <div class="col-1">
              {{ gorop.accountType ? gorop.accountType : "" }}
            </div>
            <div class="col-2">
              {{ gorop.postingtypeName ? gorop.postingtypeName : "" }}
            </div>
            <div class="col-2">
              {{ gorop.typical ? gorop.typical : "" }}
              <!-- <div style="display: block">Adress Line</div> -->
            </div>
            <div class="col-1">{{ gorop.category ? gorop.category : "" }}</div>
            <div class="col-1">
              <div class="row justify-around items-center text-body1">
                <div class="col-10">
                  <!-- <div  class="text-green text-body1"> -->
                  <q-badge
                    v-if="gorop.active"
                    color="green"
                    style="width: 60%"
                  ></q-badge>
                  <!-- </div> -->
                  <!-- <div  class="text-body1 text-red"> -->
                  <q-badge v-else color="red" style="width: 60%"></q-badge>
                  <!-- </div> -->
                </div>
                <!-- more btn -->
              </div>
            </div>

            <div class="col-1">
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
                    <q-item @click="$emit('singleGroupToDel', gorop)" clickable>
                      <q-item-section>{{ $t("global.delete") }}</q-item-section>
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
              </q-btn>
            </div>
          </div>
          <!-- ////////////////// -->
          <!-- accounts in groups -->
          <!-- ////////////////// -->
          <transition-group name="slide-fade">
            <div
              class="row full-width"
              v-if="
                ItemsOfGroup.includes(gorop.id) && gorop.accounts.length > 0
              "
            >
              <div class="col-12" v-for="(item, i) in gorop.accounts" :key="i">
                <transition-group name="slide-fade">
                  <div
                    class="
                      row
                      main-taple__body-item
                      justify-around
                      items-center
                    "
                  >
                    <div class="col-1"></div>
                    <div class="col-1">
                      {{ item.accLevel ? item.accLevel : "" }}
                    </div>
                    <div class="col-2"></div>
                    <div class="col-1">{{ item.name ? item.name : "" }}</div>
                    <div class="col-2">
                      {{ item.accountType ? item.accountType : "" }}
                    </div>
                    <div class="col-2">
                      {{ item.postingtypeName ? item.postingtypeName : "" }}
                    </div>
                    <div class="col-2">
                      {{ item.typical ? item.typical : "" }}
                    </div>
                    <div class="col-1 row">
                      <!-- more btn -->
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
                      </q-btn>
                    </div>
                  </div>
                </transition-group>
              </div>
            </div>

            <!-- no data of account  -->
            <div
              v-else-if="
                ItemsOfGroup.includes(gorop.id) && gorop.accounts.length == 0
              "
              class="col-12 row justify-center items-center"
            >
              <div class="text-body1 text-grey">
                {{ $t("app.administration.charts.chartsProperty.no_data") }}
              </div>
            </div>
          </transition-group>
        </div>
      </div>
      <!-- no data of groups  -->
      <div v-else class="col-12 row justify-center items-center">
        <div class="text-h5 text-grey">
          {{ $t("app.administration.charts.chartsProperty.no_data") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref, onMounted, toRefs, watch } from "vue";
export default {
  emits: ["passSellectedItems", "passSellectedGroup", "getByGroupProperty"],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const selectedItem = ref([]);
    const selectedGroup = ref([]);
    const ItemsOfGroup = ref([]);
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
    });
    // wach sellected group to pass it
    watch(selectedGroup, (val) => {
      emit("passSellectedGroup", val);
      console.log(val);
    });
    //Methods
    // sellect group
    const chooseActiveGroup = () => {
      emit("passSellectedGroup", selectedGroup.value);
    };
    // sellect group
    const cardActiveGroup = (row) => {
      if (selectedGroup.value.includes(row)) {
        var index = selectedGroup.value.findIndex((el, i) => {
          return el.id == row.id;
        });
        selectedGroup.value.splice(index, 1);
        emit("passSellectedGroup", selectedGroup.value);
      } else {
        selectedGroup.value.push(row);
        emit("passSellectedGroup", selectedGroup.value);
      }
    };
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
    // sellect all
    const sellectAll = () => {
      selectedGroup.value !== mainData.value
        ? (selectedGroup.value = mainData.value)
        : (selectedGroup.value = []);
      emit("passSellectedGroup", selectedGroup.value);
    };
    //////////////////////////////////////
    // card
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

    return {
      mainData,
      copyPropertyFromCard,
      editeFromCard,
      duplicatFromCard,
      selectedGroup,
      delFromCard,
      cutPropertyFromCard,
      // cutSingleProperty,
      passToReview,
      toggleItems,
      selectAll: ref(false),
      selectedItem,
      // toggleItemsIngroup,
      ItemsOfGroup,
      chooseActiveItem,
      sellectAll,
      cardActiveGroup,
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
  &__head {
    font-weight: 700;
    font-size: 1.1rem;
    padding: 20px 0;
    border-bottom: 1px solid #9b9b9b46;
  }
  &__body {
    border-bottom: 1px solid #9b9b9b46;
    &-group {
      font-size: 1rem;
      padding: 20px 0;
      color: #9b9b9b;
      font-weight: 500;
    }
    &-item {
      font-weight: 600;
      font-size: 1rem;
      color: #000000;
      padding: 20px 0;
    }
  }
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
  transition: all 0.5s ease-in-out;
  cursor: pointer;
}
</style>
