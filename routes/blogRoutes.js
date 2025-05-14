const express = require("express");
const router = express.Router();
const blogController = require("../Controllers/blogControllers");

// Halaman Blog - Daftar artikel blog
router.get("/", blogController.getBlogList); // Renders blog list page

// Halaman Detail Blog
router.get("/:id", blogController.getBlogDetail); // Renders single article page

// Menyimpan artikel blog dari admin
router.post("/admin/blog/insert", blogController.insertBlog);

// Rute untuk mengupdate artikel blog
router.post("/admin/blog/update/:id", blogController.updateBlog);

// Rute untuk menghapus artikel blog
router.post("/admin/blog/delete/:id", blogController.deleteBlog);

module.exports = router;
