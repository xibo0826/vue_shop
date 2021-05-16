export default [
    {
        name: 'Welcome',
        path: '/welcome',
        meta: {
            title: '欢迎'
        },
        component: () => import('views/system/Welcome.vue'),
    }
]