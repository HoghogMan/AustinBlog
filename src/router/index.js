import Vue from 'vue'
import Router from 'vue-router'
import BlogHome from '@/components/BlogHome'
import Layout from '@/components/layout/index.vue'
import itemPark from '@/components/itemPark/index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: Layout,
      children: [{
        path: '/',
        name: 'BlogHome',
        component: BlogHome
      },
      {
        path: '/itemPark',
        name: 'itemPark',
        component: itemPark
      }]
    }
  ]
})
