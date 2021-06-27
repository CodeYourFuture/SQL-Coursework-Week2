const express = require("express");
const app = express();

const { Pool } = require("pg")

const pool = new Pool({
    user: "coder",
    host: "localhost",
    database: "cyf_ecommerce",
    password: "codeyourfuture",
    port: 5432
})

app.get("/customers", (req, res) => {
    pool.query("SELECT * FROM customers", (error, result) => {
        res.json(result.rows);
    });
});

app.get("/suppliers", (req, res) => {
    pool.query("SELECT * FROM suppliers", (error, result) => {
        res.json(result.rows);
    });
});

const port = process.env.PORT || 5000
app.listen(port, function () {
    console.log(`Your app is listening on port ${port}`)
})