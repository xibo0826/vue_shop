export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        name: 'Login',
        path: '/login',
        meta: {
            title: '登录'
        }, 
        component: () => import('views/system/Login.vue')
    },
    {
        name: 'Home',
        path: '/home',
        meta: {
            title: '主页'
        }, 
        component: () => import('views/system/Home.vue')
    },
]