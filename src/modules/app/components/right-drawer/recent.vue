<template>
  <div class="full-width full-height" style="background-color: #edf3f8">
    <div class="set-dialog-bg q-pa-lg row">
      <div class="text-h4 text-white">Recents</div>
      <q-space />
      <q-btn
        icon="eva-arrow-forward-outline"
        color="white"
        size="lg"
        flat
        round
        dense
        @click="closeDrawer"
      />
    </div>
    <!-- <div class="text-hint"></div> -->
    <q-list
      bordered
      separator
      class="full-height"
      style="overflow-y: auto; background-color: #edf3f8"
    >
      <q-item v-ripple>
        <q-item-label header>Today</q-item-label>
      </q-item>

      <q-item
        :to="recent.urlPage"
        clickable
        v-ripple
        v-for="(recent, i) in recentList"
        :key="i"
      >
        <q-item-section>
          <q-item-label class="text-black">{{ recent.pageName }}</q-item-label>
          <q-item-label caption>{{ recent.vistIn }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item v-ripple>
        <q-item-label header>Yesterday</q-item-label>
      </q-item>
      <q-item clickable v-ripple v-for="item in 4" :key="item">
        <!-- <q-item-section>
          <q-item-label>Item with caption</q-item-label>
          <q-item-label caption>2023-04-18T05:32:00</q-item-label>
        </q-item-section> -->
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers("AppModule");
import { LocalStorage } from "quasar";
import { APP_SETTINGS_KEY } from "configs/storage";
export default {
  setup(prop, { emit }) {
    const recentList = ref([]);
    const { getResentsList } = useActions(["getResentsList"]);
    const closeDrawer = () => {
      emit("closeDrawer");
    };
    const getList = async () => {
      try {
        const setting = LocalStorage.getItem(APP_SETTINGS_KEY);
        // const companyId = await setting.profile.companyId;
        const req = await getResentsList();
        recentList.value = await req.data.value;
        console.log(req.data.value);
      } catch (error) {
        return console.log(error.data);
      }
    };
    onMounted(() => {
      getList();
    });
    return {
      closeDrawer,
      recentList,
      getList,
    };
  },
};
</script>

<style>
</style>
