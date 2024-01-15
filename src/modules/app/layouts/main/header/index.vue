<template>
  <q-header
    :class="{
      'bg-white text-dark': !$q.dark.isActive,
      'bg-dark': $q.dark.isActive,
    }"
  >
    <div class="bg-white q-px-sm items-center ucp-top-header">
      <div class="row q-my-md">
        <div class="col-md-1 self-center text-center">
          <img src="/images/adminlogo.svg" />
        </div>
        <div class="col-md-1 self-center text-right">
          <q-btn
            icon="menu"
            flat
            no-caps
            dense
            round
            @click="handleToggleDrawer"
            absolute
            right="0"
            class="q-mr-sm myclass"
          />
        </div>
        <div class="col-md-5 q-px-lg self-center">
          <q-input
            outlined
            debounce="500"
            v-model="text"
            class="custom-search"
            placeholder="Search for anything"
          >
            <template v-slot:prepend>
              <img src="/images/search.svg" class="q-mr-md" />
            </template>
          </q-input>
        </div>
        <div class="col-md-3 row self-center text-right q-pr-lg flex">
          <img src="/images/gift.svg" class="q-mr-md" />
          <img src="/images/video.svg" class="q-mr-md" />
          <img src="/images/file.svg" class="q-mr-md" />
          <img src="/images/calender.svg" class="q-mr-md" />
          <img src="/images/bel.svg" class="q-mr-md" />
          <img
            src="/images/message.svg"
            class="q-mr-md clickable"
            @click="router.push('/app/messages')"
          />
          <img src="/images/email.svg" class="q-mr-md" />
          <!-- <img src="/images/global.svg" class="q-mr-md" /> -->
          <LookUpsLamguage class="col" />
        </div>
        <div class="col-md-2 self-center flex">
          <ucp-header-user-corner />
        </div>
      </div>
    </div>
  </q-header>
</template>

<script>
import LookUpsLamguage from "src/modules/app/components/language/lookUpsLamguage.vue";
import { defineComponent } from "vue";

import UcpBreadcrumb from "./breadcrumb";
import UcpHeaderUserCorner from "./user-corner";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  components: {
    UcpHeaderUserCorner,
    LookUpsLamguage,
  },
  props: {
    isMini: {
      type: Boolean,
      default: false,
    },
  },
  setup(_, { emit }) {
    const router = useRouter();
    const route = useRoute();

    return {
      handleToggleDrawer() {
        emit("toggleDrawer");
      },
      router,
      route,
    };
  },
});
</script>

<style lang="scss" scoped>
.ucp-top-header {
  min-height: 65px;
}

.ucp-bottom-header {
  min-height: 55px;
}
</style>
<style>
.custom-search,
.custom-search .q-field__prepend,
.custom-search .q-field__control-container {
  height: 42px;
}

.custom-search .q-field__control {
  height: 42px;
}

.custom-search .q-placeholder {
  color: #b5b7c0;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
}
.myclass {
  color: #294b6c;
}
.clickable {
  cursor: pointer;
}
</style>
