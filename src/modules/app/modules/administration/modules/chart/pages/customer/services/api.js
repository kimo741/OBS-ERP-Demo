import { api } from "src/boot/axios";

export default {
  // getGroups() {
  //   return api.get("api/Item/GetMainGroupsList");
  // },
  // get list
  getCustomerList(id) {
    return api.get("api/Customer/GetList");
  },
  // get list by main group
  getCustomerByMainGroup(id) {
    return api.get(`api/Customer/GetListByMainGroup/${id}`);
  },
    // get list by search

  getListBySearch(payload) {
    return api.get(`api/Customer/Search/${payload}`);
  },
    // get list by filter

  getListByFilter(payload) {
    return api.post(`api/Customer/Filter` , payload);
  },
  // get list of groupBy

  getGroupByValue(payload) {
    const {colomnName} = payload;
    const {value } = payload
    return api.get(`api/Customer/GetListByValue/'${colomnName}/${value}`);
  },
  // create main group
  createMainGroup(data) {
    return api.post("api/Customer/CreateMainGroup", data);
  },
  // create customer
  createCustomer(data) {
    return api.post("api/Customer/Create", data);
  },
  // update customer

  updateCustomer(data) {
    return api.put("api/Customer/Update", data);
  },
  // delete customer
  deleteCustomer(id) {
    return api.delete(`api/Customer/DeleteCustomer/${id}`);
  },
  // duplicateItem(data) {
  //   return api.post("api/Item/Duplicate", data);
  // },
};
