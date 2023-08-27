import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import router from "./router";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.prototype.axios = axios
Vue.use(ElementUI)
axios.defaults.baseURL = "http://localhost:221";
new Vue({
  router,
  axios,
  render: (h) => h(App),
}).$mount("#app");
