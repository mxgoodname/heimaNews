import Vue from 'vue'
import VueRouter from 'vue-router'

import login from '@/views/login.vue'
import personal from '@/views/personal.vue'
import editPersonal from '@/views/editPersonal.vue'
import index from '@/views/index.vue'
import register from '@/views/register.vue'
import articleDetail from '@/views/articleDetail.vue'
import followList from '@/views/followList.vue'
import articleLike from '@/views/articleLike.vue'
import comments from '@/views/comments.vue'
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
    },
    {
      name: 'editPersonal',
      path: '/editPersonal/:id',
      component: editPersonal
    },
    {
      name: 'index',
      path: '/index',
      component: index
    },
    {
      name: 'register',
      path: '/register',
      component: register
    },
    {
      name: 'articleDetail',
      path: '/articleDetail/:id',
      component: articleDetail
    },
    {
      name: 'followList',
      path: '/followList',
      component: followList
    },
    {
      name: 'articleLike',
      path: '/articleLike',
      component: articleLike
    },
    {
      name: 'comments',
      path: '/comments/:id',
      component: comments
    }
  ]
})

// 守卫
router.beforeEach((to, from, next) => {
  if (to.path.indexOf('/personal') === 0) {
    let token = localStorage.getItem('hm_40_token')
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
