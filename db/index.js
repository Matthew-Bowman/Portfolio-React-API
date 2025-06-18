// db/index.js

const mysql = require('mysql2/promise');

// Create and export a MySQL connection pool

console.log('-----')
console.log(process.env.DB_HOST)
console.log(process.env.DB_USER)
console.log(process.env.DB_NAME)
console.log(process.env.DB_PASS)

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS || '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = pool;
