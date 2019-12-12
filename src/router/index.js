import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login.vue'
Vue.use(VueRouter)

var router = new VueRouter({
  routers: [
    {
      name: 'login',
      path: '/login',
      component: login
    }
  ]
})

export default router
