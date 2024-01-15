import { api } from "src/boot/axios";

export default {
  // git list
  getProjectList() {
    return api.get("api/RealEstatesProjects/GetList");
  },
  // create projects
  crateProjects(payload) {
    return api.post("api/RealEstatesProjects/Create", payload);
  },
  // create projects
  crateProjectsDropDown(payload) {
    return api.post("api/RealEstatesProjects/CreateFromDropDown", payload);
  },
  // create projects
  updateProject(payload) {
    return api.put("api/RealEstatesProjects/Update", payload);
  },
  // delete projects
  deleteProject(ids) {

    return api.delete("api/RealEstatesProjects/Delete", { params: { Ids: ids } });
  },
  // export projects
  exportProject() {
    return api.get("api/RealEstatesProjects/ExportFile");
  },
  // duplicate projects
  duplicateProject(id) {
    return api.get(`api/RealEstatesProjects/Duplicate/${id}`);
  },
  // import
  importProject(file) {
    return api.post(`api/RealEstatesProjects/Import`, file);
  },
  // check error
  checkImportErrors(payload) {
    return api.post(`api/RealEstatesProjects/CheckErrors`, payload);
  },
  // search & filter
  searchAndFilters(payload) {
    return api.post(`api/RealEstatesProjects/FilterAndSearch`, payload);
  },
  getCountysList() {
    return api.get(`api/RealEstatesProjects/GetCountries`);
  },
  getRegionList() {
    return api.get(`api/RealEstatesProjects/GetRegions`);
  },
  getCitysList() {
    return api.get(`api/RealEstatesProjects/GetCities`);
  },
  getProjectById(id) {
    return api.get(`api/RealEstatesProjects/GetById/${id}`);
  },
  getYearForFilter(id) {
    return api.get(`api/RealEstatesProjects/GetYears`);
  },
  getTableByGroup(col) {
    return api.get(`api/RealEstatesProjects/GetGroupsByValue/${col}`);
  },
  groupListByCulomn(payload) {
    return api.get(`api/RealEstatesProjects/GetListByValue/${payload.name}/${payload.value}`);
  },
};
