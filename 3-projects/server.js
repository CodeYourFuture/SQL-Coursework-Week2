const express = require('express');
const { Pool } = require('pg');
const app = express();
const port = process.env.PORT || 4000;

const dbConfig = {
  host: 'localhost',
  port: 5432,
  user: 'biruk',
  password: '4567',
  database: 'cyf_ecommerce',
};

const pool = new Pool(dbConfig);

const customersQuery = 'SELECT * from customers';
const suppliersQuery = 'SELECT * from suppliers';
const productsQuery = 'SELECT product_name, unit_price, supplier_name from products INNER JOIN product_availability on products.id = product_availability.prod_id INNER JOIN suppliers on product_availability.supp_id = suppliers.id;'

app.get('/customers', async (req, res) => {
  try {
    const result = await pool.query(customersQuery);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/suppliers', async (req, res) => {
  try {
    const result = await pool.query(suppliersQuery);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get('/products', async (req, res) => {
  try {
    const result = await pool.query(productsQuery);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port} and ready to accept requests!`);
});