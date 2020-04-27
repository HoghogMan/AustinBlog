const fs = require('fs')
const express = require('express')
const multer = require('multer')
const router = express.Router()

var upload = multer({dest: 'public/'}) // 文件要存放的路径

router.post('/', upload.any(), function (req, res, next) {
  console.log(req.files[0]) // 上传的文件信息
  let desFile = './public/' + req.files[0].originalname
  fs.readFile(req.files[0].path, (err, data) => {
    if (err) {
      return console.error(err)
    } else {
      console.log(data)
      fs.writeFile(desFile, data, (err) => {
        if (err) {
          console.log(err)
        } else {
          let response = {
            message: 'File uploaded successfully',
            filename: req.files[0].originalname,
            path: 'http://39.108.55.93:3000/public/' + req.files[0].originalname
          }
          res.end(JSON.stringify(response))
        }
      })
    }
  })
})

router.get('/', function (req, res, next) {
  console.log(123)
  console.log(req)
  let form = fs.readFileSync('public/01.gif', {encoding: 'utf8'})
  res.send(form)
})

module.exports = router
