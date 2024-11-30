const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "analytics-latest"
});

module.exports.getConnectionPool = () => {
    return mysqlPool;
}

module.exports.getConnection = () => {
    return mysqlPool.getConnection();
}