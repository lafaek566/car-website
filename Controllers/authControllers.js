const bcrypt = require("bcryptjs");
const db = require("../config/db");

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      return res.status(500).send("Database error");
    }

    if (results.length === 0) {
      return res.status(401).send("User not found");
    }

    const user = results[0];

    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).send("Error comparing password");
      }

      if (isMatch) {
        req.session.user = user;
        return res.redirect("/");
      } else {
        return res.status(401).send("Incorrect password");
      }
    });
  });
};

exports.registerPage = (req, res) => {
  res.render("register");
};

exports.register = (req, res) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).send("Error hashing password");
    }

    db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword],
      (err, results) => {
        if (err) {
          return res.status(500).send("Database error");
        }

        req.session.user = { id: results.insertId, name, email };
        return res.redirect("/");
      }
    );
  });
};

exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("Error logging out");
    }
    res.redirect("/");
  });
};
