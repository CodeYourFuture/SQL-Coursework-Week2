const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = process.env.PORT || 3001;

const dbConfig = {
  host: "localhost",
  port: 5432,
  user: "Lisha",
  password: "ELISHA13",
  database: "cyf_ecommerce",
};
const pool = new Pool(dbConfig);

const customersQuery = `SELECT * FROM customers`;
app.get("/customers", (req, res) =>
  pool.query(customersQuery, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  })
);
const suppliersQuery = `SELECT * FROM suppliers`;
app.get("/suppliers", (req, res) =>
  pool
    .query(suppliersQuery)
    .then((result) => res.send(result.rows))
    .catch((error) => res.status(500).send(error))
);
const productsQuery = `SELECT product_name, unit_price, supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id`;
app.get("/products", async (req, res) => {
  try {
    const result = await pool.query(productsQuery);
    res.send(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});
app.listen(3001, () => console.log("Running on port 3001"));
