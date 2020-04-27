const mongoose = require('mongoose') // 引包
const Schema = mongoose.Schema

// 文章表结构
let articlesSchema = new Schema({ // 设置用户信息表结构
  title: String,
  date: {
    type: String,
    default: new Date().toLocaleString()
  },
  content: String
})

module.exports = mongoose.model('Article', articlesSchema)
