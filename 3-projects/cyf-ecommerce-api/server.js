const express = require("express");
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
    user: '',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: ''
})

app.get("/customers", (req, res) => {
    pool.query('SELECT * FROM customers')
        .then(result => {
            // send all the data that comes from database into the frontend
            res.json(result.rows)
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error)
        })
})

app.get("/suppliers", (req, res) => {
    pool.query('SELECT * FROM suppliers')
        .then(result => {
            res.json(result.rows)
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error)
        })
})

app.get("/products", (req, res) => {
    pool.query(`SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM product_availability 
                    INNER JOIN products ON product_availability.prod_id = products.id
                    INNER JOIN suppliers ON product_availability.supp_id = suppliers.id`)
        .then(result => {
            res.json(result.rows)
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json(error)
        })
})

app.listen(3000, () => {
    console.log("server is running")
})