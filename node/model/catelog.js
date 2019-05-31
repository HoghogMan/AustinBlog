// 目录表

const mongoose = require('mongoose') // 引包
const Schema = mongoose.Schema

// 文章表结构
let catelogSchema = new Schema({ // 设置用户信息表结构
  parentId: String, // 父级id
  name: String, // 目录名,文章名
  isCatelog: Number, // 是否为目录 0不是目录 1是目录
  subArticles: Array, // 子文章
  content: String, // 文章内容
  date: { // 文章或目录的创建时间
    type: String,
    default: new Date().getTime()
  },
  visits: { // 文章访问量
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Catelog', catelogSchema)
