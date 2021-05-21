<template>
  <el-dropdown @command="changeLang">
    <span class="el-dropdown-link">
      {{ $t("lang.changeLanguage") }}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item command="zh-CN">中文</el-dropdown-item>
      <el-dropdown-item command="en">English</el-dropdown-item>
      <el-dropdown-item command="ja">日本語</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>
<script>

import { localeZhcn } from 'element-ui/lib/locale/lang/zh-CN'
import { localeEn } from 'element-ui/lib/locale/lang/en'
import { localeJa } from 'element-ui/lib/locale/lang/ja'
import locale from 'element-ui/lib/locale'

export default {
  data() {
    return {}
  },
  methods: {
    changeLang(command) {
      this.$i18n.locale = command
      localStorage.setItem('lang', command)
      this.$store.commit('setLocale', command)
      switch (command) {
        case 'zh-CN':
          locale.use(localeZhcn)
          break
        case 'en':
          locale.use(localeEn)
          break
        case 'ja':
          locale.use(localeJa)
          break
        default:
          locale.use(localeZhcn)
          break
      }
    },
  },
}
</script>
<style scoped>
.el-dropdown:hover {
  cursor: pointer;
}
</style>
