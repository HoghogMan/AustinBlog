const mongoose = require('mongoose') // 引包
const Schema = mongoose.Schema

// 访问者ip表结构
let ipSchema = new Schema({ // 设置用户信息表结构
  ipAddress: String,
  articleId: String
})

module.exports = mongoose.model('Visitorip', ipSchema)
