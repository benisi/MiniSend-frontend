import api_service from "../../api_service";
import { objToQueryString } from "../../helpers";

const state = {
  mails: [],
  batch: [],
  pagination: {},
  singleMail: null,
};

const getters = {
  get: (state) => state.mails,
  getBatch: (state) => state.batch,
  pagination: (state) => state.pagination,
  getSingle: (state) => state.singleMail,
};

const mutations = {
  setMails(state, payload) {
    state.mails = payload;
  },
  setPagination(state, filters) {
    state.pagination = filters;
  },
  setSingleMail(state, paylaod) {
    state.singleMail = paylaod;
  },
  setBatch(state, payload) {
    state.batch = payload;
  },
};

const actions = {
  fetchList(context, data = {}) {
    data = {
      filters: {
        ...data.filters,
      },
      sort: {
        ...data.sort,
      },
      page: data.page,
      page_size: data.page_size,
      search: data.search,
    };

    const queryString = objToQueryString(data);
    const url = `v1/email${queryString}`;
    return api_service
      .send(url, "get")
      .then((response) => {
        const { mail, total, page } = response.data.data;
        context.commit("setMails", mail);
        context.commit("setPagination", {
          page,
          total,
        });
        return response;
      })
      .catch(() => {});
  },
  fetchBatchList(context, data = {}) {
    data = {
      filters: {
        ...data.filters,
      },
      sort: {
        ...data.sort,
      },
      page: data.page,
      page_size: data.page_size,
      search: data.search,
    };

    const queryString = objToQueryString(data);
    const url = `v1/batch${queryString}`;
    return api_service
      .send(url, "get")
      .then((response) => {
        const { batch, total, page } = response.data.data;
        context.commit("setBatch", batch);
        context.commit("setPagination", {
          page,
          total,
        });
        return response;
      })
      .catch(() => {});
  },
  fetchSingle(context, id = null) {
    const url = `v1/email/${id}`;
    return api_service.send(url, "get").then((response) => {
      context.commit("setSingleMail", response.data.data);
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
