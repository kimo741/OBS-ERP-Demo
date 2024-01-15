import api from "../services/api";

const actions = {
  get(_store, data) {
    return api.get(data);
  },
  ///////////////////
  // property types//
  ///////////////////
  // get
  async getAllPropertyTypes(_store, payload) {
    const response = await api.getAllPropertyTypes(payload);
    return response.data
  },
  // add
  async addPropertyType(_store, data) {
    // return console.log(data)
    return api.addPropertyType(data);
  },
  // delete
  async deletePrototype(_store, row) {
    // return console.log(data)
    return api.deletePrototype(row);
  },
  // edit
  async editPropertyType(_store, data) {
    return api.editPropertyType(data);
  },
  // export
  async exportPropertyType() {
    return api.exportPropertyType();
  },
  // duplicate
  async duplicatePropertyType(_store, payload) {
    return api.duplicatePropertyType(payload);
  },
  // import
  async importPropertyType(_store, payload) {
    return api.importPropertyType(payload);
  },
  async searchPropertyType(_store, data) {
    const response = await api.searchPropertyType(data);
    return response.data
  },
  async checkPropTypeNameExist(_store, data) {
    return api.checkPropTypeNameExist(data);
  },
  async checkPropTypeImportError(_store, data) {
    return api.checkPropTypeImportError(data);
  },

  ///////////////////
  // Unit Category//
  ///////////////////
  // get
  async getAllUnitCategory(_store, data) {
    const response = await api.getAllUnitCategory(data);
    return response.data
  },
  // get
  async getUnitCategoryList(_store, data) {
    const response = await api.getUnitCategoryList();
    return response.data
  },
  // add
  async addUnitCategory(_store, data) {
    return api.addUnitCategory(data);
  },
  // // delete
  async deleteUnitCategory(_store, row) {
    return api.deleteUnitCategory(row);
  },
  // // search
  async searchUnitCategory(_store, val) {
    const response = await api.searchUnitCategory(val);
    return response.data

  },
  // edit
  async editUnitCategory(_store, data) {
    return api.editUnitCategory(data);
  },
  // export
  async exporUnitCategory() {
    return api.exporUnitCategory();
  },

  // duplicat
  async duplicateUnitCategory(_store, payload) {

    return api.duplicateUnitCategory(payload);
  },
  // duplicat
  async importUnitCategory(_store, file) {
    return api.importUnitCategory(file);
  },
  async checkUnitCategoryNameExist(_store, data) {
    return api.checkUnitCategoryNameExist(data);
  },
  async checkUnitCategoryImportError(_store, data) {
    return api.checkUnitCategoryImportError(data);
  },

  ///////////////////
  // amenity//
  ///////////////////
  // get
  async getAllAmenity(_store, data) {
    const response = await api.getAllAmenity(data);
    return response.data
  },
  async getAmenitysList(_store, data) {
    const response = await api.getAmenitysList(data);
    return response.data
  },
  async getDefaultAmenity() {
    const response = await api.getDefaultAmenity();
    return response.data
  },
  // search
  async searchAmenity(_store, data) {
    const response = await api.searchAmenity(data);
    return response.data
  },
  // add
  async createAmenity(_store, data) {
    return api.createAmenity(data);
  },
  // // delete
  async deleteAmenity(_store, row) {
    return api.deleteAmenity(row);
  },
  // edit
  async editAmenity(_store, data) {
    return api.editAmenity(data);
  },
  // export
  async exportAmenity() {
    return api.exportAmenity();
  },
  // import
  async importAmenity(_store, file) {
    return api.importAmenity(file);
  },

  async duplicateAmenity(_store, payload) {
    return api.duplicateAmenity(payload);
  },
  async checkAmenityNameExist(_store, val) {
    return api.checkAmenityNameExist(val);
  },
  async checkAmenityImportError(_store, val) {
    return api.checkAmenityImportError(val);
  },
  ///////////////////
  // Policies//
  ///////////////////
  // get
  async getAllPolicies(_store, data) {
    const response = await api.getAllPolicies(data);
    return response.data
  },
  async getPoliciesList(_store, data) {
    const response = await api.getPoliciesList(data);
    return response.data
  },
  async getPolicyById(_store, data) {
    const response = await api.getPolicyById(data);
    return response.data
  },

  // search
  async searchPolicies(_store, data) {
    const response = await api.searchPolicies(data);
    return response.data
  },
  // add
  async createPolicies(_store, data) {
    return api.createPolicies(data);
  },
  // // delete
  async deletePolicies(_store, row) {
    // console.log(row);
    return api.deletePolicies(row);
  },
  // edit
  async editPolicies(_store, data) {
    return api.editPolicies(data);
  },
  // export
  async exportPolicies() {
    return api.exportPolicies();
  },
  // Import
  async importPolicies(_store, file) {
    // console.log(file);
    return api.importPolicies(file);
  },
  async duplicatePolicies(_store, payload) {
    return api.duplicatePolicies(payload);
  },
  async checkPolicyNameExist(_store, data) {
    return api.checkPolicyNameExist(data);
  },
  async checkPolicyImportError(_store, data) {
    return api.checkPolicyImportError(data);
  },
  ///////////////////
  // unit types//
  ///////////////////
  // get
  async getAllUnitTypes(_store, data) {
    const response = await api.getAllUnitTypes(data);
    return response.data
  },
  async getUnitTypeList(_store, data) {
    const response = await api.getUnitTypeList(data);
    return response.data
  },

  async searchUnitTypes(_store, data) {
    const response = await api.searchUnitTypes(data);
    return response.data
  },
  // add
  async createUnitType(_store, data) {
    return api.createUnitType(data);
  },
  // // delete
  async deleteUnitType(_store, row) {
    return api.deleteUnitType(row);
  },
  // edit
  async editUnitType(_store, data) {
    return api.editUnitType(data);
  },
  // export
  async exportUnitType() {
    return api.exportUnitType();
  },
  // import
  async importUnitType(_store, data) {
    return api.importUnitType(data);
  },
  async duplicateUnitType(_store, payload) {
    return api.duplicateUnitType(payload);
  },
  async checkUnitTypeNameExist(_store, data) {
    return api.checkUnitTypeNameExist(data);
  },
  async checkUnitTypeImportError(_store, data) {
    return api.checkUnitTypeImportError(data);
  },
  ///////////////////
  // flors//
  ///////////////////
  // get
  async getAllFloors(_store, data) {
    const response = await api.getAllFloors(data);
    return response.data
  },
  // search
  async searchFloors(_store, data) {
    const response = await api.searchFloors(data);
    return response.data
  },
  // add
  async createFloors(_store, data) {
    return api.createFloors(data);
  },
  // // delete
  async deleteFloor(_store, row) {
    return api.deleteFloor(row);
  },
  // edit
  async editFloor(_store, data) {
    return api.editFloor(data);
  },
  // duplicat
  async duplicateFloor(_store, opj) {
    return api.duplicateFloor(opj);
  },
  // export
  async exportFloors() {
    return api.exportFloors();
  },
  // import
  async importFloors(_store, file) {
    return api.importFloors(file);
  },
  // checkBlockNameExist
  async checkFloorNameExist(_store, file) {
    return api.checkFloorNameExist(file);
  },
  async checkFloorimportError(_store, file) {
    return api.checkFloorimportError(file);
  },
  ///////////////////
  // blocks//
  ///////////////////
  // get
  async getAllBlocks(_store, data) {
    const response = await api.getAllBlocks(data);
    return response.data
  },
  // add
  async createBlock(_store, data) {
    return api.createBlock(data);
  },
  // // delete
  async deleteBlock(_store, row) {
    return api.deleteBlock(row);
  },
  // edit
  async editBlocks(_store, data) {
    return api.editBlocks(data);
  },
  // dublicate
  async duplicateBlock(_store, opj) {
    return api.duplicateBlock(opj);
  },
  // export
  async exportBloks() {
    return api.exportBloks();
  },
  // import
  async importBloks(_store, file) {
    return api.importBloks(file);
  },
  // search
  async searchBlocks(_store, data) {
    const response = await api.searchBlocks(data);
    return response.data
  },
  // check name is exist
  async checkBlockNameExist(_store, val) {
    return api.checkBlockNameExist(val);
  },
  async checkBlockImportError(_store, val) {
    return api.checkBlockImportError(val);
  },

  ///////////////////
  // uni//
  ///////////////////
  // get
  async getAllUnits(_store, data) {
    const response = await api.getAllUnits(data);
    return response.data
  },
  async postTransaction(_store, data) {
    const response = await api.postTransaction(data);
    return response.data
  },
  async getFiltterUnits(_store, data) {
    const response = await api.getFiltterUnits(data);
    return response.data
  },
  // add
  async createUnit(_store, data) {
    return api.createUnit(data);
  },
  // // delete
  async deleteUnit(_store, row) {
    return api.deleteUnit(row);
  },
  // // edit
  async editUnit(_store, data) {
    return api.editUnit(data);
  },
  // dublicate
  async duplicateUnit(_store, opj) {
    return api.duplicateUnit(opj);
  },
  // // export
  async exportUnit() {
    return api.exportUnit();
  },
  // // export
  async importUnit(_store, file) {
    return api.importUnit(file);
  },
  // // export
  async downloadUnitsTemplate(_store, file) {
    return api.downloadUnitsTemplate(file);
  },
  /////////////////////
  ////ReUsageForms/////
  /////////////////////
  // get
  async getReUsageForms(_store, data) {
    const response = await api.getReUsageForms(data);
    return response.data
  },
  async getUsageFormList(_store, data) {
    const response = await api.getUsageFormList(data);
    return response.data
  },
  // create
  async createReUsageForms(_store, payload) {
    const response = await api.createReUsageForms(payload);
    return response.data
  },
  // update
  async updateReUsageForms(_store, payload) {
    const response = await api.updateReUsageForms(payload);
    return response.data
  },
  // update
  async dublicateReUsageForms(_store, payload) {
    const response = await api.dublicateReUsageForms(payload);
    return response.data
  },
  // export
  async exportReUsageForms(_store, payload) {
    const response = await api.exportReUsageForms();
    return response.data
  },
  // import
  async importReUsageForms(_store, payload) {
    const response = await api.importReUsageForms(payload);
    return response.data
  },
  // check error
  async checkErrorReUsageForms(_store, payload) {
    const response = await api.checkErrorReUsageForms(payload);
    return response.data
  },
  // search
  async searchReUsageForms(_store, payload) {
    const response = await api.searchReUsageForms(payload);
    return response.data
  },
  // search
  async checkNameReUsageForms(_store, payload) {
    const response = await api.checkNameReUsageForms(payload);
    return response.data
  },

  /////////////////////
  ////ReUsageForms/////
  /////////////////////
  // get
  async getReUsageForms(_store, data) {
    const response = await api.getReUsageForms(data);
    return response.data
  },
  // create
  async createReUsageForms(_store, payload) {
    const response = await api.createReUsageForms(payload);
    return response.data
  },
  // update
  async updateReUsageForms(_store, payload) {
    const response = await api.updateReUsageForms(payload);
    return response.data
  },
  // update
  async dublicateReUsageForms(_store, payload) {
    const response = await api.dublicateReUsageForms(payload);
    return response.data
  },
  // export
  async exportReUsageForms(_store, payload) {
    const response = await api.exportReUsageForms();
    return response.data
  },
  // import
  async importReUsageForms(_store, payload) {
    const response = await api.importReUsageForms(payload);
    return response.data
  },
  // check error
  async checkErrorReUsageForms(_store, payload) {
    const response = await api.checkErrorReUsageForms(payload);
    return response.data
  },
  // search
  async searchReUsageForms(_store, payload) {
    const response = await api.searchReUsageForms(payload);
    return response.data
  },
  // search
  async checkNameReUsageForms(_store, payload) {
    const response = await api.checkNameReUsageForms(payload);
    return response.data
  },
  async searchUnit(_store, data) {
    const response = await api.searchUnit(data);
    return response.data
  },

  async getUnitDetails(_store, id) {
    const response = await api.getUnitDetails(id);
    return response.data
  },
  // chechImportErrors
  chechImportErrors(_store, payload) {
    return api.chechImportErrors(payload);
  },
  // chechImportErrors
  dropdownListMainGroups(_store, payload) {
    return api.dropdownListMainGroups(payload);
  },
  ///////////////////
  ////unit model ///
  /////////////////
  // get
  async getUnitForm(_store, data) {
    const response = await api.getUnitForm(data);
    return response.data
  },
  async getUnitForm(_store, data) {
    const response = await api.getUnitForm(data);
    return response.data
  },
  async getModelList(_store, data) {
    const response = await api.getModelList(data);
    return response.data
  },
  async getModelById(_store, id) {
    const response = await api.getModelById(id);
    return response.data
  },
  // creare
  async createUnitForm(_store, payload) {
    const response = await api.createUnitForm(payload);
    return response.data
  },
  // update
  async updateUnitForm(_store, payload) {
    const response = await api.updateUnitForm(payload);
    return response.data
  },
  // delete
  async deleteUnitForm(_store, payload) {
    const response = await api.deleteUnitForm(payload);
    return response.data
  },
  // export
  async exportUnitForm(_store) {
    const response = await api.exportUnitForm();
    return response.data
  },
  // import
  async importUnitForm(_store, payload) {
    const response = await api.importUnitForm(payload);
    return response.data
  },
  // check errors
  async chechErrorsUnitForm(_store, payload) {
    const response = await api.chechErrorsUnitForm(payload);
    return response.data
  },
  // dublicate
  async dublicateUnitForm(_store, payload) {
    const response = await api.dublicateUnitForm(payload);
    return response.data
  },
  // search
  async searchUnitForm(_store, payload) {
    const response = await api.searchUnitForm(payload);
    return response.data
  },
  // chack Name
  async chackNameUnitForm(_store, payload) {
    const response = await api.chackNameUnitForm(payload);
    return response.data
  },

  // face directions
  //////////////////////////
  //get
  async getAllFaceDirections(_store, data) {
    const response = await api.getAllFaceDirections(data);
    return response.data
  },
  async getFaceDirectionsList(_store, data) {
    const response = await api.getFaceDirectionsList(data);
    return response.data
  },
  // get by id
  async getFaceDirectionById(_store, id) {
    const response = await api.getFaceDirectionById(id);
    return response.data
  },
  //create
  async createFaceDirection(_store, data) {
    const response = await api.createFaceDirection(data);
    return response.data
  },
  //update
  async updateFaceDirections(_store, payload) {
    const response = await api.updateFaceDirections(payload);
    return response.data
  },
  // duplicate
  async dublicateFaceDirections(_store, payload) {
    const response = await api.dublicateFaceDirections(payload);
    return response.data
  },
  // delete
  async deleteFaceDirection(_store, payload) {
    const response = await api.deleteFaceDirection(payload);
    return response.data
  },
  // search
  async searchFaceDirection(_store, payload) {
    const response = await api.searchFaceDirection(payload);
    return response.data
  },
  // check name
  async chackNameFaceDirection(_store, payload) {
    const response = await api.chackNameFaceDirection(payload);
    return response.data
  },
  // ////////////////////////
  /////////visit primit//////
  //////////////////////////
  async getVistitPrimet(_store, data) {
    const response = await api.getVistitPrimet(data);
    return response.data
  },
  // create
  async createVisit(_store, payload) {
    const response = await api.createVisit(payload);
    return response.data
  },
  // update
  async updateVisit(_store, payload) {
    const response = await api.updateVisit(payload);
    return response.data
  },
  // update
  async deleteVisit(_store, payload) {
    const response = await api.deleteVisit(payload);
    return response.data
  },
  // export
  async exportVisit(_store, payload) {
    const response = await api.exportVisit();
    return response.data
  },
  // import
  async importVisits(_store, payload) {
    const response = await api.importVisits(payload);
    return response.data
  },
  // check error
  async checkErrorVisits(_store, payload) {
    const response = await api.checkErrorVisits(payload);
    return response.data
  },
  // search
  async searchReUsageForms(_store, payload) {
    const response = await api.searchReUsageForms(payload);
    return response.data
  },
  // search
  async chackNameVisits(_store, payload) {
    const response = await api.chackNameVisits(payload);
    return response.data
  },
  async dublicateVisits(_store, data) {
    const response = await api.dublicateVisits(data);
    return response.data
  },

  // chechImportErrors
  chechImportErrors(_store, payload) {
    return api.chechImportErrors(payload);
  },
  // chechImportErrors
  searchVisits(_store, payload) {
    return api.searchVisits(payload);
  },
  // ////////////////
  async getLanguages() {
    const response = await api.getLanguages();
    return {
      data: {
        items: response.data.value
      }
    };
  },
  updateTranslatable: (_store, id) => api.updateTranslatable(id),
  toggleIsLanguageActive: async (_store, id) => {
    await api.toggleIsLanguageActive(id)
    await _store.dispatch("chooseLangList")
  },
  async chooseLangList(_store) {
    const response = await api.getLanguages();
    const list = await response.data.value
    const activeLanguages = await list.filter(lang => lang.active == true)
    _store.commit("showLangList", activeLanguages)
  },


  async getCurrencies() {
    const response = await api.getCurrencies();
    return {
      data: {
        items: response.data.value
      }
    };
  },
  toggleIsCurrencyActive: (_store, id) => api.toggleIsCurrencyActive(id),
  toggleIsEditiibility: (_store, id) => api.toggleIsEditiibility(id),
  updateCurrentRate: (_store, data) => api.updateCurrentRate(data),

  async getTags() {
    const response = await api.getTags();
    return {
      data: {
        items: response.data.value
      }
    };
  },

  addTag: (_store, data) => api.addTag(data),
  editTag: (_store, data) => api.editTag(data),
  deleteTag: (_store, data) => api.deleteTag(data),

  async getAddresses(_store) {
    const response = await api.getAddresses();
    return {
      data: {
        items: response.data.value
      }
    };
  },
  toggleCountryAddress(_store, id) {
    return api.toggleCountryAddress(id);
  },
  createRegion(_store, data) {
    return api.createRegion(data);
  },
  updateRegion(_store, data) {
    return api.updateRegion(data);
  },
  deleteRegion(_store, id) {
    return api.deleteRegion(id);
  },
  createCity(_store, data) {
    return api.createCity(data);
  },
  updateCity(_store, data) {
    return api.updateCity(data);
  },
  deleteCity(_store, id) {
    return api.deleteCity(id);
  },

  async getSeries(_store) {
    const response = await api.getSeries();
    return {
      data: {
        items: response.data.value
      }
    };
  },

  addSeries(_store, data) {
    return api.addSeries(data);
  },
  editSeries(_store, data) {
    return api.editSeries(data);
  },
  toggleYear(_store, data) {
    return api.toggleYear(data);
  },
  toggleMonth(_store, data) {
    return api.toggleMonth(data);
  },
  toggleIsSeriesActive(_store, data) {
    return api.toggleIsSeriesActive(data);
  },

  deleteSeries(_store, data) {
    return api.deleteSeries(data);
  },


  async getBusinessSectors() {
    const { data } = await api.getBusinessSectors();

    return {
      data: {
        items: data.value
      }
    };
  },
  deleteBusinessSector(_store, id) {
    return api.deleteBusinessSector(id);
  },
  updateBusinessSector(_store, data) {
    return api.updateBusinessSector(data);
  },
  async getAccountingPeriods(_store) {
    const { data } = await api.getAccountingPeriods();

    return {
      data: {
        items: data.value
      }
    };
  },
  createBusinessSector(_store, data) {
    return api.createBusinessSector(data);
  },
  getOpeningDate(_store) {
    return api.getOpeningDate();
  },
  addAccountingPeriod(_store, data) {
    return api.addAccountingPeriod(data);
  },
  toggleAccountingPeriod(_store, id) {
    return api.toggleAccountingPeriod(id);
  },
  deleteAccountingPeriod(_store, id) {
    return api.deleteAccountingPeriod(id);
  },
  async getDimensionsTypes() {
    const response = await api.getDimensionsTypes();

    return {
      data: {
        items: response.data.value
      }
    };
  },

  addDimensionsTypes(_store, data) {
    return api.addDimensionsTypes(data);
  },

  addDimensionType: (_store, data) => api.addDimensionType(data),
  editDimensionType: (_store, data) => api.editDimensionType(data),
  deleteDimensionType: (_store, data) => api.deleteDimensionType(data),
  async getTaxes(_store) {
    const response = await api.getTaxes();

    return {
      data: {
        items: response.data.value
      }
    };
  },
  createTax(_store, data) {
    return api.createTax(data);
  },
  updateTax(_store, data) {
    return api.updateTax(data);
  },
  deleteTax(_store, id) {
    return api.deleteTax(id);
  },
  ToggleTaxIsActive(_store, id) {
    return api.ToggleTaxIsActive(id);
  },
  updateBusinessSector(_store, data) {
    return api.updateBusinessSector(data);
  },
  // customer & vendor groups
  // getCustomerAndVendors(_store) {
  //   return api.getCustomerAndVendors();
  // },
  async getCustomerAndVendors(_store) {
    const response = await api.getCustomerAndVendors();
    return {
      data: {
        items: response.data.value
      }
    };
  },
  createCustomerAndVendors(_store, data) {
    return api.createCustomerAndVendors(data);
  },
  updateCustomerAndVendors(_store, data) {
    return api.updateCustomerAndVendors(data);
  },
  deleteCustomerAndVendors(_store, id) {
    return api.deleteCustomerAndVendors(id);
  },
};

export default actions;
