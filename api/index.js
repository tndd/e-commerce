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

export const execute_query = async (query) => {
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

export const execute_queries = async (queries) => {
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

export const read_sql = (path) => {
  return fs.readFileSync(path).toString()
}

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
  body('transaction_id').isUUID(4),
  body('status').isIn(['WAITING_SHIPPING','SHIPPED','WAITING_RECEIVING','RECEIVED','CANCEL'])
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const query = read_sql('./api/sql/transaction_progress/insert.sql')
  const payload = {
    transaction_id: req.body.transaction_id,
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