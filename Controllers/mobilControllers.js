const db = require("../config/db.js");

exports.getMobilById = (req, res) => {
  const { id } = req.params;

  db.query("SELECT * FROM mobils WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error getting mobil:", err);
      return res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil data mobil." });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Mobil tidak ditemukan." });
    }

    res.status(200).json(results[0]);
  });
};

exports.getMobilList = (req, res) => {
  db.query("SELECT * FROM mobils", (err, results) => {
    if (err) {
      console.error("Error getting mobil list:", err);
      return res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil data mobil." });
    }

    // Jika request dari Postman (expecting JSON)
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json({ mobilList: results });
    }

    // Jika request dari browser
    res.render("index", { mobilList: results, query: "" });
  });
};

exports.getAdminPage = (req, res) => {
  db.query("SELECT * FROM mobils", (err, results) => {
    if (err) {
      console.error("Error getting mobil list for admin:", err);
      return res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil data mobil." });
    }

    // Jika request dari Postman (expecting JSON)
    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json({ mobilList: results });
    }

    // Jika request dari browser
    res.render("admin", { mobilList: results });
  });
};

exports.getMobilListJSON = (req, res) => {
  db.query("SELECT * FROM mobils", (err, results) => {
    if (err) {
      console.error("Error getting mobil list:", err);
      return res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil data mobil." });
    }
    res.status(200).json({ data: results });
  });
};

exports.getAdminPageJSON = (req, res) => {
  db.query("SELECT * FROM mobils", (err, results) => {
    if (err) {
      console.error("Error getting mobil list for admin:", err);
      return res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil data mobil." });
    }
    res.status(200).json({ data: results });
  });
};

exports.insertMobil = (req, res) => {
  const { nama, spesifikasi, gambar_url } = req.body;

  // If req.body is undefined, log it for debugging
  if (!req.body) {
    console.error("Request body is undefined");
    return res.status(400).json({ error: "Request body is missing" });
  }

  if (!nama || !spesifikasi || !gambar_url) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Insert logic to store the data in the database
  const query =
    "INSERT INTO mobils (nama, spesifikasi, gambar_url) VALUES (?, ?, ?)";
  db.query(query, [nama, spesifikasi, gambar_url], (err, result) => {
    if (err) {
      console.error("Error inserting mobil:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Mobil added successfully" });
  });
};

exports.updateMobil = (req, res) => {
  const { id } = req.params;
  const { nama, spesifikasi, gambar_url } = req.body;

  const query =
    "UPDATE mobils SET nama = ?, spesifikasi = ?, gambar_url = ? WHERE id = ?";
  db.query(query, [nama, spesifikasi, gambar_url, id], (err, result) => {
    if (err) {
      console.error("Error updating mobil:", err);
      return res.status(500).json({ error: "Gagal memperbarui data mobil." });
    }
    res.status(200).json({ message: "Mobil berhasil diperbarui!" });
  });
};

exports.deleteMobil = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM mobils WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting mobil:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ message: "Mobil deleted successfully" });
  });
};

exports.getMobilDetail = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM mobils WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.send("Mobil tidak ditemukan.");
    }
    res.render("detail", { mobil: results[0] });
  });
};
