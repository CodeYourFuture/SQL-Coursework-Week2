const express = require('express');
const cors = require('cors');
const {Pool} = require('pg');

const app = express();

const dbConfig = {
  host: 'localhost',
  port: 5432,
  user: 'moniqueking',
  password: '',
  database: 'cyf_ecommerce',
};

const pool = new Pool(dbConfig);

app.use(cors());
app.use(express.json());

app.get('/customers', function (req, res) {
  pool.query('SELECT * FROM customers', (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  });
});

app.get('/suppliers', function (req, res) {
  pool.query('SELECT * FROM suppliers', (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  });
});

app.get('/products', function (req, res) {
  pool.query(
    'SELECT product_name, unit_price, supplier_name from products INNER JOIN product_availability on products.id = product_availability.prod_id INNER JOIN suppliers on product_availability.supp_id = suppliers.id',
    (error, result) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(result.rows);
      }
    }
  );
});

app.listen(process.env.PORT || 8080, () => {
  console.log('Server is working');
});
