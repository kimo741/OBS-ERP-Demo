<template>
  <q-card
    class="set-dialog-bg create-item"
    style="width: 1500px; max-width: 100vw; max-height: 90vh"
  >
    <form @submit.prevent="submitCreateGroup">
      <q-card-section class="q-px-xl q-py-lg">
        <div class="text-h5">Create Main Group</div>
      </q-card-section>
      <q-card-section class="q-px-xl q-py-lg">
        <div class="row">
          <div class="col-6 q-px-sm q-mt-lg">
            <q-input
              type="text"
              v-model="formData.mainGroupId"
              label="Main Group"
            />
          </div>
          <div class="col-6 q-px-sm q-mt-lg">
            <q-input type="number" v-model="formData.no" label="Group No" />
          </div>
          <div class="col-6 q-px-sm q-mt-lg">
            <q-input type="number" v-model="formData.level" label="level" />
          </div>
          <div class="col-6 q-px-sm q-mt-lg">
            <q-input type="number" v-model="formData.name" label="Group Name" />
          </div>
        </div>
      </q-card-section>
      <!-- ////////// -->
      <!-- defaultes -->
      <!-- ////////// -->
      <q-card-section class="q-px-xl q-py-lg">
        <div class="text-h5">Defaults</div>
      </q-card-section>
      <q-card-section class="q-px-xl q-py-lg">
        <div class="row">
          <!-- //// -->
          <!-- tags -->
          <!-- //// -->
          <div class="col-12 q-px-sm q-my-md">
            <q-select
              v-model="formData.currencyId"
              :options="currenciesOptions"
              label="Currency"
              option-value="id"
              map-options
            ></q-select>
          </div>
          <div class="col-12 q-px-sm q-mt-lg">
            <div class="text-body1">Posting Type</div>
            <div class="q-gutter-sm">
              <q-radio
                v-model="formData.postingtype"
                val="BalanceSheet"
                label="Balance Sheet"
              />
              <q-radio
                v-model="formData.postingtype"
                val="IncomeStatement"
                label="Income Statement"
              />
            </div>
          </div>
          <div class="col-12 q-px-sm q-mt-lg">
            <div class="text-body1">Typical</div>
            <div class="q-gutter-sm">
              <q-radio
                class="q-mx-sm"
                v-model="formData.typical"
                val="Credit"
                label="Credir"
              />
              <q-radio v-model="formData.typical" val="Debit" label="Debit" />
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions
        style="position: sticky; bottom: 0"
        align="right"
        class="bg-white text-teal q-px-xl q-py-lg"
      >
        <q-btn
          class="q-ml-md btn-component"
          style="color: black"
          padding="10px 20px"
          color="primary"
          unelevated
          no-caps
          type="submit"
          :label="$t('global.save')"
        />
        <q-btn
          class="q-ml-md btn-component"
          style="color: black"
          outline
          padding="10px 20px"
          unelevated
          flat
          no-caps
          :label="$t('global.cancel')"
          v-close-popup
        />
      </q-card-actions>
    </form>
  </q-card>
</template>

<script>
import { ref, onMounted } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { Notify } from "quasar";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/MainPage"
);

export default {
  setup(prop, { emit }) {
    const currenciesOptions = ref([]);
    const { currenciesList, createMainGroup } = useActions([
      "currenciesList",
      "createMainGroup",
    ]);
    const formData = ref({
      name: "",
      no: "",
      mainGroupId: "",
      currencyId: "",
      postingtype: "",
      typical: "",
      level: "",
    });
    // submit form
    const submitCreateGroup = async () => {
      const req = createMainGroup(formData.value);
      try {
        Notify.create({
          message: "Success Create main group",
          color: "green",
          position: "top",
        });
      } catch (_error) {
        Notify.create({
          message: _error.data.errorMessage
            ? _error.data.errorMessage
            : _error.data,
          color: "red",
          position: "top",
        });
      }
    };
    // dropdown currencies
    const getCurrenciesOptions = async () => {
      const req = await currenciesList();
      try {
        currenciesOptions.value = await req.data.value;
      } catch (_error) {
        Notify.create({
          message: _error.data.errorMessage
            ? _error.data.errorMessage
            : _error.data,
          color: "red",
          position: "top",
        });
      }
    };
    // mounted
    onMounted(() => {
      getCurrenciesOptions();
    });
    return {
      formData,
      currenciesOptions,
      getCurrenciesOptions,
      submitCreateGroup,
    };
  },
};
</script>

<style>
</style>
