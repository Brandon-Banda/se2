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

// INSERT INTO cbmtable1 (item1, item2, subject, course, crn, item6, building, room, days, time, duration, semester, year, room_type, enrollment, enrollment_excess, enrollment_de_excess, enrollment_ugl_affected, enrollment_ugu_affected)

// VALUES ('5', '003639', '1337', '11111', 'X', '0509', '102', '135', '0800', '075', '2', '2017', '110', '001', '000', '027');

app.post("/add", (request, response) => {
  const query =
    "INSERT INTO cbmtable1 (`item1`, `item2`, `subject`, `course`, `crn`, `item6`, `building`, `room`, `days`, `time`, `duration`, `semester`, `year`, `room_type`, `enrollment`, `enrollment_excess`, `enrollment_de_excess`, `enrollment_ugl_affected`, `enrollment_ugu_affected`) VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";

  // VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)

  const values = [req.query.item1, req.query.item2];

  db.query(query, [values], (err, data) => {
    if (err) {
      console.error("Error executing MySQL query: ", err);
      response.status(500).json({ error: "Error executing MySQL query" });
      return;
    }
    response.json(data);
  });
});
