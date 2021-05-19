import Vue from 'vue'
import axios from 'axios'
import { Loading } from 'element-ui'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'

let loadingInstance = null
axios.interceptors.request.use((config) => {
  loadingInstance = Loading.service({
    fullscreen: true,
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)',
  })

  let token = sessionStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  } else {
    window.vm.$router.push('/login')
  }
  return config
})

axios.interceptors.response.use(
  (response) => {
    loadingInstance.close()
    if (response.data.meta.status >= 400) {
      window.vm.$message.error(
        response.data.meta.msg ? response.data.meta.msg : '服务器错误',
        false
      )
    } else {
      return response
    }
  },
  (error) => {
    loadingInstance.close()
    if (error.response.status !== 200) {
      window.vm.$message.error('服务端错误', true)
    }
  }
)

Vue.prototype.$http = axios
