const express = require("express");
const bodyParser = require("body-parser");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

// PostgreSQL Connection Pool
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "open_case_dev",
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "123123",
});

// Test Database Connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error("Error acquiring client", err.stack);
  }
  console.log("Connected to PostgreSQL!");
  client.release();
});

// --- Define API Endpoints (CRUD for Tasks) ---

// GET all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM tasks ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching tasks", err);
    res.status(500).send("Server error");
  }
});

// GET a single task by ID
app.get("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Task not found");
    }
  } catch (err) {
    console.error("Error fetching task", err);
    res.status(500).send("Server error");
  }
});

// POST a new task
app.post("/api/tasks", async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating task", err);
    res.status(500).send("Server error");
  }
});

// PUT (update) an existing task
app.put("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE tasks SET title = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      [title, description, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Task not found");
    }
  } catch (err) {
    console.error("Error updating task", err);
    res.status(500).send("Server error");
  }
});

// DELETE a task
app.delete("/api/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length > 0) {
      res.status(200).send("Task deleted");
    } else {
      res.status(404).send("Task not found");
    }
  } catch (err) {
    console.error("Error deleting task", err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
