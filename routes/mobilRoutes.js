const express = require("express");
const router = express.Router();
const mobilController = require("../Controllers/mobilControllers");
const db = require("../config/db");

// Halaman utama - list mobil
router.get("/", mobilController.getMobilList);

// API endpoint khusus JSON
router.get("/mobils", mobilController.getMobilListJSON);

router.get("/admin/mobil/:id", mobilController.getMobilById);

// Halaman admin - form input mobil
router.get("/admin", mobilController.getAdminPage);

router.get("/admin/mobils", mobilController.getAdminPageJSON);

// Menangani POST request untuk menyimpan data mobil
router.post("/admin/insert", mobilController.insertMobil);

// Route baru, menampilkan mobil berdasarkan brand dan id mobil
router.get("/brand/:brand/mobil/:id", mobilController.getMobilByBrandAndId);

// Update data mobil berdasarkan ID
router.put("/admin/:id", mobilController.updateMobil);

// Hapus data mobil berdasarkan ID
router.delete("/admin/:id", mobilController.deleteMobil);

// Halaman detail mobil berdasarkan ID
router.get("/mobil/:id", mobilController.getMobilDetail);

// Fitur pencarian mobil
router.get("/search", async (req, res) => {
  const query = req.query.q || "";
  try {
    const [mobilList] = await db
      .promise()
      .query(`SELECT * FROM mobils WHERE nama LIKE ? OR spesifikasi LIKE ?`, [
        `%${query}%`,
        `%${query}%`,
      ]);

    res.render("index", { mobilList, query }); // Gunakan template index.ejs
  } catch (err) {
    console.error("Kesalahan saat mencari mobil:", err);
    res.status(500).send("Terjadi kesalahan saat mencari mobil.");
  }
});

module.exports = router;
