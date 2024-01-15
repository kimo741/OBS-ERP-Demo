<template>
  <q-card class="fillter-bar">
    <q-card-section class="row justify-between items-start full-height">
      <div class="fillter-bar__title col-4 text-left">PROJECTS</div>
      <div class="fillter-bar__actions col-6 row full-height">
        <div class="col-12 full-height">
          <q-input
            outlined
            v-model="selected_filter.valueSearch"
            class="user-search full-width fillter-bar__actions-search"
            :placeholder="$t('global.search')"
            @keyup.enter="handelSubmitFilter"
          >
            <template v-slot:append>
              <q-select
                use-chips
                class="filter-insearch"
                style="max-width: 400px; white-space: nowrap; overflow: hidden"
                v-model="selected_all_filter"
                multiple
                dense
                square
                :outlined="false"
                map-options
                option-value="id"
              >
              </q-select>
            </template>
          </q-input>
          <div
            class="fillter-bar__actions-group row items-center q-mt-lg"
            style="flex-wrap: nowrap"
          >
            <!-- ////// -->
            <!-- filter -->
            <!-- ////// -->
            <q-btn
              class="q-mr-md"
              flat
              label="Filters"
              icon="img:images/icon-filter.png"
            >
              <q-menu
                style="padding: 15px !important ; width: 250px"
                :model-value="filterMenuToggle"
              >
                <q-list
                  style="border: 1px solid #e5e4e4 !important"
                  class="rounded-borders more-list"
                >
                  <q-expansion-item
                    v-for="(filter, i) in filterOpstions"
                    :key="i"
                    dense-toggle
                    expand-separator
                    :label="filter.label"
                  >
                    <!-- default-opened -->
                    <!-- class="hide-dropdown-icon" -->
                    <template v-if="filter.options.length == 0">
                      <q-card-section
                        style="cursor: pointer; padding: 5px"
                        class="more-list__item text-center text-red-2"
                      >
                        Not found {{ " " + filter.label }}
                      </q-card-section>
                    </template>
                    <template v-else>
                      <q-card class="q-pl-lg">
                        <q-card-section
                          :key="index"
                          v-for="(item, index) in filter.options"
                          style="
                            cursor: pointer;
                            margin: 10px;
                            font-weight: 400;
                            font-size: 15px;
                            line-height: 16px;
                          "
                          @click="
                            selectFilter({ filter: filter, opstion: item })
                          "
                          class="more-list__item"
                        >
                          <q-icon
                            v-if="
                              selected_all_filter.some(
                                (el) => el.label == item.label
                              )
                            "
                            name="eva-checkmark-outline"
                          />
                          {{ item.label ? item.label : item.name }}
                        </q-card-section>
                        <q-separator class="full-width" color="grey" spaced />
                      </q-card>
                    </template>
                  </q-expansion-item>
                  <q-expansion-item
                    dense-toggle
                    expand-separator
                    label="Creation Date"
                  >
                    <!-- default-opened -->
                    <!-- class="hide-dropdown-icon" -->
                    <q-card class="full-width">
                      <q-card-section
                        style="cursor: pointer; padding: 5px"
                        class="row justify-between culender"
                      >
                        <div
                          class="culender__month"
                          v-for="(month, i) in firstMonths"
                          :class="[
                            monthIsHasData.includes(month)
                              ? ''
                              : 'disaple-month',
                            selected_months.includes(month) ? 'selected' : '',
                          ]"
                          :key="i"
                          @click="selectMonth(month)"
                        >
                          {{ getMonth(month) }}
                        </div>
                      </q-card-section>
                      <!-- <q-separator
                        class="q-ma-auto"
                        style="width: 70%"
                        color="grey-4"
                        spaced
                      />
                      <q-card-section
                        style="cursor: pointer; padding: 5px"
                        class="row justify-between culender"
                      >
                        <div
                          class="culender__month"
                          v-for="(quarter, i) in quarterMonth"
                          :key="i"
                        >
                          {{ quarter.label }}
                        </div>
                      </q-card-section> -->
                      <q-separator
                        class="q-ma-auto"
                        style="width: 70%"
                        color="grey-4"
                        spaced
                      />
                      <q-card-section
                        style="cursor: pointer; padding: 5px"
                        class="row justify-between culender"
                      >
                        <div
                          class="culender__month"
                          v-for="(item, i) in allFilter"
                          :key="i"
                          :class="
                            culenderForm.some((el) => el.year == item.year)
                              ? 'selected'
                              : ''
                          "
                          @click="actionSelectyear(item)"
                        >
                          {{ item.year }}
                        </div>
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                  <div
                    class="row justify-center q-ma-sm full-width"
                    style="white-space: nowrap"
                  >
                    <div>
                      <q-btn
                        class="q-mx-md"
                        color="blue"
                        size="sm"
                        label="apply"
                        @click="handelSubmitFilter"
                      />
                    </div>
                    <div>
                      <q-btn
                        class="q-mx-md"
                        size="sm"
                        label="Discard"
                        v-close-popup
                        @click="filterMenuToggle = false"
                      />
                    </div>
                  </div>
                </q-list>
              </q-menu>
            </q-btn>
            <!-- //////// -->
            <!-- group by -->
            <!-- //////// -->
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
                    v-for="(group, i) in opstionsGroupBy"
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
                        v-show="selectdGroupBy == group"
                        name="eva-checkmark-outline"
                        @click="selectGroupBy(group)"
                      />
                    </div>
                    <div style="cursor: pointer" @click="selectGroupBy(group)">
                      {{ group }}
                    </div>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <!-- //////// -->
            <!-- Favorits -->
            <!-- //////// -->
            <q-btn
              @click="unFavoritPage"
              icon="eva-bookmark"
              color="warning"
              label="Unfavorites"
              flat
              v-if="favorits_list.some((el) => el.url == href)"
            />
            <!-- size="lg" -->
            <q-btn
              v-else
              class="q-mr-md"
              flat
              label="Favorites"
              icon="img:images/fav-icon.png"
              color="#606060"
              @click="addToFavorits"
            />
          </div>
        </div>
      </div>
    </q-card-section>
    <!-- {{ countryList }}
    {{ ragionList }} -->
  </q-card>
</template>

<script setup>
const props = defineProps({
  countryList: Array,
  ragionList: Array,
  citys_list: Array,
  yearsForFilter: Array,
});

import { computed, onMounted, ref, watch } from "vue";
import { selected_filter } from "../composables/reaquist";
import { Notify, LocalStorage } from "quasar";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions: useFavoritAction } = createNamespacedHelpers("AppModule");
const { createFavorits, getFavorits, deleteFavorits } = useFavoritAction([
  "createFavorits",
  "getFavorits",
  "deleteFavorits",
]);
// export default {
const opstionsGroupBy = ref([
  "none",
  "City",
  "State/Region",
  "Country",
  "Creation Date",
  "Created by",
]);
const selectdGroupBy = ref("none");
const valueOfGroupBy = ref("");
// const selected_filter = ref({
//   valueSearch: "",
//   city: [],
//   regionId: [],
//   countryId: [],
//   years: [],
//   months: [""],
// });
const emit = defineEmits(["passFilerFormValue", "passSelectedGroupBy"]);
const selected_months = ref([]);
const filterMenuToggle = ref(false);
const culenderForm = ref([]);
const defaultFilter = ref([
  { label: "Jan", value: "1" },
  { label: "Feb", value: "2" },
  { label: "Mar", value: "3" },
  { label: "Apr", value: "4" },
  { label: "May", value: "5" },
  { label: "Jun", value: "6" },
  { label: "Jul", value: "7" },
  { label: "Aug", value: "8" },
  { label: "Sep", value: "9" },
  { label: "Oct", value: "10" },
  { label: "Nov", value: "11" },
  { label: "Dec", value: "12" },
]);
const firstMonths = ref([
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
]);
const monthIsHasData = ref([
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "10",
  "11",
  "12",
]);
const favorits_list = ref([]);
const href = computed(() => {
  return window.location.pathname;
});
/////////////
// computed
/////////////

const allFilter = computed(() => {
  return props.yearsForFilter;
  // { year: "2019", months: ["1", "2", " 5", "6", "8", "12"] },
  // { year: "2020", months: ["1", "2", "5", "6", "7", "11"] },
  // { year: "2022", months: ["1", "2", "3", "5", "6", "9"] },
  // { year: "2023", months: ["1", "2", "5", "6", "8", "12"] },
});
/////////////
// whatch
////////////
watch(selectdGroupBy, (val) => {
  emit("passSelectedGroupBy", val);
});
/////////////
// methods
/////////////
const getMonth = (month) => {
  // const monthLabel =
  return defaultFilter.value.filter((el) => el.value == month)[0].label;
};
// const formFilter = ref([]);
// const quarterMonth = ref([
//   { label: "q1", value: ["1", "2", "3"] },
//   { label: "q2", value: ["4", "5", "6"] },
//   { label: "q3", value: ["7", "8", "9"] },
//   { label: "q4", value: ["10", "11", "12"] },
// ]);

const selected_all_filter = ref([]);
const filterOpstions = computed(() => {
  return [
    {
      name: "city",
      label: "City",
      options: props.citys_list,
    },
    {
      name: "state",
      label: "State / Ragion",
      options: props.ragionList,
    },
    {
      name: "country",
      label: "Country",
      options: props.countryList,
    },
  ];
});
// };
const handelCheckFilter = (type, data) => {
  if (selected_all_filter.value.includes(data.opstion)) {
    let index = type.findIndex((el) => el.id == data.opstion.id);
    let indexOfGlobal = selected_all_filter.value.findIndex(
      (el) => el == data.opstion
    );
    type.splice(index, 1);
    selected_all_filter.value.splice(indexOfGlobal, 1);
  } else {
    type.push(data.opstion.id);
    selected_all_filter.value.push(data.opstion);
  }
  // console.log("selected");
  // console.log(selected_filter.value);
  // console.log("all");
  // console.log(selected_all_filter.value);
};
const selectFilter = (data) => {
  console.log(data);
  switch (data.filter.name) {
    case "city":
      handelCheckCity(selected_filter.value.city, data);
      break;
    case "state":
      handelCheckFilter(selected_filter.value.regionId, data);
      break;
    case "country":
      handelCheckFilter(selected_filter.value.countryId, data);
  }
};
const handelCheckCity = (type, data) => {
  if (selected_all_filter.value.includes(data.opstion)) {
    let index = type.findIndex((el) => el.id == data.opstion.id);
    let indexOfGlobal = selected_all_filter.value.findIndex(
      (el) => el == data.opstion
    );
    selected_filter.value.city = "";
    selected_all_filter.value.splice(indexOfGlobal, 1);
  } else {
    selected_filter.value.city = data.opstion.id;
    selected_all_filter.value.push(data.opstion);
  }
};
// favorits section
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
  const selected_fav = favorits_list.value.filter((el) => el.url == href.value);
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
const actionSelectyear = (item) => {
  // chack if first select
  if (
    culenderForm.value.length == 0 ||
    culenderForm.value.some((el) => el.year === "")
  ) {
    culenderForm.value = [];
    monthIsHasData.value = item.months;
    culenderForm.value.push({ year: item.year, months: [] });
    selected_months.value = [];
    selected_filter.value.months = [];
    selected_filter.value.years.push(item.year);
    // console.log(monthIsHasData.value);
    // if not first select
  } else {
    // if need unselect
    if (culenderForm.value.some((el) => el.year == item.year)) {
      // if my select is one (back to default selection)
      if (culenderForm.value.length == 1) {
        selected_months.value = [];
        // selected_filter.value.years.push(item.year);
        selected_filter.value.months = [];
        culenderForm.value = [];
        monthIsHasData.value = [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
        ];
        // if not one but need to just unselect
      } else {
        let index = culenderForm.value.findIndex((el) => el.year == item.year);
        culenderForm.value.splice(index, 1);

        item.months.forEach((val) => {
          var index = monthIsHasData.value.indexOf(val);
          monthIsHasData.value.splice(index, 1);
        });
        console.log("filterMonth");
        console.log(monthIsHasData.value);
      }
      // if need to add another select
    } else {
      culenderForm.value.push({ year: item.year, months: [] });
      monthIsHasData.value = [...monthIsHasData.value, ...item.months];
    }
  }
  console.log(culenderForm.value);
};
const selectMonth = (month) => {
  // check if disable
  if (monthIsHasData.value.includes(month)) {
    // if need select
    if (selected_months.value.some((el) => el == month)) {
      // chack if first select
      let index = selected_months.value.findIndex((el) => el == month);
      console.log(index);
      selected_months.value.splice(index, 1);
      culenderForm.value.forEach((el) => {
        var index2 = el.months.indexOf(month);
        return el.months.splice(index2, 1);
      });
      // if need unselect
    } else {
      console.log(culenderForm.value);
      if (culenderForm.value.length == 0) {
        console.log("// if need unselect");
        selected_months.value.push(month);
        culenderForm.value.push({ year: "", months: [month] });
        // else
      } else {
        console.log("else");
        selected_months.value.push(month);
        for (let i = 0; i < culenderForm.value.length; i++) {
          culenderForm.value[i].months.push(month);
        }
      }
    }
  }
};
const handelSubmitFilter = () => {
  let handelFilterForm = { ...selected_filter.value };
  handelFilterForm.months = selected_months.value;
  handelFilterForm.years = selected_months.value;
  culenderForm.value.forEach((el) => {
    return handelFilterForm.years.push(el.year);
  });
  // console.log(handelFilterForm);
  emit("passFilerFormValue", handelFilterForm);
};
const selectGroupBy = (select) => {
  selectdGroupBy.value = select;
};

onMounted(() => {
  getFavoritsList();
  console.log(props.citys_list);
  // console.log(getMonth("2"));
});
</script>

<style lang="scss">
.fillter-bar {
  margin: 30px 20px 20px 20px;
  padding: 40px 25px;
  background: #ffffff;
  box-shadow: 0px 4px 39px 9px rgba(81, 69, 159, 0.09);
  border-radius: 15px;
  height: 200px;
  &__title {
    font-family: "Poppins";
    display: flex;
    align-items: center;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: #355570;
    margin-top: 0;
    margin-bottom: 0;
    // padding-left: 30px;

    // color: #000000;
  }
  &__actions {
    &-search {
      border: 1px solid #e5e4e446;
      // filter: drop-shadow(0px 4px 15px #ecb4e9);
      // border-color: ;
      border-radius: 8px;
    }
    &-group {
      font-weight: 400;
      font-size: 12px;
      line-height: 18px;
      color: #606060;
    }
  }
}
.more-list {
  text-transform: capitalize;
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  color: rgba(0, 0, 0, 0.795);
  &__item {
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 15px;
  }
}
.culender {
  &__month {
    width: calc(95% / 4);
    border: 1px solid #dfdfdf;
    text-align: center;
  }
}
.disaple-month {
  opacity: 0.5;
  cursor: not-allowed;
}
.selected {
  color: blue;
  border: 1px solid blue;
}
</style>
