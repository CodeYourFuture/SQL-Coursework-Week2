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

const listener = app.listen(PORT, () => {
  console.log(`Server started on port: ${listener.address().port}`)
});