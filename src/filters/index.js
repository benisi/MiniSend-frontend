import firstLetterToUpper from "./firstLetterToUpper";

export default {
  install(Vue) {
    Vue.filter("firstLetterToUpper", firstLetterToUpper);
  },
};
