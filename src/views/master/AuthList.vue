<template>
  <div class="container">
    <breadcrumbNav></breadcrumbNav>
    <el-card class="content">
      <el-tree
        ref="authTree"
        :data="initData.authData"
        node-key="id"
        :props="{label: 'authName'}"
        check-on-click-node
        highlight-current
      ></el-tree>
    </el-card>
  </div>
</template>
<script>
import breadcrumbNav from 'components/breadcrumb.vue'
export default {
  data() {
    return {
      initData: {
        authData: [],
      },
    }
  },
  created() {
    this.initView()
  },
  methods: {
    async initView() {
      const { data: auth } = await this.$http.get('rights/tree')
      this.initData.authData = auth.data
    },
  },
  components: {
    breadcrumbNav
  }
}
</script>
<style>
</style>
