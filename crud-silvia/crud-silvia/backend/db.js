// backend/db.js
const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Ganti dengan username MySQL Anda
  password: "", // Ganti dengan password MySQL Anda
  database: "crud_db", // Ganti dengan nama database Anda
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database.");
});

module.exports = db;
