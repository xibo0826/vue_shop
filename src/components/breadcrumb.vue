<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{ $route.meta.menu }}</el-breadcrumb-item>
    <el-breadcrumb-item>{{ $route.meta.title }}</el-breadcrumb-item>
  </el-breadcrumb>
</template>
<script>
export default {
  data() {
    return {}
  },
}
</script>
<style>
</style>
