const bodyParser = require('body-parser')
const app = require('express')()
const { body, validatorResult } = require('express-validator')

app.use(bodyParser.json())

app.get('/get_test', (req, res) => {
  res.json({ data: 'data' })
})

module.exports = app