const bodyParser = require('body-parser')
const app = require('express')()
const { param, body, validationResult } = require('express-validator')
const mysql = require('mysql2/promise')
const { uuid } = require('uuidv4')

app.use(bodyParser.json())

const get_connection = async () => {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'e-commerce',
    dateStrings: true
  })
}

const execute_query = async (query) => {
  // [staus: boolean, response: object]
  let connection
  try {
    connection = await get_connection()
    const [result, fields] = await connection.execute(query)
    return [true, {
      result,
      fields
    }]
  }
  catch(e) {
    await connection.rollback()
    console.error(e)
    return [false, e]
  }
  finally {
    await connection.end()
  }
}

const execute_queries = async (queries) => {
  let connection
  try {
    connection = await get_connection()
    await Promise.all(queries.map(q => connection.execute(q)))
    connection.commit()
  }
  catch(e) {
    await connection.rollback()
    console.error(e)
    return [false, e]
  }
  finally {
    await connection.end()
  }
}

app.get('/product', async (req, res) => {
  const query = 'SELECT id, registrated_date, original_id, registrant_user_id, name, price, description FROM `e-commerce`.product;'
  const [status, response] = await execute_query(query)
  if (status) {
    res.json(response)
  }
  else {
    res.status(400).json(response)
  }
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
  const query = "INSERT INTO `e-commerce`.product set ?;"
  const payload = {
    id,
    original_id: (req.body.original_id ? req.body.original_id : id),
    registrated_date: new Date().toLocaleString(),
    name: req.body.name,
    price: req.body.price,
    registrant_user_id: req.body.registrant_user_id,
    description: req.body.description
  }
  const [status, response] = await execute_query(mysql.format(query, payload))
  if (status) {
    res.json(response)
  }
  else {
    res.status(400).json(response)
  }
})

app.delete('/product/:id', [
  param('id').isUUID(4)
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const query = "DELETE FROM `e-commerce`.product WHERE ?"
  const payload = {
    id: req.params.id
  }
  const [status, response] = await execute_query(mysql.format(query, payload))
  if (status) {
    res.json(response)
  }
  else {
    res.status(400).json(response)
  }
})

app.post('/transaction', [
  body('product_id').isUUID(4),
  body('quantity').isInt({min: 1}),
  body('buyer_id').isUUID(4),
  body('ordered_date').isISO8601()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  const payload = {
    id: uuid(4),
    ordered_date: req.body.ordered_date,
    buyer_id: req.body.buyer_id,
    product_id: req.body.product_id,
    quantity: req.body.quantity
  }
  res.json(payload)
})

module.exports = app