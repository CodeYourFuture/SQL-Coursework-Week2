const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: '',
    port: 5432
});

app.get("/", (req, res) => res.send("Server is running!"));

app.get("/customers", function (req, res) {
    pool.query('SELECT * FROM customers')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});

app.get("/suppliers", (req, res) => {
    pool.query('SELECT * FROM suppliers')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.log(error);
            res.status(500).json(error);
        })
});

app.get("/products", (req, res) => {
    pool.query(
    `SELECT products.product_name, suppliers.supplier_name, product_availability.unit_price
    FROM products
    INNER JOIN product_availability ON products.id=product_availability.prod_id
    INNER JOIN suppliers ON product_availability.supp_id=suppliers.id`
    )
    .then((result)=> res.json(result.rows))
    .catch((error)=>{
        console.log(error); 
        res.status(500).json(error);
    });
});

const listener = app.listen(PORT, () => {
    console.log(`App listening on port:${PORT}`)
});
