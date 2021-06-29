const express = require("express");
const app = express();
const validator = require('validator');
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cyf_ecommerce',
  password: '',
  port: 5432
});

app.use(express.json());

app.get('/customers', (req, res) => {
  pool.query('SELECT * FROM customers', (error, result) => {
    res.json(result.rows);
  });
})

app.get('/suppliers', (req, res) => {
  pool.query('SELECT * FROM suppliers', (error, result) => {
    res.json(result.rows);
  });
})

app.get("/products", (req, res) => {
  const productQuery = req.query.name;
  let query = `SELECT * FROM products WHERE product_name LIKE '%${productQuery}%' ORDER BY product_name`;

  if (!productQuery) {
    query = "SELECT * FROM products";
  };
  
  pool
  .query(query)
  .then((result) => {
    return res.json(result.rows)})
  .catch((e) => console.error(e)) 
});

app.get("/customers/:customerId", (req, res) => {
  const customerId = req.params.customerId;

  pool.query(`SELECT * FROM customers WHERE id = ${customerId}`, (error, result) => {
    res.json(result.rows);
  })
});

app.post("/customers", (req, res) => {
  const newCustName = req.body.name;
  const newCustAddress = req.body.address;
  const newCustCity = req.body.city;
  const newCustCountry = req.body.country;
  const query = "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
  pool
  .query(query, [newCustName, newCustAddress, newCustCity, newCustCountry])
  .then(() => res.send("New customer added!"))
  .catch((e) => console.error(e));
});

app.post("/availability", (req, res) => {
  const prodId = req.body.prod_id;
  const suppId = req.body.supp_id;
  const unitPrice = req.body.unit_price;
  const query = "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ($1, $2, $3)"
  if (!unitPrice > 0 ) {
    return res
    .status(400)
    .send("Please provide a valid price")
  }

  pool.query(`SELECT id from products where id = ${prodId} union select id from suppliers WHERE id = ${suppId}`, (error, result) => {
    if (result.rows.length < 2) {
      return res
      .status(400)
      .send("Product or supplier does not exist")
    } else {
      pool
      .query(query, [prodId, suppId, unitPrice])
      .then(() => res.send("product added!"))
      .catch((e) => console.error(e))
    }
  })

})

app.listen(3000, function() {
  console.log("server is listening on port 3000, Ready to accept requests")
})