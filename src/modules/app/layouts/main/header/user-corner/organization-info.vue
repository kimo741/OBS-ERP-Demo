<template>
  <div class="q-mx-sm select-component" style="width: 200px">
    <q-select
      hide-bottom-space
      :label="name"
      :options="company_list"
      @update:model-value="handleCompany"
      :clearable="false"
      :use-input="false"
      color="primary"
      class="border-company"
      option-value="id"
      map-options
      emit-value
      :model-value="profile.companyId"
      dense
    />
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";
import { DEFAULT_ROUTE } from "src/configs/router";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { LocalStorage } from "quasar";
import { Router } from "src/router";
const { useActions: useOrganizationActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/organizationModule"
);
const { useState: usePropertyState, useActions: usePropertyAction } =
  createNamespacedHelpers(
    "AppModule/AdministrationModule/ChartsModule/chartsProperty"
  );
const { useState: useProfileState, useActions: useProfileActions } =
  createNamespacedHelpers("AppModule/ProfileModule");

export default defineComponent({
  setup() {
    const name = ref("");
    // const company_list = ref([]);
    const { getOrganization } = useOrganizationActions(["getOrganization"]);
    const { getCompanyList } = usePropertyAction(["getCompanyList"]);
    const { update, getContrycode } = useProfileActions([
      "update",
      "getContrycode",
    ]);
    const { profile } = useProfileState(["profile"]);
    const { company_list } = usePropertyState(["company_list"]);
    const companyList = () => {
      getCompanyList()
        .then((res) => {
          // company_list.value = res.data.value;
        })
        .catch((_error) => {
          Loading.hide();
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    onMounted(() => {
      getOrganization().then((res) => {
        name.value = res.data.value.organizationLabel;
      });
      companyList();
      console.log(profile.value.companyId);
      getContrycode(profile.value.companyId).then((res) => {
        LocalStorage.set("contry-code", res.data.value);
      });
    });

    const handleCompany = async (companyId) => {
      const userId = LocalStorage.getItem("user-id");
      const payload = {
        userId: userId,
        companyId,
      };
      update(payload);
      Router.push(DEFAULT_ROUTE);
      getContrycode(companyId)
        .then((res) => {
          LocalStorage.set("contry-code", res.data.value);
          window.location.reload();
        })
        .catch((_error) => {
          Loading.hide();
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };

    return {
      name,
      profile,
      handleCompany,
      company_list,
    };
  },
});
</script>
<style>
.select-component .q-field--standard .q-field__control:before {
  border: 2px solid #efeeeb;
  border-radius: 10px;
}
.select-component .q-select--without-input .q-field__control {
  padding: 5px 15px;
}
</style>
