<template>
  <div class="login_container">
    <div class="login_box">
      <div class="logo_box">
        <img src="~assets/images/logo.png" alt="" />
      </div>
      <el-form
        :model="loginForm"
        ref="loginFormRef"
        :rules="rules"
        label-width="0"
        class="login_form"
      >
        <el-form-item prop="username">
          <el-input
            ref="userNameRef"
            v-model="loginForm.username"
            @keyup.enter.native="login"
            prefix-icon="el-icon-user"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="passwordRef"
            v-model="loginForm.password"
            @keyup.enter.native="login"
            prefix-icon="el-icon-lock"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btn_area">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },

      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 4, max: 16, message: '密码在4到16位之间', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    // 登录按钮
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) {
          this.$message.error('请先修改页面提示的错误!', true)
        } else {
          const { data } = await this.$http.post('login', this.loginForm)
          console.log(data)
          if (data.meta.status !== 200) {
            this.$message.error('登录失败!请确认用户名和密码.', true)
          } else {
            this.$message.success('登录成功.')
            sessionStorage.setItem('token', data.data.token)
            this.$router.push('/home')
          }
        }
      })
    },

    // 重置按钮
    reset() {
      this.$refs.loginFormRef.resetFields()
    },
  },
}
</script>

<style lang="less" scoped>
.login_container {
  height: 100%;
  background: #2b4b6b;
}

.login_box {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 450px;
  height: 300px;
  border-radius: 15px;
  background: #fdfefd;
  transform: translate(-50%, -50%);
}

.logo_box {
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 50%;
  width: 130px;
  height: 130px;
  padding: 10px;
  border: 1px solid #eee;
  border-radius: 50%;
  background: #fff;
  transform: translate(-50%, -50%);

  img {
    width: 100%;
    border: 1px solid #fff;
    border-radius: 50%;
    background: #edeeec;
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
}

.btn_area {
  display: flex;
  justify-content: flex-end;
}
</style>
