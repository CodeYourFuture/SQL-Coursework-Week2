const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

const { Pool } = require('pg');

const pool = new Pool({
    user: 'nishka_kisten',
    host: 'dpg-cecc7tcgqg4ap4bq2290-a.oregon-postgres.render.com',
    database: 'cyf_ecommerce',
    password: 'HZC11DbvBmrukH78YiiUI9pBE1sTTUlO',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

app.get("/customers", function(req, res) {
    pool.query('SELECT * FROM customers')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});

app.get("/suppliers", function(req, res) {
    pool.query('SELECT * FROM suppliers')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});

app.get("/products", function(req, res) {
    pool.query('SELECT p.product_name , pa.unit_price , s.supplier_name FROM products p INNER JOIN product_availability pa ON p.id = pa.prod_id INNER JOIN suppliers s ON pa.supp_id = s.id')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});

app.listen(port, function() {
    console.log(`Server is listening on port ${port}. Ready to accept requests`);
});