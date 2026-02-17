require('dotenv').config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const chatPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_CHAT,
    port: 4000,
    ssl: { rejectUnauthorized: true }
});
const watamelonPool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME_WATAMELON,
    port: 4000,
    ssl: { rejectUnauthorized: true }
});

app.get("/chat/data", (req, res) => {
    chatPool.query("SELECT * FROM my_table", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
app.post("/chat/add", (req, res) => {
    const { name, words } = req.body;
    const sql = "INSERT INTO my_table (name, words) VALUES (?, ?)";

    chatPool.query(sql, [name, words], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error inserting data");
        } else {
            res.json({ message: "Data added successfully!" });
        }
    });
});

app.get("/watamelon/scores", (req, res) => {
    const possibleSorts = ["score DESC", "score ASC", "time_created DESC", "time_created ASC", "name ASC", "name DESC"];
    let sortBy = req.query.sort;
    if (!possibleSorts.includes(sortBy)) sortBy = possibleSorts[0];
    // this "hard coding" is so no bad sql injections can happen or so it can't be sorted by a "nonsense" value which would cause errors
    watamelonPool.query(`SELECT * FROM scores ORDER BY ${sortBy}`, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
});
app.post("/watamelon/scores", (req, res) => {
    const { name, score } = req.body;
    const sql = "INSERT INTO scores (name, score) VALUES (?, ?)";
    
    watamelonPool.query(sql, [name, score], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error inserting data");
        } else {
            res.json({ message: "Data added successfully!" });
        }
    });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));