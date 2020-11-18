const bodyParser = require('body-parser')
const app = require('express')()
const { query, validationResult } = require('express-validator')
const mysql = require('mysql2/promise')

app.use(bodyParser.json())

app.get('/test_get',[
  query('q').isString().isLength({min: 8, max: 8})
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({
    query: req.query
  })
})

app.get('/product', async (req, res) => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'e-commerce'
  })
  const [rows, fields] = await connection.execute('show databases;')
  res.json({
    rows,
    fields
  })
})

module.exports = app