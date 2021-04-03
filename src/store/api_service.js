import axios from "axios";
import _ from "lodash";
import store from ".";
import Vue from "vue";
import { eventBus } from "@/eventBus";

const api = (endpoint, requestType, requestData, params) => {
  service.sent = false;

  requestType = requestType.toLowerCase();
  const axiosConfig = {
    url: endpoint,
    method: requestType,
    baseURL: process.env.VUE_APP_API_HOST,
    data: requestData,
  };
  let token = localStorage.getItem("token");
  if (token) {
    axiosConfig["headers"] = {
      Authorization: "Bearer " + token,
    };
  }
  return processRequest(axiosConfig, params)
    .then((response) => {
      return processResponse(response);
    })
    .catch((err) => {
      eventBus.$emit("hide-loader");
      if (!err.response) {
        Vue.notify({
          group: "notification",
          type: "error",
          text:
            "Connection to server could not be established. Please try again",
        });
      }
      logoutOnTokenExpiration(err);
      throw err;
    });
};
const processRequest = (config, params = null) => {
  if (params !== null) {
    _.each(params, (value, key) => {
      config[key] = value;
    });
  }
  return axios(config);
};

const processResponse = (response) => {
  const headers = response.headers;
  const token = getAuthorizationToken(headers);
  if (token) {
    store.commit("auth/setToken", token);
  }
  return response;
};

const logoutOnTokenExpiration = (err) => {
  const response = err.response;
  let message = response.data.message;
  if (
    message.indexOf("Token has expired") > -1 ||
    message.indexOf("Could not decode token") > -1 ||
    message.indexOf("The token has been blacklisted") > -1
  ) {
    if (service.sent === true) {
      return;
    }
    Vue.notify({
      group: "notification",
      type: "error",
      text: "Session expired. Please log in again",
    });
    service.sent = true;
    store.dispatch("auth/logout");
  } else {
    if (response.data.errors) {
      const messageArrays = Object.values(response.data.errors);
      messageArrays.forEach((messageArray) => {
        messageArray.forEach((message) => {
          Vue.notify({
            group: "notification",
            type: "error",
            text: message,
          });
        });
      });
    } else {
      Vue.notify({
        group: "notification",
        type: "error",
        text: message,
      });
    }
  }
};

const service = (function () {
  let apiService;

  function initialize() {
    apiService = {
      sent: false,
      send: api,
    };
  }

  if (!apiService) {
    initialize();
  }
  return apiService;
})();

const getAuthorizationToken = (headers) => {
  const authorization = headers.authorization;
  if (!authorization) return null;

  const tokens = authorization.split(" ");
  if (tokens.length < 2 || tokens[0] != "Bearer") {
    return null;
  }
  return tokens[1];
};

export default service;
