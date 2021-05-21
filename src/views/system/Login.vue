<template>
  <section>
    <div class="color"></div>
    <div class="color"></div>
    <div class="color"></div>
    <div class="box">
      <div class="circle" style="--x: 0"></div>
      <div class="circle" style="--x: 1"></div>
      <div class="circle" style="--x: 2"></div>
      <div class="circle" style="--x: 3"></div>
      <div class="circle" style="--x: 4"></div>
      <div class="container">
        <div class="form">
          <h2>登录</h2>
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
            <el-form-item class="btn_area_right">
              <el-button type="primary" @click="login">登录</el-button>
              <el-button type="info" @click="reset">重置</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </section>
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
          this.$message.success('登录成功.')
          sessionStorage.setItem('token', data.data.token)
          this.$store.commit('setUserName', this.loginForm.username)
          this.$router.push('/home')
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

section {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: -webkit-linear-gradient(to bottom, #f1f4f9, #dff1ff);
}

section .color {
  position: absolute;
  filter: blur(200px);
}


section .color:nth-child(1) {
  top: -350px;
  width: 600px;
  height: 600px;
  background: #ff359b;
}

section .color:nth-child(2) {
  bottom: -150px;
  left: 100px;
  width: 500px;
  height: 500px;
  background: #fffd87;
}

section .color:nth-child(3) {
  bottom: 50px;
  right: 100px;
  width: 500px;
  height: 500px;
  background: #00d2ff;
}

.box {
  position: relative;
}

.box .circle {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  filter: hue-rotate(calc(var(--x) * 70deg));
  animation: animate 10s linear infinite;
  animation-delay: calc(var(--x) * -1s);
}

@keyframes animate {
  0%,
  100% {
    transform: translateY(-50px);
  }
  50% {
    transform: translateY(50px);
  }
}

.box .circle:nth-child(1) {
  top: -50px;
  right: -60px;
  width: 100px;
  height: 100px;
}

.box .circle:nth-child(2) {
  top: 150px;
  left: -100px;
  width: 120px;
  height: 120px;
  z-index: 2;
}

.box .circle:nth-child(3) {
  bottom: 50px;
  right: -60px;
  width: 80px;
  height: 80px;
  z-index: 2;
}

.box .circle:nth-child(4) {
  bottom: -80px;
  left: 100px;
  width: 60px;
  height: 60px;
}

.box .circle:nth-child(5) {
  top: -80px;
  left: 140px;
  width: 60px;
  height: 60px;
}

.container {
  position: relative;
  width: 400px;
  min-height: 400px;
  background: rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(5px);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.form {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 50px;
}

.form h2 {
  position: relative;
  color: #fff;
  font-size: 24px;
  font-weight: 600;
  letter-spacing: 5px;
  margin-bottom: 30px;
  cursor: pointer;
}

.form h2::before {
  content: '';
  position: absolute;
  left: 0;
  bottom: -10px;
  width: 0px;
  height: 3px;
  background: #fff;
  transition: 0.5s;
}

.form h2:hover:before {
  width: 53px;
}



</style>
