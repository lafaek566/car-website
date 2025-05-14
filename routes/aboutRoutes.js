// routes/aboutRoutes.js
const express = require("express");
const router = express.Router();

// Render About page
router.get("/about", (req, res) => {
  res.render("about");
});

module.exports = router;
