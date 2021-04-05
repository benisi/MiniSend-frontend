import api_service from "../../api_service";

const state = {
  tokens: [],
};

const getters = {
  get: (state) => state.tokens,
};

const mutations = {
  setTokens(state, payload) {
    state.tokens = payload;
  },
};

const actions = {
  fetch(context) {
    const url = `v1/token`;
    return api_service
      .send(url, "get")
      .then((response) => {
        const { token } = response.data.data;
        context.commit("setTokens", token);
        return response;
      })
      .catch(() => {});
  },
  create(context, payload) {
    const url = `v1/token`;
    return api_service
      .send(url, "post", payload)
      .then((response) => {
        return response;
      })
      .catch(() => {});
  },
  delete(context, id) {
    const url = `v1/token`;
    return api_service
      .send(`${url}/${id}`, "delete")
      .then((response) => {
        return response;
      })
      .catch(() => {});
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
