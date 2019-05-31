import request from '@/utils/request'

export function getUser ({ data = {}, params = {}, custom = {} }) {
  return request({
    url: `/user/basicInfo`,
    method: 'get'
  })
}

export function getSession ({ data = {}, params = {}, custom = {} }) {
  return request({
    url: `/user/session`,
    method: 'get'
  })
}

export function postRegisterUser ({ data = {}, params = {}, custom = {} }) {//注册用户
  return request({
    url: `/user/register`,
    method: 'post',
    data,
  })
}

export function postLoginUser ({ data = {}, params = {}, custom = {} }) {//登录用户
  return request({
    url: `/user/login`,
    method: 'post',
    data,
  })
}

export function getLogout ({ data = {}, params = {}, custom = {} }) {//登录用户
  return request({
    url: `/user/logout`,
    method: 'get',
  })
}