import { api } from "src/boot/axios";

export default {
  getGroups() {
    return api.get("api/Item/GetMainGroupsList");
  },
  getUserListing(id) {
    return api.get("api/Item/GetListByMainGroup"+'/'+id);
  },
  createMainGroup(data) {
    return api.post("api/Item/CreateMainGroup", data);
  },
  duplicateItem(data) {
    return api.post("api/Item/Duplicate", data);
  },
};
