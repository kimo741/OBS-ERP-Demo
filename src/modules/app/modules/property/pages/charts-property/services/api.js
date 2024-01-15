import { api } from "src/boot/axios";

export default {
  // all defaulte group (on mounted)
  getGroups() {
    return api.get("api/RealEstates/GetMainGroupsList");
  },
  getPropertyList() {
    return api.get("api/RealEstates/GetDropdownList");
  },
  createVisitPremit(payload) {
    return api.post("api/RealEstatesUnits/action", payload);
  },
  updateMainGroup(data) {
    return api.put("api/RealEstates/UpdateMainGroup", data);
  },
  // get groups by value
  getGroupsByValue(value) {
    return api.get(`api/RealEstates/GetGroupsByValue/${value}`);
  },
  // get groups by value
  getUnitOfProperty(id) {
    return api.get(`api/RealEstatesUnits/GetListByRealEstates/${id}`);
  },
  // get property by id
  getPropertyById(id) {
    return api.get(`api/RealEstates/GetById/${id}`);
  },
  // create property of group
  createProperty(obj) {
    console.log(obj);
    return api.post(`api/RealEstates/Create`, { ...obj });
  },
  // update property of group
  updateProperty(obj) {
    return api.put(`api/RealEstates/Update`, obj);
  },
  // create main group
  createMainGroup(data) {
    return api.post("api/RealEstates/CreateMainGroup", data);
  },
  // filters
  filtersForTaple(data) {
    return api.post("api/RealEstates/Filter", data);
  },
  createRealestateDropdown(data) {
    return api.post("api/RealEstates/CreateFromDropDown", data);
  },
  // search
  mainSearchRealState({ Value, MainGroupId }) {
    if (MainGroupId || MainGroupId !== "") {
      return api.get(`api/RealEstates/Search/${Value}/MainGroupId?MainGroupId=${MainGroupId}`);
    } else {
      return api.get(`api/RealEstates/Search/${Value}/MainGroupId`);
    }
  },
  //  dublicate realstate
  duplicateRealState(id) {
    return api.get(`api/RealEstates/Duplicate/${id}`);
  },
  //delete realstate
  deleteRealState(id) {
    console.log(id);
    return api.delete(`api/RealEstates/Delete`, { params: { Ids: id } });

  },
  //export chart
  exportChart() {
    return api.get("api/RealEstates/ExportFile", { responseType: "blob" });
  },
  //importChart
  importChart(payload) {
    return api.post("api/RealEstates/Import", payload);
  },
  getMainGroupById(payload) {
    if (typeof payload === "object") {
      return api.post(`api/RealEstates/GetList?ProjectId=0`, payload)
    } else {
      return api.post(`afpi/RealEstates/GetList?ProjectId=${payload}`, {
        currentPage: 1,
        pageSize: 100
      });
    }
  },
  pastProperty(ids) {
    return api.post(`api/RealEstates/Past`, ids);
  },
  // get by group
  getByGroup(val) {
    return api.get(`api/RealEstates/GetGroupsByValue/${val}`);
  },
  // get by group
  getByGroupUint(payload) {
    return api.get(`api/RealEstates/GetListByValue/${payload.name}/${payload.value}`);
  },
  // get by group
  chechErrors(payload) {
    return api.post(`api/RealEstates/CheckErrors`, payload);
  },
  // get by group
  genteratNo(payload) {
    return api.get(`api/RealEstates/GenerateNewNo/${payload}`);
  },

  savePdf(file) {
    return api.post(`/api/RealEstatesUnits/SavePDF`, file);
  },

  // ////////////
  //dropDowns
  /////////////
  // translate
  getTranslateList(id) {
    return api.get(`api/LookUps/GetLanguages`);
  },
  getDropDownProjects() {
    return api.get(`api/RealEstatesProjects/GetDropdwonList`);
  },
  // translate
  getPolicesList(id) {
    return api.get(`api/RealEstatesPolicies/GetDropDownList`);
  },
  // Countries
  getCountriesList(id) {
    return api.get(`api/LookUps/Countries`);
  },
  // Countries
  getRealestateTypes() {
    return api.get(`api/LookUps/GetRealEstatesTypes`);
  },
  // Vendors
  getVendorsList() {
    return api.get(`api/LookUps/DropDownListVendor`);
  },
  // citys
  getCitysList() {
    return api.get(`api/LookUps/DropDownListCities`);
  },
  // Ragion
  getRagionList() {
    return api.get(`api/LookUps/DropDownListRegions`);
  },
  getRagionListById(id) {
    return api.get(`api/LookUps/RegionsByCountryId?CountryId=${id}`);
  },
  // customers
  getCustomersList() {
    return api.get(`api/LookUps/GetDropDownListCustomers`);
  },
  // propertyType
  propertyType() {
    return api.get(`api/LookUps/GetRealEstatesTypes`);
  },
  // Uint tipes
  unitType() {
    return api.get(`api/LookUps/GetREUnitsTypes`);
  },
  // Uint Category
  unitCategory() {
    return api.get(`api/RealEstatesUnitCategory/GetDropDownList`);
  },
  // company list
  getCompanyList() {
    return api.get(`api/LookUps/GetDropDownListCompany`);
  },
  //tag list
  getTagList() {
    return api.get(`api/LookUps/TagsOfAccountCharts`);
  },
  // block list
  getBlockList() {
    return api.get(`api/RealEstatesBlock/GetDropDownList`);
  },
  //floor list
  getFloorList() {
    return api.get(`api/RealEstatesFloor/GetDropDownList`);
  },
  //Amenity list
  getAmenityList() {
    return api.get(`api/RealEstatesAmenity/GetDropDownList`);
  },
  dropdownListMainGroups() {
    // console.log(val);
    return api.get(`api/RealEstates/GetDropdownListMainGroups`);
  },
  downloadPropertyTemplate() {
    // console.log(val);
    return api.get(`api/RealEstates/ExportTemplate`, { responseType: "blob" });
  },
};
