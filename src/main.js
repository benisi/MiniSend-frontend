import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import BootstrapVue from "bootstrap-vue";
import Notifications from "vue-notification";
import { library } from "@fortawesome/fontawesome-svg-core";
import filters from "./filters";

Vue.use(BootstrapVue);
Vue.use(Notifications);
Vue.use(filters);

import {
  faEnvelope,
  faChevronUp,
  faChevronDown,
  faSuitcase,
  faPowerOff,
  faSignOutAlt,
  faAlignRight,
  faAlignLeft,
  faKey,
  faThLarge,
  faCircle,
  faPaperclip
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

Vue.component("font-awesome-icon", FontAwesomeIcon);
library.add(
  faKey,
  faEnvelope,
  faChevronDown,
  faChevronUp,
  faSuitcase,
  faPowerOff,
  faSignOutAlt,
  faAlignRight,
  faAlignLeft,
  faThLarge,
  faCircle,
  faPaperclip
);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
