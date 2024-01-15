import { api } from "src/boot/axios";

export default {
  getGroups() {
    return api.get("api/Charts/AccountsGuide/GetMainGroupList");
  },
  // //////////
  // filtrer
  /////////////
  getTree(data) {
    return api.post("api/Charts/AccountsGuide/GetData", data);
  },
  /////////////////
  // create Group
  /////////////////
  createGroup() {
    return api.post("api/Charts/AccountsGuide/CreateMainGroup", data);
  },
    /////////////////
  // create account
  /////////////////
  createAccount() {
    return api.post("api/Charts/AccountsGuide/CreateAccount", data);
  },
  /////////////////
  // post item
  /////////////////
  pastItem(data) {
    return api.post("api/Charts/AccountsGuide/Past", data);
  },
  /////////////////
  // delete item
  /////////////////
  deleteItem(Ids) {
    return api.delete(`api/Charts/AccountsGuide/Delete`, { params: { Ids } });
  },
    /////////////////
  // dupicate item
  /////////////////
  duplicateItem(id) {
    return api.post("api/Charts/AccountsGuide/Duplicate", { id });
  },
  /////////////////
  // export item
  /////////////////
  exportTree() {
    return api.get("api/Charts/AccountsGuide/Export" );
  },
  /////////////////
  // import item
  /////////////////
  importTree(data) {
    return api.post("api/Charts/AccountsGuide/Import", data, {
      headers: { "Content-Type": "multipart/form-data", accept: "*/*" },
    });
  },
  /////////////////
  // import filter
  /////////////////
  filter(data) {
    return api.post("api/Charts/AccountsGuide/Filter", data);
  },
  /////////////////
  // cech errors
  //////////////////
  checkErrors(data) {
    return api.post("api/Charts/AccountsGuide/CheckErrors", data);
  },
  ///////////////////////
  // get item in groups
  ///////////////////////
  getItemsOfGroup(id){
  return api.get(`api/Charts/AccountsGuide/GetAccountsGuideById?Id=${id}`);
  },
  ///////////////////////
  // get item in groups
  ///////////////////////
  currenciesList(){
  return api.get(`api/LookUps/Currencies`);
  },
  ///////////////////////
  // get item in groups
  ///////////////////////
  createMainGroup(data){
  return api.post(`api/Charts/AccountsGuide/CreateMainGroup` ,data);
  },
  ///////////////////////
  // get item in groups
  ///////////////////////
  createAccount(data){
  return api.post(`api/Charts/AccountsGuide/CreateAccount` , data);
  },
  ///////////////////////
  // get account By Id
  ///////////////////////
  accountById(id){
  return api.get(`api/Charts/AccountsGuide/GetAccountsGuideById?Id=${id}`);
  },
  ///////////////////////
  // get account By Id
  ///////////////////////
  groupAccSearch(payload){
  return api.get(`api/Charts/AccountsGuide/Search/${payload}`);
  },
};
