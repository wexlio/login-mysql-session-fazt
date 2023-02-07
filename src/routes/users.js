const express = require("express");
const router = express.Router();

const pool = require("../database");
const { isLoggedIn, isNotLoggedIn } = require("./auth");

router.get("/profile", isLoggedIn, async (req, res) => {
  try {
    const result = await pool.query("select * from users");

    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("algo ocurrio mal");
  }

  //   res.send("Retrienving a list of task1");
});

router.get("/profile/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("select * from users where id = ?", [id]);
    console.log(result);
    result.length === 0
      ? res.status(404).json({ mensagge: "task not found" })
      : res.json(result);
  } catch (error) {
    console.error('ocurrioo algo inestperado')
  }
});

module.exports = router;