const express = require('express');
const dotenv = require('dotenv');
const { Pool } = require('pg');

const app = express();
dotenv.config();
app.use(express.json());

const pool = new Pool({
    connectionString: process.env.PG_CONNECT
});

app.get('/customers', (req, res) => {
    pool.query('SELECT * FROM customers', (error, result) => {
        if(error) {
            res.status(500).send(error);
        } else {
            res.send(result.rows);
        }
    });
});

app.get('/suppliers', (req, res) => {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        error ? res.status(500).send(error) : res.send(result.rows);
    });
});

app.get('/products', (req, res) => {
    pool.query('SELECT pr.product_name, aval.unit_price as price, supp.supplier_name FROM products pr, product_availability aval, suppliers supp WHERE pr.id = aval.prod_id AND supp.id = aval.supp_id', (error, result) => {
        error ? res.status(500).send(error) : res.send(result.rows);
    });
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));