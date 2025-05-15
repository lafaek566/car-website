const db = require("../config/db.js");

// Get mobil by brand and id
// Controller: perbaiki kolom brand -> merek
exports.getMobilByBrandAndId = (req, res) => {
  const { brand, id } = req.params;

  const query = "SELECT * FROM mobils WHERE id = ? AND merek = ?";
  db.query(query, [id, brand], (err, results) => {
    if (err) return res.status(500).json({ message: "Error server" });
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Mobil tidak ditemukan untuk merek ini" });
    }
    res.json(results[0]);
  });
};

// Get mobil by id
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

// Get list of all mobils
exports.getMobilList = (req, res) => {
  db.query("SELECT * FROM mobils", (err, results) => {
    if (err) {
      console.error("Error getting mobil list:", err);
      return res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil data mobil." });
    }

    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json({ mobilList: results });
    }

    res.render("index", { mobilList: results, query: "" });
  });
};

// Admin page with list
exports.getAdminPage = (req, res) => {
  db.query("SELECT * FROM mobils", (err, results) => {
    if (err) {
      console.error("Error getting mobil list for admin:", err);
      return res
        .status(500)
        .json({ error: "Terjadi kesalahan saat mengambil data mobil." });
    }

    if (req.headers.accept && req.headers.accept.includes("application/json")) {
      return res.status(200).json({ mobilList: results });
    }

    res.render("admin", { mobilList: results });
  });
};

// Get mobil list JSON only
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

// Get admin page JSON only
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

// Insert new mobil with brand
exports.insertMobil = (req, res) => {
  const { nama, spesifikasi, gambar_url, brand } = req.body;

  if (!req.body) {
    console.error("Request body is undefined");
    return res.status(400).json({ error: "Request body is missing" });
  }

  if (!nama || !spesifikasi || !gambar_url || !brand) {
    return res.status(400).json({
      error: "Semua field harus diisi (nama, spesifikasi, gambar_url, brand)",
    });
  }

  const query =
    "INSERT INTO mobils (nama, spesifikasi, gambar_url, brand) VALUES (?, ?, ?, ?)";
  db.query(query, [nama, spesifikasi, gambar_url, brand], (err, result) => {
    if (err) {
      console.error("Error inserting mobil:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(201).json({ message: "Mobil berhasil ditambahkan" });
  });
};

// Update mobil by id with brand
exports.updateMobil = (req, res) => {
  const { id } = req.params;
  const { nama, spesifikasi, gambar_url, brand } = req.body;

  if (!nama || !spesifikasi || !gambar_url || !brand) {
    return res.status(400).json({
      error: "Semua field harus diisi (nama, spesifikasi, gambar_url, brand)",
    });
  }

  const query =
    "UPDATE mobils SET nama = ?, spesifikasi = ?, gambar_url = ?, brand = ? WHERE id = ?";
  db.query(query, [nama, spesifikasi, gambar_url, brand, id], (err, result) => {
    if (err) {
      console.error("Error updating mobil:", err);
      return res.status(500).json({ error: "Gagal memperbarui data mobil." });
    }
    res.status(200).json({ message: "Mobil berhasil diperbarui!" });
  });
};

// Delete mobil by id
exports.deleteMobil = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM mobils WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Error deleting mobil:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.status(200).json({ message: "Mobil berhasil dihapus" });
  });
};

// Render mobil detail page
exports.getMobilDetail = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM mobils WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).send("Error server");
    if (results.length === 0)
      return res.status(404).send("Mobil tidak ditemukan");

    res.render("mobilDetail", { mobil: results[0] }); // misal render ke mobilDetail.ejs
  });
};
