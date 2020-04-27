const mongoose = require('mongoose') // 引包
const fs = require('fs')
const express = require('express')
const bodyParser = require('body-parser')
const createError = require('http-errors') // http-errors包能根据传入的http状态码，生成对应的HTTP error。

const indexRouter = require('./routes/index')
const userRouter = require('./routes/user')
const articleRouter = require('./routes/articles')
const uploadRouter = require('./routes/upload')

const session = require('express-session')

let app = express()

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
// parse application/json
app.use(bodyParser.json({limit: '50mb'})) // 使用bodyparder中间件

// 将静态文件目录设置为：项目根目录+/public
app.use('/public', express.static('public'))

// 1. 连接MongoDB数据库 连接articles数据库,这个数据库不一定存在
let dbUrl = 'mongodb://admin:123456@localhost:27017/articles?authSource=admin'
mongoose.connect(dbUrl, {useNewUrlParser: true,useUnifiedTopology: true}).catch(error => {
  // Handle connection error
});
mongoose.Promise = global.Promise // 创建一个模型 就是设计数据库

app.use(session({
  secret: 'sign', // 对session id 相关的cookie 进行签名
  resave: false, // 强制保存session 建议设置成false
  saveUninitialized: true, // 强制保存未初始化的内容
  rolling: true, // 动态刷新页面cookie存放时间
  cookie: {
    maxAge: 6000000
  } // 保存时效
  // store: new MongoStore({ // 将session存进数据库  用来解决负载均衡的问题   url: dbUrl,   ttl: 14
  // * 24 * 60 * 60 // = 14 days. Default })
}))

// 登录拦截器
app.use(function (req, res, next) {
  let url = req.originalUrl // 请求的路径
  // console.log(req.session.user)
  // console.log(url.indexOf('/api/user'))
  // 如果路由是/api/user打头的话 并且找不到seesion信息,则返回未登录,否则无需登录
  if (url.indexOf('/api/user') === 0 && !req.session.user && url.indexOf('/api/user/login') === -1) {
    return res.json({status: '1001', msg: '当前未登录', result: ''})
  }
  next()
})

app.use('/api/', indexRouter)
app.use('/api/user', userRouter)
app.use('/api/article', articleRouter)
app.use('/api/upload', uploadRouter)

app.use(function (err, req, res, next) { // 错误处理中间件
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, '0.0.0.0', () => {
  console.log('app is running at port 3000.')
})
