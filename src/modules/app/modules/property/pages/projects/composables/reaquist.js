import {
  computed,
  onBeforeMount,
  watch,
  ref
} from "vue";
// const getByGroupUnit = (group) => {
//   // Loading.show();
//   console.log(group);
//   ByGroupUnitApi({ name: group.name, value: group.value }).then((res) => {
//     // Loading.hide();
//     let indx = dataIngroup.value.findIndex(el => el.id == group.id);
//     dataIngroup.value[indx]["property"] = res.data.value
//     // dataIngroup.value. = res.data.value;
//   }).catch((_error) => {
//     // Loading.hide();
//     console.log(_error);
//     Notify.create({
//       message: _error.data.errorMessage
//         ? _error.data.errorMessage
//         : _error.data,
//       ...errOptions
//     });
//   }).finally(() => {
//     // Loading.hide();
//   });
// }

import { Loading, Notify, useQuasar, LocalStorage } from "quasar";
import { DEFAULT_COMPANY_LANG, COUNTRY_CODE } from "src/configs/language.js";
// refs
export const $q = useQuasar();
export const createItemDialog = ref(false);
export const PagenationTotalPages = ref(5)
export const selected_filter = ref({
  valueSearch: "",
  city: "",
  regionId: [],
  countryId: [],
  years: [],
  months: [],
  pagination: {
    currentPage: 1,
    pageSize: 10
  }
});
export const data_table = ref([]);
export const carete_form = ref([]);
export const selectedCol = ref([]);
export const language_options = ref([]);
export const form_data = ref({
  translation: [
    {
      languageId: LocalStorage.getItem("defLanguage"),
      name: "",
    },
  ],
  phoneObj: {
    phoneNumber: "",
    // countryCode: "EG",
    countryCode: "",
  },
  descraption: "",
  addressLine: "",
  city: "",
  postCode: "",
  regionId: "",
  countryId: "",
  image: "",
  realEstates: [],
  drawingList: [],
  longitude: 25.6242618,
  latitude: 42.3528328,

  // recurring: "",
});

// const pagenation = ref({
//     currentPage: 1,
//     pageSize: 10
// })
export const useCRUD = (getApi, careteApi, updateApi, delApi) => {
  let errOptions = {
    color: "white",
    textColor: 'red',
    position: "bottom",
    // badgePosition:"left",
    // position: "bottom",

    timeout: 8000,
    classes: "notify-size",
    // ignoreDefaults:true
  }
  let sucOptions = {
    color: "white",
    textColor: 'green',
    classes: "notify-size",
    // badgePosition:"left",
    position: "bottom",
    timeout: 8000,
    // ignoreDefaults:true
  }
  const handelGet = async () => {
    // const defaulteGet = {
    //   valueSearch: "",
    //   city: "",
    //   regionId: [],
    //   countryId: [],
    //   years: [],
    //   months: [],
    //   pagenation: {
    //     currentPage: 1,
    //     pageSize: 10
    //   }
    // };
    selected_filter.value.valueSearch = "";
    selected_filter.value.city = "";
    selected_filter.value.regionId = [];
    selected_filter.value.countryId = [];
    selected_filter.value.years = [];
    selected_filter.value.months = [];
    Loading.show();
    try {
      let req = await getApi(selected_filter.value);
      Loading.hide();
      data_table.value = await req.data.value.list;
      // console.log(await req.data.value);
    } catch (_error) {
      Loading.hide();
      Notify.create({
        message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
        ...errOptions
      });
    }
  }
  const handelCreate = async (form) => {
    Loading.show();
    try {
      let req = await careteApi(form);
      Loading.hide();
      createItemDialog.value = false;
      await handelGet();
      form_data.value = {
        translation: [
          {
            languageId: LocalStorage.getItem("defLanguage"),
            name: "",
          },
        ],
        phoneObj: {
          phoneNumber: "",
          // countryCode: "EG",
          countryCode: COUNTRY_CODE,
        },
        descraption: "",
        addressLine: "",
        city: "",
        postCode: "",
        regionId: "",
        countryId: "",
        image: "",
        realEstates: [],
        drawingList: [
          // {
          //   id: null,
          //   fileBase64: "",
          //   docNum: "",
          //   docName: "",
          //   date: ""
          // }
        ],
        longitude: 25.6242618,
        latitude: 42.3528328,

        // recurring: "",
      }
    } catch (_error) {
      console.log(_error.data);
      Loading.hide();
      Notify.create({
        message: _error.ErrorMessage ? _error.ErrorMessage : _error.errorMessage,
        ...errOptions
      });
    }
  }
  const handelDelete = async () => {
    Loading.show();
    try {
      let req = delApi(selectedCol.value);
      Loading.hide();
      if (req.data.value) {
        Notify.create({
          message: "Success delete project",
          ...sucOptions
        });
      }
    } catch (_error) {
      Loading.hide();
      Notify.create({
        message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
        ...errOptions
      });
    }
  }
  const handelUpdate = async (form) => {
    Loading.show();
    try {
      let req = await updateApi(form);
      Loading.hide();
      createItemDialog.value = false;
      await handelGet();
      if (req.data.value) {
        Notify.create({
          message: "Success update project",
          ...sucOptions
        });
      }
    } catch (_error) {
      Loading.hide();
      // Notify.create({
      //   message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      //   ...errOptions
      // });
    }
  }

  return { handelGet, handelCreate, handelUpdate, handelDelete }
}
