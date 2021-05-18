<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
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
}
</script>
<style>
</style>
