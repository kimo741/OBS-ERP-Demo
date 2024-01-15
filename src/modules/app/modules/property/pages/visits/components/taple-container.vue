<template>
  <q-card class="visit-table-container">
    <q-card-section class="row justify-end items-start full-height">
      <q-btn-dropdown
        :label="$t('global.create')"
        class="q-ml-md btn-2 btn-component"
        :padding="$q.screen.lt.md ? ' 8px 50px' : '10px 60px'"
        size="md"
        unelevated
        @click="openDialogToCreate"
      >
        <q-list>
          <q-item
            v-for="(item, i) in createList"
            :key="i"
            clickable
            v-close-popup
            @click="item.action"
          >
            <q-item-section>
              <q-item-label>{{ item.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-card-section>
  </q-card>
  <q-dialog
    v-model="visitPermitDialog"
    persistent
    transition-show="scale"
    transition-hide="scale"
    full-width
  >
    <visitDialog @closeDialog="visitPermitDialog = false" />
  </q-dialog>
</template>

<script setup>
import { ref } from "vue";
import visitDialog from "../components/visit-permit-dialog.vue";

const visitPermitDialog = ref(false);
const createVisit = () => {
  console.log("createVisit");
};
const createVisitPrimet = () => {
  // console.log("createVisitPrimet");
  visitPermitDialog.value = true;
};
const createBlockVistor = () => {
  console.log("createBlockVistor");
};
const createList = [
  {
    label: "Visit",
    action: createVisit,
  },
  {
    label: "Visit primit",
    action: createVisitPrimet,
  },
  {
    label: "Unwelcome visitor",
    action: createBlockVistor,
  },
];
</script>

<style lang="scss" scoped>
.visit-table-container {
  margin: 30px 20px 20px 20px;
  padding: 40px 25px;
  background: #ffffff;
  box-shadow: 0px 4px 39px 9px rgba(81, 69, 159, 0.09);
  border-radius: 15px;
  height: 150px;
  overflow: auto;
  &__title {
    font-family: "Poppins";
    display: flex;
    align-items: center;
    text-transform: capitalize;
    font-weight: 600;
    font-size: 24px;
    line-height: 30px;
    color: #355570;
  }
}
</style>
