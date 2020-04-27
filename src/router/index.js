import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/layout/index.vue'
import itemPark from '@/views/itemPark/index.vue'
import itemDetail from '@/views/itemPark/components/itemDetails.vue'
import BlogHome from '@/views/blogHome/index.vue'
import AboutMe from '@/views/aboutMe/index.vue'
import AboutLife from '@/views/aboutLife/index.vue'
import CreateLine from '@/views/createLine/index.vue'

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
          name: 'home',
          component: BlogHome
        }, {
          path: 'itemPark',
          name: 'itemPark',
          component: itemPark,
          meta: true, // 需要权限验证
          children: [
            {
              path: 'itemDetail/:id',
              name: 'itemDetail',
              component: itemDetail
            }
          ]
        },
        {
          path: 'about',
          name: 'aboutMe',
          component: AboutMe
        },
        {
          path: 'life',
          name: 'aboutLife',
          component: AboutMe
        },
        {
          path: 'createLine',
          name: 'createLine',
          component: CreateLine
        }
      ]
    }
  ]
})
