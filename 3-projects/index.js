const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
const pool = new Pool({
  user: "daniel.piga",
  host: "localhost",
  database: "postgres",
  password: "",
  port: 5432,
});


app.get("/customers", (req, res) => {
    pool.query("SELECT * FROM customers", (err, results) => {
        if (err) {
        throw err;
        }
        res.json(results.rows);
    });
});

app.get("/suppliers", (req, res) => {
    pool.query("SELECT * FROM suppliers", (err, results) => {
        if (err) {
        throw err;
        }
        res.json(results.rows);
    });

 });




app.listen(4000, () => console.log('app listening on port 4000'));