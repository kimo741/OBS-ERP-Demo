<template>
  <div class="full-width" style="background-color: #edf3f8">
    <div class="set-dialog-bg q-pa-lg row">
      <div class="text-h4 text-white">Favorits</div>
      <q-space />
      <q-btn
        icon="eva-arrow-forward-outline"
        flat
        round
        dense
        color="white"
        @click="closeDrawer"
        size="lg"
      />
    </div>
    <!-- <div class="text-hint"></div> -->
    <q-list
      bordered
      separator
      class="full-height"
      style="overflow-y: auto; background-color: #edf3f8"
      v-if="favoritList.length"
    >
      <!-- <q-item v-ripple>
        <q-item-label header>Today</q-item-label>
      </q-item> -->

      <q-item
        clickable
        v-ripple
        v-for="(favorits, key) in favoritList"
        :key="key"
      >
        <q-item-section @click="openUrlPage(favorits)" class="over-f">{{
          favorits.url
        }}</q-item-section>
        <q-item-section side avatar>
          <q-btn
            flat
            color="red-5"
            icon="delete"
            @click="handelDeleteFavorits(favorits)"
          />
        </q-item-section>
      </q-item>
    </q-list>
    <div v-else-if="isPending" class="row justify-center items-center">
      <q-circular-progress
        indeterminate
        rounded
        size="50px"
        color="primary"
        class="q-ma-md"
      />
    </div>
    <div v-else>No favorit data founde</div>
  </div>
</template>

<script>
import useQuasar from "quasar/src/composables/use-quasar.js";
import { ref, onMounted } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers("AppModule");
import { LocalStorage, Notify, Loading } from "quasar";
import { APP_SETTINGS_KEY } from "configs/storage";
import { Router } from "src/router";
export default {
  setup(prop, { emit }) {
    const $q = useQuasar();
    const isPending = ref(false);
    const favoritList = ref([]);
    const closeDrawer = () => {
      emit("closeDrawer");
    };
    const { getFavorits, deleteFavorits } = useActions([
      "getFavorits",
      "deleteFavorits",
    ]);
    const getFavoritsList = async () => {
      isPending.value = true;
      try {
        const setting = LocalStorage.getItem(APP_SETTINGS_KEY);
        const companyId = await setting.profile.companyId;
        const req = await getFavorits(companyId);
        favoritList.value = await req.data.value;
        isPending.value = false;
      } catch (error) {
        return console.log(error.data);
        isPending.value = false;
      }
    };
    const handelDeleteFavorits = (favorits) => {
      $q.dialog({
        title: "Confirm",
        message: "Would you like to delete from favorit  ?",
        cancel: true,
        persistent: true,
      })
        .onOk(async () => {
          Loading.show();
          deleteFavorits(favorits.id)
            .then((res) => {
              Loading.hide();
              getFavoritsList();
              Notify.create({
                message: `Success delete ${favorits.url} from favorits`,
                color: "red",
                position: "bottom",
              });
            })
            .catch((err) => {
              Loading.hide();
              console.log(err);
            });
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    };
    const openUrlPage = (favorit) => {
      Router.push(`${favorit.url}`);
    };
    onMounted(() => {
      getFavoritsList();
    });
    return {
      closeDrawer,
      openUrlPage,
      handelDeleteFavorits,
      isPending,
      getFavoritsList,
      favoritList,
    };
  },
};
</script>

<style>
.over-f {
  /* text-overflow: ; */
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
