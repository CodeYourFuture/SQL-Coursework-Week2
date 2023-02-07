const express = require('express');
const app = express()

const { Pool } = require('pg');

const pool = new Pool({
    user: 'cyf',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'cyf',
    port: 5432
});

app.get("/customers", function(req, res) {
    pool.query('select * from customers')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});

app.get("/suppliers", function(req, res) {
    pool.query('select * from suppliers')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});


app.get('/', (req, res) => {
    res.send('cyf ecommerce api')
})
module.exports = app