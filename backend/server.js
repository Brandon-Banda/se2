const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

const app = express();
app.use(cors());

app.use(bodyParser.json());

const db = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.listen(8800, () => {
  console.log("Listener Online");
});

app.get("/", (request, response) => {
  const q = `SELECT * FROM cbmtable1`;
  db.query(q, (err, data) => {
    if (err) return response.json(err);
    return response.json(data);
  });
});

// Able to search and display a certain record
app.get("/search", (request, response) => {
  const searchTerm = request.query.term;
  const query = `SELECT * FROM cbmtable1 WHERE course LIKE '${searchTerm}'`;
  console.log("searchTerm is " + searchTerm + " and query is " + query);

  db.query(query, (err, data) => {
    if (err) {
      console.error("Error executing MySQL query: ", err);
      response.status(500).json({ error: "Error executing MySQL query" });
      return;
    }
    response.json(data);
  });
});

// Able to change data in an existing record
// Able to add and delete a record
