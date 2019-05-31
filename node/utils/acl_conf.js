module.exports = [
  {
    roles: 'normal', // 一般用户
    allows: [
      { resources: ['/'], permissions: ['get'] }
    ]
  },
  {
    roles: 'admin', // 管理
    allows: [
      { resources: ['/'], permissions: ['get'] },
      { resources: ['/admin/set/add-user', '/admin/set/modify-user'], permissions: ['post'] }
    ]
  },
  {
    roles: 'root', // 最高权限
    allows: [
      { resources: ['/admin/reserve', '/admin/sign', '/admin/set'], permissions: ['get'] }
    ]
  }
]
