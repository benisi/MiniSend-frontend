import Vue from "vue";
import Vuex from "vuex";
import auth from "./modules/auth";
import mails from "./modules/mails";
import dashboard from "./modules/dashboard";
import token from "./modules/token";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    mails,
    dashboard,
    token,
  },
});
