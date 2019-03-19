// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import 'ant-design-vue/dist/antd.css'
// import antDesignVue from 'ant-design-vue'

import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/main.scss'
// import Button from 'ant-design-vue/lib/button'

import store from './store'
import axios from 'axios'
Vue.prototype.axios = axios
// Vue.use(antDesignVue)

Vue.use(ElementUI, { locale })

// Vue.component(Button.name, Button)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
