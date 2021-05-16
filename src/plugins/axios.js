import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/';

axios.interceptors.request.use(config => {
    config.headers.Authorization = sessionStorage.getItem('token');
    return config;
})

axios.interceptors.response.use(response => {
    return response;
}, error => {
    if (error.response.status !== 200) {
        console.log('服务端错误');
    }
})

Vue.prototype.$http = axios;