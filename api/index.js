const bodyParser = require('body-parser')
const app = require('express')()
const { param, body, validationResult } = require('express-validator')
const mysql = require('mysql2/promise')
const { uuid } = require('uuidv4')
const fs = require('fs')

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
    connection.beginTransaction()
    const results = await Promise.all(queries.map(q => connection.execute(q)))
    connection.commit()
    return [true, results]
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

const read_sql = (path) => {
  return fs.readFileSync(path).toString()
}

app.get('/product', async (req, res) => {
  const query = read_sql('./api/sql/product/select.sql')
  const [status, response] = await execute_query(query)
  if (status) {
    res.json(response)
  }
  else {
    res.status(400).json(response)
  }
})

app.get('/product_inventory', async (req, res) => {
  const query = read_sql('./api/sql/product_inventory/select.sql')
  const [status, response] = await execute_query(query)
  if (status) {
    res.json(response)
  }
  else {
    res.status(400).json(response)
  }
})

app.get('/product_version', async (req, res) => {
  const query = read_sql('./api/sql/product_version/select.sql')
  const [status, response] = await execute_query(query)
  if (status) {
    res.json(response)
  }
  else {
    res.status(400).json(response)
  }
})

app.post('/product',[
  body('name').isLength({max: 64}),
  body('price').isInt({min: 0}),
  body('description').isLength({max: 65535}).optional()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = uuid()
  const query = read_sql('./api/sql/product/insert.sql')
  const payload = {
    id,
    registrated_date: new Date().toLocaleString(),
    name: req.body.name,
    price: req.body.price,
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
  const query = read_sql('./api/sql/product/delete.sql')
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

app.get('/transaction', async (req, res) => {
  const query = read_sql('./api/sql/transaction/select.sql')
  const [status, response] = await execute_query(query)
  if (status) {
    res.json(response)
  }
  else {
    res.status(400).json(response)
  }
})

app.post('/transaction', [
  body('buyer_id').isUUID(4),
  body('ordered_date').isISO8601().optional(),
  body('products.*.id').isUUID(4),
  body('products.*.version').isISO8601(),
  body('products.*.quantity').isInt({min: 1})
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  let queries = []
  let ordered_date = new Date().toLocaleString()
  if (req.body.ordered_date) {
    ordered_date = req.body.ordered_date
  }
  const query_transaction = read_sql('./api/sql/transaction/insert.sql')
  const query_tran_progress = read_sql('./api/sql/transaction_progress/insert.sql')
  req.body.products.forEach(product => {
    const transaction_id = uuid(4)
    const payload_transaction = {
      id: transaction_id,
      ordered_date,
      buyer_id: req.body.buyer_id,
      product_id: product.id,
      product_version: product.version,
      quantity: product.quantity
    }
    const payload_tran_progress = {
      transaction_id,
      update_date: ordered_date
    }
    console.log(mysql.format(query_transaction, payload_transaction))
    queries.push(mysql.format(query_transaction, payload_transaction))
    queries.push(mysql.format(query_tran_progress, payload_tran_progress))
  })
  const [status, response] = await execute_queries(queries)
  if (status) {
    res.json(response)
  }
  else {
    res.status(400).json(response)
  }
})

app.delete('/transaction/:id', [
  param('id').isUUID(4)
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const query = "DELETE FROM `e-commerce`.transaction WHERE ?"
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

app.get('/transaction_progress', async (req, res) => {
  const query = read_sql('./api/sql/transaction_progress/select.sql')
  const [status, response] = await execute_query(query)
  if (status) {
    res.json(response)
  }
  else {
    res.status(400).json(response)
  }
})

app.post('/transaction_progress',[
  body('id').isUUID(4),
  body('status').isIn(['WAITING_SHIPPING','SHIPPED','WAITING_RECEIVING','RECEIVED','CANCEL'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const query = read_sql('./api/sql/transaction_progress/insert.sql')
  const payload = {
    id: req.body.id,
    status: req.body.status
  }
  const [status, response] = await execute_query(mysql.format(query, payload))
  if (status) {
    res.json(response)
  }
  else {
    res.status(400).json(response)
  }
})

module.exports = app