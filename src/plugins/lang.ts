import Vue from 'vue'
import Vuei18n from 'vue-i18n'

Vue.use(Vuei18n)

const i18n = new Vuei18n({
    locale: 'zh',
    messages: {
        zh: require("lang/language-zh.ts"),
        ja: require("lang/language-ja.ts"),
        en: require("lang/language-en.ts"),
    }
})

export default i18n