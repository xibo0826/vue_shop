export default [
    {
        name: 'Categories',
        path: '/categories',
        meta: {
            title: '商品分类'
        },
        component: () => import('views/goods/Categories.vue'),
    }
]