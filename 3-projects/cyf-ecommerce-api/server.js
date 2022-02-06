const express = require("express");
const app = express();

app.listen(3000, () => {
    console.log("Server is listening on port 3000. Ready to accept request!");
});

const { Pool } = require('pg');

const pool = new Pool({
    user: 'tenzingeks',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: null,
    port: 5432
});

app.get("/customers", (req, res) => {
    pool
    .query('SELECT * FROM customers')
    .then((result) => res.json(result.rows))
    .catch((error) => {
        console.error(error);
        res.status(500).json(error);
    });
});

app.get("/suppliers", (req, res) => {
    pool
    .query('SELECT * FROM suppliers')
    .then((result) => res.json(result.rows))
    .catch((error) => {
        console.error(error);
        res.status(500).json(error);
    });
});

app.get("/products", (req, res) => {
    pool
        .query('SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM product_availability INNER JOIN products ON products.id = product_availability.prod_id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id;')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});