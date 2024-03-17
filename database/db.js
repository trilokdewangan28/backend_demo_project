const { createPool } = require("mysql2");

const conn = createPool({
    port:3306,
    host:'localhost',
    user:'root',
    password:'',
    database:'demo',
    connectionLimit:10
});
module.exports = conn;