const mysql = require('mysql2');
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    //password: 'se tiver',
    database: 'todo_db'
});
module.exports = pool.promise();

