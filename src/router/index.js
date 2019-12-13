import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login.vue'
import personal from '@/views/personal.vue'
Vue.use(VueRouter)

var router = new VueRouter({
  routes: [
    {
      name: 'login',
      path: '/login',
      component: login
    },
    {
      name: 'personal',
      path: '/personal/:id',
      component: personal
    }
  ]
})

// 守卫
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/personal') === 0) {
    let token = localStorage.getItem('heima_40_token')
    if (token) {
      next()
    } else {
      next({ path: '/login' })
    }
  } else {
    next()
  }
})
export default router
