const express = require('express');
const { Pool } = require('pg');
const router = express.Router();

// Setup POOL Credentials
const pool = new Pool({
  user: 'douglas',
  host: 'localhost',
  database: 'cyf_ecommerce',
  password: `PeanutbutteR2020%`,
  port: 5432
});

// GET Started
router.get('/', (req, res) => {
  res.send(`I feel like jumping into this POOL!`)
});


// GET All Customers
router.get('/customers', (req, res) => {
  pool.query('SELECT * FROM customers', (error, result) => {
    res.json(result.rows);
  });
});

// GET Customer by ID
router.get('/customers/:customerId', (req, res) => {
  const { customerId } = req.params;

  if (customerId) {
    pool
      .query(`SELECT * FROM customers WHERE id=${customerId}`)
      .then((result) => {
        console.log(result)
        if (result.rows.length === 0) {
          return res
            .status(400)
            .send(`Customer with id ${customerId} does not exist!`);
        }
      })
  } else {
    pool
      .query(`SELECT * FROM customers WHERE id = ${customerId}`)
      .then((result) => res.json(result.rows))
      .catch((event) => console.error(event));
  }
});


//  GET all Suppliers
router.get('/suppliers', (req, res) => {
  pool.query('SELECT * FROM suppliers', (error, result) => {
    res.json(result.rows);
  });
});

// GET All Product_Availability
router.get('/product_availability', (req, res) => {
  pool.query('SELECT * FROM product_availability', (error, result) => {
    res.json(result.rows);
  });
});

//  GET All Products and if Name includes by Query String
router.get('/products', (req, res) => {
  let { name } = req.query;
  let query = `SELECT * FROM products ORDER BY product_name`

  if (name) {
    query =
      `    
      SELECT product_name, unit_price, supplier_name
      FROM product_availability
      INNER JOIN products
      ON product_availability.prod_id = products.id
      INNER JOIN suppliers
      ON product_availability.supp_id = suppliers.id
      WHERE product_name ILIKE '%${name}%';
      `
  } else {
    query =
      `    
      SELECT product_name, unit_price, supplier_name
      FROM product_availability
      INNER JOIN products
      ON product_availability.prod_id = products.id
      INNER JOIN suppliers
      ON product_availability.supp_id = suppliers.id;
      `
  };
  pool
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((event) => console.error(event));
});


// POST New Customer
router.post('/customers', (req, res) => {
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
router.post('/products', (req, res) => {
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
router.post('/availability', (req, res) => {
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


// Update Customer by ID
router.put("/customers/:customerId", (req, res) => {
  const { customerId } = req.params;
  const { name, address, city, country } = req.body;

  if (customerId) {
    pool
      .query(`SELECT * FROM customers WHERE id=${customerId}`)
      .then((result) => {
        console.log(result)
        if (result.rows.length === 0) {
          return res
            .status(400)
            .send(`Customer with ${id} does not exist!`);
        } else {
          pool
            .query(`UPDATE customers SET name='${name}', address='${address}', city='${city}', country='${country}' WHERE id=${customerId}`)
            .then(() => res.send(`Customer ${customerId} updated!`))
            .catch((e) => console.error(e));
        }
      })
  };
});

router.delete('/orders/:orderId', (req, res) => {
  const { orderId } = req.params
  const numericId = parseInt(orderId)
  if (numericId) {
    pool
      .query(`SELECT * FROM orders WHERE id=${numericId}`)
      .then((result) => {
        console.log(result)
        if (result.rows.length === 0) {
          return res
            .status(400)
            .send(`Order ${numericId} does not exist!`);
        } else {
          pool
            .query(`DELETE FROM orders WHERE id=${numericId}`)
            .then(() => res.send(`Order ${numericId} deleted!`))
            .catch((e) => console.error(e));
        }
      })
  }
})
module.exports = router;