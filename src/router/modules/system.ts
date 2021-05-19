export default [
    {
        name: 'Welcome',
        path: '/welcome',
        meta: {
            title: '欢迎',
            menu: '首页'
        },
        component: () => import('views/system/Welcome.vue'),
    }
]