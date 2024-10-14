// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Endpoint untuk mendapatkan semua data ikan
app.get("/api/ikan", (req, res) => {
  db.query("SELECT * FROM ikan", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Endpoint untuk menambahkan ikan
app.post("/api/ikan", (req, res) => {
  const newIkan = req.body;
  db.query("INSERT INTO ikan SET ?", newIkan, (err) => {
    if (err) throw err;
    res.status(201).send("Ikan ditambahkan.");
  });
});

// Endpoint untuk menghapus ikan
app.delete("/api/ikan/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM ikan WHERE id = ?", [id], (err) => {
    if (err) throw err;
    res.send("Ikan dihapus.");
  });
});

// Endpoint untuk memperbarui ikan
app.put("/api/ikan/:id", (req, res) => {
  const { id } = req.params;
  const updatedIkan = req.body;

  db.query("UPDATE ikan SET ? WHERE id = ?", [updatedIkan, id], (err) => {
    if (err) {
      return res.status(500).send("Error updating ikan");
    }
    res.send("Ikan diperbarui.");
  });
});

// Mulai server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
