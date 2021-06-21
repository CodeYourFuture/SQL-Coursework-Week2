const express = require("express");
const app = express();
const { Pool } = require('pg');

app.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: '',
    port: 5432
});

// Add a new GET endpoint `/customers` to return all the customers from the database
app.get("/customers", function(req, res) {
    pool.query('SELECT * FROM customers', (db_err, db_res) => {
        if(db_err) {
            res.send(JSON.stringify(db_err))
        } else {            
            res.json(db_res.rows);
        }        
    });
});

// Add a new GET endpoint `/suppliers` to return all the suppliers from the database
app.get("/suppliers", function (req, res) {
    pool.query('SELECT * FROM suppliers', (db_err, db_res) => {
        if(db_err){
            res.send(JSON.stringify(db_err))
        } else {
            res.json(db_res.rows)
        }
    });
});

// Add a new GET endpoint `/products` to return all the product names along with their prices and supplier names
app.get("/products", function (req, res) {
    pool.query('SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id= product_availability.prod_id INNER JOIN suppliers ON suppliers.id= product_availability.supp_id;', (db_err, db_res) => {
        if(db_err){
            res.send(JSON.stringify(db_err))
        } else {
            res.json(db_res.rows)
        }
    });
});