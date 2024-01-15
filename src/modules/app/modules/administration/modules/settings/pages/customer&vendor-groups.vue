<template>
  <q-page padding>
    <!-- :key="key" -->
    <obs-table
      title="Customer & Vendor Groups "
      row-key="id"
      :moreOptions="false"
      :duplicate="false"
      action="AppModule/AdministrationModule/SettingsModule/getCustomerAndVendors"
      :onAdd="openCreateDialog"
      :key="key"
      :columns="[
        {
          name: 'number',
          label: '#',
          field: 'number',
          align: 'left',
          headerStyle: 'width: 5%',
        },
        // {
        //   sortable: true,
        //   name: 'businessSectorNameEn',
        //   label: $t('app.administration.settings.businessSector'),
        //   align: 'left',
        //   field: 'businessSectorNameEn',
        // },
        {
          name: 'name',
          label: 'Name',
          field: 'name',
          align: 'left',
          headerStyle: 'width: 42%',
        },
        {
          name: 'typeName',
          label: 'type Name',
          field: 'typeName',
          align: 'left',
          headerStyle: 'width: 42%',
        },
        {
          name: 'actions',
          label: $t('app.administration.settings.actions'),
          align: 'center',
          headerStyle: 'width: 10%',
          actions: (item) => [
            {
              icon: 'edit',
              label: $t('app.administration.settings.edit'),
              onClick: () => handleEdit(item),
            },
            {
              icon: 'delete',
              color: 'red',
              label: $t('app.administration.settings.delete'),
              onClick: () => confirmDeleteGroup(item),
            },
          ],
        },
      ]"
    >
      <template #cell-number="item">
        {{ item.rowIndex + 1 }}
      </template>
    </obs-table>
    <q-dialog @hide="clearForm" v-model="toggleDialog" persistent>
      <q-card style="min-width: 350px">
        <q-card-section v-if="isEdit">
          <div class="text-h6">Update Group</div>
        </q-card-section>
        <q-card-section v-else>
          <div class="text-h6">Create Group</div>
        </q-card-section>
        <obs-form @obs-submit="onSubmitForm">
          <q-card-section class="q-pt-none">
            <q-input
              type="text"
              label="Name"
              v-model="form.name"
              :rules="[(val) => val.length > 0 || 'Name Is Required']"
            />
            <q-select
              v-model="form.type"
              :options="typeOpstions"
              emit-value
              map-options
              label="Group Type"
            />
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn
              flat
              :label="
                isEdit
                  ? $t('global.edit')
                  : $t('app.administration.settings.submit')
              "
              type="submit"
            />
          </q-card-actions>
        </obs-form>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { useDialog, useRemount } from "src/composables/hooks";

import { Loading, Dialog, Notify } from "quasar";
import { ref } from "vue";
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { useI18n } from "vue-i18n";

const { useActions } = createNamespacedHelpers(
  "AppModule/AdministrationModule/SettingsModule"
);

export default {
  setup() {
    const { key, remount } = useRemount();
    const toggleDialog = ref(false);
    // const dialog = ref(false);
    const isEdit = ref(false);
    const form = ref({
      name: "",
      type: "",
    });
    const typeOpstions = ref([
      { label: "Vendor", value: 1 },
      { label: "Customer", value: 2 },
    ]);
    const {
      // getCustomerAndVendors,
      createCustomerAndVendors,
      updateCustomerAndVendors,
      deleteCustomerAndVendors,
    } = useActions([
      // "getCustomerAndVendors",
      "createCustomerAndVendors",
      "updateCustomerAndVendors",
      "deleteCustomerAndVendors",
    ]);
    const confirmDeleteGroup = (item) => {
      Dialog.create({
        title: `Confirm Deleting Group `,
        message: "Would you like to delete this tag?",
        cancel: true,
        persistent: true,
      }).onOk(() => {
        handleDeleteGroup(item.id);
      });
    };

    const handleDeleteGroup = (id) => {
      // Loading.show();
      deleteCustomerAndVendors(id)
        .then(() => {
          remount();
          // reMountTable();s
          Notify.create({
            message: "Success delete group",
            color: "green",
            position: "bottom",
          });
          remount();
        })

        .catch((error) => {
          Notify.create({
            message: `${error.data.errorMessage}`,
            color: "red",
            position: "top",
          });
        })
        .finally(() => {
          // Loading.hide();
        });
    };
    const clearForm = () => {
      form.value = {
        name: "",
        type: "",
      };
    };
    const openCreateDialog = () => {
      clearForm();
      isEdit.value = false;
      toggleDialog.value = true;
    };
    const handleEdit = (item) => {
      form.value.id = item.id;
      form.value.name = item.name;
      form.value.type = item.type;
      isEdit.value = true;
      toggleDialog.value = true;
    };
    const confirmCreate = () => {
      // Loading.show();
      const payload = form.value;
      createCustomerAndVendors(payload)
        .then((res) => {
          remount();
          toggleDialog.value = false;
          Notify.create({
            message: "Success create group",
            color: "green",
            position: "bottom",
          });
          // Loading.hide();
        })
        .catch((error) => {
          Notify.create({
            message: error.response
              ? error.response.data.errorMessage
              : error.message,
            color: "red",
            position: "bottom",
          });
          // Loading.hide();
        });
    };
    const confirmUpdate = () => {
      // Loading.show();
      const payload = form.value;
      updateCustomerAndVendors(payload)
        .then((res) => {
          remount();
          toggleDialog.value = false;
          Notify.create({
            message: "Success update group",
            color: "green",
            position: "bottom",
          });
          // Loading.hide();
        })
        .catch((error) => {
          Notify.create({
            message: error.response
              ? error.response.data.errorMessage
              : error.message,
            color: "red",
            position: "bottom",
          });
          // Loading.hide();
          c;
        });
    };
    const onSubmitForm = () => {
      if (isEdit.value) {
        confirmUpdate();
      } else {
        confirmCreate();
      }
    };
    return {
      toggleDialog,
      handleDeleteGroup,
      confirmDeleteGroup,
      openCreateDialog,
      confirmCreate,
      confirmUpdate,
      handleEdit,
      typeOpstions,
      onSubmitForm,
      clearForm,
      form,
      key,
      // remount,
      isEdit,
    };
  },
};
</script>

<style>
</style>
