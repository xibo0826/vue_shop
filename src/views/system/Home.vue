<template>
  <div class="container">
    <el-container>
      <el-header>
        <div>
          <img
            src="~assets/images/logo.png"
            alt=""
            class="logo"
          />
          <h1 class="title">{{ $t("lang.systemName") }}</h1>
        </div>
        <div>
          <span class="user">{{ $t("lang.welcome") }}: 王小虎</span>
          <el-dropdown @command="changeLang">
            <span class="el-dropdown-link">
              {{ $t("lang.changeLanguage") }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="zh">中文</el-dropdown-item>
              <el-dropdown-item command="en">English</el-dropdown-item>
              <el-dropdown-item command="ja">日本語</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <a
            href="#"
            @click.stop=""
            class="el-dropdown-link"
          >{{ $t("lang.logout") }}</a>
        </div>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '63px' : '200px'">
          <div
            class="toggle-button"
            @click="toggleMenu"
          >
            <i :class="isCollapse ? 'el-icon-arrow-right' : 'el-icon-arrow-left'"></i>
          </div>
          <el-menu
            :background-color="isCollapse ? '#5E8396' : 'transparent'"
            text-color="#fff"
            active-text-color="#409EFF"
            :default-active="activeMenuItem"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
            unique-opened
          >
            <el-submenu
              v-for="(menu) in menuList"
              :index="menu.path"
              :key="menu.id"
            >
              <template slot="title">
                <i :class="menuIconList[menu.id]"></i>
                <span slot="title">{{ menu.authName }}</span>
              </template>
              <el-menu-item
                v-for="subMenu in menu.children"
                :index="subMenu.path"
                :key="subMenu.id"
              >
                <i class="el-icon-menu"></i>{{ subMenu.authName }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view> </router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { localeZhcn } from 'element-ui/lib/locale/lang/zh-CN'
import { localeEn } from 'element-ui/lib/locale/lang/en'
import { localeJa } from 'element-ui/lib/locale/lang/ja'
import locale from 'element-ui/lib/locale'

export default {
  created() {
    this.getMenuList()
  },
  data() {
    return {
      menuList: [],
      menuIconList: {
        125: 'el-icon-user',
        103: 'el-icon-s-grid',
        101: 'el-icon-s-cooperation',
        102: 'el-icon-s-order',
        145: 'el-icon-s-data',
      },
      isCollapse: false,
    }
  },
  methods: {
    // 登出
    logout() {
      sessionStorage.clear()
      this.$router.push('/login')
    },

    // 语言切换
    changeLang(command) {
      this.$i18n.locale = command
      switch (command) {
        case 'zh':
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
      if (command === 'logout') {
        // 登出
        sessionStorage.clear()
        this.$router.push('/login')
      }
    },

    // 获取菜单数据
    async getMenuList() {
      const { data } = await this.$http.get('menus')
      this.menuList = data.data
    },

    // 隐藏显示菜单
    toggleMenu() {
      this.isCollapse = !this.isCollapse
    },
  },
  computed: {
    activeMenuItem: function () {
      return this.$route.path.substring(1)
    },
  },
}
</script>
<style lang="less" scoped>
.container {
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-header {
  display: flex;
  padding-left: 0;
  justify-content: space-between;
  align-items: center;
  line-height: 60px;
  background: -webkit-linear-gradient(left, #545c64, #70cff5);
  color: #fff;
  .logo {
    height: 50px;
    vertical-align: middle;
  }

  .title {
    display: inline-block;
    padding-left: 10px;
    color: #fff;
    letter-spacing: 3px;
  }

  .el-icon-setting {
    margin-right: 15px;
    color: #fff;
    cursor: pointer;
  }

  .el-dropdown-link {
    margin: 0 10px;
    cursor: pointer;
    color: #444;
    font-size: 14px;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }

  .user {
    margin: 0 100px;
    color: #444;
    font-size: 14px;
  }
}

.el-aside {
  overflow: hidden;
  background: -webkit-linear-gradient(top, #545c64, #70cff5);
  transition: 0.3s;

  .toggle-button {
    height: 30px;
    padding-right: 20px;
    line-height: 30px;
    color: #fff;
    background: #6ec6ea;
    text-align: right;
  }

  .toggle-button:hover {
    cursor: pointer;
  }
}

.el-menu {
  border-right: solid 1px #545c64;
}

.el-menu-item:hover {
  color: #333 !important;
  background-color: #70cff5 !important;
}
</style>
  