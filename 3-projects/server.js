const express = require('express');
const app = express();
app.use(express.json());
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cyf_ecommerce',
  password: '0000',
  port: 5432,
});

app.get('/', (req, res) => {
  res.json('You have hit the API');
});

app.get('/customers', async (req, res) => {
  const result = await pool.query('SELECT * FROM customers');
  res.json(result.rows);
});

app.get('/products', async (req, res) => {
  const result = await pool.query(
    'SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p INNER JOIN product_availability pa ON p.id = pa.prod_id INNER JOIN suppliers s ON pa.supp_id = s.id'
  );
  res.json(result.rows);
});

app.get('/suppliers', async (req, res) => {
  const result = await pool.query('SELECT * FROM suppliers');
  res.json(result.rows);
});

app.get('/orders', async (req, res) => {
  const result = await pool.query('SELECT * FROM orders');
  res.json(result.rows);
});

app.post('/orders', async (req, res) => {
  try {
    const { order_date, order_reference, customer_id } = req.body;
    const result = await pool.query(
      `INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2 ,$3)`,
      [order_date, order_reference, customer_id]
    );
    res.json('Added sucessfully');
  } catch (error) {
    res.status(500).json(error);
  }
});

const listener = app.listen(process.env.PORT || 5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
