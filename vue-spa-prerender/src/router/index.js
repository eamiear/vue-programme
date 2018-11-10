import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

export const constantRouterMap = [
  { path: '/', name: 'Home', component: () => import('@/components/HelloWorld')},
  {
    path: '/fashionWeek',
    name: 'fashionWeek',
    component: () => import('@/views/fashionWeek/index'),
    meta: {
      title: 'FASHION PARTY2018•LIBER时尚趴SEE NOW BUY NOW即秀即买',
      content: 'LIBER时尚周开启即秀即买模式，并结合最新科技展示，同时通过线上直播及各地LIBER时尚周分会场， 同步将当季时尚发布全球...'
    }
  }
]

export default new VueRouter({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

