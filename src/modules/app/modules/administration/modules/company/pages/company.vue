<template>
  <q-page padding>
    <obs-table
      :key="key"
      :duplicate="false"
      :title="$t('app.administration.company.company')"
      row-key="id"
      class="company-table"
      action="AppModule/AdministrationModule/CompanyModule/getCompanies"
      to="/app/administration/company/data"
      :columns="[
        {
          name: 'number',
          label: '#',
          field: 'number',
          align: 'left',
        },
        {
          sortable: true,
          name: 'companyName',
          label: $t('app.administration.company.name'),
          align: 'left',
          field: 'companyName',
        },
        {
          sortable: true,
          name: 'companyLabel',
          label: $t('app.administration.company.labelName'),
          align: 'left',
          field: 'companyLabel',
        },
        {
          name: 'companyLogo',
          label: $t('app.administration.company.logo'),
          align: 'left',
          field: 'companyLogo',
        },
        {
          name: 'currencyName',
          label: $t('app.administration.company.currencyName'),
          align: 'left',
          field: 'currencyName',
        },
        {
          sortable: true,
          name: 'activityType',
          label: $t('app.administration.company.activityTypesName'),
          align: 'left',
          field: 'activityType',
        },
        {
          sortable: true,
          name: 'businessSector',
          label: $t('app.administration.company.businessSectorName'),
          align: 'left',
          field: 'businessSector',
        },
        {
          name: 'actions',
          label: $t('app.administration.company.actionsName'),
          align: 'left',
          actions: (item) => [
            {
              icon: 'edit',
              label: $t('app.administration.company.edit'),
              to: `/app/administration/company/data/${item.id}`,
              props: item,
            },
            {
              icon: 'delete',
              color: 'red',
              label: $t('app.administration.settings.delete'),
              onClick: () => confirmDeleteSector(item),
            },
          ],
        },
      ]"
    >
      <template #cell-number="item">
        {{ item.rowIndex + 1 }}
      </template>

      <template #cell-companyLogo="item">
        <q-avatar v-if="item.row.companyLogo">
          <img style="object-fit: cover" :src="item.row.companyLogo" />
        </q-avatar>
      </template>
    </obs-table>
  </q-page>
</template>

<script>
import { Dialog, Loading } from "quasar";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { useRemount } from "src/composables/hooks";

const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/CompanyModule"
);
import { errOptions, sucOptions } from "src/composables/notify-options.js";
export default {
  setup() {
    const { deleteCompany } = useActions(["deleteCompany"]);
    const { key, remount } = useRemount();

    const confirmDeleteSector = (item) => {
      Dialog.create({
        title: `Confirm Deleting company`,
        message: "Would you like to delete this company?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        handleDeleteSector(item);
      });
    };

    const handleDeleteSector = (item) => {
      const { id } = item;
      Loading.show();
      deleteCompany(id)
        .then(() => {
          remount();
          Notify.create({
            message: "Success Delete Company",
            ...sucOptions,
          });
        })
        .catch((error) => {
          Notify.create({
            message: error?.data?.errorMessage || error.message,
            ...errOptions,
          });
        })
        .finally(() => {
          Loading.hide();
        });
    };
    return {
      confirmDeleteSector,
      key,
    };
  },
};
</script>
<style>
.company-table .my-sticky-header-table .q-td {
  text-align: left;
}
</style>
