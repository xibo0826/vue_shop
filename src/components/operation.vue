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
    rowData,
  },
  data() {
    return {}
  },
  methods: {
    edit() {
      this.$emit('editClick', this.rowData)
    },
    remove() {
      this.$emit('deleteClick', this.rowData)
    },
  },
}
</script>
<style>
</style>
