import api from "../services/api";

const actions = {
  getGroups(_store) {
    return api.getGroups();
  },
  // carete main group
  createMainGroup(_store , payload) {
    return api.createMainGroup(payload);
  },
  // create account
  createAccount(_store , payload) {
    return api.createAccount(payload);
  },
  // get account by id
  accountById(_store , id) {
    return api.accountById(id);
  },
  // Glopal search
  groupAccSearch(_store , payload) {
    return api.groupAccSearch(payload);
  },
  getTree(_store, data) {
    return api.getTree(data);
  },
  // get item of group
  getItemsOfGroup(_store, data) {
    return api.getItemsOfGroup(data);
  },
  createGroup(_store, data) {
    return api.createGroup(data);
  },
  createAccount(_store, data) {
    return api.createAccount(data);
  },
  pastItem(_store, data) {
    return api.pastItem(data);
  },
  deleteItem(_store, id) {
    return api.deleteItem(id);
  },
  duplicateItem(_store, data) {
    return api.duplicateItem(data);
  },
  exportTree(_store) {
    return api.exportTree();
  },
  importTree(_store, data) {
    return api.importTree(data);
  },
  filter(_store, data) {
    return api.filter(data);
  },
  checkErrors(_store, data) {
    return api.checkErrors(data);
  },
  // /////////////////
  // currencies List
  //////////////////
  currenciesList() {
    return api.currenciesList();
  },
};

export default actions;
