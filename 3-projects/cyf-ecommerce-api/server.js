const express = require("express");
const app = express();

app.use(express.json());

const { Pool } = require("pg");

const port = process.env.PORT || 5000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "myPass",
  // Port number
  port: 5432,
});

app.get("/", (request, result) => {
  return result.send("Hello");
});

// Return all the Customers
app.get("/customers", function (request, response) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => response.json(result.rows))
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    });
});

// Return all the Suppliers
app.get("/suppliers", function (request, response) {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => response.json(result.rows))
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    });
});

// Return all the Product names along with their Prices and Supplier names.
app.get("/products", function (request, response) {
  pool
    .query(
      `SELECT product_name AS "product name", unit_price AS price, supplier_name AS "supplier name"
        FROM product_availability
        JOIN products
        ON products.id = prod_id
        JOIN suppliers
        ON suppliers.id = supp_id
        ORDER BY product_name, unit_price`
    )
    .then((result) => response.json(result.rows))
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    });
});

app.listen(port, function () {
  console.log("Server is listening on port " + port);
});
