import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './plugins/axios.js'

import 'assets/css/base.css'

declare global { interface Window { vm: Vue; }}

Vue.config.productionTip = false

const vm = new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

window.vm = vm;
