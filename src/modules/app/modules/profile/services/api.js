import { api } from "src/boot/axios";
const dashboardModule = "/api/Authentication";
import { LocalStorage } from "quasar";

const user_id = LocalStorage.getItem("user-id");
// '2b559266-ba30-433c-aa4b-239f74db7f1f'
export default {
  get: (payload) => api.get(`${dashboardModule}/GetUserProfile`,{params: {userID: `${payload.id}`}}),
  update: (data) => api.post(`${dashboardModule}/SaveUserProfileSettings`, data),
  getContrycode: (id) => api.get(`/api/Organization/GetCountryCode/${id}`),
};
