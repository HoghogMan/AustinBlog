const mongoose = require('mongoose') // 引包
const Schema = mongoose.Schema

// 个人用户表结构
let userSchema = new Schema({ // 设置用户信息表结构
  username: String,
  password: String
  // hidden: Boolean, meta: {     votes: Number,     favs: Number }
})

module.exports = mongoose.model('User', userSchema)
