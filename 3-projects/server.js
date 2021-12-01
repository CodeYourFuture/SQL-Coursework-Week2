const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "123456789",
  port: 5432,
});

app.get('/', (req, res) => {
    res.send(`Welcome to the cyf_ecommerce database. You query about customers, suppliers and products.`);
})

app.get('/customers', (req, res) => {
    pool.query('SELECT * FROM customers', (error, result) => {
        if(error) {
            console.log(error);
            res.send(error);
            return
        }
        res.json(result.rows);
    })
})

app.get('/suppliers', (req, res) => {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        if (error) {
          console.log(error);
          res.send(error);
          return;
        }
        res.json(result.rows);
    })
})

app.get('/products', (req, res) => {
    pool.query("SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id ORDER BY products.product_name", (error, result) => {
        if (error) {
          console.log(error);
          res.send(error)
          return;
        }
        res.json(result.rows);
    })
})



app.listen(port, function () {
  console.log(`Server is listening on port ${port}. Ready to accept requests!`);
});