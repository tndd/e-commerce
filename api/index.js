const bodyParser = require('body-parser')
const app = require('express')()
const { query, body, validationResult } = require('express-validator')
const mysql = require('mysql2/promise')
const { uuid } = require('uuidv4')

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
  connection.end()
  res.json({
    rows,
    fields
  })
})

app.post('/product',[
  body('original_id').isUUID(4).optional(),
  body('name').isLength({max: 64}),
  body('price').isInt({min: 0}),
  body('registrant_user_id').isUUID(4),
  body('description').isLength({max: 65535}).optional()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = uuid()
  const sql = "INSERT INTO `e-commerce`.product set ?;"
  const payload = {
    id,
    original_id: (req.body.original_id ? req.body.original_id : id),
    name: req.body.name,
    price: req.body.price,
    registrant_user_id: req.body.registrant_user_id,
    description: req.body.description
  }
  const connection = await get_connection()
  const [response, fields] = await connection.execute(mysql.format(sql, payload))
  connection.end()
  res.json({
    response,
    fields
  })
})

module.exports = app