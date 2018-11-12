import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import 'element-ui/packages/theme-chalk/lib/index.css'
import ElementUI from 'element-ui'

import Meta from 'vue-meta'

Vue.use(ElementUI)
Vue.use(Meta)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
