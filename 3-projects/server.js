const express = require("express");
const app = express();
const dotenv = require('dotenv');
const { Pool } = require('pg');
  
dotenv.config();

const pool = new Pool({
    connectionString:process.env.CONNECTIONSTRING,
});




app.get("/customers", function(req, res) {
    const sql= 'SELECT * FROM customers';
    pool.query(sql, (error, result) => {
        if(error) throw error;
        res.json(result.rows);
    });
});


app.get("/suppliers", function(req, res) {
    const sql ='SELECT * FROM suppliers';
    pool.query(sql, (error, result) => {
        if(error) throw error;
        res.json(result.rows);
    });
});


app.get("/products", function(req, res) {
    const sql = `SELECT product_name, product_availability.unit_price, suppliers.supplier_name
                 FROM products
                 INNER JOIN product_availability ON products.id = product_availability.prod_id
                 INNER JOIN suppliers ON product_availability.supp_id = suppliers.id`
    pool.query(sql, (error, result) => {
        if(error) throw error;
        res.json(result.rows);
    });
});



app.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});