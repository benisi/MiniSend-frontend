import firstLetterToUpper from "./firstLetterToUpper";
import seperateThousandByComma from "./seperateThousandByComma";

export default {
  install(Vue) {
    Vue.filter("firstLetterToUpper", firstLetterToUpper);
    Vue.filter("seperateThousandByComma", seperateThousandByComma);
  },
};
