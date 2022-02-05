const express = require("express");
const { Pool } = require("pg");

const app = express();

// Specify the connection parameters in an object
const dbConfig1 = {
  host: "localhost",
  port: 5432,
  user: "gorma",
  password: "",
  database: "cyf_ecommerce",
};

// Specify the connection parameters as a connection URL
// const dbConfig2 = {
//   connectionString: "postgresql://szemate:abc123@localhost:5432/homework",
// };

// Create a connection pool to the DB server
const pool = new Pool(dbConfig1);

const customersQuery = `SELECT name FROM customers`;
const suppliersQuery = `SELECT supplier_name FROM suppliers`;
const productsQuery = `SELECT products.product_name,product_availability.unit_price,suppliers.supplier_name FROM product_availability INNER JOIN products ON product_availability.prod_id=products.id
INNER JOIN suppliers ON product_availability.supp_id=suppliers.id`;

app.get("/customers", (req, res) =>
  pool.query(customersQuery, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  })
);

app.get("/suppliers", (req, res) =>
  pool
    .query(suppliersQuery)
    .then((result) => res.send(result.rows))
    .catch((error) => res.status(500).send(error))
);

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query(productsQuery);
    res.send(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => console.log("Listening on port 3000."));
