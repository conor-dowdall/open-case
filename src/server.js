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

// --- Define API Endpoints (CRUD for Cases) ---

// GET all cases
app.get("/api/cases", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM cases ORDER BY updated_at ASC;"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching cases", err);
    res.status(500).send("Server error");
  }
});

// GET a single case by ID
app.get("/api/cases/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM cases WHERE id = $1", [id]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Case not found");
    }
  } catch (err) {
    console.error("Error fetching case", err);
    res.status(500).send("Server error");
  }
});

// POST a new case
app.post("/api/cases", async (req, res) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO cases (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating case", err);
    res.status(500).send("Server error");
  }
});

// PUT (update) an existing case
app.put("/api/cases/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "UPDATE cases SET title = $1, description = $2, updated_at = NOW() WHERE id = $3 RETURNING *",
      [title, description, id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).send("Case not found");
    }
  } catch (err) {
    console.error("Error updating case", err);
    res.status(500).send("Server error");
  }
});

// DELETE a case
app.delete("/api/cases/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM cases WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rows.length > 0) {
      res.status(200).send("Case deleted");
    } else {
      res.status(404).send("Case not found");
    }
  } catch (err) {
    console.error("Error deleting case", err);
    res.status(500).send("Server error");
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
