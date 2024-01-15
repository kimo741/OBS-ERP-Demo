import api from "../services/api";

const actions = {
  // all defaulte group (on mounted)
  getGroups() {
    return api.getGroups();
  },
  updateMainGroup(_store, payload) {
    return api.updateMainGroup(payload);
  },
  // get groups by value
  getGroupsByValue(_store, payload) {
    return api.getGroupsByValue(payload);
  },
  // get property by id
  getPropertyById(_store, id) {
    return api.getPropertyById(id);
  },
  // create property of group
  createProperty(_store, obj) {
    return api.createProperty(obj);
  },
  // update property of group
  updateProperty(_store, obj) {
    return api.updateProperty(obj);
  },
  // get unit of property
  getUnitOfProperty(_store, id) {
    return api.getUnitOfProperty(id);
  },
  // create main group
  createMainGroup(_store, data) {
    return api.createMainGroup(data);
  },
  //  filters
  filtersForTaple(_store, data) {
    return api.filtersForTaple(data);
  },
  // search
  mainSearchRealState(_store, data) {
    return api.mainSearchRealState(data);
  },
  //  dublicate realstate
  duplicateRealState(_store, data) {
    return api.duplicateRealState(data);
  },
  //  delete realstate
  deleteRealState(_store, data) {
    return api.deleteRealState(data);
  },
  //  export chart
  exportChart() {
    return api.exportChart();
  },
  //  export chart
  importChart(_store, payload) {
    return api.importChart(payload);
  },
  // get maingroup by id
  getMainGroupById(_store, id) {
    return api.getMainGroupById(id);
  },
  // past
  pastProperty(_store, ids) {
    return api.pastProperty(ids);
  },
  // selected by group
  getByGroup(_store, payload) {
    return api.getByGroup(payload);
  },
  // selected by group
  getByGroupUint(_store, payload) {
    return api.getByGroupUint(payload);
  },
  chechErrors(_store, payload) {
    return api.chechErrors(payload);
  },
  genteratNo(_store, payload) {
    return api.genteratNo(payload);
  },
  getPropertyList(_store, payload) {
    return api.getPropertyList(payload);
  },
  createVisitPremit(_store, payload) {
    return api.createVisitPremit(payload);
  },
  createRealestateDropdown(_store, payload) {
    return api.createRealestateDropdown(payload);
  },
  downloadPropertyTemplate(_store, payload) {
    return api.downloadPropertyTemplate(payload);
  },
  savePdf(_store, payload) {
    return api.savePdf(payload);
  },
  /////////////
  // dropDowns
  /////////////
  //   translate
  getTranslateList() {
    return api.getTranslateList();
  },
  getDropDownProjects() {
    return api.getDropDownProjects();
  },
  //   polices
  getPolicesList() {
    return api.getPolicesList();
  },
  //   cuntries
  getCountriesList() {
    return api.getCountriesList();
  },
  // Realestate Types
  getRealestateTypes() {
    return api.getRealestateTypes();
  },
  // Realestate Types
  getVendorsList() {
    return api.getVendorsList();
  },
  getRagionListById(_store, payload) {
    return api.getRagionListById(payload);
  },
  // Realestate city
  getCitysList() {
    return api.getCitysList();
  },
  // ragion
  getRagionList() {
    return api.getRagionList();
  },
  // customer list
  getCustomersList() {
    return api.getCustomersList();
  },
  // property type
  propertyType() {
    return api.propertyType();
  },
  // unit type
  unitType() {
    return api.unitType();
  },
  // unit type
  unitCategory() {
    return api.unitCategory();
  },
  // company list
  async getCompanyList(_store) {
    const get = await api.getCompanyList();
    _store.commit('CHANGE_COMPANY_LIST', await get.data.value)
    console.log("updated");
    return api.getCompanyList();
  },
  getTagList() {
    return api.getTagList();
  },
  // blocks
  getBlockList() {
    return api.getBlockList();
  },
  // gloors
  getFloorList() {
    return api.getFloorList();
  },
  // gloors
  getAmenityList() {
    return api.getAmenityList();
  },
  dropdownListMainGroups(_store, payload) {
    return api.dropdownListMainGroups(payload);
  },
};

export default actions;
