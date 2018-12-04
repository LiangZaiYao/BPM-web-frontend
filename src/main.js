import Vue from "vue";
import App from "./App";
import router from "./router/index";
import APIUtil from "./services/APIUtil";
import axios from 'axios';
import VueAxios from "Vue-axios";

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
Vue.use(BlackDashboard);
Vue.use(VueAxios, axios);

APIUtil.init()

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
