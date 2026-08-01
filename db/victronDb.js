const mysql = require('mysql2/promise');

const victronPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.VICTRON_DB_USER,
    database: process.env.VICTRON_DB_NAME,
    password: process.env.VICTRON_DB_PASS || '',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

module.exports = victronPool;