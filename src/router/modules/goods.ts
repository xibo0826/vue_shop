export default [
    {
        name: 'Categories',
        path: '/categories',
        meta: {
            title: '商品分类',
            menu: '商品管理'
        },
        component: () => import('views/goods/Categories.vue'),
    },
    {
        name: 'Goods',
        path: '/goods',
        meta: {
            title: '商品列表',
            menu: '商品管理'
        },
        component: () => import('views/goods/Goods.vue'),
    },
    {
        name: 'SaveGood',
        path: '/saveGood',
        meta: {
            title: '编辑商品',
            menu: '商品管理'
        },
        component: () => import('views/goods/SaveGood.vue'),
    },
    {
        name: 'Params',
        path: '/params',
        meta: {
            title: '分类参数',
            menu: '商品管理'
        },
        component: () => import('views/goods/Params.vue'),
    },
]