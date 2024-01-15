<template>
  <q-card
    class="full-width full-height"
    style="overflow: auto; background-color: #edf3f8"
  >
    <q-card-section class="set-dialog-bg q-pa-lg row">
      <div class="text-h4 text-white">Contact</div>
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
    </q-card-section>
    <q-card-section class="set-dialog-bg q-pa-lg row justify-between">
      <div class="col-12">
        <q-input
          style="border-radius: 10px"
          rounded
          outlined
          bg-color="white"
          borderless
          v-model="modelSearch"
          @update:model-value="handelSearchContact"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
      <!-- <div class="col-12 q-pt-md">
        <q-btn
          label="import contact"
          icon="eva-cloud-download-outline"
          @click="import_dialog = true"
          flat
          text-color="white"
        />
      </div>
      <div class="col-12 q-pt-md">
        <q-btn
          label="Export all contact"
          icon="ios_share"
          @click="exportAllContact"
          flat
          text-color="white"
        />
      </div> -->
    </q-card-section>

    <q-card-section style="background-color: #edf3f8">
      <q-btn
        text-color="grey-6"
        color="grey-7"
        size="1.3em"
        round
        flat
        class="float-right col-2"
        icon="more_vert"
      >
        <!-- //////////////// -->
        <!-- menu more option -->
        <!-- //////////////// -->
        <q-menu fit auto-close transition-show="scale" transition-hide="scale">
          <q-list bordered separator style="min-width: 200px">
            <q-item clickable @click="toggleSlecet">
              <q-item-section>Select</q-item-section>
            </q-item>
            <q-item clickable @click="import_dialog = true">
              <q-item-section>{{ $t("global.import") }}</q-item-section>
            </q-item>
            <q-item clickable @click="exportAllContact">
              <q-item-section>{{ $t("global.export") }}</q-item-section>
            </q-item>
            <q-item clickable @click="deleteSelectedContact">
              <q-item-section>{{ $t("global.delete") }}</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <div class="text-h4 text-blue-5">
        <q-btn
          class="btn-component text-white"
          style="color: #ca79c6"
          icon="eva-plus-outline"
          label="Create contact"
          color="blue-5"
          flat
          size="md"
          @click="handelCreateDialog"
        />
      </div>
      <div class="text-body1 text-grey q-py-md">
        {{ `contacts (${dataList.length})` }}
      </div>
      <div v-if="dataList.length">
        <div
          v-for="(contact, index) in dataList"
          :key="index"
          class="row justify-between items-center full-width"
        >
          <div v-if="isSelect" class="col-1">
            <q-checkbox
              v-model="selectedContacts"
              :val="contact"
              color="primary"
              round
              size="lg"
              checked-icon="eva-checkmark-circle-2-outline"
              unchecked-icon="eva-radio-button-off-outline"
            />
          </div>
          <q-list
            class="rounded-borders"
            padding
            :class="isSelect ? 'col-11' : 'col-12'"
          >
            <q-expansion-item
              class="expansion-contact"
              dense-toggle
              :disable="isSelect"
              group="somegroup"
            >
              <!-- :icon="false" -->
              <!-- :expand-icon-toggle="false" -->
              <!-- :expand-icon="false" -->
              <!-- :label="contact.name" -->
              <template v-slot:header>
                <q-item-section avatar>
                  <!-- :color="colorPalet()" -->
                  <q-avatar
                    v-if="contact.imgUrl == null || contact.imgUrl == ''"
                    :icon="handelFirstCuructer(contact.name)"
                    text-color="white"
                    size="60px"
                    color="blue-grey-6"
                    font-size="25px"
                  >
                    <!-- font-size="18" -->
                  </q-avatar>
                  <q-avatar
                    size="60px"
                    v-else
                    color="primary"
                    text-color="white"
                  >
                    <img :src="contact.imgUrl" />
                  </q-avatar>
                </q-item-section>
                <q-item-section style="font-size: 16px; font-weight: 300">
                  {{ contact.name }}
                </q-item-section>
              </template>
              <q-card>
                <q-card-section
                  active-class="text-bold"
                  style="background-color: #edf3f8"
                  class="row full-width"
                  group="somegroup"
                >
                  <q-btn
                    text-color="grey-6"
                    color="grey-7"
                    size="1em"
                    round
                    flat
                    icon="more_vert"
                    class="more_posetion"
                  >
                    <!-- //////////////// -->
                    <!-- menu more option -->
                    <!-- //////////////// -->
                    <q-menu
                      fit
                      auto-close
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-list bordered separator style="min-width: 200px">
                        <q-item clickable @click="handelUpdateContact(contact)">
                          <q-item-section>{{
                            $t("global.edit")
                          }}</q-item-section>
                        </q-item>
                        <q-item
                          clickable
                          @click="deleteContactHandler(contact)"
                        >
                          <q-item-section>{{
                            $t("global.delete")
                          }}</q-item-section>
                        </q-item>
                      </q-list>
                    </q-menu>
                  </q-btn>
                  <div
                    class="full-width items-center justify-between row q-xs-md q-my-xs"
                    v-for="(col, i) in columns"
                    :key="i"
                    style="font-size: 12px"
                  >
                    <!-- <span
                  >{{ col.title }} :
                  </span> -->
                    <div class="col-2">
                      <q-icon
                        class="q-px-md"
                        color="blue-5"
                        size="md"
                        :name="col.icon"
                      />
                    </div>
                    <div
                      class="col-9"
                      v-if="Array.isArray(contact[`${col.key}`])"
                    >
                      <!-- if array -->
                      <span class="text-grey-6 q-pr-md">
                        <template v-if="contact[`${col.key}`].length">
                          <!-- v-for="(item, i) in contact[`${col.key}`]" -->
                          <!-- :key="i" -->
                          <!-- <div class="col-"> -->
                          <!-- style="i > 0 ? 'padding-left: 50px' : ''" -->
                          <span
                            v-for="(item, i) in contact[`${col.key}`]"
                            :key="i"
                          >
                            <!-- fix it after handeled in backend -->
                            <span v-if="i == 0" style="white-space: nowrap">
                              {{
                                typeof item === "object"
                                  ? item.countryCode + " : " + item.phoneNumber
                                  : item
                              }}
                            </span>
                            <div v-else style="white-space: nowrap">
                              {{
                                typeof item === "object"
                                  ? item.PhoneNumber
                                  : item
                              }}
                            </div>
                          </span>
                          <!-- </div> -->
                        </template>
                        <template v-else> N/A</template>
                      </span>
                    </div>
                    <!-- if string -->
                    <div class="col-9" v-else>
                      <span class="text-grey-6" style="white-space: nowrap">
                        {{
                          contact[`${col.key}`] == "" ||
                          contact[`${col.key}`] == null
                            ? "N/A"
                            : contact[`${col.key}`]
                        }}
                      </span>
                    </div>
                  </div>
                  <span
                    @click="getMoreDetails(contact)"
                    class="text-hint text-blue-6 q-pa-md cursor-pointer"
                  >
                    More details
                  </span>
                </q-card-section>
              </q-card>
            </q-expansion-item>
          </q-list>
        </div>
      </div>
      <div v-else-if="isPending" class="row justify-center items-center">
        <q-circular-progress
          indeterminate
          rounded
          size="50px"
          color="primary"
          class="q-ma-md"
        />
      </div>
      <div v-else>No contact data founde</div>
    </q-card-section>
    >
    <q-dialog
      v-model="import_dialog"
      persistent
      full-width
      transition-show="scale"
      transition-hide="scale"
    >
      <ImportSteper
        @downloadTemplate="downloadTemplate"
        @passFileToUpload="submitImport"
        @passDataToChech="chechImportErrors"
        @closeImportDialog="import_dialog = false"
        @handleDeleteSectorImport="handleDeleteSectorImport"
        titleImport="Import contacts"
        :chchErrorResult="chchErrorResult"
        :responsFromImport="responsFromImport"
        :checkErrPending="checkErrPending"
      />
    </q-dialog>
  </q-card>
</template>

<script>
import ImportSteper from "./importSteper.vue";
import { ref, onMounted, computed } from "vue";
import { deleteDialog } from "src/configs/dialogs";
const { useActions } = createNamespacedHelpers("AppModule");
import { Notify, Loading } from "quasar";
import { createNamespacedHelpers } from "vuex-composition-helpers";
export default {
  components: { ImportSteper },
  setup(prop, { emit }) {
    const chchErrorResult = ref([]);
    const selectedContacts = ref([]);
    const justOneCallFunction = ref(true);

    const responsFromImport = ref([]);
    const isSelect = ref(false);
    const checkErrPending = ref(false);
    const import_dialog = ref(false);
    const dataList = ref([]);
    const deleteContactHandler = (contact) => {
      deleteDialog("contacts", deleteContact, contact.id, getList);
    };
    const deleteSelectedContact = () => {
      const indexes = selectedContacts.value.map((el) => el.id);
      deleteDialog("contacts", deleteContact, indexes, getList);
    };
    const colorPalet = ref([
      "blue-1",
      "blue-3",
      "blue-7",
      "blue-4",
      "blue-5",
      "blue-9",
      "blue-grey-1",
      "blue-grey-2",
      "blue-grey-4",
      "blue-grey-5",
      "blue-grey-3",
      "blue-grey-7",
      "grey-1",
      "grey-2",
      "grey-3",
      "grey-4",
      "grey-5",
      "grey-6",
      "grey-7",
      "grey-8",
      "deep-orange-4",
      "teal-1",
      "teal-2",
      "teal-3",
      "teal-5",
      "teal-3",
      "teal-6",
      "teal-3",
      "teal-3",
      "deep-purple-6",
      "red-4",
      "light-blue-4",
      "light-blue-1",
      "light-blue-2",
      "light-blue-4",
      "light-blue-5",
      "light-blue-6",
      "light-blue-7",
      "light-blue-8",
      "light-blue-9",
      "light-blue-10",
    ]);
    const modelSearch = ref();
    const isPending = ref(false);
    const columns = ref([
      // { title: "Name", key: "name" },
      { icon: "img:/images/email 1.png", title: "Email", key: "emailsList" },
      {
        icon: "img:/images/telephone 1.png",
        title: "phone",
        key: "phoneNumbersList",
      },
      {
        icon: "img:/images/tag 1.png",
        title: "Jop Postition",
        key: "jopPostition",
      },
      {
        icon: "img:/images/building 1.png",
        title: "company name",
        key: "companyName",
      },
      {
        icon: "img:/images/location 1.png",
        title: "location",
        key: "cityName",
      },
    ]);
    const {
      getContactList,
      deleteContact,
      searchInContactList,
      importContact,
      contactCheckErrors,
      exportContact,
    } = useActions([
      "getContactList",
      "deleteContact",
      "searchInContactList",
      "importContact",
      "contactCheckErrors",
      "exportContact",
    ]);

    const handelCreateDialog = () => {
      emit("contactForm");
    };
    const closeDrawer = () => {
      emit("closeDrawer");
    };
    const getList = async () => {
      isPending.value = true;
      try {
        let req = await getContactList();
        // console.log(await req);
        let data = await req.data.value;
        // JSON.parse(await data.phoneNumbersList);
        // await data.forEach(async (el) => {
        //   return JSON.parse(await el.phoneNumbersList);
        //   // return console.log(JSON.parse(el.phoneNumbersList));
        // });
        for (let i = 0; i < data.length; i++) {
          data[i].phoneNumbersList = JSON.parse(data[i].phoneNumbersList);
        }
        console.log(await data);
        // JSON.stringify(handel_data.emailsList);
        isPending.value = false;
        dataList.value = await data;
        console.log(dataList.value);
        //     let handel_data =  res.da
      } catch (err) {
        console.log(err);
      }

      // getContactList()
      //   .then((res) => {
      //     isPending.value = false;
      //     let handel_data =  res.data.value;
      //     // JSON.stringify(handel_data.emailsList);
      //     JSON.parse( handel_data.phoneNumbersList);
      //     console.log( handel_data.phoneNumbersList);
      //     dataList.value = res.data.value;
      //   })
      //   .catch((err) => {
      //     isPending.value = false;
      //     console.log(err);
      //   });
    };
    const handelSearchContact = () => {
      if (modelSearch.value == "") {
        getList();
      } else {
        isPending.value = true;
        searchInContactList(modelSearch.value)
          .then((res) => {
            isPending.value = false;
            dataList.value = res.data.value;
          })
          .catch((err) => {
            isPending.value = false;
            console.log(err);
          });
      }
    };
    const randomColor = computed(() => {
      // if (justOneCallFunction.value) {

      return colorPalet.value[
        Math.floor(Math.random() * colorPalet.value.length)
      ];

      // colorPalet.value[Math.floor(Math.random() * colorPalet.value.length)];
      // justOneCallFunction.value = false;
      // }
    });
    const downloadTemplate = () => {
      window.open(
        `https://obs-api-beta.azurewebsites.net/Templates/Import/Temp-Contacts.xlsx`
      );
    };
    const getMoreDetails = (contact) => {
      emit("contactMoreDetails", contact);
    };
    const handelUpdateContact = (contact) => {
      const data = { ...contact };
      if (data.emailsList.length == 0 || data.emailsList === null) {
        data.emailsList = [""];
      }
      if (data.phoneNumbersList.length == 0 || data.phoneNumbersList == null) {
        data.phoneNumbersList = [""];
      }
      if (data.tags == "" || data.tags == null) {
        data.tags = [];
      }
      if (data.contactId == "" || data.contactId == null) {
        data.contactId = [];
      }
      emit("updateContact", data);
    };
    const handelFirstCuructer = (str) => {
      const chart = str.charAt(0);
      const toUpper = chart.toUpperCase();
      return toUpper;
    };
    const submitImport = (file) => {
      Loading.show();
      const allwoedType = [
        "application/xlsx",
        " application/vnd.ms-excel",
        "application/xlsm",
        "application/xlsb",
        "application/xltx",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      if (allwoedType.indexOf(file.type) !== -1) {
        let ImportformData = new FormData();
        ImportformData.append("File", file);
        Loading.show();
        importContact(ImportformData)
          .then((res) => {
            Loading.hide();
            if (res.data.value === true || res.data.value === null) {
              chchErrorResult.value = true;
            } else {
              responsFromImport.value = res.data;
              chchErrorResult.value = false;
              // console.log(res.data);
            }
          })
          .catch((_error) => {
            Loading.hide();
            console.log(_error);
            Notify.create({
              message: _error.data.errorMessage
                ? _error.data.errorMessage
                : _error.data,
              color: "white",
              textColor: "red",
              position: "bottom",
              timeout: 8000,
              classes: "notify-size",
            });
          });
      } else {
        Notify.create({
          message: `${t(
            "app.administration.charts.chartsProperty.notify_messages.import_validation"
          )} ${file.type}  `,
          color: "white",
          textColor: "red",
          position: "bottom",
          timeout: 8000,
          classes: "notify-size",
        }).finally(() => {
          Loading.hide();
        });
      }
    };
    const chechImportErrors = (data) => {
      checkErrPending.value = true;
      let clearErrors = data;
      for (let i = 0; i < clearErrors.length; i++) {
        clearErrors[i].errors = [];
        // clearErrors[i].creationType =2;
      }
      console.log(clearErrors);
      Loading.show();
      contactCheckErrors({ dataList: clearErrors })
        .then((res) => {
          checkErrPending.value = false;
          if (res.data.value === true || res.data.value === null) {
            chchErrorResult.value = true;
          } else {
            responsFromImport.value = res.data.value;
            chchErrorResult.value = false;
          }
          console.log(res);
          getList();
          Loading.hide();
        })
        .catch((_error) => {
          checkErrPending.value = false;
          Loading.hide();
          console.log(_error);
          Notify.create({
            message: _error.data.errorMessage
              ? _error.data.errorMessage
              : _error.data,
            color: "white",
            textColor: "red",
            position: "bottom",
            timeout: 8000,
            classes: "notify-size",
          });
        })
        .finally(() => {
          checkErrPending.value = false;
          Loading.hide();
        });
    };
    const handleDeleteSectorImport = (row) => {
      const index = responsFromImport.value.findIndex(
        (el) => el.name == row.name
      );
      responsFromImport.value.splice(index, 1);
    };
    const exportAllContact = async () => {
      try {
        let req = exportContact();
        const url = await window.URL.createObjectURL(
          new Blob([await req.data])
        );
        const link = await document.createElement("a");
        link.href = await url;
        link.setAttribute("download", `contacts.xlsx`);
        document.body.appendChild(await link);
        link.click();
        Notify.create({
          message: "Success export contacts",
          color: "white",
          textColor: "green",
          position: "bottom",
          timeout: 8000,
          classes: "notify-size",
        });
      } catch (_error) {
        Notify.create({
          message: _error.data.errorMessage
            ? _error.data.errorMessage
            : _error.data,
          color: "white",
          textColor: "red",
          position: "bottom",
          timeout: 8000,
          classes: "notify-size",
        });
      }
    };
    const toggleSlecet = async () => {
      isSelect.value = !isSelect.value;
    };
    onMounted(() => {
      getList();
    });

    return {
      // ConfirmDeleteContact,
      // dilogDelete,

      toggleSlecet,
      chchErrorResult,
      responsFromImport,
      checkErrPending,
      deleteContactHandler,
      selectedContacts,
      handelFirstCuructer,
      justOneCallFunction,
      deleteSelectedContact,
      isSelect,
      downloadTemplate,
      handelUpdateContact,
      chechImportErrors,
      handleDeleteSectorImport,
      submitImport,
      colorPalet,
      isPending,
      randomColor,
      exportAllContact,
      import_dialog,
      modelSearch,
      handelSearchContact,
      dataList,
      getMoreDetails,
      getList,
      handelCreateDialog,
      closeDrawer,
      columns,
    };
  },
};
</script>

<style scoped>
.more_posetion {
  position: absolute;
  right: 15px;
  top: 15px;
}
</style>
