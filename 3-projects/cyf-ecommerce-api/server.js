const { query } = require('express');
const express = require('express');
const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


// Setup POOL Credentials
const pool = new Pool({
  user: 'douglas',
  host: 'localhost',
  database: 'cyf_ecommerce',
  password: process.env.ADMIN_PASSWORD,
  port: 5432
});


// GET Started
app.get('/', (req, res) => {
  res.send(`I feel like jumping into this POOL!`)
});


// GET All Customers
app.get('/customers', (req, res) => {
  pool.query('SELECT * FROM customers', (error, result) => {
    res.json(result.rows);
  });
});

// GET Customer by ID
app.get('/customers/:customerId', (req, res) => {
  const { customerId } = req.params;

  // if (id) {
  //   query =`SELECT * FROM customers WHERE id = '${id}'`
  // };

  pool
    .query(`SELECT * FROM customers WHERE id = ${customerId}`)
    .then((result) => res.json(result.rows))
    .catch((event) => console.error(event));
});


//  GET all Suppliers
app.get('/suppliers', (req, res) => {
  pool.query('SELECT * FROM suppliers', (error, result) => {
    res.json(result.rows);
  });
});

// GET All Products
app.get('/products', (req, res) => {
  pool.query('SELECT * FROM products', (error, result) => {
    res.json(result.rows);
  });
});

// GET All Product_Availability
app.get('/product_availability', (req, res) => {
  pool.query('SELECT * FROM product_availability', (error, result) => {
    res.json(result.rows);
  });
});

//  GET Products by Query String Parameter
app.get('/products', (req, res) => {
  const { name } = req.query;

  if (name) {
   query =
      `
      SELECT product_name, unit_price, supplier_name
      FROM order_items
      INNER JOIN product_availability
      ON order_items.product_id = product_availability.prod_id
      INNER JOIN products
      ON order_items.Product_id = products.id
      INNER JOIN suppliers
      ON order_items.supplier_id = suppliers.id
      WHERE product_name ILIKE '%${name}%';
      `
  };

    pool
      .query(query)
      .then((result) => res.json(result.rows))
      .catch((event) => console.error(event));  
});


// POST New Customer
app.post('/customers', (req, res) => {
  const {
    name,
    address,
    city,
    country
  } = req.body;

  if (!name && !address && !city && !country) {
    return res
      .status(400)
      .send("Please enter a name, address, city and country.");
  };
  const query =
    `INSERT INTO customers (name, address, city, country) VALUES ('${name}', '${address}', '${city}', '${country}')`;
  pool
    .query(query)
    .then(() => res.send("Customer created!"))
    .catch((e) => console.error(e));
});


// POST New Product
app.post('/products', (req, res) => {
  const { product_name } = req.body;

  if (!product_name) {
    return res
      .status(400)
      .send("Please enter a product name.");
  };

  const query =
    `INSERT INTO products (product_name) VALUES ('${product_name}')`;
  pool
    .query(query)
    .then(() => res.send("Product created!"))
    .catch((e) => console.error(e));
});


// POST New Product_Availabilty
app.post('/availability', (req, res) => {
  const { prod_id, supp_id, unit_price } = req.body;

  if (!prod_id && !supp_id && !unit_price) {
    return res
      .status(400)
      .send("Please enter a product_id supplier_id and a price.");
  };

  const query =
    `INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ('${prod_id}','${supp_id}', '${unit_price}')`;
  pool
    .query(query)
    .then(() => res.send("Product Availability created!"))
    .catch((e) => console.error(e));
});


const listener = app.listen(PORT, () => {
  console.log(`Server started on port: ${listener.address().port}`)
});