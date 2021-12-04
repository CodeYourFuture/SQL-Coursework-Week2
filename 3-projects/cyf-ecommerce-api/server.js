const express = require('express');
const app = express();
const { Pool } = require('pg');

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "cyf_ecommerce",
    password: "",
    port: 5432,
});

app.get(`/customers`, (req, res)=>{
    pool.query("SELECT * FROM customers", (error, result) => {
        res.json(result.rows);
    });
});

app.get(`/suppliers`, (req, res) => {
    pool.query("SELECT * FROM suppliers", (error, result) => {
        res.json(result.rows);
    });
});

// the product names along with their prices and supplier names.

app.get(`/products`, (req, res) => {
    pool.query(
      "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON product_availability.prod_id = products.id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id",
      (error, result) => {
        res.json(result.rows);
      }
    );
});

app.listen(3000, ()=>{
    console.log(`Server is listening`);
})