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

// GET Customer by Id (NOT WORKING YET!!!)
app.get('/customers/:customerId', (req, res) => {
  const { customerId } = req.query;

  if (customerId) {
    query =
      `
      SELECT *
      FROM customers
      WHERE id = ${customerId}
      `
  };

  pool
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((event) => console.error(event));
});


//  GET all Suppliers
app.get('/suppliers', (req, res) => {
  pool.query('SELECT * FROM suppliers', (error, result) => {
    res.json(result.rows);
  });
});

app.get('/products', (req, res) => {
  pool.query('SELECT * FROM products', (error, result) => {
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
  // pool
  // .query(`SELECT * FROM customers WHERE name=${name}`)
  // .then((result) => {
  //   if (result.rows.length > 0) {
  //     return res
  //       .status(400)
  //       .send("A customer with the same name already exists!");
  //   } else {
  const query =
    `INSERT INTO customers (name, address, city, country) VALUES ('${name}', '${address}', '${city}', '${country}')`;
  pool
    .query(query)
    .then(() => res.send("Customer created!"))
    .catch((e) => console.error(e));
  // }
});
// });


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
    // });
});
  

const listener = app.listen(PORT, () => {
  console.log(`Server started on port: ${listener.address().port}`)
});