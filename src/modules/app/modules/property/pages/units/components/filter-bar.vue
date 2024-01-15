<template>
  <q-card class="filter-bar row items-center bg-white">
    <q-card-section class="col-4">
      <div class="title-page q-pa-md filter-bar__title">
        {{ $t("app.administration.settings.property_unit.title") }}
      </div>
    </q-card-section>
    <q-card-section class="col-8">
      <q-input
        outlined
        debounce="500"
        v-model="search_modal"
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
    </q-card-section>
    <q-card-section class="col-12 row">
      <div class="col-4"></div>
      <div class="col-6 row">
        <q-btn
          class="q-mr-md"
          flat
          label="Filters"
          icon="img:images/icon-filter.png"
          @click="modelFilterDialog = true"
        />
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
    </q-card-section>
  </q-card>
  <q-dialog
    persistent
    transition-show="scale"
    transition-hide="scale"
    v-model="modelFilterDialog"
  >
    <filter-dialog />
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import { LocalStorage } from "quasar";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import filterDialog from "./filter-dialog.vue";
const { useActions: useFavoritAction } = createNamespacedHelpers("AppModule");
const emit = defineEmits(["emitToSearch"]);
const modelFilterDialog = ref(false);
const favorits_list = ref([]);
const glopalSearch = () => {
  emit("emitToSearch", search_modal.value);
};
// favorits collection
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
const { createFavorits, getFavorits, deleteFavorits } = useFavoritAction([
  "createFavorits",
  "getFavorits",
  "deleteFavorits",
]);
</script>

<style lang="scss">
.filter-bar {
  // height: 150px;
  border-radius: 10px;
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
}
</style>
