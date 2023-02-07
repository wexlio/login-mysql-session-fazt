const express = require("express");
const router = express.Router();

const pool = require("../database");

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("select * from tasks");

    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("algo ocurrio mal");
  }

  //   res.send("Retrienving a list of task1");
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("select * from tasks where id = ?", [id]);
    console.log(result);
    result.length === 0
      ? res.status(404).json({ mensagge: "task not found" })
      : res.json(result);
  } catch (error) {
    console.error('ocurrioo algo inestperado')
  }
});

router.post("/add", async (req, res) => {
  const { title, description } = req.body;
  const newTask = {
    title,
    description,
  };
  const result = await pool.query("INSERT INTO tasks set ?", [newTask]);
  console.log(result);
  res.send("Recibido correctamente");
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "delete from tasks where id = ?",
      [id]
    );
    console.log(result);
    result.length === 0
      ? res.status(404).json({ mensagge: "task not found" })
      : res.sendStatus(204);
  } catch (error) {
    console.error("ocurrio algo inesperado");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await pool.query(
      "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
      [title, description, id]
    );
    console.log(result);
    result.length === 0
      ? res.status(404).json({ mensagge: "task not found" })
      : res.send(result);
  } catch (error) {
    console.error("ocurrio algo inesperado");
  }
});

module.exports = router;
