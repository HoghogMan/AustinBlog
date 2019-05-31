const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/session', function (req, res) {
  // console.log(123)
  fs.readFile('../test.html', function (err, data) {
    if (err) {
      return console.error(err)
    }
    res.render(data)
  })
})

module.exports = router
