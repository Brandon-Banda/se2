const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const bodyParser = require("body-parser");

const app = express();
app.use(
  cors({
    origin: true,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(bodyParser.json());

// https://www.sammeechward.com/connect-to-mysql-from-node

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
  const category = request.query.category;

  const query = `SELECT * FROM cbmtable1 WHERE ${category} LIKE '${searchTerm}'`;

  console.log(
    "searchTerm is " +
      searchTerm +
      " and category is " +
      category +
      " and query is " +
      query
  );

  if (!searchTerm || !category) {
    return response
      .status(400)
      .json({ error: "Both 'term' and 'category' are required parameters." });
  }

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

// insertion of key-value pair JSON data into the query https://stackoverflow.com/questions/40930896/how-to-create-and-insert-a-json-object-using-mysql-queries

app.post("/add", (request, response) => {
  // can make a const values = [req.body.whatever, etc]
  const item1 = request.body.item1;
  const item2 = request.body.item2;
  const subject = request.body.subject;
  const course = request.body.course;
  const crn = request.body.crn;
  const item6 = request.body.item6;
  const building = request.body.building;
  const room = request.body.room;
  const days = request.body.days;
  const time = request.body.time;
  const duration = request.body.time;
  const semester = request.body.semester;
  const year = request.body.year;
  const room_type = request.body.room_type;
  const enrollment = request.body.enrollment;
  const enrollment_excess = request.body.enrollment_excess;
  const enrollment_de_excess = request.body.enrollment_de_excess;
  const enrollment_ugl_affected = request.body.enrollment_ugl_affected;
  const enrollment_ugu_affected = request.body.enrollment_ugu_affected;

  const query = `INSERT INTO cbmtable1 (item1, item2, subject, course, crn, item6, building, room, days, time, duration, semester, year, room_type, enrollment, enrollment_excess, enrollment_de_excess, enrollment_ugl_affected, enrollment_ugu_affected) VALUES (?, ?, ?, ?, ?, ?, ? ,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  // can change this to [...values]
  db.query(
    query,
    [
      item1,
      item2,
      subject,
      course,
      crn,
      item6,
      building,
      room,
      days,
      time,
      duration,
      semester,
      year,
      room_type,
      enrollment,
      enrollment_excess,
      enrollment_de_excess,
      enrollment_ugl_affected,
      enrollment_ugu_affected,
    ],
    (err, data) => {
      if (err) {
        console.error("Error executing MySQL query: ", err);
      } else {
        response.send("You have added an entry to the DB");
      }
    }
  );
});

app.delete("/delete/:crn", (req, res) => {
  const crn = req.params.crn;
  console.log("CRN IS " + crn);
  const q = `DELETE FROM cbmtable1 WHERE crn = ?`;

  db.query(q, [crn], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/update/:crn/:category", (req, res) => {
  const crn = req.params.crn;
  const category = req.params.category;

  const q = `UPDATE cbmtable1 SET ${category} = ? WHERE crn = ?`;

  const values = req.body.value;

  console.log("CRN is " + crn);
  console.log(values);

  db.query(q, [values, crn], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
