const express = require("express");
const app = express();
const { Pool } = require("pg");

const db = new Pool({
    user: "fatih",
    host: "localhost",
    database: "cyf_ecommerce",
    password: "1",
    port: 5432,
});

app.get("/customers", (req, res) => {
    db.query("select * from customers", (err, result) => {
        res.json(result.rows);
    });
});

app.get("/suppliers", (req, res) => {
    db.query("select * from suppliers", (err, result) => {
        res.json(result.rows)
    })
})

app.get("/products", (req, res) => {
    db.query(
        "select p.product_name, p_a.unit_price, s.supplier_name from products p inner join product_availability p_a on p.id = p_a.prod_id inner join suppliers s on p_a.supp_id = s.id", (err, result) => {
            res.json(result.rows);
        });
});

app.listen(3030, function () {
    console.log("Server is listening on port 3030. Ready to accept requests!");
});