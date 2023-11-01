const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
//const dotenv = require('dotenv');
//dotenv.config()

const app = express()
app.use(cors())

// ** TODO ** Move to env variables
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'admin',
    database:'cbm'
})

app.listen(8800, ()  => {
    console.log("Listener Online")
})

app.get('/', (request, response) => {
    const q = "SELECT * FROM cbmtable1"
    db.query(q,(err,data) => {
        if(err) return response.json(err)
        return response.json(data)
    })
})