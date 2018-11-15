import Vue from 'vue'
import VueRouter from 'vue-router'
import Meta from 'vue-meta'

Vue.use(VueRouter)
Vue.use(Meta)

const router = new VueRouter({
  mode: 'history',
  base: process.env.NODE_ENV === 'production' ? 'prerender' : '/',
  scrollBehavior: () => ({ y: 0 }),
  routes: [{
    name: 'home',
    path: '/',
    desc: '首页',
    component: () => import('@/views/dashboard/index')
  }, {
    path: '/fashionWeek.html',
    name: 'fashionWeek',
    component: () => import('@/views/fashionWeek/index'),
    meta: {
      title: 'FASHION PARTY2018•LIBER时尚趴SEE NOW BUY NOW即秀即买',
      content: 'LIBER时尚周开启即秀即买模式，并结合最新科技展示，同时通过线上直播及各地LIBER时尚周分会场， 同步将当季时尚发布全球...'
    }
  }, {
    path: '/table.html',
    name: 'table',
    component: () => import('@/views/dataview/table')
  }, {
    path: '/carousel.html',
    name: 'carousel',
    component: () => import('@/views/dataview/carousel')
  }, {
    path: '/progress.html',
    name: 'progress',
    component: () => import('@/views/dataview/progress')
  }]
})
export default router


