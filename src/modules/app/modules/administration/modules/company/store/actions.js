// import api from "../services/mocked-api";
import { API_BASE_URL } from "src/configs/api";
import api from "../services/api";

const actions = {
  async getCompanies(_store) {
    const { data } = await api.getCompanies();

    return {
      data: {
        items: data.value.map((item) => ({
          ...item,
          ...(item.companyLogo && {
            companyLogo: `${API_BASE_URL}/${item.companyLogo}`
          })
        }))
      }
    };
  },
  async getCompany(_store, id) {
    const res = await api.getCompany(id);
    const { value } = res.data;

    if (value.imageUrl) {
      value.imageUrl = `${API_BASE_URL}/${value.imageUrl}`;
    }

    return res;
  },
  async updateCompany(context, data) {
    await api.updateCompany(data);
    await context.dispatch("AppModule/AdministrationModule/ChartsModule/chartsProperty/getCompanyList" ,{}, { root: true });
  },
  async createCompany(context, data) {
    await api.createCompany(data);
    // await _store.dispatch("chooseCompanyList");
    await context.dispatch("AppModule/AdministrationModule/ChartsModule/chartsProperty/getCompanyList" ,{}, { root: true });
  },
  async deleteCompany(context, id) {
    await api.deleteCompany(id);
    // await _store.dispatch("chooseCompanyList");
    await context.dispatch("AppModule/AdministrationModule/ChartsModule/chartsProperty/getCompanyList",{}, { root: true });
  },

  async chooseCompanyList(context) {
    const response = await api.getCompanies();
    const list = await response.data.value;
    context.commit("showCompanyList", list);
    // await _store.dispatch("AppModule/AdministrationModule/ChartsModule/chartsProperty/getCompanyList");
  }
};

export default actions;
