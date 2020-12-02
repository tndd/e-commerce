const bodyParser = require('body-parser')
const app = require('express')()
const { param, body, validationResult } = require('express-validator')
const mysql = require('mysql2/promise')
const { uuid } = require('uuidv4')
const { execute_query, execute_queries, read_sql } = require('../index')

app.use(bodyParser.json())


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

module.exports = app