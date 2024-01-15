import api from "../services/api";

const actions = {
  getGroups(_store) {
    return api.getGroups();
  },
  getMainVendorList(_store) {
    return api.getMainVendorList();
  },
  deleteVendor(_store, id) {
    return api.deleteVendor(id);
  },
  getUserListing(_store, id) {
    return api.getUserListing(id);
  },
  createMainGroup(_store, data) {
    return api.createMainGroup(data);
  },
  duplicateData(_store, data) {
    return api.duplicateItem(data);
  },
};

export default actions;
