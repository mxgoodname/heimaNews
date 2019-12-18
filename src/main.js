import Vue from 'vue'
import App from './App.vue'

import router from '@/router/index.js'

import '@/styles/reset.css'
import { Toast, Uploader, Dialog, Field, Tab, Tabs, Icon, List, PullRefresh } from 'vant'

Vue.use(Toast)
Vue.use(Uploader)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(List)
Vue.use(PullRefresh)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
