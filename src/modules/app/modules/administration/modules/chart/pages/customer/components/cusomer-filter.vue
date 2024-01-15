<template>
  <q-card class="full-width">
    <q-card-section style="background-color: #edf4fc" class="row items-center">
      <div class="text-h5">Filter</div>
      <q-space />
      <q-btn icon="close" flat round dense v-close-popup />
    </q-card-section>
    <q-card-section class="row justify-around items-center">
      <div class="col-12">
        <q-select
          class="q-my-sm"
          clearable
          v-model="filterForm.type"
          :options="typeChartOptions"
          label="Type"
          emit-value
          map-options
          option-value="id"
        />
      </div>
      <div class="col-12">
        <q-select
          class="q-my-sm"
          clearable
          v-model="filterForm.leadType"
          :options="typeChartOptions"
          label="Lead type"
          emit-value
          map-options
          option-value="id"
        />
      </div>
      <div class="col-12">
        <q-select
          class="q-my-sm"
          clearable
          v-model="filterForm.activityType"
          :options="typeChartOptions"
          label="Activation type"
          emit-value
          map-options
          option-value="id"
        />
      </div>
    </q-card-section>
    <q-card-section class="row">
      <div class="q-gutter-sm">
        <q-checkbox v-model="filterForm.isActive" label="Is active " />
      </div>
    </q-card-section>
    <q-card-actions class="row justify-end">
      <q-btn
        class="q-mx-sm"
        flat
        size="md"
        padding="15px 30px"
        label="close"
        v-close-popup
      />
      <q-btn
        unelevated
        style="border-radius: 10px"
        no-caps
        size="md"
        padding="15px 30px"
        :label="$t('app.administration.charts.chartsProperty.confirm')"
        outline
        color="primary"
        @click="confirmFilter"
      />
    </q-card-actions>
  </q-card>
</template>

<script>
import { ref } from "vue";
export default {
  setup(prop, { emit }) {
    const typeChartOptions = ref([
      {
        label: "opstion 1",
        id: "1",
      },
      {
        label: "opstion 2",
        id: "2",
      },
      {
        label: "opstion 3 ",
        id: "3",
      },
      {
        label: "opstion 4",
        id: "4",
      },
    ]);
    const filterForm = ref({
      type: null,
      leadType: null,
      activityType: null,
      isActive: true,
    });
    const confirmFilter = () => {
      emit("passFilterData", filterForm.value);
    };
    return {
      filterForm,
      confirmFilter,
      typeChartOptions,
    };
  },
};
</script>

<style>
</style>
