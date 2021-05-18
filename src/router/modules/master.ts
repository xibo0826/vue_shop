export default [
    {
        name: 'Users',
        path: '/users',
        meta: {
            title: '用户列表'
        },
        component: () => import('views/master/Users.vue')
    },
    {
        name: 'Roles',
        path: '/roles',
        meta: {
            title: '权限'
        },
        component: () => import('views/master/Roles.vue')
    },
]