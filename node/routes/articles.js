const express = require('express')
const router = express.Router()

// let Articles = require('../model/articles.js')
let Catelog = require('../model/catelog.js')
let VisitorIp = require('../model/visitorIp.js')

router.get('/timeline', function (req, res) { // 返回所有文章的创建时间
  let pageOptions = {
    limit: req.query.pageSize ? Number(req.query.pageSize) : 5, // pageSize
    skip: (req.query.pageSize && req.query.pageNum) ? (req.query.pageSize * (req.query.pageNum - 1)) : 0 // 要跳过的页码数
  }
  let totalLength, catelogList // 定义所有文章的数量  以及目录的列表
  return new Promise((resolve, reject) => {
    Catelog.find({}, function (err, res) {
      if (err) {
        reject(err)
      } else {
        totalLength = res.filter(item => item.isCatelog === 0).length
        catelogList = res.filter(item => item.isCatelog === 1)
        resolve(catelogList)
      }
    })
  }).then((catelogList) => {
    Catelog.find({isCatelog: 0}).sort({'date': -1}) // 按照时间倒序
      .skip(pageOptions.skip || 0)// 跳过的条数
      .limit(pageOptions.limit || 5)// 查询几条
      .exec(function (err, res1) {
        if (err) {
          console.log(err)
        } else {
          let articles = JSON.parse(JSON.stringify(res1))
          for (let i = 0, arrLen1 = articles.length; i < arrLen1; i++) {
            for (let j = 0, arrLen2 = catelogList.length; j < arrLen2; j++) {
              if (articles[i].parentId === catelogList[j]._id.toString()) {
                articles[i].parentCatelog = catelogList[j].name
              }
            }
          }
          let timelineDate = {
            pageSize: Number(req.query.pageSize),
            pageNum: Number(req.query.pageNum),
            data: articles,
            total: totalLength
          }
          res.send(timelineDate)
        }
      })
  })
})

router.get('/:id', function (req, res) { // 根据文章id查询文章
  let realIp = req.get('X-Real-IP') || req.get('X-Forwarded-For') || req.ip
  return new Promise((resolve, reject) => {
    let ipData = {
      ipAddress: realIp,
      articleId: req.query._id
    }
    VisitorIp.findOne(ipData, (err, res1) => {
      if (err) {
        console.log(err)
      } else {
        if (!res1) { // 如果查找不到对应的ip,则存入
          let newIpData = {
            ipAddress: realIp,
            articleId: req.query._id
          }
          let visitorInfo = new VisitorIp(newIpData)
          visitorInfo.save((err, res1) => {
            if (err) {
              console.log('保存失败')
              reject(err)
            } else {
              console.log('保存成功')
              let params = {
                articleId: req.query._id
              }
              VisitorIp.find(params, (err, res2) => {
                if (err) {
                  console.log(err)
                } else {
                  let counts = res2.length
                  Catelog.updateOne(req.query, {
                    $set: {
                      'visits': counts
                    }
                  }, (err, res3) => {
                    if (err) {
                      console.log(err)
                    } else {
                      resolve(req.query)
                    }
                  })
                }
              })
            }
          })
        } else {
          resolve(req.query)
        }
      }
    })
  }).then((itemId) => {
    Catelog.findById(itemId, (err, res1) => {
      if (err) {
        console.log('查询失败')
      } else {
        res.send(res1)
      }
    })
  }).catch(err => {
    console.log(err)
  })
})

router.put('/:id', function (req, res) { // 编辑文章
  let catelogData = req.body // 接收到的数据
  Catelog.updateOne(req.query, {
    $set: {
      'name': catelogData.name,
      'content': catelogData.content
    }
  }, (err, res1) => {
    if (err) {
      console.log('更新失败')
    } else {
      res.send('OK')
    }
  })
})

router.delete('/:id', function (req, res) { // 删除文章
  Catelog.deleteOne(req.query, (err, res1) => {
    if (err) {
      console.log('更新失败')
    } else {
      Catelog.deleteMany({
        parentId: req.query._id
      }, (err, res1) => {
        if (err) {
          console.log('更新失败')
        } else {
          res.send('OK')
        }
      })
    }
  })
})

router.post('/catelog', function (req, res) { // 创建文章目录
  // 1. 获取表单 POST 请求体数据
  // 2. 处理
  // 3. 发送响应 console.log(req);
  let catelogData = req.body // 接收到的数据
  let catelogInfo = new Catelog(catelogData)
  catelogInfo.save((err, res1) => {
    if (err) {
      console.log('保存失败')
    } else {
      res.send(res1._id)
    }
  })
})

router.get('/catelog/list', function (req, res) { // 获取一级目录列表
  let params = {
    isCatelog: 1
  }
  Catelog.find(params, (err, res1) => {
    if (err) {
      console.log('查询失败')
    } else {
      res.send(res1)
    }
  })
})

router.get('/catelog/tree', function (req, res) { // 获取目录树
  Catelog.find(req.query, (err, res1) => {
    if (err) {
      console.log('查询失败')
    } else {
      let firstLevel = res1.filter(item => item.parentId === '0')
      let secondLevel = res1.filter(item => item.parentId !== '0')
      for (let i = 0; i < firstLevel.length; i++) {
        for (let j = 0; j < secondLevel.length; j++) {
          if (firstLevel[i]._id.toString() === secondLevel[j].parentId) {
            firstLevel[i]
              .subArticles
              .push(secondLevel[j])
          }
        }
      }
      res.send(firstLevel)
    }
  })
})

module.exports = router
