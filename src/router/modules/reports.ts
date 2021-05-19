export default [
    {
        name: 'Reports',
        path: '/reports',
        meta: {
            title: '数据报表',
            menu: '数据统计'
        },
        component: () => import('views/reports/OrderReport.vue'),
    }
]