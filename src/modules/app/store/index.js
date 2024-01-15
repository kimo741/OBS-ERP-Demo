import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

import DashboardModule from "../modules/dashboard/store";
import AdministrationModule from "../modules/administration/store";
import ProfileModule from "../modules/profile/store";
import PropertyModule from "../modules/property/store";

const module = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,

  modules: {
    DashboardModule,
    AdministrationModule,
    ProfileModule,
    PropertyModule,
  },
};

export default module;
