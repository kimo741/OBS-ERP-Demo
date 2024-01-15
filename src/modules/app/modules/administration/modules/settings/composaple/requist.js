
import { Loading, Notify } from "quasar";
import { COUNTRY_CODE } from "src/configs/language.js";
import {
  onBeforeMount,
  watch,
  ref
} from "vue";
// main data befor jandel pagenation
export const mainData = ref([]);
// count of row for calc pagenation
export const pageSize = ref(5);
// curent page numper
export const pagenation_page = ref(1);
// data after make pagenation
export const mainDataPagination = ref([]);
// max page for pagenation
export const maxPages = ref(0);
// v-model for create
export const add_model_value = ref("");
export const add_model_obj = ref({
  name: "",
  terms: "",
  file: ""
});
export const amenityForm = ref({
  name: "",
  isDefault: true,
  rentTypes: null,
  durationTypes: null,
  amount: null
})
// save row to delete
export const save_delte_row = ref("");
// save row to edit
export const save_edit_row = ref({});
// check name exisr
export const isNameExist = ref(true);
// v-model to toggle create deialog
export const create_dialog = ref(false);
// v-model to toggle delete deialog
export const delete_dialog = ref(false);
// to switch create dialog from (create or edite)
export const isDialogEite = ref(false);
// v-model to toggle import deialog
export const import_dialog = ref(false);
export const is_multi_del = ref(false);
// v-model import file
export const import_file = ref("");
export const chchErrorResult = ref([]);
export const responsFromImport = ref([]);
export const checkErrPending = ref(false);

export const uasage_form_model = ref({
  translations: [
    {
      languageId: 0,
      name: ""
    }
  ]
}
)

// sellected more row to make action
export const sellected_row = ref([]);
// search modal
export const search_modal = ref("");
// fanction to handel pagenation
export const create_unit_scima = ref({
  realEstateId: null,
  name: "",
  no: null,
  urlImage: "",
  status: "",
  unitTypeId: null,
  unitCategoryId: "",
  blockId: null,
  floorId: null,
  badrooms: null,
  bathrooms: null,
  sizeMater: null,
  sizeFoot: null,
  amenityId: null,
  contact: {
    name: "",
    jopPostition: "",
    idType: "",
    companyId: null,
    idNo: "",
    phoneObj: { phoneNumber: "", countryCode: COUNTRY_CODE },
    email: "",
  },
  owners: [
    {
      vendorId: "",
      ownerShipRate: "",
    },
  ],
  attachments: [
    {
      url: "",
      fileName: ""
    }
  ]
});
// fanction to handel pagenation
// export const handelPagenation = async (array, page_size, page_number) => {
//   const max_pages =
//     page_size >= array.length ? 1 : Math.ceil(array.length / page_size);
//   const val = array.slice(
//     (page_number - 1) * page_size,
//     page_number * page_size
//   );
//   mainDataPagination.value = val;
//   maxPages.value = max_pages;
//   // console.log(mainDataPagination.value);
//   console.log(page_number);

//   if (mainDataPagination.value.length < 1 && page_number > 1) {
//     // console.log(pagenation_page.value);
//     pagenation_page.value--
//     // console.log(pagenation_page.value);
//   }
// };
// function handel muli deleting

// watch
// watch(pagenation_page, (val) => {
//   handelPagenation(mainData.value, pageSize.value, val);
// });
// watch(pageSize, (val) => {
//   handelPagenation(mainData.value, val, pagenation_page.value);
// });
// function to hundel all api for all taples
export const requist = (get, add, put, dell, propertyName, dublicate, exportApi, importApi, searchApi, teplateFileName, chechExistApi, chechErrorApi) => {
  let errOptions = {
    color: "white",
    textColor: 'red',
    position: "bottom",
    timeout: 8000,
    classes: "notify-size"
  }
  let sucOptions = {
    color: "white",
    textColor: 'green',
    classes: "notify-size",
    position: "bottom",
    timeout: 8000,
  }
  // get
  const getMainData = () => {
    isNameExist.value = false;
    Loading.show();
    get({ page: pagenation_page.value, size: pageSize.value }).then((res) => {
      maxPages.value = res.value.totalPages
      mainData.value = res.value.list;
      // handelPagenation(res.value, pageSize.value, pagenation_page.value);
      Loading.hide();
      sellected_row.value = []
    })
      .catch((_error) => {
        Loading.hide();
        Notify.create({
          message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
          ...errOptions
        });
      })
      .finally(() => {
        Loading.hide();
      });
  };
  // get
  const glopalSearch = () => {
    if (search_modal.value === "") {
      getMainData()
    } else {
      Loading.show();
      searchApi(search_modal.value).then((res) => {
        mainData.value = res.value;
        // handelPagenation([...res.value], pageSize.value, pagenation_page.value);
        Loading.hide();
      })
        .catch((_error) => {
          Loading.hide();
          Notify.create({
            message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
            ...errOptions
          });
        })
        .finally(() => {
          Loading.hide();
        });
    }
  };
  // add
  const submitaddUnit = () => {
    let scima = {
      realEstateId: null,
      name: "",
      no: null,
      urlImage: "",
      status: 2,
      unitTypeId: null,
      unitCategoryId: null,
      blockId: null,
      floorId: null,
      badrooms: null,
      bathrooms: null,
      amenityId: null,
      area: null,
      contact: {
        name: null,
        jopPostition: null,
        idType: null,
        companyId: null,
        idNo: null,
        phoneObj: { phoneNumber: "", countryCode: COUNTRY_CODE },
        email: null,
      },
      owners: [
        {
          vendorId: null,
          ownerShipRate: null,
        },
      ],
      attachments: [
        {
          url: "",
          fileName: ""
        }
      ]
    }
    Loading.show();
    // check owner if empty send it null
    let allOwndersNull = true;
    if (create_unit_scima.value.owners.length === 0) {
      create_unit_scima.value.owners = null;
    } else {
      for (let prop = 0; prop < create_unit_scima.value.owners.length; prop++) {
        if (
          create_unit_scima.value.owners[prop].vendorId === null ||
          create_unit_scima.value.owners[prop].vendorId === ""
        ) {
          create_unit_scima.value.owners[prop] = "";
        } else {
          allOwndersNull = false;
        }
      }
    }
    if (allOwndersNull) {
      create_unit_scima.value.owners = null;
    }
    // if (
    //   create_unit_scima.value.owners?.[0].vendorId === null ||
    //   create_unit_scima.value.owners?.[0].vendorId === ""
    // ) {
    //   create_unit_scima.value.owners = null;
    // }
    // check attachments if empty send it null
    // if (
    //   create_unit_scima.value.attachments?.[0]?.url === null ||
    //   create_unit_scima.value.attachments?.[0]?.url === ""
    // ) {
    //   create_unit_scima.value.attachments = null;
    // }
    create_unit_scima.value.attachments = null;

    let allContactIsNull = true;
    // check contact property if empty send it null and if all contact empty set = null
    for (const prop in create_unit_scima.value.contact) {
      if (
        create_unit_scima.value.contact[prop] === null ||
        create_unit_scima.value.contact[prop] === ""
      ) {
        create_unit_scima.value.contact[prop] = null;
      } else if (typeof create_unit_scima.value.contact[prop] === "object") {
        console.log("iam object");
        if (
          create_unit_scima.value.contact[prop].phoneNumber === "" ||
          create_unit_scima.value.contact[prop].phoneNumber === null
        ) {
          create_unit_scima.value.contact[prop] = null;
        } else {
          allContactIsNull = false;
        }
      } else {
        allContactIsNull = false;
      }
    }
    // if (create_unit_scima.value.contact.phoneObj?.phoneNumber === "") {
    //   create_unit_scima.value.contact.phoneObj = null;
    // } else {
    //   allContactIsNull = false;
    // }
    if (allContactIsNull) {
      create_unit_scima.value.contact = null;
    }
    add(create_unit_scima.value)
      .then((res) => {
        Loading.hide();
        getMainData();
        create_unit_scima.value = { ...scima }
        create_dialog.value = false;
        Notify.create({
          message: `success create ${propertyName} ${create_unit_scima.value.name}`,
          ...sucOptions
        });
      })
      .catch((_error) => {
        Loading.hide();
        Notify.create({
          message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
          ...errOptions
        });
      })
      .finally(() => {
        Loading.hide();
      });
  };
  // add
  const submitaddRequist = () => {
    Loading.show();
    add({ name: add_model_value.value })
      .then((res) => {
        Loading.hide();
        getMainData();
        add_model_value.value = ""
        create_dialog.value = false;
        Notify.create({
          message: `success create ${propertyName}`,
          ...sucOptions
        });
      })
      .catch((_error) => {
        Loading.hide();
        Notify.create({
          message: `success create ${propertyName} ${add_model_value.value}`,

          ...errOptions
        });
      })
      .finally(() => {
        Loading.hide();
      });
  };
  // add
  const submitAddUsageForm = () => {
    Loading.show();
    add(uasage_form_model.value)
      .then((res) => {
        Loading.hide();
        getMainData();
        uasage_form_model.value = {
          translations: [
            {
              languageId: 0,
              name: ""
            }
          ]
        }

        create_dialog.value = false;
        Notify.create({
          message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
          ...sucOptions
        });
      })
      .catch((_error) => {
        Loading.hide();
        Notify.create({
          message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
          ...errOptions
        });
      })
      .finally(() => {
        Loading.hide();
      });
  };
  const submitaddAmenity = () => {
    Loading.show();
    add(amenityForm.value)
      .then((res) => {
        Loading.hide();
        getMainData();
        amenityForm.value = {
          name: "",
          isDefault: true,
          rentTypes: 2,
          durationTypes: 1,
          amount: null
        }
        create_dialog.value = false;
        Notify.create({
          message: `success create ${propertyName} ${amenityForm.value.name}`,
          ...sucOptions
        });
      })
      .catch((_error) => {
        Loading.hide();
        Notify.create({
          message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
          ...errOptions
        });
      })
      .finally(() => {
        Loading.hide();
      });
  };
  // add form data
  const createByFormData = () => {
    let formData = new FormData();
    let model_val = add_model_obj.value
    formData.append('Name', `${model_val.name}`);
    formData.append('Terms', `${model_val.terms}`);
    formData.append('File', model_val.file);
    Loading.show();
    add(formData)
      .then((res) => {
        Loading.hide();
        getMainData();
        create_dialog.value = false;
        Notify.create({
          message: `success create ${propertyName} ${model_val.name}`,
          ...sucOptions
        });
      }).catch((_error) => {
        Loading.hide();
        Notify.create({
          message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
          ...errOptions
        });
      })
  }
  // delete
  const confirmDeleteRow = () => {
    Loading.show();
    let row = save_delte_row.value;
    console.log(row);
    dell(row.id)
      .then((res) => {
        is_multi_del.value = false
        // handelPagenation(mainData.value, pageSize.value,  pagenation_page.value);

        Loading.hide();
        getMainData();
        delete_dialog.value = false;
        Notify.create({
          message: `success delete ${propertyName} ${save_delte_row.value["name"]}`,
          ...sucOptions
        });
      })
      .catch((_error) => {
        Loading.hide();
        Notify.create({
          message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
          ...errOptions
        });
      });
  };
  // edit
  const submitEditRow = () => {
    Loading.show();
    const row = save_edit_row.value;
    let handel_row = Object.assign({}, { id: row.id }, { name: row.label ? row.label : row.name });
    put(handel_row)
      .then((res) => {
        create_dialog.value = false;
        save_edit_row.value = ""
        Loading.hide();
        getMainData();
        Notify.create({
          message: `success edit ${propertyName} to " ${row.label ? row.label : row.name} "`,
          ...sucOptions
        });
      })
      .catch((_error) => {
        Loading.hide();
        Notify.create({
          message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
          ...errOptions
        });
      });
  };
  const submitEditUsageForm = () => {
    Loading.show();
    const row = save_edit_row.value;
    // let handel_row = Object.assign({}, { id: row.id }, { name: row.label ? row.label : row.name });
    put(uasage_form_model.value)
      .then((res) => {
        create_dialog.value = false;
        uasage_form_model.value = {
          translations: [
            {
              languageId: 0,
              name: ""
            }
          ]
        }
        Loading.hide();
        getMainData();
        Notify.create({
          message: `Success edit"`,
          ...sucOptions
        });
      })
      .catch((_error) => {
        Loading.hide();
        Notify.create({
          message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
          ...errOptions
        });
      });
  };
  // edit form data
  const editByFormData = () => {
    let editFormData = new FormData();
    let model_val = save_edit_row.value
    console.log(model_val);
    editFormData.append('Id', `${model_val.id}`);
    editFormData.append('Name', `${model_val.name}`);
    editFormData.append('Terms', `${model_val.terms}`);
    editFormData.append('File', model_val.urlFile === "" ? "" : model_val.urlFile);
    editFormData.append('File', "");
    Loading.show();
    put(editFormData).then((res) => {
      Loading.hide();
      getMainData();
      create_dialog.value = false;
      Notify.create({
        message: `success edit ${propertyName} ${model_val.label ? model_val.label : model_val.name}`,
        ...sucOptions
      });
    }).catch((_error) => {
      Loading.hide();
      Notify.create({
        message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
        ...errOptions
      });
    })
      .finally(() => {
        Loading.hide();
      });
  };
  // duplicat
  const duplicateItem = () => {
    Loading.show();
    let val = sellected_row.value
    dublicate(val).then((res) => {
      create_dialog.value = false;
      Loading.hide();
      getMainData();
      sellected_row.value = [];
      Notify.create({
        message: `success duplicated`,
        ...sucOptions
      });
    }).catch((_error) => {
      Loading.hide();
      Notify.create({
        message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
        ...errOptions
      });
    });
  };
  // export
  const exportshreet = (title) => {
    Loading.show();
    exportApi().then((res) => {
      Loading.hide();
      const url = window.URL.createObjectURL(new Blob([res.data]));
      console.log(url);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${title}.xlsx`);
      document.body.appendChild(link);
      link.click();
      Notify.create({
        message: `success export ${title}`,
        ...sucOptions
      })
    }).catch((_error) => {
      Loading.hide();
      Notify.create({
        message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
        color: "red",
        ...errOptions
      });
    });
  };
  // multiple Delete
  const multiDelete = () => {
    Loading.show();
    let getId = sellected_row.value.map(({ id }) => id)

    dell(getId).then((res) => {
      // handelPagenation(mainData.value, pageSize.value, pagenation_page.value);
      Loading.hide();
      getMainData();
      sellected_row.value = [];
      Notify.create({
        message: `success delete selected row `,
        ...sucOptions
      });
      delete_dialog.value = false;
    }).catch((_error) => {
      Loading.hide();
      Notify.create({
        message: _error.data.errorMessage ? _error.data.errorMessage : _error.data,
        ...errOptions
      });
    });
  };
  // import
  const submitImport = (file) => {
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
          responsFromImport.value = res.data;
          chchErrorResult.value = false;
          console.log(res.data);
        }
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
    chechErrorApi({ dataList: clearErrors }).then((res) => {
      checkErrPending.value = false;
      if (res.data.value === true || res.data.value === null) {
        chchErrorResult.value = true;
      } else {
        responsFromImport.value = res.data.value
        chchErrorResult.value = false;
      }
      console.log(res);
      getMainData()
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
  // download template to import data by exel sheet
  const downloadTemplate = () => {
    window.open(`https://obs-api-beta.azurewebsites.net/Templates/Import/${teplateFileName}.xlsx`)
  };
  // check name exist
  const checkNameExist = (val) => {
    chechExistApi(val).then((res) => {
      isNameExist.value = res.data.value;
      // console.log(res.data.value);
    }).catch((_error) => {
      isNameExist.value = _error.data.value;
      // console.log( _error.data.value);
    });
  };
  const handleDeleteSectorImport = (row) => {
    // console.log(row);
    const index = responsFromImport.value.findIndex((el) => el.name == row.name);
    responsFromImport.value.splice(index, 1);
  };
  onBeforeMount(() => {
    getMainData();
    search_modal.value = ref("");
    import_file.value = ref("");
    pagenation_page.value = 1;
  });
  return {
    mainData,
    submitaddUnit,
    checkNameExist,
    downloadTemplate,
    multiDelete,
    handleDeleteSectorImport,
    chechImportErrors,
    glopalSearch,
    submitEditUsageForm,
    submitImport,
    import_dialog,
    import_file,
    editByFormData,
    exportshreet,
    duplicateItem,
    submitaddAmenity,
    checkErrPending,
    submitaddRequist,
    createByFormData,
    getMainData,
    submitAddUsageForm,
    // handelPagenation,
    confirmDeleteRow,
    submitEditRow,
    pageSize,
    mainDataPagination,
    pagenation_page,
    maxPages,
    sellected_row,
    isDialogEite,
    delete_dialog,
    create_dialog,
  }
}
