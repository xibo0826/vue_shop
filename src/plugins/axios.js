import Vue from 'vue'
import axios from 'axios'

// Vue.use(axios);

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';
axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status == 400) {
        console.log('服务端错误');
    }
})

Vue.prototype.$http = axios;