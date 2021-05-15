import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig } from 'vue-router'

import System from './modules/system'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  ...System,
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
