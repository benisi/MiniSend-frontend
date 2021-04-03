import api_service from "../../api_service";
import router from "@/router";
import { eventBus } from "@/eventBus";

const state = {
  user: JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("token"),
};

const getters = {
  getUser(state) {
    return state.user;
  },
  getToken(state) {
    return state.token;
  },
};

const actions = {
  clearState(context) {
    context.commit("setUser", null);
    context.commit("setToken", null);
  },
  login(context, { email, password }) {
    const url = "/login";
    return api_service
      .send(url, "post", {
        email,
        password,
      })
      .then((response) => {
        const data = response.data.data;
        context.commit("setUser", data.user);
        context.commit("setToken", data.token);

        return response;
      })
      .catch(() => {});
  },
  register(context, { email, password, password_confirmation, name }) {
    const url = "/register";
    return api_service
      .send(url, "post", {
        email,
        password,
        password_confirmation,
        name,
      })
      .then((response) => {
        const data = response.data.data;
        context.commit("setUser", data.user);
        context.commit("setToken", data.token);

        return response;
      })
      .catch(() => {});
  },
  logout(context) {
    const currentRoute = router.currentRoute.path;
    router.push(`/login?redirect=${currentRoute}`);
  },
};

const mutations = {
  setUser(state, user) {
    state.user = user;
    localStorage.setItem("user", JSON.stringify(user));
    if (!user) {
      localStorage.removeItem("user");
    }
  },
  setToken(state, token) {
    state.token = token;
    localStorage.setItem("token", token);
    if (!token) {
      localStorage.removeItem("token");
    }
  },
};
eventBus.$on("user-before-logout", (context) => {
  context.dispatch("clearState");
});
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
