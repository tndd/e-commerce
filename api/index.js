const bodyParser = require('body-parser')
const app = require('express')()
const { query, body, validationResult } = require('express-validator')
const mysql = require('mysql2/promise')

app.use(bodyParser.json())

const get_connection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'e-commerce'
  })
}

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
  const connection = await get_connection()
  const [rows, fields] = await connection.execute('show databases;')
  res.json({
    rows,
    fields
  })
})

app.post('/product',[
  body('id').isUUID(4)
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  res.json({
    id: req.body.id
  })
})

module.exports = app