<template>
  <div>
    <el-dialog
      title="分配角色"
      :visible="isVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @open="initView"
    >
      <el-form
        ref="userRoleFormRef"
        label-width="120px"
        :model="userRoleForm"
      >
        <el-form-item label="当前用户">
          {{ initData.userName }}
        </el-form-item>
        <el-form-item label="当前角色">
          {{ initData.oldRole }}
        </el-form-item>
        <el-form-item label="分配新角色" prop="roleId">
          <el-select
            v-model="userRoleForm.rid"
            placeholder="请选择"
          >
            <el-option
              v-for="role in roles"
              :key="role.id"
              :label="role.roleName"
              :value="role.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btn_area_right">
          <el-button
            type="primary"
            @click="assignRole"
          >确定</el-button>
          <el-button
            type="info"
            @click="cancel"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: {
    user: Object,
    isVisible: Boolean,
    search: Function,
    roles: Array,
  },
  data() {
    return {
      userRoleForm: {
        rid: '',
      },
    }
  },
  computed: {
    initData: function () {
      let init = {
        userId: 0,
        userName: '',
        oldRole: '',
      }

      if (this.user !== null) {
        init.userId = this.user.id
        init.userName = this.user.username
        init.oldRole = this.user.role_name
      }
      
      return init
    },
  },

  methods: {
    initView() {
      this.userRoleForm.rid = ''
    },
    async assignRole() {
      await this.$messagebox.confirm('分配权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'infor',
      })
      await this.$http.put(`users/${this.initData.userId}/role`, this.userRoleForm)
      this.$message.success('分配权限成功!');
      this.$emit('update:isVisible', false)
      this.search()
    },
    cancel() {
      this.$refs.userRoleFormRef.resetFields()
      this.$emit('update:isVisible', false)
    },
  },
}
</script>
<style>
</style>
