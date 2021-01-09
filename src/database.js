const mysql = require('mysql')
const { database } = require('./keys')
const { promisify } = require('util')
const pool = mysql.createPool(database)
pool.getConnection((err, conn)=>{
  if(err){
    if(err.code === 'PROTOCOL_CONNECTION_LOST') console.error('database connection lost')
    if(err.code === 'ER_CON_COUNT_ERROR') console.error('database has to many connection')
    if(err.code === 'ECONNREFUSED') console.error('database connection was refused')
  }
  if(conn)conn.release()
  console.log('DB is connected')
  return
})
pool.query = promisify(pool.query)
module.exports = pool