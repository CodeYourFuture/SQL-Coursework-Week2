require('dotenv').config();
const express = require('express');
const app = express();
const { Client } = require('pg');

const client = new Client({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port
});
client.connect();
const queryAndRespond = async (res, sql) => {
  try {
    const result = await client.query(sql);
    res.status(200).json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};
app.get('/customers', (req, res) =>
  queryAndRespond(res, 'SELECT * from customers')
);
app.get('/suppliers', (req, res) =>
  queryAndRespond(res, 'SELECT * from suppliers')
);
app.get('/products', (req, res) =>
  queryAndRespond(
    res,
    'SELECT p.id,p.product_name,pa.unit_price,s.supplier_name from products p JOIN product_availability pa ON p.id = pa.prod_id JOIN suppliers s ON pa.supp_id = s.id'
  )
);
app.listen(3000, () => {
  console.log('Server is listening on port 3000.');
});
