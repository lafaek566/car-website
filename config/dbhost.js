// require("dotenv").config(); // Load .env config
// const mysql = require("mysql2");

// // Gunakan nilai dari environment variable atau fallback ke default (untuk local dev)
// const connection = mysql.createConnection({
//   host: process.env.DB_HOST || "sql12.freesqldatabase.com",
//   user: process.env.DB_USER || "sql12778860",
//   password: process.env.DB_PASS || "NMPAAr9fgi",
//   database: process.env.DB_NAME || "sql12778860",
//   port: process.env.DB_PORT || 3306,
// });

// connection.connect((err) => {
//   if (err) {
//     console.error("❌ Gagal terhubung ke database: " + err.stack);
//     return;
//   }
//   console.log("✅ Terhubung ke database dengan ID " + connection.threadId);
// });

// module.exports = connection;
