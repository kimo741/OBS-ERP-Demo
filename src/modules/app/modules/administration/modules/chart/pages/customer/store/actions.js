import api from "../services/api";

const actions = {
  // getGroups(_store) {
  //   return api.getGroups();
  // },
  // get list
  getCustomerList(_store) {
    return api.getCustomerList();
  },
  // get list by main group
  getCustomerByMainGroup(_store , id) {
    return api.getCustomerByMainGroup(id);
  },
    // get list by search
  getListBySearch(_store , payload) {
    return api.getListBySearch(payload);
  },
    // get list by filter

  getListByFilter(_store , payload) {
    return api.getListByFilter(payload);
  },
  // get list of groupBy
  getGroupByValue(_store , payload) {
    return api.getGroupByValue(payload);
  },
  // create main group
  createMainGroup(_store, data) {
    return api.createMainGroup(data);
  },
  // create customer
  createCustomer(_store, data) {
    return api.createCustomer(data);
  },
  // update customer
  updateCustomer(_store, data) {
    return api.updateCustomer(data);
  },
  // delete customer
  deleteCustomer(_store, id) {
    return api.deleteCustomer(id);
  },
  // duplicateData(_store, data) {
  //   return api.duplicateItem(data);
  // },
};

export default actions;
