const mysql = require('mysql2/promise')
const fs = require('fs')

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
