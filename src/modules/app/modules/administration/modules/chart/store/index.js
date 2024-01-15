import state from "./state";
import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

import chartsAccounts from "../pages/charts-accounts/store";
import chartsItems from "../pages/charts-items/store"
import chartsProperty from "src/modules/app/modules/property/pages/charts-property/store/index"
import chartsCustomer from "../pages/customer/store"
import chartsVendor from "../pages/vendor/store"

const module = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,

  modules: {
    MainPage: chartsAccounts,
    ChartItem: chartsItems,
    chartsProperty,
    chartsCustomer,
    chartsVendor,
  }
};

export default module;
