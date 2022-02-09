const express = require('express');
const { Pool } = require('pg');
const app = express();


const pool = new Pool({
    user:'abiya',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'Mohan',
    port:5432
});

app.get("/customers", (req, res) => {
    pool.query(`SELECT * FROM customers`, (error, result) => {
       if(error) {
           res.status(500).send(error);
       } else {
            res.json(result.rows);
       }
    });
});

app.get("/suppliers", (req, res) => {
    pool.query(`SELECT * FROM suppliers`, (error, result) => {
       if(error) {
           res.status(500).send(error);
       } else {
            res.json(result.rows);
       }
    });
});

app.get("/products", (req, res) => {
    pool.query(`SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name 
                FROM product_availability INNER JOIN products ON products.id = product_availability.prod_id 
                INNER JOIN suppliers ON suppliers.id = product_availability.supp_id`, (error, result) => {
       if(error) {
           res.status(500).send(error);
       } else {
            res.json(result.rows);
       }
    });
});

app.listen(3001, function() {
    console.log("Server is listening on port 3001")
});