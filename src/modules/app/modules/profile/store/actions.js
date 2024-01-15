import api from "../services/api";

const actions = {
  async get({ commit, dispatch } , id) {
    try {
      console.log(id);
      const response = await api.get(id);
      const profile = response.data.data;

      commit("setProfile", profile);

      // const { value: theme } = profile.profileSettings;

      // if (theme) {
      //   dispatch("applySettings", theme, { root: true });
      // }

      return Promise.resolve(profile);
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async update({ commit , dispatch }, data) {
    try {
      await api.update(data);

      commit("updateProfile", data);
      await dispatch("AppModule/ProfileModule/get", {}, { root: true });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  },
  async getContrycode({ commit , dispatch }, data) {
    try {
      return api.getContrycode(data);
    } catch (error) {
      return Promise.reject(error);
    }
  },
};
export default actions;
