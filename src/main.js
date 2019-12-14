import Vue from 'vue'
import App from './App.vue'

import router from '@/router/index.js'

import '@/styles/reset.css'
import { Toast, Uploader } from 'vant'

Vue.use(Toast)
Vue.use(Uploader)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
