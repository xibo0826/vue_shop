<template>
  <div>
    <el-tooltip
      content="编辑"
      placement="top"
      :enterable="false"
    >
      <el-button
        icon="el-icon-edit"
        type="primary"
        circle
        size="mini"
        @click="edit"
      ></el-button>
    </el-tooltip>
    <el-tooltip
      content="删除"
      placement="top"
      :enterable="false"
    >
      <el-button
        icon="el-icon-delete"
        type="danger"
        circle
        size="mini"
        @click="remove"
      ></el-button>
    </el-tooltip>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: {
    scope: Object,
  },
  data() {
    return {}
  },
  methods: {
    edit() {
      this.$emit('editClick', this.scope)
    },
    async remove() {
      await this.$messagebox.confirm('删除操作, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
      this.$emit('deleteClick', this.scope)
    },
  },
}
</script>
<style>
</style>
