
import { Loading, Notify } from "quasar";
import {
  computed,
  onBeforeMount,
  watch,
  ref

} from "vue";
import { LocalStorage } from "quasar";
import { DEFAULT_COMPANY_LANG, COUNTRY_CODE } from "src/configs/language"
import { i18n } from "src/boot/i18n";
const { t } = i18n
// setup(){
// return{
//   t
// }
// }

// import { computed, onMounted, watch, onBeforeMount } from "@vue/runtime-core";

// state
// ////////
// dialogs
//////////
// dialog create main group

export const create_dialog = ref(false);
export const createItemDialog = ref(false);
export const is_review_from_card = ref(false);
export const id_for_created_prop = ref('')
export const immediatly_filter = ref({
  typeChart: "",
  type: "",
  isActive: false,
  isFavorite: false,
  unitType: "",
  unitCategory: "",
  unitsStatus: "",
});

// ////////////////////////


// /////////
// dropdowns
// /////////
// trnslate list
export const translateOpstions = ref([]);
export const isPendeng = ref(false);
// ////////////////////////////////
export const chchErrorResult = ref([]);
// //////////////////////////////////////
export const responsFromImport = ref([]);
export const mainGroupNumberVal = ref([]);
// polices list
export const polices_list = ref([]);
export const checkErrPending = ref(false);
// cuntries list
export const cuntries_List = ref([]);
// realestate_types list
export const realestate_types_list = ref([]);
// vendors list
export const vendors_list = ref([]);
// vendors list
// export const citys_list = ref([]);
// company list
export const company_list = ref([]);
// Ragion list
export const ragion_list = ref([]);
// for loading unit
export const pinding_of_unit = ref(false);
// customer list
///////////////////////////////////
export const no_of_blocks = ref(1);
//////////////////////////////////////////
export const customer_list = ref([]);
// property types list
export const property_types = ref([]);
// unit types
export const unit_types = ref([]);
// unit types
export const unit_category = ref([]);
// blocks
export const blocks_options = ref([]);
// blocks
export const cashed_block_options = ref([]);
export const pagenation = ref(
  {
    currentPage: 1,
    pageSize: 10
  }
)
// floors
export const floor_options = ref([]);
// ////////////////////////////////////
// main group
export const mainGroub = ref([]);
// //////////////////////////////
export const propertySearch = ref("");
// scima for create group
export const create_maingroup_scima = ref({
  no: "",
  noStr: "",
  isActive: true,
  translations: [
    {
      languageId: 1,
      name: "",
    },
  ],
});
// model for selected group by
export const groupByModel = ref("");
// model for selected company
export const companyModel = ref("");
//property to edite
export const propToEdit = ref(null);
//tag list
export const tag_list = ref(null);
export const PagenationTotalPages = ref(5);
// data in group
export const dataIngroup = ref([]);
// sellected group to add class active
export const selectedGroup = ref(null);
// data in group
export const copy_saved = ref([]);
// chech copy or cut
export const is_cut = ref(false);
// chech copy or cut
export const prop_to_del = ref([]);
// selected property
export const sellected_group = ref([]);
// Is By Sibgle
export const isBySingleProperty = ref(false);
// immediately property id
export const immediately_group_id = ref(null);
// to toggle between property taple and By group taple
export const isByGroupTaple = ref(false);
// //////////////////////////////
////// fun//////
////////////////////////////////
// handler function for check data in create & edit before send it
const validDataBeforSendIt = (obj) => {
  // check blocks & floor list
  // let blocksFloorsListNull = true;
  // if (Array.isArray(obj.blocksFloorsList)) {
  //   if (obj.blocksFloorsList.length === 0) {
  //     obj.blocksFloorsList = null
  //   }
  //   else {
  //     for (let prop = 0; prop < obj.blocksFloorsList.length; prop++) {
  //       if (obj.blocksFloorsList[prop].blockId === null || obj.blocksFloorsList[prop].blockId === "") {
  //         obj.blocksFloorsList[prop] = null;
  //       } else {
  //         blocksFloorsListNull = false
  //       }
  //     }
  //   }
  // }
  // if (blocksFloorsListNull) {
  //   obj.blocksFloorsList = null
  // }
  // check tagList if empty send it null
  if (obj.tags.length === 0) {
    obj.tags = null
  }
  // check owners list if empty send it null
  let allOwndersNull = true;
  if (obj.owners.length === 0) {
    obj.owners = null
  } else {
    for (let prop = 0; prop < obj.owners.length; prop++) {
      if (obj.owners[prop].vendorId === null || obj.owners[prop].vendorId === "") {
        obj.owners[prop] = null;
      } else {
        allOwndersNull = false
      }
    }
  }
  if (allOwndersNull) {
    obj.owners = null
  }
  // if(obj.owners?.[0].vendorId === null || obj.owners?.[0].vendorId === ""){
  //   obj.owners = null
  // }
  // check attachments list if empty send it null
  // if (obj.attachments?.[0].url === null || obj.attachments?.[0].url === ""){
  //   obj.attachments = null
  // }
  // obj.attachments = null
  // check content & address
  let allContactIsNull = true;
  let alladdressNull = true;
  if (obj.contact.phoneObj?.phoneNumber === "" || obj.contact.phoneObj?.phoneNumber === null) {
    obj.contact.phoneObj = null
  } else {
    allContactIsNull = false
  }
  for (const prop in obj.contact) {
    if (obj.contact[prop] === null || obj.contact[prop] === "") {
      obj.contact[prop] = "";
    } else if (typeof obj.contact[prop] === "object") {
      if (obj.contact[prop].phoneNumber === "" || obj.contact[prop].phoneNumber === null) {
        obj.contact[prop] = null;
      } else {
        allContactIsNull = false
      }
    }
    else {
      allContactIsNull = false
    }
  }
  // if(obj.address.unifiedNo?.phoneNumber === "" ||obj.address.unifiedNo?.phoneNumber === null){
  //   obj.address.unifiedNo = null
  // }else{
  //   alladdressNull = false
  // }
  if (obj.address.phoneObj?.phoneNumber === "" || obj.address.phoneObj?.phoneNumber === null) {
    obj.address.phoneObj = null
  } else {
    alladdressNull = false
  }
  for (const prop in obj.address) {
    if (obj.address[prop] === null || obj.address[prop] === "") {
      obj.address[prop] = "";
    } else {
      alladdressNull = false
    }
  }
  // for (const prop in obj.contact) {
  //   if(obj.contact[prop] !== null ){
  //     allContactIsNull =false
  //   }
  // }
  // to check if all contact is null
  if (allContactIsNull) {
    obj.contact = null
  }
  if (alladdressNull) {
    obj.address = null
  }
}
// ///////////////////

/////////////
// watchrs
/////////////

watch(companyModel, (val) => {
  // req api to get company
});

/////////////////////
// ////computed/////
////////////////////
// main handl maingroup list To dropdown
export const mainGroupOpsions = computed({
  get() {
    let arr = [...mainGroub.value];
    let result = []
    arr.forEach((el) => {
      result.push(Object.assign({}, { id: el.id }, { label: el.no + " - " + el.translations[0]?.name }))
    })
    return result;
  },
  // setter
  set(value) {
    return;
  }
})// api
export const requist = (getMainGroupApi, careteMainGroupApi, updateMainGroupApi, getBySearchApi, exportApi, itemGroupApi, pastPropApi, duplicateApi, deletePropApi, searchApi, selectByGroupApi, ByGroupUnitApi, unitOfPropApi, getPropToEditApi, createPropApi, updatePropApi, importApi, filterApi, chechErrorApi) => {
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
  // get main groub
  // const getMainGroub = () =>{
  //   Loading.show();
  //   getMainGroupApi().then((res) => {
  //     mainGroub.value = res.data.value
  //     Loading.hide();
  //   }).catch((_error) => {
  //     Loading.hide();
  //     Notify.create({
  //       message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
  //       ...errOptions
  //     });
  //   }).finally(() => {
  //     Loading.hide();
  //   });
  // };
  // get main groub
  const confirmUpdateMainGroup = () => {
    Loading.show();
    updateMainGroupApi(create_maingroup_scima.value)
      .then((res) => {
        create_dialog.value = false;
        Loading.hide();
        // getMainGroub();
        Notify.create({
          message: t('app.administration.charts.chartsProperty.notify_messages.main_group.update'),
          ...sucOptions
        });
      })
      .catch((_error) => {
        Loading.hide();
        console.log(_error);
        Notify.create({
          message: _error.data.errorMessage
            ? _error.data.errorMessage
            : _error.data,
          ...errOptions
        });
      }).finally(() => {
        Loading.hide();
      });
  };
  // get main groub
  const getPropertyBysearch = () => {
    Loading.show();
    getBySearchApi(propertySearch.value).then((res) => {
      dataIngroup.value = res.data.value
      Loading.hide();
    }).catch((_error) => {
      Loading.hide();
      Notify.create({
        message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
        ...errOptions
      });
    }).finally(() => {
      Loading.hide();
    });
  };
  // create main groub
  const createGroup = () => {
    Loading.show();
    careteMainGroupApi(create_maingroup_scima.value)
      .then((res) => {
        create_dialog.value = false;
        Loading.hide();
        // getMainGroub();
        Notify.create({
          message: t('app.administration.charts.chartsProperty.notify_messages.main_group.create'),
          ...sucOptions
        });
      })
      .catch((_error) => {
        Loading.hide();
        console.log(_error);
        Notify.create({
          message: _error.data.errorMessage
            ? _error.data.errorMessage
            : _error.data,
          ...errOptions
        });
      }).finally(() => {
        Loading.hide();
      });
  };
  // export chart
  const expostChart = () => {
    Loading.show();
    exportApi().then((res) => {
      Loading.hide();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      console.log(res);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `property-chart.xlsx`);
      document.body.appendChild(link);
      link.click();
      Notify.create({
        message: t('app.administration.charts.chartsProperty.notify_messages.expostChart'),
        ...sucOptions
      })
    }).catch((_error) => {
      Loading.hide();
      Notify.create({
        message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
        ...sucOptions
      });
    }).finally(() => {
      Loading.hide();
    });
  }
  // export chart
  const importChartFile = (file) => {
    Loading.show();
    const allwoedType = ["application/xlsx", " application/vnd.ms-excel", "application/xlsm", "application/xlsb", "application/xltx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"];
    if (allwoedType.indexOf(file.type) !== -1) {
      let ImportformData = new FormData();
      ImportformData.append('File', file);
      Loading.show();
      importApi(ImportformData).then((res) => {
        Loading.hide();
        if (res.data.value === true || res.data.value === null) {
          chchErrorResult.value = true;
        } else {
          responsFromImport.value = res.data.value;
          chchErrorResult.value = false;
        }
        console.log(res.data.value);
      }).catch((_error) => {
        Loading.hide();
        console.log(_error);
        Notify.create({
          message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
          ...errOptions
        });
      })
    } else {
      Notify.create({
        message: `${t('app.administration.charts.chartsProperty.notify_messages.import_validation')} ${file.type}  `,
        ...errOptions
      })
        .finally(() => {
          Loading.hide();
        });
    }
  }
  // get item group data
  const getItemGroupData = (item) => {
    isPendeng.value = true;
    sellected_group.value = []
    Loading.show();
    // if(item){
    //   itemGroupApi(item.id).then((res) => {
    //     // console.log("before req");
    //     isPendeng.value = false;
    //     // console.log("affter req");
    //     dataIngroup.value = [...res.data.value];
    //       selectedGroup.value = item.id
    //       // console.log("item");
    //       // console.log(item);
    //     Loading.hide();
    //   immediately_group_id.value = item.id
    //   isByGroupTaple.value = false;

    // }).catch((_error) => {
    //   dataIngroup.value = [];
    //   selectedGroup.value = item.id
    //   immediately_group_id.value = item.id
    //   isPendeng.value = false;
    //   Loading.hide();
    //   console.log(_error);
    //   Notify.create({
    //     message: _error.data.errorMessage
    //       ? _error.data.errorMessage
    //       : _error.data,
    //       ...errOptions
    //     });
    //   }).finally(() => {
    //     Loading.hide();
    //   });
    // }
    // else{
    itemGroupApi(pagenation.value).then((res) => {
      PagenationTotalPages.value = res.data.value.totalPages;
      dataIngroup.value = [...res.data.value.list];
      isPendeng.value = false;
      Loading.hide();
      isByGroupTaple.value = false;
      immediately_group_id.value = null
    }).catch((_error) => {
      // dataIngroup.value = null;
      isPendeng.value = false;
      dataIngroup.value = [];
      Loading.hide();
      console.log(_error);
      Notify.create({
        message: _error.data.errorMessage
          ? _error.data.errorMessage
          : _error.data,
        ...errOptions
      });
    })
    // }

  };
  // duplicate Property
  const duplicateProperty = (prop) => {
    let handelSuccess = () => {
      Loading.hide();
      Notify.create({
        message: t('app.administration.charts.chartsProperty.notify_messages.dublicate'),
        ...sucOptions
      });
    };
    Loading.show();
    if (isBySingleProperty.value) {
      // console.log("is single prop" + prop.id );
      duplicateApi(prop.id).then((res) => {
        handelSuccess();
        // getItemGroupData({id:immediately_group_id.value});
        getItemGroupData();
      }).catch((_error) => {
        Loading.hide();
        console.log(_error);
        Notify.create({
          message: _error.data.ErrorMessage
            ? _error.data.ErrorMessage
            : _error.data,
          ...errOptions
        });
      }).finally(() => {
        Loading.hide();
      });
    } else {
      // console.log("else"+ prop.id );
      duplicateApi(prop[0].id).then((res) => {
        handelSuccess();
        // getItemGroupData({id:immediately_group_id.value});
        getItemGroupData();
      }).catch((_error) => {
        Loading.hide();
        console.log(_error);
        // Notify.create({
        //   message: _error.data.ErrorMessage
        //     ? _error.data.ErrorMessage
        //     : _error.data,
        //   color: "red",
        //   position: "top",
        // });
        // };
      }).finally(() => {
        Loading.hide();

      });
    }

  };
  // delte property
  const deleteProperty = () => {
    Loading.show();
    deletePropApi([...prop_to_del.value]).then((res) => {
      Loading.hide();
      // getItemGroupData(immediately_group_id.value);
      getItemGroupData();
      // getMainGroub()
      Notify.create({
        message: t('app.administration.charts.chartsProperty.notify_messages.delete'),
        ...sucOptions
      });
    }).catch((_error) => {
      Loading.hide();
      console.log(_error);
      Notify.create({
        message: _error.data.errorMessage
          ? _error.data.errorMessage
          : _error.data,
        ...errOptions
      });
    }).finally(() => {
      Loading.hide();
    });
  };
  // past property
  const confirmPastProperty = () => {
    Loading.show();
    let handelScima = {
      ids: [...copy_saved.value],
      copy: !is_cut.value,
      mainGroupId: immediately_group_id.value
    }
    console.log(handelScima);
    pastPropApi(handelScima).then((res) => {
      Loading.hide();
      // getItemGroupData({id:immediately_group_id.value});
      getItemGroupData();
      Notify.create({
        message: t('app.administration.charts.chartsProperty.notify_messages.past'),
        icon: "eva-done-all-outline",
        ...sucOptions
      });
    }).catch((_error) => {
      Loading.hide();
      console.log(_error);
      Notify.create({
        message: _error.data.errorMessage
          ? _error.data.errorMessage
          : _error.data,
        ...errOptions
      });
    });
  };
  // select By Groups
  const selectByGroups = () => {
    sellected_group.value = []
    Loading.show();
    console.log(groupByModel.value);
    selectByGroupApi(groupByModel.value).then((res) => {
      // console.log(res);
      Loading.hide();
      dataIngroup.value = [...res.data.value];
      isByGroupTaple.value = true;
    }).catch((_error) => {
      Loading.hide();
      Notify.create({
        message: _error.data.errorMessage
          ? _error.data.errorMessage
          : _error.data,
        ...errOptions
      });
    });
  };
  // get units of property
  const UnitOfProperty = (group) => {
    pinding_of_unit.value = true
    // Loading.show();
    // console.log(group);
    unitOfPropApi(group.id).then((res) => {
      pinding_of_unit.value = false
      // Loading.hide();
      let indx = dataIngroup.value.findIndex(el => el.id == group.id);
      console.log(indx);
      // if (res.data.value){
      dataIngroup.value[indx]["property"] = [...res.data.value];
      // console.log(res.data.value);
      // }
    }).catch((_error) => {
      pinding_of_unit.value = false
      // Loading.hide();
      console.log(_error);
      Notify.create({
        message: _error.data.errorMessage
          ? _error.data.errorMessage
          : _error.data,
        ...errOptions
      });
    }).finally(() => {
      pinding_of_unit.value = false
      // Loading.hide();
    });
  }
  // get ByGroup Units
  const getByGroupUnit = (group) => {
    // Loading.show();
    console.log(group);
    ByGroupUnitApi({ name: group.name, value: group.value }).then((res) => {
      // Loading.hide();
      let indx = dataIngroup.value.findIndex(el => el.id == group.id);
      dataIngroup.value[indx]["property"] = res.data.value
      // dataIngroup.value. = res.data.value;
    }).catch((_error) => {
      // Loading.hide();
      console.log(_error);
      Notify.create({
        message: _error.data.errorMessage
          ? _error.data.errorMessage
          : _error.data,
        ...errOptions
      });
    }).finally(() => {
      // Loading.hide();
    });
  }
  // glopal search
  const singleGroupToEdit = async (prop) => {
    let contantScima = {
      name: null,
      jopPostition: null,
      companyName: null,
      department: null,
      website: null,
      idType: null,
      idNo: null,
      // companyId: null,
      remarks: "",
      email: "",
      phoneObj: { phoneNumber: "", countryCode: COUNTRY_CODE },
    };
    let addressScima = {
      addressLine: null,
      cityName: null,
      countryId: null,
      regionId: null,
      zipCode: null,
      unifiedNo: "",
      phoneObj: {
        phoneNumber: "",
        countryCode: COUNTRY_CODE,
      },
      email: "",
    };
    let ownerScima = [
      {
        vendorId: "",
        ownerShipRate: "",
      },
    ];
    let translatioScima = [
      {
        languageId: null,
        name: "",
      },
    ];
    let attachmentsScima = [
      {
        url: null,
        fileName: null,
      },
    ];
    let blocksScima = [
      // {
      //   blockId: null,
      //   floors: [],
      // },
    ];
    Loading.show();
    // console.log(prop.id);
    getPropToEditApi(prop.id).then((res) => {
      // propToEdit.value = res.data.value;
      // console.log(res.data.value);
      let checkData = res.data.value
      no_of_blocks.value = Number(res.data.value.noOfBlocks)
      if (checkData.contact === null) {
        checkData.contact = contantScima;
        console.log("iff contact");
      }
      else if (checkData.contact.phoneObj === null) {
        checkData.contact.phoneObj = { phoneNumber: "", countryCode: COUNTRY_CODE };
        console.log("iff contact");
      }
      if (checkData.address === null) {
        checkData.address = addressScima;
        console.log("iff address");
      } else if (checkData.address.phoneObj === null) {
        checkData.address.phoneObj = { phoneNumber: "", countryCode: COUNTRY_CODE };
      }
      if (checkData.owners === null || checkData.owners.length < 1) {
        checkData.owners = ownerScima;
        console.log("iff owners");
      }
      if (checkData.translations === null || checkData.translations.length < 1) {
        checkData.translations = translatioScima;
        console.log("iff translations");
      }
      if (checkData.attachments === null || checkData.attachments.length < 1) {
        checkData.attachments = attachmentsScima;
        console.log("iff attachments");
      }
      if (checkData.blocksFloorsList === null || checkData.blocksFloorsList.length < 1) {
        checkData.blocksFloorsList = blocksScima;
        console.log("iff blocksFloorsList");
      }
      propToEdit.value = checkData;
      createItemDialog.value = true;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error);
      Notify.create({
        message: _error.data.errorMessage
          ? _error.data.errorMessage
          : _error.data,
        ...errOptions
      });
    }).finally(() => {
      Loading.hide();
    });
  }
  // glopal search
  const glopalSearch = () => {
    // console.log(propertySearch.value);
    if (propertySearch.value.length == 0) {
      // getItemGroupData({id:immediately_group_id.value});
      getItemGroupData();
    } else {
      Loading.show();
      let obj = Object.assign({}, { Value: propertySearch.value }, { MainGroupId: immediately_group_id.value ? immediately_group_id.value : "" })
      searchApi(obj).then((res) => {
        Loading.hide();
        isByGroupTaple.value = false;
        dataIngroup.value = [...res.data.value];
      }).catch((_error) => {
        Loading.hide();
        console.log(_error);
        isByGroupTaple.value = false;
        if (_error.data.value === null) {
          dataIngroup.value = [];
        }
        Notify.create({
          message: _error.data.errorMessage
            ? _error.data.errorMessage
            : _error.data,
          ...errOptions
        });
      }).finally(() => {
        Loading.hide();
      });
    }
  }
  // update Property Of Group
  const updatePropertyOfGroup = (data) => {
    const obj = { ...data }
    validDataBeforSendIt(obj)
    Loading.show();
    updatePropApi(obj).then((res) => {
      // getItemGroupData({id:immediately_group_id.value});
      getItemGroupData();
      Loading.hide();
      Notify.create({
        message: t('app.administration.charts.chartsProperty.notify_messages.update_property'),
        ...sucOptions
      });
      createItemDialog.value = false;
    }).catch((_error) => {
      Loading.hide();
      // console.log();
      Notify.create({
        message: _error?.data?.errorMessage
          ? _error?.data?.errorMessage
          : _error?.data,
        ...errOptions
      });
    }).finally(() => {
      Loading.hide();
    });
  }
  // create Property Of Group
  const chechImportErrors = (data) => {
    checkErrPending.value = true;
    let clearErrors = data;
    for (let i = 0; i < clearErrors.length; i++) {
      clearErrors[i].errors = [];
      // clearErrors[i].creationType =2;
    }
    console.log(clearErrors);
    Loading.show();
    chechErrorApi({ dataList: clearErrors }).then((res) => {
      checkErrPending.value = false;
      if (res.data.value === true || res.data.value === null) {
        chchErrorResult.value = true;
      } else {
        responsFromImport.value = res.data.value
        chchErrorResult.value = false;
      }
      console.log(res);
      // getItemGroupData({id:immediately_group_id.value})
      getItemGroupData();
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
          ...errOptions
        });
      }).finally(() => {
        checkErrPending.value = false;
        Loading.hide();
      });
  }
  const createPropertyOfGroup = (data) => {
    let obj = { ...data };
    // check data before send it
    validDataBeforSendIt(obj)
    // Loading.show();
    let indexDL = obj.translations.findIndex(el => el.languageId == LocalStorage.getItem("defLanguage"));
    let nameDl = obj.translations[indexDL].name
    let hullTraslate = obj.translations.map((el) => {
      if (el.name.length < 2) {
        el.name = nameDl
        return el
      } else {
        return el
      }
    })
    obj.translations = [...hullTraslate];
    createPropApi({ ...obj }).then((res) => {
      Loading.hide();
      // id_for_created_prop.value = res.data.value.id
      Notify.create({
        message: t('app.administration.charts.chartsProperty.notify_messages.create_property'),
        ...sucOptions
      });
      // getItemGroupData({id:immediately_group_id.value});
      getItemGroupData();
      createItemDialog.value = false;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error);
      Notify.create({
        message: _error?.data?.errorMessage
          ? _error?.data?.errorMessage
          : "check required feild",
        ...errOptions
      });
    }).finally(() => {
      Loading.hide();
    });
  }
  // filter Property Of Group
  const filterPropertys = (obj) => {
    if (obj.typeChart === "") {
      Notify.create({
        message: t('app.administration.charts.chartsProperty.notify_messages.filter_validation'),
        ...errOptions
      });
      immediatly_filter.value = {
        typeChart: "",
        type: "",
        isActive: false,
        isFavorite: false,
        unitType: "",
        unitCategory: "",
        unitsStatus: "",
      };
      // getItemGroupData({id:immediately_group_id.value});
      getItemGroupData();

    }
    else {

      Loading.show();
      filterApi(obj).then((res) => {
        isByGroupTaple.value = false;
        dataIngroup.value = [...res.data.value];
        Loading.hide();
      }).catch((_error) => {
        Loading.hide();
        console.log(_error);
        Notify.create({
          message: _error.data.errorMessage
            ? _error.data.errorMessage
            : _error.data,
          ...errOptions
        });
      }).finally(() => {
        Loading.hide();
      });
    }

  }
  return {
    createGroup,
    deleteProperty,
    filterPropertys,
    chechImportErrors,
    importChartFile,
    confirmUpdateMainGroup,
    updatePropertyOfGroup,
    createPropertyOfGroup,
    glopalSearch,
    selectByGroups,
    getByGroupUnit,
    singleGroupToEdit,
    UnitOfProperty,
    duplicateProperty,
    expostChart,
    // getMainGroub,
    getItemGroupData,
    getPropertyBysearch,
    confirmPastProperty,
  }
};
// ////////////////
// all dropdown api
//////////////////
export const drobDowns = (translatApi, policesApi, cuntriesApi, realestateTypsApi, vedorApi, citysApi, ragionApi, customerApi, propTypeApi, unitTypeApi, unitCatApi, companyApi, tagListApi, blockApi, floorApi, mainGroupNumApi) => {
  // translate
  const translate = () => {
    translatApi().then((res) => {
      translateOpstions.value = res.data.value;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error.data.errorMessage ? _error.data.errorMessage : _error.data);
      //       Notify.create({
      //         message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // ...errOptions
      //       });
    })
  }
  // polices
  const policesList = () => {
    policesApi().then((res) => {
      polices_list.value = res.data.value;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error.data.errorMessage ? _error.data.errorMessage : _error.data);
      //       Notify.create({
      //         message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // ...errOptions
      //       });
    })
  }
  // cuntries
  const cuntriesList = () => {
    cuntriesApi().then((res) => {
      cuntries_List.value = res.data.value;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error.data.errorMessage ? _error.data.errorMessage : _error.data);
      //       Notify.create({
      //         message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // ...errOptions
      //       });
    })
  }
  // // realestae Types
  const realestateTypes = () => {
    realestateTypsApi().then((res) => {
      realestate_types_list.value = res.data.value;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error.data.errorMessage ? _error.data.errorMessage : _error.data);
      //       Notify.create({
      //         message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // ...errOptions
      //       });
    })
  }
  // venors
  const vendorList = () => {
    vedorApi().then((res) => {
      vendors_list.value = res.data.value;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error.data.errorMessage ? _error.data.errorMessage : _error.data);
      // Notify.create({
      //   message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // });
    })
  }
  // citys
  // const citysList = () =>{
  //   citysApi().then((res) => {
  //     citys_list.value = res.data.value;
  //   }).catch((_error) => {
  //     Loading.hide();
  //     console.log(_error.data.errorMessage ?_error.data.errorMessage : _error.data);
  //   })
  // }
  // citys
  const customersList = () => {
    customerApi().then((res) => {
      customer_list.value = res.data.value;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error.data.errorMessage ? _error.data.errorMessage : _error.data);
      // Notify.create({
      //   message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // });
    })
  }
  // citys
  const ragionList = () => {
    ragionApi().then((res) => {
      ragion_list.value = res.data.value;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error.data.errorMessage ? _error.data.errorMessage : _error.data);
      // Notify.create({
      //   message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // });
    })
  }
  // property Types
  const propertyTypes = () => {
    propTypeApi().then((res) => {
      property_types.value = res.data.value;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error.data.errorMessage ? _error.data.errorMessage : _error.data);
      //       Notify.create({
      //         message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // ...errOptions
      //       });
    })
  }
  // unit Types
  const unitTypes = () => {
    unitTypeApi().then((res) => {
      unit_types.value = res.data.value;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error.data.errorMessage ? _error.data.errorMessage : _error.data);
      //       Notify.create({
      //         message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // ...errOptions
      //       });
    })
  }
  // unit category
  const unitCaregorys = () => {
    unitCatApi().then((res) => {
      unit_category.value = res.data.value;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error.data.errorMessage ? _error.data.errorMessage : _error.data);
      //       Notify.create({
      //         message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // ...errOptions
      //       });
    })
  }
  // blocks List
  const blockList = () => {
    blockApi().then((res) => {
      blocks_options.value = res.data.value;
      cashed_block_options.value = res.data.value;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error.data.errorMessage ? _error.data.errorMessage : _error.data);
      //       Notify.create({
      //         message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // ...errOptions
      //       });
    })
  }
  // floor List
  const floorList = () => {
    floorApi().then((res) => {
      floor_options.value = res.data.value;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error.data.errorMessage ? _error.data.errorMessage : _error.data);
      //       Notify.create({
      //         message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // ...errOptions
      //       });
    })
  }
  // company list
  const companyList = () => {
    companyApi().then((res) => {
      company_list.value = res.data.value;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error.data.errorMessage ? _error.data.errorMessage : _error.data);
      //       Notify.create({
      //         message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // ...errOptions
      //       });
    })
  }
  // tag List
  const tagList = () => {
    tagListApi().then((res) => {
      tag_list.value = res.data.value;
    }).catch((_error) => {
      Loading.hide();
      console.log(_error.data.errorMessage ? _error.data.errorMessage : _error.data);
      //       Notify.create({
      //         message: _error.data.errorMessage ?_error.data.errorMessage : _error.data,
      // ...errOptions
      //       });
    })
  }
  //   const getMainGroupLookUps = () => {
  //     mainGroupNumApi()
  //       .then((res) => {
  //         mainGroupNumberVal.value = res.data.value;
  //       })
  //       .catch((_error) => {
  //         Loading.hide();
  //         console.log(_error.data.errorMessage ?_error.data.errorMessage : _error.data);
  // //         Notify.create({
  // //           message: _error.data.errorMessage
  // //             ? _error.data.errorMessage
  // //             : _error.data,
  // // ...errOptions
  // //         });
  //       });
  //   };
  return {
    translate,
    blockList,
    floorList,
    policesList,
    // getMainGroupLookUps,
    unitCaregorys,
    tagList,
    propertyTypes,
    companyList,
    cuntriesList,
    unitTypes,
    realestateTypes,
    customersList,
    vendorList,
    ragionList,
    // citysList,
  }
}
