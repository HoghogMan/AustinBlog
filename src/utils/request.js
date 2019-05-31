import axios from 'axios'
import qs from 'qs'
import {Message} from 'element-ui'
// import router from '@/router' import store from '@/store'
// import message from '@/utils/message'

export const baseURL = '/api/v1' // api的base_url

export const CancelToken = axios.CancelToken

// create an axios instance
const service = axios.create({
  baseURL,
  timeout: 30000, // request timeout
  withCredentials: true, // allow to carry cookie
  custom: { // 自定义注入参数
    messageShow: false // 是否显示接口提示框，true显示，false不显示
  }
})

// request interceptor 请求拦截器
service
  .interceptors
  .request
  .use(config => {
    if (config.headers['Content-Type'] == null) {
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      if (config.data) {
        config.data = qs.stringify(config.data)
      }
    } // 在发送请求前要做什么
    return config
  }, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  })

// respone interceptor //相应拦截器
service
  .interceptors
  .response
  .use(
    // response => response,
    /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过xmlhttprequest来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
    response => {
      if (response.config.custom.messageShow) {
        Message({
          showClose: true,
          message: 'success', // res.message,
          type: 'success'
        })
      }
      return response
    }, err => {
      Message({
        showClose: true,
        message: 'error', // res.message,
        type: 'error'
      })
      return err
    })

export default service
