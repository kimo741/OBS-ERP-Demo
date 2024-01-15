<template>
  <q-card class="visit-container">
    <q-card-section class="row justify-between items-start full-height">
      <div class="visit-container__title">Visits</div>
      <div class="fillter-bar__actions col-6 row full-height">
        <q-input
          outlined
          v-model="search_model"
          class="user-search full-width fillter-bar__actions-search"
          :placeholder="$t('global.search')"
          @keyup.enter="handelSubmitFilter"
        />
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from "vue";

// state
const search_model = ref("");
// methods
// hook
</script>

<style lang="scss" scoped>
.visit-container {
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
