const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const pool = new Pool({
  user: 'douglas',
  host: 'localhost',
  database: 'cyf_ecommerce',
  password: process.env.ADMIN_PASSWORD,
  port: 5432
});

app.get('/', (req, res) => {
  res.send(`I feel like jumping into this POOL!`)
});

app.get('/customers', (req, res) => {
  pool.query('SELECT * FROM customers', (error, result) => {
    res.json(result.rows)
  });
});

app.get('/suppliers', (req, res) => {
  pool.query('SELECT * FROM suppliers', (error, result) => {
    res.json(result.rows)
  });
});

// (STRETCH GOAL) Add a new GET endpoint /products to return all the product names along with their prices and supplier names.
app.get('/products', (req, res) => {
  pool.query('SELECT product_name, unit_price, supplier_name FROM order_items INNER JOIN product_availability ON order_items.product_id = product_availability.prod_id INNER JOIN products ON order_items.Product_id = products.id INNER JOIN suppliers ON order_items.supplier_id = suppliers.id; ', (error, result) => {
    res.json(result.rows)
  });
});

const listener = app.listen(PORT, () => {
  console.log(`Server started on port: ${listener.address().port}`)
});