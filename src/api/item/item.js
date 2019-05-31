import request from '@/utils/request'

export function getItem ({ data = {}, params = {}, custom = {} }) {
  return request({
    url: `/item`,
    method: 'get'
    // data,
    // custom
  })
}

export function deleteItem ({ data = {}, params = {}, custom = {} }) {
  return request({
    url: `/item`,
    method: 'delete',
    custom,
    params
  })
}

export function postItem ({ data = {}, params = {}, custom = {} }) {
  return request({
    url: `/item`,
    method: 'post',
    custom,
    data
  })
}

/**
 * [getUserInfo 获得当前用户信息]
 * @param  {[object]} data   [请求参数]
 * @param  {[object]} custom [自定义参数]
 * @return {[promise]}            [响应]
 */
export function getUserInfo ({ data = {}, params = {}, custom = {} }) {
  return request({
    url: '/user/info',
    method: 'get',
    params
  })
}

export function forgetpassword ({ data = {}, params = {}, custom = {} }) {
  return request({
    url: `/users/password/forget`,
    method: 'put',
    params: params.emailadd,
    custom
  })
}

export function resetpassword ({ data = {}, params = {}, custom = {} }) {
  return request({
    url: `/users/${params.id}/password`,
    method: 'put',
    data: data.passworddata,
    headers: {
      'Content-Type': 'application/json'
    },
    custom
  })
}

export function checkpolicy ({ data = {}, params = {}, custom = {} }) {
  return request({
    url: `/users/eula/agreed`,
    method: 'put'
  })
}
