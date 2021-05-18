<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div class="button-area">
        <el-button
          type="primary"
          @click="newRole"
          icon="el-icon-circle-plus-outline"
          size="mini"
          plain
        >新建</el-button>
      </div>
      <div class="table-area">
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      roleForm: {
        searchResult: {
          roles: [],
        },
      },
    }
  },
  created() {},
  methods: {},
}
</script>
<style>
</style>
