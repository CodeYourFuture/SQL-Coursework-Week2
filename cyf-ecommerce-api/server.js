//Libraries
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const { Pool } = require('pg');

const pool = new Pool({
    user: 'chris_user',
    host: 'dpg-cf61lhpa6gdjkk3e7jk0-a.oregon-postgres.render.com',
    database: 'cyf_ecommerce_aoqz',
    password: 'dkp2IKa9BckbJdWmBOik0g1oH5PiWw7P',
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
    pool.query('SELECT p.product_name, s.supplier_name, unit_price FROM product_availability p_u inner join poroduct p on p.id = p_u.prod_id inner join suppliers s on s.id = p_u.supp_id order by p.product_name')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});

app.listen(port, function() {
    console.log("Server is listening on port 3001. Ready to accept requests!");
});