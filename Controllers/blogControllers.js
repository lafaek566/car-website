const db = require("../config/db.js");

exports.getBlogList = (req, res) => {
  db.query("SELECT * FROM blogs", (err, results) => {
    if (err) throw err;
    res.render("blog", { articles: results });
  });
};
exports.getBlogDetail = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM blogs WHERE id = ?", [id], (err, results) => {
    if (err) throw err;
    if (results.length === 0) {
      return res.send("Artikel tidak ditemukan.");
    }
    res.render("blog-detail", { article: results[0] });
  });
};

exports.insertBlog = (req, res) => {
  const { title, excerpt, content } = req.body;

  db.query(
    "INSERT INTO blogs (title, excerpt, content) VALUES (?, ?, ?)",
    [title, excerpt, content],
    (err, result) => {
      if (err) throw err;
      res.redirect("/blog");
    }
  );
};

exports.updateBlog = (req, res) => {
  const { id } = req.params;
  const { title, excerpt, content } = req.body;
  const query = `UPDATE blogs SET title = ?, excerpt = ?, content = ? WHERE id = ?`;
  db.query(query, [title, excerpt, content, id], (err, result) => {
    if (err) throw err;
    res.redirect("/admin");
  });
};

exports.deleteBlog = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM blogs WHERE id = ?`;
  db.query(query, [id], (err, result) => {
    if (err) throw err;
    res.redirect("/admin");
  });
};
