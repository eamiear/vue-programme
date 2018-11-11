import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? 'cdn' : '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    name: 'home',
    path: '/',
    desc: '首页',
    component: () => import('@/views/dashboard/index')
  }, {
    name: 'hello',
    path: '/hello.html',
    desc: '首页',
    component: () => import('@/components/HelloWorld.vue')
  }]
})
export default router
