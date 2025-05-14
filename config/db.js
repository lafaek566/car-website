require("dotenv").config(); // Load .env config
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

connection.connect((err) => {
  if (err) {
    console.error("Gagal terhubung ke database: " + err.stack);
    return;
  }
  console.log("Terhubung ke database dengan id " + connection.threadId);
});

module.exports = connection;
