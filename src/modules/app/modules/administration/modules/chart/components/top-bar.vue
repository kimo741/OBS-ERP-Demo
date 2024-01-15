<template>
  <q-card class="">
    <div class="full-width">
      <div v-if="favorit" class="full-width">
        <!--  -->
        <q-btn
          @click="unFavoritPage"
          icon="eva-bookmark"
          color="warning"
          flat
          size="lg"
          v-if="favorits_list.some((el) => el.url == href)"
        />
        <q-btn
          v-else
          @click="addToFavorits"
          icon="eva-bookmark-outline"
          color="warning"
          flat
          size="lg"
        />
      </div>
    </div>
    <div class="bg-white shadow-1 q-pa-lg q-mb-md">
      <div class="row q-mt-lg items-center user-select">
        <div class="col-md-4 col-12 text-bold">
          <h3>
            {{ pageTitle }}
          </h3>
        </div>
        <!-- <div class="col-md-2"></div> -->
        <div v-if="search" class="col-md-8 col-12 q-pa-md select-component">
          <!-- //////////// -->
          <!-- input search -->
          <!-- //////////// -->
          <q-input
            outlined
            debounce="500"
            v-model="propertySearch"
            class="user-search"
            :placeholder="$t('global.search')"
            @keyup.enter="glopalSearch"
          >
            <template v-slot:append>
              <q-btn
                icon="eva-search-outline"
                class="cursor-pointer"
                flat
                :label="$t('global.search')"
                @click="glopalSearch"
              />
            </template>
          </q-input>
          <!-- //////////// -->
          <!-- //////////// -->
          <!-- //////////// -->
        </div>
      </div>
      <!-- ///////////////////////// -->
      <!-- sellect to filter  -->
      <!-- ///////////////////////// -->
      <div
        class="row q-mt-lg items-center justify-end user-select select-component"
      >
        <div class="col-md-4 col-6 q-px-md" @click="dialiogFilter">
          <q-select
            outlined
            multiple
            debounce="500"
            use-chips
            :model-value="slected_filter"
            option-value="id"
            map-options
            :label="$t('app.administration.charts.chartsProperty.filters')"
            style="margin: 0 1rem 0 0"
          />
        </div>
        <div class="col-md-4 col-6 q-px-md">
          <!-- //////////////// -->
          <!-- sellect group by -->
          <!-- //////////////// -->
          <q-select
            outlined
            v-model="groupByModel"
            :options="groupByOptions"
            :label="$t('app.administration.charts.chartsProperty.group_by')"
            debounce="500"
            emit-value
            option-value="id"
            map-options
          />
        </div>
      </div>
    </div>
  </q-card>
</template>

<script>
import { LocalStorage, Notify } from "quasar";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions: useFavoritAction } = createNamespacedHelpers("AppModule");
// const { useActions } = createNamespacedHelpers(
//   "AppModule/AdministrationModule/ChartsModule/chartsProperty"
// );
import { ref, onMounted, computed, watch } from "vue";
export default {
  props: {
    favorit: {
      type: Boolean,
      default: true,
    },
    search: {
      type: Boolean,
      default: true,
    },
    pageTitle: {
      type: String,
      default: "",
    },
    slected_filter: {
      type: Array,
      default: () => [],
    },
    groupByOptions: {
      type: Array,
      default: () => [],
    },
  },
  setup(prop, { emit }) {
    const propertySearch = ref("");
    const groupByModel = ref("");
    // const slected_filter = ref([]);
    const favorits_list = ref([]);
    // computed
    const href = computed(() => {
      return window.location.pathname;
    });
    // api
    const { createFavorits, getFavorits, deleteFavorits } = useFavoritAction([
      "createFavorits",
      "getFavorits",
      "deleteFavorits",
    ]);
    // methods
    const glopalSearch = () => {
      emit("glopalSearch", propertySearch.value);
    };
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
    const unFavoritPage = () => {
      const selected_fav = favorits_list.value.filter(
        (el) => el.url == href.value
      );
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
    const dialiogFilter = () => {
      emit("dialiogFilter");
    };
    // watch
    watch(groupByModel, (val) => {
      emit("passGroupBy", val);
    });
    // const groupByModel = () =>{}
    // mounted
    onMounted(() => {
      getFavoritsList();
    });
    return {
      propertySearch,
      addToFavorits,
      groupByModel,
      dialiogFilter,
      // slected_filter,
      glopalSearch,
      unFavoritPage,
      getFavoritsList,
      href,
      favorits_list,
    };
  },
};
</script>

<style>
</style>

