import { boot } from "quasar/wrappers";
// import { api } from "src/boot/axios";
import axios from "axios";
import qs from "qs";
import { API_BASE_URL } from "src/configs/api";
import Storage from "src/services/storage";
import { Store } from "src/store";
import { LocalStorage } from "quasar";
import { APP_SETTINGS_KEY } from "configs/storage";
import { Router } from "src/router";
// import Storage from "src/services/storage";
// const $q = useQuasar();
let defaultLang =  LocalStorage.getItem("defLanguage");
const api = axios.create({
  // Base
  baseURL: API_BASE_URL,

  // Format all query paras
  paramsSerializer: (params) =>
    qs.stringify(params, {
      arrayFormat: "repeat",
      skipNulls: true,
      allowDots: true,
    }),
});

export default boot(({ app ,router , urlPath }) => {
  api.interceptors.request.use((request) => {
    const token = Storage.getSetting("token");
    const key = APP_SETTINGS_KEY;

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    if (defaultLang) {
      request.headers.languageid = defaultLang;
    }

    const setting = LocalStorage.getItem(key);
    if (setting.profile) {
    request.headers.companyId = setting.profile.companyId
    }
    return request;
  });

  api.interceptors.response.use(
    (response) => {
      if(response.data.errorMessage) {
        return Promise.reject(response)
      }
      return response
    },
    (error) => {
      const status = error?.response?.status;

      if (status === 401 || status === 403) {
        Store.dispatch("AuthModule/logout", true);
      }

      return Promise.reject(error);
    }
  );

  // app.config.globalProperties.$axios = axios;
  app.config.globalProperties.$api = api;
  //
  Router.beforeEach(() =>{
    const token = Storage.getSetting("token");
    if (token){
      // urlPath
      const setting = LocalStorage.getItem(APP_SETTINGS_KEY);
      var currentdate = new Date();
      var datetime =  currentdate.getFullYear() + "-"
                    + (currentdate.getMonth()+1)+ "-"
                    + currentdate.getDate() + " "
                    + currentdate.getHours() + ":"
                    + currentdate.getMinutes()
                    // + currentdate.getSeconds();
      const payload = {
        companyId:setting.profile.companyId,
        vistIn:`${datetime}`,
        pageName:urlPath,
        urlPage:urlPath
      }
      const callRecents = async () =>{
        api.post("api/Recents/Create", payload )
      }

        return callRecents()
      }
  })


  // console.log(urlPath);
  // console.log(Router.currentRoute._rawValue);
  // currentRoute.value
});

export { api };
