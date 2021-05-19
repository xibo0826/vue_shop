export default [
    {
        name: 'Users',
        path: '/users',
        meta: {
            title: '用户列表',
            menu: '用户管理'
        },
        component: () => import('views/master/Users.vue')
    },
    {
        name: 'Roles',
        path: '/roles',
        meta: {
            title: '角色列表',
            menu: '权限管理'
        },
        component: () => import('views/master/Roles.vue')
    },
    {
        name: 'AuthList',
        path: '/rights',
        meta: {
            title: '权限列表',
            menu: '权限管理'
        },
        component: () => import('views/master/AuthList.vue')
    },
]