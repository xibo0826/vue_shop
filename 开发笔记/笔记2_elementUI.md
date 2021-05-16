# ElementUI

### 一. 页面布局

##### 1. container

```
<el-container>
  <el-header>							
  </el-header>
  <el-container>
    <el-aside>
    </el-aside>
    <el-main>
    </el-main>
  </el-container>
</el-container>
```

### 二. 表单

```
<template>
  <el-form
    :model="loginForm"							// 关联data里的loginForm对象
    ref="loginFormRef"							// 通过this.$refs.loginFormRef可以取到表单对象
    :rules="rules"									// 定义表单验证
    label-width="0"									// 表单输入框前面的文字宽度
    class="login_form"
  >
    <el-form-item prop="username">				// 关联表单验证的名字
      <el-input														// 输入框
        ref="userNameRef"
        v-model="loginForm.username"
        @keyup.enter.native="login"				// enter事件要加native
        prefix-icon="el-icon-user"				// 字体图标
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
      ref="passwordRef"
      v-model="loginForm.password"
      @keyup.enter.native="login"
      prefix-icon="el-icon-lock"
      show-password												// 定义为密码输入框
      ></el-input>
    </el-form-item>

    <el-form-item class="btn_area">
      <el-button type="primary" @click="login">登录</el-button>		// primary是主要按钮, 主要体现在按钮颜色不一样
      <el-button type="info" @click="reset">重置</el-button>			// info是信息按钮
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },

      rules: {																															// 定义验证规则
        username: [																													// 关联el-form-item的prop
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
      this.$refs.loginFormRef.validate(async (valid) => {									// 表单验证
        if (!valid) {
          // 表单验证失败
        } else {
          // 表单验证通过
        }
      })
    },

    // 重置按钮
    reset() {
      this.$refs.loginFormRef.resetFields()				// 重置所有输入框的值
    },
  },
}
```

