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
      console.log(req.body)
      res.json({user: req.user})
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
  }), (req, res) => {
    try {
      
      res.json(user)
    } catch (error) {
      console.error('Clave erronea')
    }
  }
);

router.post("/logout", (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    // res.redirect('/');
  });
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    } else {
      res.clearCookie('connect.sid');
      res.json({ message: 'Sesión cerrada correctamente' });
    }
  })
  res.json("Deslogeado")
});
router.get("/logout", (req, res) => {
  req.logOut(function(err) {
    if (err) { return next(err); }
    // res.redirect('/');
  });
  res.json("Deslogeado")
 });


router.get("/signup", (req, res) => {
  res.send("Hello signup");
});

module.exports = router;
