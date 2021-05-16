export default [
    {
        name: 'Users',
        path: '/users',
        meta: {
            title: '用户列表'
        },
        component: () => import('views/user/Users.vue')
    },
]