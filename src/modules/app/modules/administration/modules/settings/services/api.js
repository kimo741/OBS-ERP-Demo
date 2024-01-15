import { api } from "src/boot/axios";
import { LocalStorage } from "quasar";

const actions = {
  // proprety types
  /////////////////
  //get
  getAllPropertyTypes(payload) {
    return api.get(`api/RealEstatesTypes/GetList/${payload.page}/${payload.size}`);
  },
  // add
  addPropertyType(payload) {
    return api.post("api/RealEstatesTypes/Create", payload);
  },
  // delte
  deletePrototype(id) {
    let handelId;
    Array.isArray(id) ? handelId = id : handelId = [id];
    return api.delete(`api/RealEstatesTypes/Delete`, { data: handelId });
  },
  editPropertyType(data) {
    return api.put("api/RealEstatesTypes/Update", data);
  },
  // export
  exportPropertyType() {
    return api.get("api/RealEstatesTypes/ExportFile", { responseType: "blob" });
  },
  // import
  importPropertyType(data) {
    return api.post("api/RealEstatesTypes/Import", data)
  },
  duplicatePropertyType(arr) {

    let res = ""
    for (let i = 0; i < arr.length; i++) {
      if (arr.length - 1 == i) {
        res += `ids=${arr[i].id}`
      } else {
        res += `ids=${arr[i].id}&`
      }
    }
    return api.get(`api/RealEstatesTypes/Duplicate?${res}`);
  },
  searchPropertyType(val) {
    return api.get(`api/RealEstatesTypes/Search/${val}`);
  },
  checkPropTypeNameExist(val) {
    return api.get(`api/RealEstatesTypes/CheckNameExist/${val}`);
  },
  ////////////////
  // unit category
  /////////////////
  //get
  getAllUnitCategory(payload) {
    return api.get(`api/RealEstatesUnitCategory/GetList/${payload.page}/${payload.size}`);
  },
  getUnitCategoryList(payload) {
    return api.get(`api/RealEstatesUnitCategory/GetDropDownList`);
  },
  // search
  searchUnitCategory(val) {
    return api.get(`api/RealEstatesUnitCategory/Search/${val}`);
  },
  // add
  addUnitCategory(payload) {
    return api.post("api/RealEstatesUnitCategory/Create", payload);
  },
  // delte
  deleteUnitCategory(id) {
    let handelId;
    Array.isArray(id) ? handelId = id : handelId = [id];
    return api.delete(`api/RealEstatesUnitCategory/Delete`, { data: handelId });
  },
  // edit
  editUnitCategory(data) {
    return api.put("api/RealEstatesUnitCategory/Update", data);
  },
  // export
  exporUnitCategory() {
    return api.get("api/RealEstatesUnitCategory/Export", { responseType: "blob" });
  },
  // duplicate
  duplicateUnitCategory(arr) {
    let res = ""
    for (let i = 0; i < arr.length; i++) {
      if (arr.length - 1 == i) {
        res += `ids=${arr[i].id}`
      } else {
        res += `ids=${arr[i].id}&`
      }
    }
    return api.get(`api/RealEstatesUnitCategory/Duplicate?${res}`);
  },
  // import
  importUnitCategory(file) {
    return api.post(`api/RealEstatesUnitCategory/Import`, file);
  },
  checkUnitCategoryNameExist(val) {
    return api.get(`api/RealEstatesUnitCategory/CheckNameExist/${val}`);
  },
  checkPropTypeImportError(val) {
    return api.post(`api/RealEstatesTypes/CheckErrors`, val);
  },
  checkUnitCategoryImportError(val) {
    return api.post(`api/RealEstatesUnitCategory/CheckErrors`, val);
  },
  ////////////////
  // Amenity
  /////////////////
  //get
  getAllAmenity(payload) {
    return api.get(`api/RealEstatesAmenity/GetList/${payload.page}/${payload.size}`);
  },
  getAmenitysList(payload) {
    return api.get(`api/RealEstatesAmenity/GetDropDownList`);
  },
  //get
  getDefaultAmenity() {
    return api.get("api/RealEstatesAmenity/GetDefaultsList");
  },
  //search
  searchAmenity(val) {
    return api.get(`api/RealEstatesAmenity/Search/${val}`);
  },
  // add
  createAmenity(payload) {
    return api.post("api/RealEstatesAmenity/Create", payload);
  },
  editAmenity(data) {
    return api.put("api/RealEstatesAmenity/Update", data);
  },
  exportAmenity() {
    return api.get("api/RealEstatesAmenity/Export");
  },
  importAmenity(file) {
    return api.post("api/RealEstatesAmenity/Import", file);
  },
  duplicateAmenity(arr) {
    let res = ""
    for (let i = 0; i < arr.length; i++) {
      if (arr.length - 1 == i) {
        res += `ids=${arr[i].id}`
      } else {
        res += `ids=${arr[i].id}&`
      }
    }
    return api.get(`api/RealEstatesAmenity/Duplicate?${res}`);
  },
  deleteAmenity(id) {
    let handelId;
    Array.isArray(id) ? handelId = id : handelId = [id];
    return api.delete(`api/RealEstatesAmenity/Delete`, { data: handelId });
  },
  checkAmenityNameExist(val) {
    return api.get(`api/RealEstatesAmenity/CheckNameExist/${val}`);
  },
  checkAmenityImportError(val) {
    return api.post(`api/RealEstatesAmenity/CheckErrors`, val);
  },
  ////////////////
  // Policies
  /////////////////
  //get
  getAllPolicies(payload) {
    return api.get(`api/RealEstatesPolicies/GetList/${payload.page}/${payload.size}`);
  },
  getPoliciesList() {
    return api.get(`api/RealEstatesPolicies/GetDropDownList`);
  },
  getPolicyById(id) {
    return api.get(`api/RealEstatesPolicies/GetById/${id}`);
  },
  //search
  searchPolicies(val) {
    return api.get(`api/RealEstatesPolicies/Search/${val}`);
  },
  // add
  createPolicies(payload) {
    return api.post("api/RealEstatesPolicies/Create", payload);
  },
  // delte
  deletePolicies(id) {
    let handelId;
    Array.isArray(id) ? handelId = id : handelId = [id];
    return api.delete(`api/RealEstatesPolicies/Delete`, { data: handelId });
  },
  // edit
  editPolicies(data) {
    return api.put("api/RealEstatesPolicies/Update", data);
  },
  // export
  exportPolicies() {
    return api.get("api/RealEstatesPolicies/Export", { responseType: "blob" });
  },
  importPolicies(file) {
    return api.post("api/RealEstatesPolicies/Import", file);
  },
  duplicatePolicies(arr) {
    let res = ""
    for (let i = 0; i < arr.length; i++) {
      if (arr.length - 1 == i) {
        res += `ids=${arr[i].id}`
      } else {
        res += `ids=${arr[i].id}&`
      }
    }
    return api.get(`api/RealEstatesPolicies/Duplicate?${res}`);
  },
  checkPolicyNameExist(val) {
    return api.get(`api/RealEstatesPolicies/CheckNameExist/${val}`);
  },
  checkPolicyImportError(val) {
    return api.post(`api/RealEstatesPolicies/CheckErrors`, val);
  },
  ////////////////
  // unit types
  /////////////////
  //get
  getAllUnitTypes(payload) {
    return api.get(`api/RealEstatesUnitsTypes/GetList/${payload.page}/${payload.size}`);
  },
  getUnitTypeList(payload) {
    return api.get(`api/RealEstatesUnitsTypes/GetDropDownList`);
  },
  // unit types
  searchUnitTypes(val) {
    return api.get(`api/RealEstatesUnitsTypes/Search/${val}`);
  },
  // add
  createUnitType(payload) {
    return api.post("api/RealEstatesUnitsTypes/Create", payload);
  },
  // delte
  deleteUnitType(id) {
    let handelId;
    Array.isArray(id) ? handelId = id : handelId = [id];
    return api.delete(`api/RealEstatesUnitsTypes/Delete`, { data: handelId });
  },
  // edit
  editUnitType(data) {
    return api.put("api/RealEstatesUnitsTypes/Update", data);
  },
  // export
  exportUnitType() {
    return api.get("api/RealEstatesUnitsTypes/Export", { responseType: "blob" });
  },
  // import
  importUnitType(data) {
    return api.post("api/RealEstatesUnitsTypes/Import", data);
  },
  // duplicate
  duplicateUnitType(arr) {
    let res = ""
    for (let i = 0; i < arr.length; i++) {
      if (arr.length - 1 == i) {
        res += `ids=${arr[i].id}`
      } else {
        res += `ids=${arr[i].id}&`
      }
    }
    return api.get(`api/RealEstatesUnitsTypes/Duplicate?${res}`);
  },
  checkUnitTypeNameExist(val) {
    return api.get(`api/RealEstatesUnitsTypes/CheckNameExist/${val}`);
  },
  checkUnitTypeImportError(val) {
    return api.post(`api/RealEstatesUnitsTypes/CheckErrors`, val);
  },

  ////////////////
  // floors
  /////////////////
  //get
  getAllFloors(payload) {
    return api.get(`api/RealEstatesFloor/GetList/${payload.page}/${payload.size}`);
  },
  // add
  createFloors(payload) {
    return api.post("api/RealEstatesFloor/Create", payload);
  },
  // delte
  deleteFloor(id) {
    let handelId;
    Array.isArray(id) ? handelId = id : handelId = [id];
    return api.delete(`api/RealEstatesFloor/Delete`, { data: handelId });
  },
  //edit
  editFloor(data) {
    return api.put("api/RealEstatesFloor/Update", data);
  },
  // duplicat
  duplicateFloor(arr) {
    let res = ""
    for (let i = 0; i < arr.length; i++) {
      if (arr.length - 1 == i) {
        res += `ids=${arr[i].id}`
      } else {
        res += `ids=${arr[i].id}&`
      }
    }
    return api.get(`api/RealEstatesFloor/Duplicate?${res}`);
  },
  // export
  exportFloors() {
    return api.get("api/RealEstatesFloor/ExportFile", { responseType: "blob" });
  },
  // import
  importFloors(file) {
    return api.post("api/RealEstatesFloor/Import", file);
  },
  // search
  searchFloors(val) {
    return api.get(`api/RealEstatesFloor/Search/${val}`);
  },
  // checkBlockNameExist
  checkFloorNameExist(val) {
    return api.get(`api/RealEstatesFloor/CheckNameExist/${val}`);
  },
  checkFloorimportError(val) {
    return api.post(`api/RealEstatesFloor/CheckErrors`, val);
  },

  ////////////////
  // blocks
  /////////////////
  //get
  getAllBlocks(payload) {
    return api.get(`api/RealEstatesBlock/GetList/${payload.page}/${payload.size}`);
  },
  // add
  createBlock(payload) {
    return api.post("api/RealEstatesBlock/Create", payload);
  },
  editBlocks(payload) {
    return api.put("api/RealEstatesBlock/Update", payload);
  },
  // delte
  deleteBlock(id) {
    let handelId;
    Array.isArray(id) ? handelId = id : handelId = [id];
    return api.delete(`api/RealEstatesBlock/Delete`, { data: handelId });
  },
  // dublicate
  duplicateBlock(arr) {
    // let val = arr.map(((el ,i )=> `ids=${el.id}&`))
    let res = ""
    for (let i = 0; i < arr.length; i++) {
      if (arr.length - 1 == i) {
        res += `ids=${arr[i].id}`
      } else {
        res += `ids=${arr[i].id}&`
      }
    }
    // let res = val.toString()
    return api.get(`api/RealEstatesBlock/Duplicate?${res}`);
  },
  // import
  importBloks(file) {
    return api.post("api/RealEstatesBlock/Import", file);
  },
  // export
  exportBloks() {
    return api.get("api/RealEstatesBlock/ExportFile", { responseType: "blob" });
  },
  // search
  searchBlocks(val) {
    return api.get(`api/RealEstatesBlock/Search/${val}`);
  },
  checkBlockNameExist(val) {
    return api.get(`api/RealEstatesBlock/CheckNameExist/${val}`);
  },
  checkBlockImportError(val) {
    return api.post(`api/RealEstatesBlock/CheckErrors`, val);
  },
  ////////////////
  // units
  /////////////////
  //get
  getAllUnits(payload) {
    return api.get(`api/RealEstatesUnits/GetList/${payload.page}/${payload.size}`);
  },
  postTransaction(payload) {
    return api.post(`api/RealEstatesUnits/GetList`, payload);
  },
  getFiltterUnits(payload) {
    return api.post(`api/RealEstatesUnits/GetList`, payload);
  },
  // add
  createUnit(payload) {
    return api.post("api/RealEstatesUnits/Create", payload);
  },
  // // delte
  deleteUnit(id) {
    let arr;
    Array.isArray(id) ? arr = id : arr = [id];
    let res = ""
    for (let i = 0; i < arr.length; i++) {
      if (arr.length - 1 == i) {
        res += `Ids=${arr[i]}`
      } else {
        res += `Ids=${arr[i]}&`
      }
    }
    console.log(arr);
    return api.delete(`api/RealEstatesUnits/Delete?${res}`);
  },
  // // edit
  editUnit(data) {
    return api.put("api/RealEstatesUnits/Update", data);
  },

  // export
  exportUnit() {
    return api.get("api/RealEstatesUnits/ExportFile", { responseType: "blob" });
  },
  // download template
  downloadUnitsTemplate() {
    return api.get("api/RealEstatesUnits/ExportTemplate", { responseType: "blob" });
  },
  // dublicate
  duplicateUnit(arr) {
    // console.log(arr)
    return api.get(`api/RealEstatesUnits/Duplicate/${arr[0].id}`);
  },
  importUnit(file) {
    return api.post("api/RealEstatesUnits/Import", file);
  },
  // search
  searchUnit(val) {
    console.log(val);
    return api.get(`api/RealEstatesUnits/Search/${val}`);
  },
  // search
  getUnitDetails(id) {
    // console.log(val);
    return api.get(`api/RealEstatesUnits/GetById/${id}`);
  },
  // downListMainGroups
  dropdownListMainGroups(id) {
    // console.log(val);
    return api.get(`api/RealEstates/GetDropdownListMainGroups`);
  },
  chechImportErrors(payload) {
    return api.post(`api/RealEstatesUnits/CheckErrors`, payload);
  },
  /////////////////////
  ////ReUsageForms/////
  /////////////////////
  // get table
  getReUsageForms(payload) {
    return api.get(`api/ReUsageForms/GetList/${payload.page}/${payload.size}`);
  },
  getUsageFormList(payload) {
    return api.get(`api/ReUsageForms/GetDropDownList`);
  },
  // create
  createReUsageForms(payload) {
    // const handelpayload = {
    //   translations: [
    //     { languageId: LocalStorage.getItem("defLanguage") && 1, name: payload.name },
    //   ],
    // };
    // const handelpayload = {
    //   name: [payload.name]
    // }
    return api.post(`api/ReUsageForms/Create`, payload);
  },
  // update
  updateReUsageForms(payload) {
    // const handelpayload = {
    //   name: [payload.name]
    // }
    return api.put(`api/ReUsageForms/Update`, payload);
  },
  // delete
  deleteReUsageForms(id) {
    let handelId;
    Array.isArray(id) ? handelId = id : handelId = [id];
    return api.delete(`api/ReUsageForms/Delete`, { data: handelId });
  },
  // dublicat
  dublicateReUsageForms(arr) {
    // let val = arr.map(((el ,i )=> `ids=${el.id}&`))
    let res = ""
    for (let i = 0; i < arr.length; i++) {
      if (arr.length - 1 == i) {
        res += `ids=${arr[i].id}`
      } else {
        res += `ids=${arr[i].id}&`
      }
    }
    // let res = val.toString()
    return api.get(`api/ReUsageForms/Duplicate?${res}`);
  },
  // export
  exportReUsageForms(id) {
    return api.get(`api/ReUsageForms/ExportFile`);
  },
  // import
  importReUsageForms(file) {
    return api.post(`api/ReUsageForms/Import`, file);
  },
  // check Error
  checkErrorReUsageForms(payload) {
    return api.post(`api/ReUsageForms/CheckErrors`, payload);
  },
  // search
  searchReUsageForms(payload) {
    return api.get(`api/ReUsageForms/Search/${payload}`);
  },
  // search
  checkNameReUsageForms(payload) {
    return api.get(`api/ReUsageForms/CheckNameExist/${payload}`);
  },
  ///////////////////
  ////unit model ///
  /////////////////
  // get
  getUnitForm(payload) {
    return api.get(`api/RealEstatesUnitModel/GetList/${payload.page}/${payload.size}`);
  },
  getModelList() {
    return api.get(`api/RealEstatesUnitModel/GetDropDownList`);
  },
  getModelById(id) {
    return api.get(`api/RealEstatesUnitModel/GetById/${id}`);
  },
  // create
  createUnitForm(payload) {
    return api.post(`api/RealEstatesUnitModel/Create`, payload);
  },
  // create
  updateUnitForm(payload) {
    return api.put(`api/RealEstatesUnitModel/Update`, payload);
  },
  // delete
  deleteUnitForm(id) {
    let handelId;
    Array.isArray(id) ? handelId = id : handelId = [id];
    return api.delete(`api/RealEstatesUnitModel/Delete`, { data: handelId });
  },
  // export
  exportUnitForm() {
    return api.get(`api/RealEstatesUnitModel/Export`);
  },
  // import
  importUnitForm(payload) {
    return api.post(`api/RealEstatesUnitModel/Import`, payload);
  },
  // check errors
  chechErrorsUnitForm(payload) {
    return api.post(`api/RealEstatesUnitModel/CheckErrors`, payload);
  },
  // dublicat
  dublicateUnitForm(arr) {
    let res = ""
    for (let i = 0; i < arr.length; i++) {
      if (arr.length - 1 == i) {
        res += `ids=${arr[i].id}`
      } else {
        res += `ids=${arr[i].id}&`
      }
    }
    return api.get(`api/RealEstatesUnitModel/Duplicate${res}`);
  },
  // search
  searchUnitForm(payload) {
    return api.get(`api/RealEstatesUnitModel/Search/${payload}`);
  },
  // search
  chackNameUnitForm(payload) {
    return api.get(`api/RealEstatesUnitModel/CheckNameExist/${payload}`);
  },

  /////////////////
  // face direction
  /////////////////////
  getAllFaceDirections(payload) {
    return api.get(`api/RealEstatesFacadeDirection/GetList/${payload.page}/${payload.size}`);
  },
  getFaceDirectionsList() {
    return api.get(`api/RealEstatesFacadeDirection/GetDropDownList`);
  },
  // create
  getFaceDirectionById(id) {
    return api.get(`api/RealEstatesFacadeDirection/GetById/${id}`);
  },
  // create
  createFaceDirection(payload) {
    return api.post(`api/RealEstatesFacadeDirection/Create`, payload);
  },
  dublicateFaceDirections(arr) {
    // let val = arr.map(((el ,i )=> `ids=${el.id}&`))
    let res = ""
    for (let i = 0; i < arr.length; i++) {
      if (arr.length - 1 == i) {
        res += `ids=${arr[i].id}`
      } else {
        res += `ids=${arr[i].id}&`
      }
    }
    // let res = val.toString()
    return api.get(`api/RealEstatesFacadeDirection/Duplicate?${res}`);
  },
  // create
  updateFaceDirections(payload) {
    return api.put(`api/RealEstatesFacadeDirection/Update `, payload);
  },
  // delete
  deleteFaceDirection(id) {
    let handelId;
    Array.isArray(id) ? handelId = id : handelId = [id];
    return api.delete(`api/RealEstatesFacadeDirection/Delete`, { data: handelId });
  },
  // search
  searchFaceDirection(payload) {
    return api.get(`api/RealEstatesFacadeDirection/Search/${payload}`);
  },
  // chack name
  chackNameFaceDirection(payload) {
    return api.get(`api/RealEstatesFacadeDirection/CheckNameExist/${payload}`);
  },
  /////////////////////////////////////
  ////////////////////////////////////////////
  ///////////////////
  ////visit premit ///
  /////////////////
  // get
  getVistitPrimet(payload) {
    return api.get(`api/REVisitPremitType/GetList/${payload.page}/${payload.size}`);
  },
  getModelList() {
    return api.get(`api/REVisitPremitType/GetDropDownList`);
  },
  geVistitById(id) {
    return api.get(`api/REVisitPremitType/GetById/${id}`);
  },
  // create
  createVisit(payload) {
    return api.post(`api/REVisitPremitType/Create`, payload);
  },
  // create
  updateVisit(payload) {
    return api.put(`api/REVisitPremitType/Update`, payload);
  },
  // delete
  deleteVisit(id) {
    let handelId;
    Array.isArray(id) ? handelId = id : handelId = [id];
    return api.delete(`api/REVisitPremitType/Delete`, { data: handelId });
  },
  // export
  exportVisit() {
    return api.get(`api/REVisitPremitType/Export`);
  },
  // import
  importVisits(payload) {
    return api.post(`api/REVisitPremitType/Import`, payload);
  },
  // check errors
  checkErrorVisits(payload) {
    return api.post(`api/REVisitPremitType/CheckErrors`, payload);
  },
  // dublicat
  dublicateVisits(arr) {
    let res = ""
    for (let i = 0; i < arr.length; i++) {
      if (arr.length - 1 == i) {
        res += `ids=${arr[i].id}`
      } else {
        res += `ids=${arr[i].id}&`
      }
    }
    return api.get(`api/RealEstatesUnitModel/Duplicate${res}`);
  },
  // search
  searchVisits(payload) {
    return api.get(`api/REVisitPremitType/Search/${payload}`);
  },
  // search
  chackNameVisits(payload) {
    return api.get(`api/REVisitPremitType/CheckNameExist/${payload}`);
  },

  get(_store, data) {
    return api.get(data);
  },

  getLanguages: () => api.get("api/Languages/GetAll"),
  updateTranslatable: (payload) =>
    api.put("api/Languages/UpdateTranslatable", payload),
  toggleIsLanguageActive: (payload) =>
    api.put("api/Languages/UpdateActive", payload),

  getCurrencies: () => api.get("api/Currency/GetAll"),
  toggleIsCurrencyActive: (id) =>
    api.put("api/Currency/ToggleIsActive", null, {
      params: { CurrencyId: id }
    }),
  toggleIsEditiibility: (id) =>
    api.put("api/Currency/ToggleIsEditiibility", null, {
      params: { CurrencyId: id }
    }),
  updateCurrentRate: (payload) => api.put("api/Currency/Update", payload),

  getBusinessSectors() {
    return api.get("api/BusinessSector/GetAll");
  },
  updateBusinessSector(data) {
    return api.put("api/BusinessSector/Update", data);
  },
  deleteBusinessSector(id) {
    return api.delete("api/BusinessSector/Delete", {
      data: {
        id
      }
    });
  },
  createBusinessSector(data) {
    return api.post("api/BusinessSector/Create", data);
  },
  getAccountingPeriods() {
    return api.get("api/AccountingPeriod/GetAll");
  },
  getOpeningDate() {
    return api.get("api/AccountingPeriod/GetOpeningDate");
  },
  addAccountingPeriod(data) {
    return api.post("api/AccountingPeriod/Create", data);
  },
  deleteAccountingPeriod(id) {
    return api.delete("api/AccountingPeriod/Delete", {
      data: {
        id
      }
    });
  },
  toggleAccountingPeriod(id) {
    return api.put("api/AccountingPeriod/ClosePeriod", {
      id
    });
  },
  getTaxes(_store) {
    return api.get("api/Tax/GetAll");
  },
  updateTax(data) {
    return api.put("api/Tax/Update", data);
  },
  createTax(data) {
    return api.post("api/Tax/Create", data);
  },
  deleteTax(id) {
    return api.delete("api/Tax/Delete", { params: { Id: id } });
  },
  ToggleTaxIsActive(id) {
    return api.put("api/Tax/ToggleTaxIsActive", null, {
      params: {
        TaxId: id
      }
    });
  },
  getTags: () => api.get("api/Tag/GetAll"),
  addTag: (payload) => api.post("api/Tag/Create", payload),
  editTag: (payload) => api.put("api/Tag/Update", payload),
  deleteTag: (id) => api.delete("api/Tag/Delete", { params: { Id: id } }),

  getDimensionsTypes: () => api.get("api/FinancialDimensionsType/GetAll"),
  addDimensionType: (payload) =>
    api.post("api/FinancialDimensionsType/Create", payload),
  editDimensionType: (payload) =>
    api.put("api/FinancialDimensionsType/Update", payload),
  deleteDimensionType: (id) =>
    api.delete(`api/FinancialDimensionsType/Delete`, { params: { Id: id } }),

  getSeries: () => api.get("api/Series/GetAll"),
  addSeries: (payload) => api.post("api/Series/Create", payload),
  editSeries: (payload) => api.put("api/Series/Update", payload),
  toggleYear: (id) => api.put("api/Series/UpdateYear", { id }),
  toggleMonth: (id) => api.put("api/Series/UpdateMonth", { id }),
  toggleIsSeriesActive: (id) => api.put("api/Series/UpdateActive", { id }),
  deleteSeries: (id) => api.delete("api/Series/Delete", { data: id }),
  getAddresses() {
    return api.get("api/Address/GetAll");
  },
  toggleCountryAddress(id) {
    return api.put("api/Address/ToggleCountryIsActive", null, {
      params: {
        Id: id
      }
    });
  },
  createRegion(data) {
    return api.post("api/Address/CreateRegion", data);
  },
  updateRegion(data) {
    return api.put("api/Address/UpdateRegion", data);
  },
  deleteRegion(id) {
    return api.delete("api/Address/DeleteRegion", {
      params: {
        Id: id
      }
    });
  },
  createCity(data) {
    return api.post("api/Address/CreateCity", data);
  },
  updateCity(data) {
    return api.put("api/Address/UpdateCity", data);
  },
  deleteCity(id) {
    return api.delete("api/Address/DeleteCity", {
      params: {
        Id: id
      }
    });
  },
  // customer & vendor groups
  getCustomerAndVendors() {
    return api.get("api/GroupsVendorCustomer/GetList");
  },
  createCustomerAndVendors(data) {
    return api.post("api/GroupsVendorCustomer/Create", data);
  },
  updateCustomerAndVendors(data) {
    return api.put("api/GroupsVendorCustomer/Update", data);
  },
  deleteCustomerAndVendors(id) {
    return api.delete(`api/GroupsVendorCustomer/Delete?Id=${id}`);
  },
};

export default actions;
