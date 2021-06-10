const express = require("express");
const { Pool } = require("pg");
const app = express();
const dbConfig = {
  host: "localhost",
  port: 5432,
  user: "LT", // when run from local, change to your computer username
  password: "wIsE_888", // with your computer password
  database: "cyf_ecommerce",
};
const pool = new Pool(dbConfig);

// get all customers data
const customersSelectQuery = `
SELECT * 
FROM customers`;

// get customer by customer id
const customerSelectByIdQuery = `
SELECT * 
FROM customers 
WHERE id = $1`;

const customerInsertQuery = `
INSERT INTO customers (customer)
VALUES ($1) RETURNING id`;

// get all suppliers data
const suppliersSelectQuery = `
SELECT * 
FROM suppliers`;

// get all product names, their prices and suppliers names
const productsSelectQuery = `
SELECT a.product_name,
    c.unit_price,
    supplier_name
FROM products AS a
    INNER JOIN order_items AS b ON a.id = b.product_id
    INNER JOIN product_availability AS c ON b.product_id = c.prod_id
    INNER JOIN suppliers AS d ON b.supplier_id = d.id`;

// get filtered product by product_name
// const productsFilteredByProduct_name = `
// SELECT a.product_name,
//     c.unit_price,
//     supplier_name
// FROM products AS a
//     INNER JOIN order_items AS b ON a.id = b.product_id
//     INNER JOIN product_availability AS c ON b.product_id = c.prod_id
//     INNER JOIN suppliers AS d ON b.supplier_id = d.id
// WHERE a.product_name = $1`;

function isValidID(id) {
  return !isNaN(id) && id >= 0;
}

// customers data endpoint
app.get("/customers", (req, res) =>
  pool
    .query(customersSelectQuery)
    .then((result) => res.send(result.rows))
    .catch((error) => res.status(500).send(error))
);

app.get("/customers/:id", (req, res) => {
  const id =parseInt(req.params.id);

  if (!isValidID(id)) {
    res.status(404).send({ message: "customer not found" });
  } else {
    pool
      .query(customerSelectByIdQuery, [id])
      .then((result) => {
        if (result.rows.length === 0) {
          res.status(404).send({ message: "customer not found" });
        } else {
          res.send(result.rows[0]);
        }
      })
      .catch((error) => res.status(500).send(error));
  }
});

app.post("/customers/", (req, res) => {
  const customer = req.body?.customer; // req.body may be undefined

  if (!customer) {
    res.status(400).send({ message: "Error customer input" });    
  } else {
    pool
      .query(customerInsertQuery, [customer])
      .then((result) => res.status(201).send(result.rows[0]))
      .catch((error) => res.status(500).send(error));
  }
});

// suppliers data endpoint
app.get("/suppliers", (req, res) =>
  pool
    .query(suppliersSelectQuery)
    .then((result) => res.send(result.rows))
    .catch((error) => res.status(500).send(error))
);

// products data endpoint
app.get("/products", (req, res) =>
  pool
    .query(productsSelectQuery)
    .then((result) => res.send(result.rows))
    .catch((error) => res.status(500).send(error))
);

app.get("/products?name=Cup", (req, res) =>
  pool
    .query(productsSelectQuery)
    .then((result) => res.send(result.rows))
    .catch((error) => res.status(500).send(error))
);



app.listen(5000, () => console.log("Running on port 5000"));
