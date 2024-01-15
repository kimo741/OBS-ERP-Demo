import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

// import organizationModule from "../modules/organization/store";
// import SettingsModule from "../modules/settings/store";
// import ChartsModule from "../modules/chart/store";
// import CompanyModule from "../modules/company/store";
import projects from "../pages/projects/store/";

const module = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  modules: {
    // organizationModule,
    // SettingsModule,
    // ChartsModule,
    // CompanyModule,
    // UsersModule
    projects,
  }
};

export default module;
