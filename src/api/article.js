import request from '@/utils/request'

export function putArticle ({ data = {}, params = {}, custom = {} }) { // 编辑文章
  return request({
    url: `/article/${params._id}`,
    method: 'put',
    headers: {
      'Content-Type': 'application/json'
    },
    params,
    custom,
    data
  })
}

export function deleteArticle ({ data = {}, params = {}, custom = {} }) { // 删除文章
  return request({
    url: `/article/${params._id}`,
    method: 'delete',
    params,
    custom
  })
}

export function postCatelog ({ data = {}, params = {}, custom = {} }) { // 创建文章目录
  return request({
    url: `/article/catelog`,
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    custom,
    data
  })
}

export function getCatelogTree ({ data = {}, params = {}, custom = {} }) { // 获取文章目录树
  return request({
    url: `/article/catelog/tree`,
    method: 'get',
    custom,
    data
  })
}

export function getCatelogList ({ data = {}, params = {}, custom = {} }) { // 获取一级目录结构
  return request({
    url: `/article/catelog/list`,
    method: 'get',
    custom,
    data
  })
}

export function getArticleByType ({ data = {}, params = {}, custom = {} }) { // 根据文章的类型获取文章
  return request({
    url: `/article`,
    method: 'get',
    custom,
    params
  })
}

export function getArticleById ({ data = {}, params = {}, custom = {} }) { // 根据文章的id获取文章
  return request({
    url: `/article/${params._id}`,
    method: 'get',
    custom,
    params
  })
}

export function getArticleTimeline ({ data = {}, params = {}, custom = {} }) { // 获取时间线
  return request({
    url: `/article/timeline`,
    method: 'get',
    custom,
    params
  })
}
