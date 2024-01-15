import { api } from "src/boot/axios";

export default {
  getGroups() {
    return api.get("api/Item/GetMainGroupsList");
  },
  getMainVendorList() {
    return api.get("api/Vendor/GetList");
  },
  deleteVendor(data) {
    return api.delete(`api/Vendor/DeleteVendor?Id=${data.id}`);
  },
  getUserListing(id) {
    return api.get("api/Item/GetListByMainGroup" + '/' + id);
  },
  createMainGroup(data) {
    return api.post("api/Item/CreateMainGroup", data);
  },
  duplicateItem(data) {
    return api.post("api/Item/Duplicate", data);
  },
};
