<template>
  <q-card
    class="set-dialog-bg create-item"
    style="width: 1500px; max-width: 100vw; max-height: 90vh"
  >
    <q-card-section class="q-px-xl q-py-lg">
      <div class="text-h5">Create Group/Account</div>
    </q-card-section>
    <q-card-section class="q-px-xl q-py-lg">
      <div class="q-gutter-sm">
        <q-radio v-model="checkCreate" val="group" label="Group" />
        <q-radio v-model="checkCreate" val="account" label="Account" />
      </div>
    </q-card-section>

    <form v-if="isGroup" @submit.prevent="submitCreateGroup">
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
            <q-input type="number" v-model="formGroup.no" label="Group No" />
          </div>
          <div class="col-6 q-px-sm q-mt-lg">
            <q-input type="number" v-model="formGroup.level" label="level" />
          </div>
          <div class="col-6 q-px-sm q-mt-lg">
            <q-input
              type="number"
              v-model="formGroup.name"
              label="Group Name"
            />
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
              v-model="formGroup.currencyId"
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
                v-model="formGroup.postingtype"
                val="BalanceSheet"
                label="Balance Sheet"
              />
              <q-radio
                v-model="formGroup.postingtype"
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
                v-model="formGroup.typical"
                val="Credit"
                label="Credir"
              />
              <q-radio v-model="formGroup.typical" val="Debit" label="Debit" />
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
    <form v-else @submit.prevent="submitCreateAccount">
      <!-- <q-card-section class="q-px-xl q-py-lg">
        <div class="text-h5">Create Account Guide</div>
      </q-card-section> -->
      <q-card-section class="q-px-xl q-py-lg">
        <div class="row">
          <!-- Main Group -->
          <div class="col-6 q-px-sm q-mt-lg">
            <q-select
              v-model="formData.mainGroupId"
              :options="groups"
              emit-value
              map-options
              option-value="id"
              label="Main Group"
            ></q-select>
          </div>
          <!-- acc no -->
          <div class="col-6 q-px-sm q-mt-lg">
            <q-input type="number" v-model="formData.no" label="Account No" />
          </div>
          <!-- level -->
          <div class="col-6 q-px-sm q-mt-lg">
            <q-input type="number" v-model="formData.level" label="level" />
          </div>
          <!-- Account name -->
          <div class="col-6 q-px-sm q-mt-lg">
            <q-input type="number" v-model="formData.name" label="Account" />
          </div>
          <div class="col-6 q-px-sm q-mt-lg">
            <!-- accountType -->
            <q-select
              v-model="formData.accountType"
              :options="accTipeOptions"
              emit-value
              map-options
              option-value="id"
              label="Acc Type"
            ></q-select>
          </div>
          <!-- currencyId -->
          <div class="col-6 q-px-sm q-mt-lg">
            <q-select
              v-model="formData.currencyId"
              :options="currenciesOptions"
              emit-value
              map-options
              option-value="id"
              label="Currency"
            ></q-select>
          </div>
        </div>
      </q-card-section>
      <!-- ////////// -->
      <!-- Properties -->
      <!-- ////////// -->
      <q-card-section class="q-px-xl q-py-lg">
        <div class="text-h5">Properties</div>
      </q-card-section>
      <q-card-section class="q-px-xl q-py-lg">
        <div class="row">
          <!-- Posting Type -->
          <div class="col-6 q-px-sm q-mt-lg">
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
          <!-- Typical -->
          <div class="col-6 q-px-sm q-mt-lg">
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
          <!-- Acc Category -->
          <div class="col-12 q-px-sm q-mt-lg">
            <div class="text-body1">Acc Category</div>
            <div class="q-gutter-sm">
              <q-radio
                class="q-mx-sm"
                v-model="formData.typical"
                val="Capitalized"
                label="Capitalized"
              />
              <q-radio
                v-model="formData.typical"
                val="ControlAccount"
                label="Control Account"
              />
            </div>
          </div>
          <!-- tags -->
          <div class="col-12 q-px-sm q-my-md">
            <q-select
              multiple
              :readonly="is_review_from_card"
              v-model="formData.tagList"
              :options="tagListOptions"
              option-value="id"
              use-chips
              :label="$t('app.administration.charts.chartsProperty.tags')"
            ></q-select>
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
import { ref, onMounted, watch } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/MainPage"
);
const { useActions: propertys } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);

export default {
  props: {
    groups: {
      type: Array,
      defaulte: [],
    },
  },
  setup(prop, { emit }) {
    const checkCreate = ref("account");
    const isGroup = ref(false);
    const accTipeOptions = ref(["Regular", "FixedAsset"]);
    const currenciesOptions = ref([]);
    const tagListOptions = ref([]);
    const { currenciesList, createAccount, createMainGroup } = useActions([
      "currenciesList",
      "createAccount",
      "createMainGroup",
    ]);
    const { getTagList } = propertys(["getTagList"]);
    const formData = ref({
      mainGroupId: "",
      no: "",
      name: "",
      accountType: "",
      currencyId: "",
      postingtype: "",
      typical: "",
      accCategory: "",
      isActive: true,
      tagIds: [],
      level: "",
    });
    const formGroup = ref({
      name: "",
      no: "",
      mainGroupId: "",
      currencyId: "",
      postingtype: "",
      typical: "",
      level: "",
    });
    // watch
    watch(checkCreate, (val) => {
      // req api to get groupby
      if (val == "account") {
        isGroup.value = false;
      } else {
        isGroup.value = true;
      }
    });
    // submit form
    const submitCreateAccount = () => {
      // emit("pssCreateMainGroupForm", formData);
    };
    const submitCreateGroup = () => {
      // emit("pssCreateMainGroupForm", formData);
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
    // dropdown tag List
    const getTagListOptins = async () => {
      const req = await getTagList();
      try {
        tagListOptions.value = await req.data.value;
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
      getTagListOptins();
    });
    return {
      formData,
      isGroup,
      formGroup,
      checkCreate,
      accTipeOptions,
      currenciesOptions,
      tagListOptions,
      getCurrenciesOptions,
      submitCreateGroup,
    };
  },
};
</script>

  <style>
</style>
