<template>
  <q-card
    class="full-width full-height"
    style="overflow: auto; background-color: #edf3f8"
  >
    <q-card-section class="set-dialog-bg q-pa-lg row">
      <div v-if="isEdit" class="text-h4 text-white">Update contact</div>
      <div v-else-if="readOnly" class="text-h4 text-white">All details</div>
      <div v-else class="text-h4 text-white">Create contact</div>
      <q-space />
      <q-btn
        icon="eva-arrow-forward-outline"
        color="white"
        size="lg"
        flat
        round
        dense
        @click="closeCreateContact"
      />
    </q-card-section>
    <!-- <div class="text-hint"></div> -->
    <q-card-section style="background-color: #edf3f8">
      <q-form @submit.prevent="submitForm" autofocus greedy class="row">
        <div class="col-12">
          <obs-avatar-field
            :disable="readOnly"
            name="fileAsBase64"
            :person="true"
            v-model="contactModel.image"
          />
        </div>
        <!-- name -->
        <div class="col-9 q-my-sm">
          <q-input
            bottom-slots
            :readonly="readOnly"
            v-model="contactModel.name"
            label="Contact name"
            :rules="[(val) => val.length || 'Contact name is required']"
          >
            <template v-slot:before>
              <q-avatar>
                <q-icon
                  size="md"
                  color="blue-5"
                  name="img:/images/user(5) 1.png"
                />
              </q-avatar>
            </template>
          </q-input>
        </div>
        <!-- email list -->
        <div
          class="col-9 row q-my-sm row items-center text-center justify-center"
          v-for="(maill, i) in contactModel.emailsList"
          :key="i"
        >
          <!-- :options="idTypesOptions" -->
          <q-input
            :class="contactModel.emailsList.length > 1 ? 'col-11' : 'col-12'"
            class="text-blue-5"
            :readonly="readOnly"
            label="Email"
            clearable
            v-model="contactModel.emailsList[i]"
          >
            <template v-slot:before>
              <q-avatar>
                <q-icon
                  size="md"
                  color="blue-5"
                  name="img:/images/email 1.png"
                />
              </q-avatar>
            </template>
          </q-input>
          <div class="col" v-if="contactModel.emailsList.length > 1">
            <q-btn
              color="red-4"
              :disable="readOnly"
              flat
              icon="delete"
              @click="deletemail(i)"
            />
          </div>
        </div>
        <div class="col-3 row justify-center">
          <q-btn
            class="col-9"
            size="md"
            color="blue-5"
            :disable="readOnly"
            flat
            icon="eva-plus-outline"
            @click="addMail"
            :disabled="contactModel.emailsList.length >= 4"
          />
        </div>
        <!-- phone list -->
        <!-- <div class="col-9 q-my-sm"> -->
        <div
          class="col-9 row q-my-sm row items-center text-center justify-center"
          v-for="(phone, i) in contactModel.phoneNumbersList"
          :key="i"
        >
          <!-- <q-avatar class="col-2"> -->
          <q-icon size="md" color="blue-5" name="img:/images/telephone 1.png" />
          <!-- </q-avatar> -->
          <obs-phone-field
            :class="
              contactModel.phoneNumbersList.length > 1 ? 'col-9' : 'col-10'
            "
            class="text-blue-5"
            clearable
            :readonly="readOnly"
            v-model="contactModel.phoneNumbersList[i]"
            style="margin-left: 10px"
          >
          </obs-phone-field>
          <!-- v-if="i !== 0" -->
          <div class="col" v-if="contactModel.phoneNumbersList.length > 1">
            <q-btn
              color="red-4"
              :disable="readOnly"
              flat
              icon="delete"
              @click="deletePhone(i)"
            />
          </div>
        </div>
        <!-- </div> -->
        <div class="col-3 row justify-center">
          <q-btn
            class="col-9"
            size="md"
            color="blue-5"
            flat
            icon="eva-plus-outline"
            :disable="readOnly"
            @click="addPhpne"
            :disabled="contactModel.phoneNumbersList.length >= 4"
          />
        </div>
        <div class="col-9 q-my-sm">
          <div class="col-12 row items-center">
            <q-icon
              size="md"
              class=""
              color="blue-5"
              name="img:/images/link 1.png"
            />
            <q-input
              class="col"
              :readonly="readOnly"
              v-model="contactModel.website"
              style="padding-left: 10px"
              label="Website"
            ></q-input>
          </div>
        </div>
        <!-- company details -->
        <div class="col-9 row q-my-sm items-center">
          <div class="col-12 row items-center">
            <q-icon size="md" class="" name="img:/images/building 1.png" />
            <q-input
              class="col"
              v-model="contactModel.companyName"
              label="Company name"
              :readonly="readOnly"
              style="padding-left: 10px"
            ></q-input>
          </div>
          <q-input
            class="col-12"
            style="padding-left: 42px"
            v-model="contactModel.jopPostition"
            label="Jop title"
            :readonly="readOnly"
          ></q-input>
          <q-input
            class="col-12"
            style="padding-left: 42px"
            v-model="contactModel.department"
            label="Department"
            :readonly="readOnly"
          ></q-input>
        </div>
        <!-- <div class="col-12 q-my-sm q-ml-md"> -->

        <!-- </div> -->
        <div class="col-9 q-my-sm">
          <div class="col-12 row items-center">
            <q-icon
              size="md"
              class=""
              color="blue-5"
              name="img:/images/cake (1) 1.png"
            />
            <q-input
              dense
              hint="Brith date"
              class="col"
              :readonly="readOnly"
              type="date"
              v-model="contactModel.brithDate"
              style="padding-left: 10px"
            />
          </div>
        </div>
        <div class="col-9 q-my-sm">
          <div class="col-12 row items-center">
            <q-icon
              size="md"
              class=""
              color="blue-5"
              name="img:/images/structure 1.png"
            />
            <q-select
              multiple
              v-model="contactModel.contactId"
              :options="cotact_option"
              use-chips
              clearable
              :readonly="readOnly"
              option-value="id"
              emit-value
              map-options
              class="col"
              label="Related with"
              style="padding-left: 10px"
            />
          </div>
        </div>
        <div class="col-9 q-my-sm">
          <!-- :options="idTypesOptions" -->
        </div>
        <div class="col-9 q-my-sm">
          <div class="col-12 row items-center">
            <q-icon
              size="md"
              class=""
              color="blue-5"
              name="img:/images/tags.png"
            />
            <q-select
              multiple
              clearable
              :readonly="readOnly"
              v-model="contactModel.tags"
              :options="tag_list"
              option-value="id"
              class="col"
              emit-value
              map-options
              use-chips
              :label="$t('app.administration.charts.chartsProperty.tags')"
              style="padding-left: 10px"
            />
          </div>
        </div>
        <!-- adress container -->
        <div class="col-12 row q-my-lg">
          <div class="full-width row items-center">
            <q-icon
              size="md"
              class=""
              color="blue-5"
              name="img:/images/location 1.png"
            />
            <q-input
              v-model="contactModel.addressLine"
              :readonly="readOnly"
              class="col"
              clearable
              label="Address Line"
              style="padding-left: 10px"
            />
          </div>
          <div class="col row" style="padding-left: 42px">
            <div class="full-width row justify-between">
              <q-input
                v-model="contactModel.cityName"
                :readonly="readOnly"
                class="col-5"
                clearable
                label="City"
              />
              <q-input
                v-model="contactModel.poCode"
                :readonly="readOnly"
                class="col-5"
                clearable
                label="P.O Code"
              />
            </div>
            <div class="full-width row justify-between">
              <q-select
                :readonly="readOnly"
                v-model="contactModel.countryId"
                :options="cuntriesOpstion"
                option-value="id"
                emit-value
                class="col-5"
                @update:model-value="checkSelectCuntrie"
                map-options
                label="Country"
              />
              <!-- <q-input
                v-model="contactModel.regionId"
                :readonly="readOnly"
                class="col-5"
                clearable
                label="State/Region"
              /> -->
              <q-select
                :readonly="readOnly"
                v-model="contactModel.regionId"
                :options="ragionList"
                :disable="!isSelectCuntry"
                option-value="id"
                emit-value
                class="col-5"
                map-options
                label="State/Region"
              />
            </div>
          </div>
          <div class="col-12 row items-center q-my-md">
            <q-icon
              size="md"
              class=""
              color="blue-5"
              name="img:/images/notes 1.png"
            />
            <q-input
              class="col"
              :readonly="readOnly"
              v-model="contactModel.remarks"
              style="padding-left: 10px"
              label="Remarks"
            ></q-input>
          </div>
        </div>
        <!-- <div class="col-9 q-my-sm">
          <q-select
            v-model="contactModel.iDType"
            :options="idTypesOptions"
            emit-value
            style="padding-left: 42px"
            class="full-width"
            clearable
            map-options
            option-value="id"
            label="ID Type"
            :rules="[(val) => val || 'IDType  is required']"
          ></q-select>
        </div> -->
        <!-- <div class="col-9 q-my-sm">
          <q-input
            class="full-width"
            v-model="contactModel.iDNo"
            :readonly="readOnly"
            style="padding-left: 42px"
            label="ID No"
          ></q-input>
        </div> -->
        <!-- <div class="col-9 q-my-sm">
          <q-input
            class="full-width"
            v-model="contactModel.imgName"
            :readonly="readOnly"
            style="padding-left: 42px"
            label="Image Name"
          ></q-input>
        </div> -->
        <!-- <div class="col-9 q-my-sm">
          <q-toggle
            :disable="readOnly"
            v-model="isVendor"
            checked-icon="check"
            label="Is Vendor"
            style="padding-left: 42px"
            unchecked-icon="clear"
          />
        </div>
        <div class="col-9 q-my-sm">
          <transition-group name="slide-drawer">
            <q-select
              v-if="isVendor"
              v-model="contactModel.vendorId"
              :options="vendors_list"
              :readonly="readOnly"
              style="padding-left: 42px"
              emit-value
              class="full-width"
              clearable
              map-options
              option-value="id"
              label="Vendor"
              :rules="[(val) => val || 'Vendor is required']"
            ></q-select>
            <q-select
              v-else
              v-model="contactModel.customerId"
              emit-value
              :options="customer_list"
              :readonly="readOnly"
              style="padding-left: 42px"
              class="full-width"
              clearable
              map-options
              option-value="id"
              label="Customer"
              :rules="[(val) => val || 'customer  is required']"
            ></q-select>
          </transition-group>
        </div> -->

        <!-- <div class="col-12 q-my-sm">
          <q-file
            class="full-width"
            name="Image"
            v-model="contactModel.Image"
            label="Image"
          />
        </div> -->

        <!-- <div v-ripple>
        <div-label header>Yesterday</div-label>
      </div> -->
        <di class="full-width row q-pa-sm col-12 justify-end submit_possetion">
          <q-btn
            label="Close"
            class="q-mx-sm q-px-lg q-py-sm rounded"
            flat
            size="md"
            style="border-radius: 10px"
            @click="closeCreateContact"
          />
          <q-btn
            v-if="!readOnly"
            type="submit"
            class="q-mx-sm q-px-lg q-py-sm rounded"
            :color="isEdit ? 'green' : 'primary'"
            outline
            style="border-radius: 10px"
            size="md"
            :label="isEdit ? 'Update' : 'Save'"
          />

          <!-- <div-section>
          <div-label>Item with caption</div-label>
          <div-label caption>2023-04-18T05:32:00</div-label>
        </div-section> -->
        </di>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { Notify, Loading } from "quasar";
const { useActions: customerAndVindor } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
const { useActions } = createNamespacedHelpers("AppModule");
const { useActions: propertyAction } = createNamespacedHelpers(
  "AppModule/AdministrationModule/ChartsModule/chartsProperty"
);
import { createNamespacedHelpers } from "vuex-composition-helpers";
import { COUNTRY_CODE } from "src/configs/language.js";
export default {
  props: {
    data: {
      type: Object,
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
    readOnly: {
      type: Boolean,
      default: false,
    },
  },
  setup(prop, { emit }) {
    const customer_list = ref([]);
    const isSelectCuntry = ref(false);
    const cuntriesOpstion = ref([]);
    const ragionList = ref([]);
    const cotact_option = ref([]);
    const tag_list = ref([]);
    const vendors_list = ref([]);
    const company_list = ref([]);
    const isVendor = ref(false);
    const { getCustomersList, getVendorsList, getCompanyList } =
      customerAndVindor([
        "getCustomersList",
        "getVendorsList",
        "getCompanyList",
      ]);
    const { createContact, contactDropDown, updateContactList } = useActions([
      "createContact",
      "contactDropDown",
      "updateContactList",
    ]);
    const { getTagList, getCountriesList, getRagionListById } = propertyAction([
      "getTagList",
      "getCountriesList",
      "getRagionListById",
    ]);
    const contactModel = computed(() => {
      if (prop.isEdit || prop.readOnly) {
        return prop.data;
      } else {
        return createModel.value;
      }
    });
    const createModel = ref({
      name: "",
      contactType: null,
      jopPostition: "",
      companyName: "",
      contactId: [],
      department: "",
      website: "",
      brithDate: "",
      regionId: "",
      cityName: "",
      addressLine: "",
      countryId: "",
      poCode: "",
      tags: [],
      remarks: "",
      image: "",
      emailsList: [""],
      phoneNumbersList: [
        {
          phoneNumber: "",
          cuntryCode: COUNTRY_CODE,
        },
      ],
    });
    const closeDrawer = () => {
      emit("closeDrawer");
    };
    const customersList = () => {
      getCustomersList()
        .then((res) => {
          customer_list.value = res.data.value;
        })
        .catch((_error) => {
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const cuntrieList = () => {
      getCountriesList()
        .then((res) => {
          cuntriesOpstion.value = res.data.value;
        })
        .catch((_error) => {
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const getRagionList = async (id) => {
      getRagionListById(id)
        .then((res) => {
          ragionList.value = res.data.value;
        })
        .catch((_error) => {
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const tagList = () => {
      getTagList()
        .then((res) => {
          tag_list.value = res.data.value;
        })
        .catch((_error) => {
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const vendorList = () => {
      getVendorsList()
        .then((res) => {
          vendors_list.value = res.data.value;
        })
        .catch((_error) => {
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const companyList = () => {
      getCompanyList()
        .then((res) => {
          company_list.value = res.data.value;
        })
        .catch((_error) => {
          console.log(
            _error.data.errorMessage ? _error.data.errorMessage : _error.data
          );
        });
    };
    const submitCreate = async () => {
      // let contcatId  = contactModel.value.contactId ;
      let formData = new FormData();
      let model_val = contactModel.value;
      formData.append("Name", `${await model_val.name}`);
      formData.append("JopPostition", `${model_val.jopPostition}`);
      model_val.contactId.forEach((el) => {
        formData.append("ContactIds", el);
      });
      // formData.append("ContactIds", JSON.stringify(model_val.contactId));
      formData.append("CompanyName", `${await model_val.companyName}`);
      formData.append("Department", `${await model_val.department}`);
      formData.append("Website", `${await model_val.website}`);
      formData.append("BrithDate", `${await model_val.brithDate}`);
      formData.append("POCode", `${await model_val.poCode}`);
      model_val.tags.forEach((el) => {
        formData.append("Tags", el);
      });
      formData.append("Remarks", `${await model_val.remarks}`);
      formData.append("AddressLine", `${await model_val.addressLine}`);
      formData.append("Image", await model_val.image);
      formData.append("RegionId", `${await model_val.regionId}`);
      // formData.append("EmailsList", JSON.stringify(model_val.emailsList));
      model_val.emailsList.forEach((el) => {
        formData.append("EmailsList", el);
      });
      formData.append("CityName", `${await model_val.cityName}`);
      formData.append("CountryId", `${await model_val.countryId}`);
      formData.append(
        "PhoneNumbersList",
        JSON.stringify(model_val.phoneNumbersList)
      );

      // model_val.phoneNumbersList.forEach((el) => {
      //   formData.append("PhoneNumbersList", el);
      // });
      createContact(formData)
        .then((res) => {
          Loading.hide();

          Notify.create({
            message: `Success create Contact`,
            color: "white",
            textColor: "green",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
            icon: "eva-checkmark-square-2",
          });

          // contactModel.value = newModel;
          closeCreateContact();
        })
        .catch((_error) => {
          Loading.hide();
          Notify.create({
            message: `${
              _error.data.errorMessage ? _error.data.errorMessage : _error.data
            }`,
            color: "white",
            textColor: "red",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
            icon: "eva-checkmark-square-2",
          });
        });
    };
    const submitUpdate = async () => {
      let formData = new FormData();
      let model_val = contactModel.value;

      formData.append("Id", `${await contactModel.value.id}`);
      formData.append("Name", `${await model_val.name}`);
      formData.append("JopPostition", `${model_val.jopPostition}`);
      model_val.contactId.forEach((el) => {
        formData.append("ContactIds", el);
      });
      // formData.append("ContactIds", JSON.stringify(model_val.contactId));
      formData.append("CompanyName", `${await model_val.companyName}`);
      formData.append("Department", `${await model_val.department}`);
      formData.append("Website", `${await model_val.website}`);
      formData.append("BrithDate", `${await model_val.brithDate}`);
      formData.append("POCode", `${await model_val.poCode}`);
      model_val.tags.forEach((el) => {
        formData.append("Tags", el);
      });
      formData.append("Remarks", `${await model_val.remarks}`);
      formData.append("AddressLine", `${await model_val.addressLine}`);
      formData.append("Image", await model_val.image);
      formData.append("RegionId", `${await model_val.regionId}`);
      // formData.append("EmailsList", JSON.stringify(model_val.emailsList));
      model_val.emailsList.forEach((el) => {
        formData.append("EmailsList", el);
      });
      formData.append("CityName", `${await model_val.cityName}`);
      formData.append("CountryId", `${await model_val.countryId}`);
      formData.append(
        "PhoneNumbersList",
        JSON.stringify(model_val.phoneNumbersList)
      );
      updateContactList(formData)
        .then((res) => {
          Loading.hide();
          Notify.create({
            message: `Success Update Contact`,
            color: "white",
            textColor: "green",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
            icon: "eva-checkmark-square-2",
          });
          // contactModel.value = newModel
          closeCreateContact();
        })
        .catch((_error) => {
          Loading.hide();
          Notify.create({
            message: `${console.log(
              _error.data.errorMessage ? _error.data.errorMessage : _error.data
            )}`,
            color: "white",
            textColor: "green",
            classes: "notify-size",
            position: "bottom",
            timeout: 8000,
            icon: "eva-checkmark-square-2",
          });
        });
    };
    const submitForm = async () => {
      Loading.show();
      if (prop.isEdit) {
        submitUpdate();
      } else {
        submitCreate();
      }
    };
    const addMail = () => {
      contactModel.value.emailsList.push("");
    };
    const addPhpne = () => {
      contactModel.value.phoneNumbersList.push({
        phoneNumber: "",
        countryCode: COUNTRY_CODE,
      });
    };

    // const getImgFile = () => {
    //   console.log(contactModel.value.Image);
    // };
    const closeCreateContact = () => {
      emit("closeCreateContact");
    };
    const contactList = async () => {
      contactDropDown()
        .then((res) => {
          if (prop.isEdit) {
            let contact = res.data.value.filter((el) => {
              return el.id !== prop.data.id;
            });
            cotact_option.value = contact;
          } else {
            cotact_option.value = res.data.value;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    const deletePhone = (index) => {
      contactModel.value.phoneNumbersList.splice(index, 1);
    };
    const deletemail = (index) => {
      contactModel.value.emailsList.splice(index, 1);
    };
    const checkSelectCuntrie = (value) => {
      // contactModel.value.emailsList.splice(index, 1);
      if (value == "") {
        isSelectCuntry.value = false;
      } else {
        getRagionList(value);
        isSelectCuntry.value = true;
      }
    };
    onMounted(() => {
      contactList();
      // if (prop.isEdit || prop.readOnly) {
      //   contactModel.value = prop.data;
      // }
      customersList();
      vendorList();
      cuntrieList();
      tagList();
      companyList();
    });
    return {
      // getImgFile,
      contactModel,
      addPhpne,
      customer_list,
      tagList,
      deletePhone,
      closeCreateContact,
      cotact_option,
      contactList,
      submitCreate,
      deletemail,
      cuntrieList,
      vendors_list,
      companyList,
      getRagionList,
      tag_list,
      addMail,
      isSelectCuntry,
      ragionList,
      isVendor,
      createModel,
      cuntriesOpstion,
      company_list,
      submitUpdate,
      submitForm,
      closeDrawer,
      checkSelectCuntrie,
      COUNTRY_CODE,
      customersList,
      vendorList,
      contentTypeOptions: ref([
        { label: "Main", id: 1 },
        { label: "Sub", id: 2 },
        { label: "Dashborad", id: 3 },
      ]),
      idTypesOptions: ref([
        {
          id: 1,
          label: "Driver License",
        },
        {
          id: 2,
          label: "Natinal Identity Card",
        },
        {
          id: 3,
          label: "Passport",
        },
        {
          id: 4,
          label: "Resident Card",
        },
        {
          id: 5,
          label: "Refugee Card",
        },
        {
          id: 6,
          label: "Refugee Card",
        },
        {
          id: 7,
          label: "BirthCartificate",
        },
        {
          id: 8,
          label: "Student Card",
        },
        {
          id: 9,
          label: "Loyalty Card",
        },
        {
          id: "Other",
          label: "Other",
        },
      ]),
    };
  },
};
</script>

<style>
.submit_possetion {
  position: sticky !important;
  bottom: 0;
  left: 0;
  padding: 5px 0;
  background-color: #edf3f8;
  z-index: 200;
  /* border-top: 1px solid #ccc; */
}
</style>
