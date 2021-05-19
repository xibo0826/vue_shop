import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router'

import System from './modules/system'
import User from './modules/master'
import Goods from './modules/goods'
import Orders from './modules/orders'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    name: 'Login',
    path: '/login',
    meta: {
      title: '登录'
    },
    component: () => import('views/system/Login.vue')
  },
  {
    name: 'Home',
    path: '/home',
    redirect: '/welcome',
    meta: {
      title: '主页'
    },
    component: () => import('views/system/Home.vue'),
    children: [
      ...System,
      ...User,
      ...Goods,
      ...Orders
    ]
  },
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to: Route, from: Route, next: NavigationGuardNext<Vue>) => {
  if (to.name !== 'Login' && !sessionStorage.getItem("token")) {
    next({
      name: "Login"
    });
  } else {
    next();
  }
})

export default router
