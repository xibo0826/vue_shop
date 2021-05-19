export default [
    {
        name: 'Orders',
        path: '/orders',
        meta: {
            title: '订单列表',
            menu: '订单管理'
        },
        component: () => import('views/orders/Orders.vue'),
    }
]