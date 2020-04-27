// The Vue build version to load with the `import` command (runtime-only or
// standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router'
// import 'ant-design-vue/dist/antd.css' import antDesignVue from
// 'ant-design-vue'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
// import Button from 'ant-design-vue/lib/button'

import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import highlight from './directive/highlight/highlight.js'

import * as filters from './filters'

import store from './store'
import axios from 'axios'
Vue.use(highlight.install)

Vue.use(VueQuillEditor)

Object
  .keys(filters)
  .forEach(key => { // 注册全局过滤器
    Vue.filter(key, filters[key])
  })

// import { createRouter } from './router'

Vue.prototype.axios = axios
// Vue.use(antDesignVue)

Vue.use(ElementUI, {locale})

// Vue.component(Button.name, Button)

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
// 获取用户权限信息，为空即没登录，跳转至登录页
// console.log(store.getters.getUser.username);
// if(store.getters.getUser.username){//如果已登录
//   next();
// }else{//如果未登录
//   if(to.path == '/itemPark'){//如果去创作园区,则需要登录
//     console.log(123);
//     next('/');
//   }else{
//     next();
//   }
// }
// });
/* eslint-disable no-new */

// 在纯客户端应用程序中，我们将在此文件中创建根 Vue 实例，并直接挂载到 DOM。 但是，对于服务器端渲染(SSR)，责任转移到纯客户端 entry
// 文件。 main.js 简单地使用 export 导出一个 createApp 函数 export function createApp () {
// const router = createRouter(),
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  // mounted() {
  //   document.dispatchEvent(new Event('render-event'))
  // },
  components: {
    App
  },
  template: '<App/>'
})
// 创建 router 实例 const router = createRouter() const app = new Vue({   // 注入
// router 到根 Vue 实例   router,   render: h => h(App) }) 返回 app 和 router return {
// app, router } }
