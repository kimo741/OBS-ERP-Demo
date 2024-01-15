import { api } from "src/boot/axios";

const actions = {
  async getLaguages() {
    return api.get("api/Languages/GetAll");
  },
  // to do tasks
  async getNotes() {
    return api.get("api/ToDoTasks/GetList");
  },
  async createToDoTasks(_store, payload) {
    return api.post("api/ToDoTasks/Create", payload);
  },
  async updateToDoTasks(_store, payload) {
    return api.put("api/ToDoTasks/Update", payload);
  },
  async deleteToDoTasks(_store, id) {
    return api.delete(`api/ToDoTasks/Delete/${id}`);
  },
  // favorits
  async getFavorits(_store, companyId) {
    console.log(companyId);
    return api.get(`api/Favorites/GetAll/${companyId}`);
  },
  async createFavorits(_store, payload) {
    return api.post(`api/Favorites/Create`, payload);
  },
  async deleteFavorits(_store, id) {
    return api.delete(`api/Favorites/Delete/${id}`);
  },
  async getResentsList(_store) {
    return api.get(`api/Recents/GetList`);
  },
  async getLinks(_store, companyId) {
    console.log(companyId);
    return api.get(`api/SiteLinks/GetList`);
  },
  async createSiteLink(_store, payload) {
    return api.post(`api/SiteLinks/Create`, payload);
  },
  async deleteSiteLink(_store, id) {
    return api.delete(`api/SiteLinks/Delete/${id}`);
  },
  // async getResentsList(_store ){
  //   return api.get(`api/Recents/GetList`);
  // }
  async createContact(_store, payload) {
    return api.post(`api/Contacts/Create`, payload);
  },
  async getContactList(_store, payload) {
    return api.get(`api/Contacts/GetList`);
  },
  async deleteContact(_store, id) {
    return api.delete(`/api/Contacts/Delete`, { params: { Ids: id } });
  },
  async updateContactList(_store, payload) {
    console.log(payload);
    return api.put(`api/Contacts/Update`, payload);
  },
  async searchInContactList(_store, payload) {
    return api.get(`/api/Contacts/Search/${payload}`);
  },
  async contactDropDown(_store) {
    return api.get(`/api/LookUps/GetDropDownListContacts`);
  },
  async importContact(_store, file) {
    return api.post(`/api/Contacts/Import`, file);
  },
  async exportContact(_store, file) {
    return api.get(`api/Contacts/Export`);
  },
  async contactCheckErrors(_store, file) {
    return api.post(`api/Contacts/CheckErrors`, file);
  },
};
export default actions;
