import request from '@/utils/request'

export function uploadFile ({ data = {}, params = {}, custom = {} }) {
  return request({
    url: `/upload`,
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data,
    timeout: 1000 * 60 * 60 * 24,
    params,
    custom
  })
}
