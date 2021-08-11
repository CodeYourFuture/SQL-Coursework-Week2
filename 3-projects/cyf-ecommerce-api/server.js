const express = require("express");
const app = express();

const { Pool } = require("pg")

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cyf_ecommerce",
    password: "9801",
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
    })
})

const port = process.env.PORT || 3000
app.listen(port, function () {
    console.log(`App is listening on port: ${port}`)
})