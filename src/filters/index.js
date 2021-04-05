import firstLetterToUpper from "./firstLetterToUpper";
import seperateThousandByComma from "./seperateThousandByComma";
import dateTimeFilter from "./dateTimeFilter";

export default {
  install(Vue) {
    Vue.filter("firstLetterToUpper", firstLetterToUpper);
    Vue.filter("seperateThousandByComma", seperateThousandByComma);
    Vue.filter("dateTimeFilter", dateTimeFilter);
  },
};
