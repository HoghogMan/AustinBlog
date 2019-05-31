import Vue from 'vue'
import Router from 'vue-router'
import BlogHome from '@/views/BlogHome'
import Layout from '@/views/layout/index.vue'
import itemPark from '@/views/itemPark/index.vue'
import itemDetail from '@/views/itemPark/components/itemDetails.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'BlogHome',
          component: BlogHome
        }, {
          path: '/itemPark',
          name: 'itemPark',
          component: itemPark,
          meta: true, // 需要权限验证
          children: [
            {
              path: '/itemPark/itemDetail/:id',
              name: 'itemDetail',
              component: itemDetail
            }
          ]
        }
      ]
    }
  ]
})
