const express = require('express')
const router = express.Router()

let User = require('../model/user.js')

router.get('/session', function (req, res) { // 获取session信息
  if (req.session.user) {
    res.send(req.session)
  }
})

router.get('/basicInfo', function (req, res) {
  User.find((err, res1) => {
    if (err) {
      console.log('查询失败')
    } else {
      res.send(res1)
    }
  })
})

router.post('/register', function (req, res) {
  let userData = req.body // 接收到的数据
  if (userData && (userData.password === userData.checkPassword)) {
    let userInfo = new User(userData)
    userInfo.save((err, res1) => {
      if (err) {
        console.log('保存失败')
      } else {
        // console.log('保存成功') console.log(res);
        res.send('1')
      }
    })
  } else {
    res.send('密码不一致')
  }
})

router.post('/login', function (req, res) {
  let userData = req.body // 接收到的数据
  if (userData) {
    let query = {
      username: userData.username
    }
    User.find(query, (err, res1) => {
      if (err) {
        console.log('查询失败')
      } else {
        if (res1.length > 0 && userData.password === res1[0].password) {
          req.session.user = { // 登录成功,设置session
            'username': userData.username
          }// User为存入数据库回调回来的用户对象
          res.send(req.session) // 返回session信息
        }
      }
    })
  }
})

router.get('/logout', function (req, res) {
  req.session.user = null// 删除session
  res.send('1')
})

module.exports = router
