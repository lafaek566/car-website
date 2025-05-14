require("dotenv").config(); // Load .env config
const express = require("express");
const session = require("express-session");
const path = require("path"); // Make sure to import 'path'
const db = require("./config/db.js");

const app = express();
const PORT = process.env.PORT || 3000;

// Import routes
const mobilRoutes = require("./routes/mobilRoutes");
const blogRoutes = require("./routes/blogRoutes");
const authRoutes = require("./routes/authRoutes");
const aboutRoutes = require("./routes/aboutRoutes");

// Setup view engine
app.set("view engine", "ejs");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Setup session
app.use(
  session({
    secret: process.env.SESSION_SECRET || "default-secret",
    resave: false,
    saveUninitialized: true,
  })
);

// Use other routes
app.use("/", mobilRoutes);
app.use("/blog", blogRoutes);
app.use("/", authRoutes);
app.use("/", aboutRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
