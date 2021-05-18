<template>
  <div>
    <el-dialog
      :title="isNew ? '新建用户' : '修改用户信息'"
      :visible="isVisible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      @open="initView"
      @opened="initValue"
    >
      <el-form
        :model="user"
        ref="upsetUserFormRef"
        label-width="80px"
        :rules="rules"
      >
        <el-form-item
          prop="username"
          label="用户名"
        >
          <el-input
            v-model="user.username"
            :disabled="!isNew"
            @keyup.enter.native="addUser"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="password"
          label="密码"
          v-if="isNew"
        >
          <el-input
            v-model="user.password"
            @keyup.enter.native="addUser"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="checkPassword"
          label="重复密码"
          v-if="isNew"
        >
          <el-input
            v-model="user.checkPassword"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="邮箱"
        >
          <el-input
            v-model="user.email"
            @keyup.enter.native="addUser"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="mobile"
          label="电话"
        >
          <el-input
            v-model="user.mobile"
            @keyup.enter.native="addUser"
          ></el-input>
        </el-form-item>
        <el-form-item class="btn_area_right">
          <el-button
            type="primary"
            @click="upsertUser"
          >登录</el-button>
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
      user: {
        username: '',
        password: '',
        checkPassword: '',
        email: '',
        mobile: '',
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { max: 20, message: '用户名的长度在20个字符以内', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '密码长度在6~16个字符',
            trigger: 'blur',
          },
        ],
        checkPassword: [
          { required: true, message: '请输入重复密码', trigger: 'blur' },
          {
            min: 6,
            max: 16,
            message: '密码长度在6~16个字符',
            trigger: 'blur',
          },
          { validator: this.validSamePass, trigger: 'blur' },
        ],
        email: [
          {
            max: 50,
            message: '邮箱长度在50个字符之内',
            trigger: 'blur',
          },
          { validator: this.validEmail, trigger: 'blur' },
        ],
        mobile: [
          {
            max: 15,
            message: '手机长度在15个字符之内',
            trigger: 'blur',
          },
          { validator: this.validMobile, trigger: 'blur' },
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
    'user.username'(value, oldValue) {
      if (oldValue !== value) {
        this.isUpdatedFlg = true
      }
    },
    'user.password'(value, oldValue) {
      if (oldValue !== value) {
        this.isUpdatedFlg = true
      }
    },
    'user.email'(value, oldValue) {
      if (oldValue !== value) {
        this.isUpdatedFlg = true
      }
    },
    'user.mobile'(value, oldValue) {
      if (oldValue !== value) {
        this.isUpdatedFlg = true
      }
    },
  },
  methods: {
    // 获取用户信息
    async initView() {
      if (!this.isNew) {
        const { data: result } = await this.$http.get(
          `users/${this.id}`,
          this.user
        )
        Object.assign(this.user, result.data)
      }
    },
    initValue() {
      this.isUpdatedFlg = false
    },
    // 保存
    upsertUser() {
      this.$refs.upsetUserFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error('请先修改页面提示的错误!', true)
          return
        }

        await this.$messagebox.confirm('保存用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'infor',
        })

        if (this.isNew) {
          await this.$http.post('users', this.user)
        } else {
          await this.$http.put(`users/${this.id}`, this.user)
        }
        this.$message.success('保存成功!', true)

        this.$refs.upsetUserFormRef.resetFields()
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
      this.$refs.upsetUserFormRef.resetFields()
      this.isUpdatedFlg = false

      this.$emit('update:isVisible', false)
    },

    // 自定义check(password)
    validSamePass(rule, value, callback) {
      if (value !== this.user.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    // 自定义check(Email)
    validEmail(rule, value, callback) {
      if (value === '') {
        callback(); 
      }
      let reg = /^[0-9a-zA-Z_.-]+[@][0-9a-zA-Z_.-]+([.][a-zA-Z]+){1,2}$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error('邮箱格式不正确!'))
      }
    },
    // 自定义check(mobile)
    validMobile(rule, value, callback) {
      if (value === '') {
        callback(); 
      }
      let reg = /^[0-9]+$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error('手机格式不正确!'))
      }
    },
  },
}
</script>
<style>
</style>
