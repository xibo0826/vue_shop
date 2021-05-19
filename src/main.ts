import Vue from 'vue'
import App from './App.vue'
import router from './router'
import i18n from './plugins/lang'
import Vuei18n from 'vue-i18n'

import './plugins/element.js'
import './plugins/axios.js'
import 'assets/css/base.css'

declare global { interface Window { vm: Vue; }}

Vue.use(Vuei18n)
Vue.config.productionTip = false

// const i18n = new Vuei18n({
//   locale: 'zh',
//   messages: {
//       zh: require("lang/language-zh.ts"),
//       ja: require("lang/language-ja.ts"),
//       en: require("lang/language-en.ts"),
//   }
// })

const vm = new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')

window.vm = vm;
