// Requiring path to so we can use relative routes to our HTML files
const router = require("express").Router();
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");

/**
 * Home Page
 */
router.get("/", (req, res) => {
  if (req.user) {
    res.redirect("/home");
  } else {
    res.render("login", { user: req.user });
  }
});

/**
 * Home Page, again
 */
router.get("/home", (req, res) => {
  res.render("index", { user: req.user });
});

/**
 * Signup page
 */
router.get("/signup", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("signup", { user: req.user });
  }
});

/**
 * Login page
 */
router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/");
  } else {
    res.render("login", { user: req.user });
  }
});

/*** employee page*/
router.get("/employee", isAuthenticated, (req, res) => {
  db.Employee.findAll({ raw: true, include: [db.Department] }) // Joins User to Posts! And scrapes all the seqeulize stuff off
    .then((dbModel) => {
      res.render("employee", { user: req.user, Employee: dbModel });
    })
    .catch((err) => res.status(422).json(err));
});

/**
 * Finances page
 */
router.get("/finances", isAuthenticated, (req, res) => {
  db.Employee.findAll({ raw: true, include: [db.Department] }) // Joins User to Posts! And scrapes all the seqeulize stuff off
    .then((dbModel) => {
      console.log(dbModel);
      res.render("finances", { user: req.user, Employee: dbModel });
    })
    .catch((err) => res.status(422).json(err));
});

router.get("/departments", isAuthenticated, (req, res) => {
  db.Department.findAll({ raw: true })
    .then((dbModel) => {
      res.render("department", { user: req.user, Department: dbModel });
    })
    .catch((err) => res.status(422).json(err));
});

/**
 * Generic Error Page
 */
router.get("*", (req, res) => {
  res.render("errors/404", { user: req.user });
});

module.exports = router;
