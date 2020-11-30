const bodyParser = require('body-parser')
const app = require('express')()
const { param, body, validationResult } = require('express-validator')
const mysql = require('mysql2/promise')
const { uuid } = require('uuidv4')
const { execute_query, execute_queries, read_sql } = require('./index')

app.use(bodyParser.json())


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

app.post('/product',[
  body('name').isLength({max: 64}),
  body('price').isInt({min: 0}),
  body('description').isLength({max: 65535}).optional()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const q_product = read_sql('./api/sql/product/insert.sql')
  const q_prd_inventory = read_sql('./api/sql/product_inventory/insert.sql')
  const q_prd_version = read_sql('./api/sql/product_version/insert.sql')

  const id = uuid()
  const date = new Date().toLocaleString()

  const payload_product = {
    id,
    registrated_date: date,
    registrant_user_id: 'd6216161-97b4-477e-87cb-3bdcecfb6d81'
  }
  const payload_prd_inventory = {
    update_date: date,
    product_id: id,
    inventory: 0
  }
  const payload_prd_version = {
    update_date: date,
    product_id: id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description
  }

  let queries = []
  queries.push(mysql.format(q_product, payload_product))
  queries.push(mysql.format(q_prd_inventory, payload_prd_inventory))
  queries.push(mysql.format(q_prd_version, payload_prd_version))
  
  const [status, response] = await execute_queries(queries)
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

module.exports = app