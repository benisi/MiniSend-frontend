import api_service from "../../api_service";

const state = {
  mail: {},
};

const getters = {
  index: (state) => state.mail,
};

const mutations = {
  setMail(state, payload) {
    state.mail = payload;
  }
};

const actions = {
  index(context) {
    const url = `v1/dashboard`;
    return api_service.send(url, "get").then((response) => {
      context.commit("setMail", response.data.data.mail);
      return response;
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
