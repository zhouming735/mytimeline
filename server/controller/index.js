let index = require('express').Router()
let html = require('fs').readFileSync(__dirname + '/../views/index.html')
let model = require('../model')
const PASSWORD = '123456'

index.post('/api/add', (req, res) => { // 添加记录
  try {
    model.set(req.body)
    res.json({ err: false })
  } catch (e) {
    res.json({ err: true })
  }
})

index.post('/api/check', (req, res) => { // 验证密码解除锁屏
  if (req.body.password === PASSWORD) {
    res.json({ err: false })
  } else {
    res.json({ err: true })
  }
})

index.get('/api/records', (req, res) => { // 获取所有记录
  res.json(model.get())
})

index.get('*', (req, res) => {
  res.status(200).end(html)
})

module.exports = index