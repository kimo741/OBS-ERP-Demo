import api from "../services/api";

const actions = {
  // git list
  // changet to use filter endpoint
  getProjectList(_store, payload) {
    return api.searchAndFilters(payload);
  },
  // create projects
  crateProjects(_store, payload) {
    return api.crateProjects(payload);
  },
  // create projects from drop down list
  crateProjectsDropDown(_store, payload) {
    return api.crateProjectsDropDown(payload);
  },
  // create projects
  updateProject(_store, payload) {
    return api.updateProject(payload);
  },
  // delte projects
  deleteProject(_store, ids) {
    return api.deleteProject(ids);
  },
  // delte projects
  exportProject(_store) {
    return api.exportProject();
  },
  // duplicate
  duplicateProject(_store, id) {
    return api.duplicateProject(id);
  },
  // import
  importProject(_store, file) {
    return api.importProject(file);
  },
  // check import error
  checkImportErrors(_store, payload) {
    return api.checkImportErrors(payload);
  },
  // search & filter
  searchAndFilters(_store, payload) {
    return api.searchAndFilters(payload);
  },
  // search & filter
  getCountysList(_store, payload) {
    return api.getCountysList(payload);
  },
  // search & filter
  getRegionList(_store, payload) {
    return api.getRegionList();
  },
  getProjectById(_store, id) {
    return api.getProjectById(id);
  },
  getCitysList(_store, id) {
    return api.getCitysList(id);
  },
  getYearForFilter(_store, id) {
    return api.getYearForFilter();
  },
  getTableByGroup(_store, col) {
    return api.getTableByGroup(col);
  },
  groupListByCulomn(_store, col) {
    return api.groupListByCulomn(col);
  },
};

export default actions;
