<template>
  <div>
    <el-dialog
      :title="isNew ? '添加' : '修改'"
      :visible="isVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @open="initView"
      @opened="initValue"
    >
      <el-form
        :model="role"
        ref="upsetRoleFormRef"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item
          prop="roleName"
          label="角色名称"
        >
          <el-input
            v-model="role.roleName"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="roleDesc"
          label="角色描述"
        >
          <el-input
            v-model="role.roleDesc"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn_area_right">
          <el-button
            type="primary"
            @click="upsertRole"
          >保存</el-button>
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
    id: Number,
    isVisible: Boolean,
    search: Function,
  },
  data() {
    return {
      isUpdatedFlg: false,
      role: {
        roleName: '',
        roleDesc: '',
      },
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { max: 80, message: '用户名的长度在80个字符以内', trigger: 'blur' },
        ],
        roleDesc: [
          {
            max: 100,
            message: '角色描述长度在120个字符之内',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  computed: {
    isNew: function () {
      return this.id === -1
    },
  },
  watch: {
    'role.roleName'(value, oldValue) {
      if (oldValue !== value) {
        this.isUpdatedFlg = true
      }
    },
    'role.roleDesc'(value, oldValue) {
      if (oldValue !== value) {
        this.isUpdatedFlg = true
      }
    },
  },
  methods: {
    // 获取信息
    async initView() {
      if (!this.isNew) {
        const { data: result } = await this.$http.get(`roles/${this.id}`)
        Object.assign(this.role, result.data)
      }
    },
    initValue() {
      this.isUpdatedFlg = false
    },
    // 保存
    upsertRole() {
      this.$refs.upsetRoleFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error('请先修改页面提示的错误!', true)
          return
        }

        await this.$messagebox.confirm('保存角色, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'infor',
        })

        if (this.isNew) {
          await this.$http.post('roles', this.role)
        } else {
          await this.$http.put(`roles/${this.id}`, this.role)
        }
        this.$message.success('保存成功!', true)

        this.$refs.upsetRoleFormRef.resetFields()
        this.isUpdatedFlg = false

        this.$emit('update:isVisible', false)
        this.search()
      })
    },

    // 取消
    async cancel() {
      if (this.isUpdatedFlg) {
        try {
          await this.$messagebox.confirm('放弃画面上的所有修改?', '警告', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
        } catch {
          return
        }
      }
      this.$refs.upsetRoleFormRef.resetFields()
      this.isUpdatedFlg = false

      this.$emit('update:isVisible', false)
    },
  },
}
</script>
<style>
</style>
