import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './plugins/lang'
import Vuei18n from 'vue-i18n'

import './plugins/element.js'
import './plugins/axios.js'
import 'assets/css/base.css'
import store from './store'

declare global { interface Window { vm: Vue; }}

Vue.use(Vuei18n)
Vue.config.productionTip = false

const vm = new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')

window.vm = vm;
