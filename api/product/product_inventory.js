const bodyParser = require('body-parser')
const app = require('express')()
const { param, body, validationResult } = require('express-validator')
const mysql = require('mysql2/promise')
const { uuid } = require('uuidv4')
const { execute_query, execute_queries, read_sql } = require('../index')

app.use(bodyParser.json())


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

app.post('/product_inventory', [
  body('id').isUUID(4),
  body('inventory').isInt({min: 0})
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const query = read_sql('./api/sql/product_inventory/insert.sql')
  const payload = {
    product_id: req.body.id,
    inventory: req.body.inventory
  }
  const [status, response] = await execute_query(mysql.format(query, payload))
  if (status) {
    res.json(response)
  }
  else {
    res.status(400).json(response)
  }
})

app.post('/product_version', [
  body('id').isUUID(4),
  body('name').isLength({max: 64}),
  body('price').isInt({min: 0}),
  body('description').isLength({max: 65535}).optional()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const query = read_sql('./api/sql/product_version/insert.sql')
  const payload = {
    product_id: req.body.id,
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

module.exports = app