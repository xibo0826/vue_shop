import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    locale: 'zh'
  },
  mutations: {
    setUserName(state, uname) {
      state.userName = uname
    },
    setLocale(state, locale) {
      state.locale = locale
    }
  },
  getters: {
  },
  actions: {
  },
  modules: {
  },
  plugins: [createPersistedState({
    storage: window.sessionStorage
   })]
})
