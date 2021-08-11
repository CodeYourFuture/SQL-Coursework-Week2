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