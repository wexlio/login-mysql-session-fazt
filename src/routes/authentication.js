const express = require("express");
const bcryptjs = require("bcryptjs");
const router = express.Router();

const pool = require("../database");
const passport = require("passport");
const { isLoggedIn, isNotLoggedIn } = require("./auth");

router.get("/signin", (req, res) => {
  res.json("Hello login");
});

router.post("/signin", passport.authenticate("local.signin", {
    
    // failureRedirect: "/signin",
  }) ,
  function(req, res) {
    try {
      
      res.json({username: req.body.username, user: req.user})
    } catch (error) {
      console.error('Clave erronea')
    }
    // res.redirect('/profile')
  }
);

router.post(
  "/signup",
  passport.authenticate("local.signup", {
    successRedirect: "/",
    failureRedirect: "/signup",
  })
);

router.get("/signup", (req, res) => {
  res.send("Hello signup");
});

router.get("/logout", (req, res) => {
  res.send("Hello logout");
});

module.exports = router;
