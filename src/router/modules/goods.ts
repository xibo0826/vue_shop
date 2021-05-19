export default [
    {
        name: 'Categories',
        path: '/categories',
        meta: {
            title: '商品分类',
            menu: '商品管理'
        },
        component: () => import('views/goods/Categories.vue'),
    }
]