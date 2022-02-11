const express = require("express");
const app = express();
const { Pool } = require("pg");

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Sinnyozzy91",
  port: 5432,
});

app.get("/", (req, res) => {
    res.send(`Sinead's CYF e-commerce API. <br> <br> Utilising SQL & Node.js <br> <br> Routes to explore: "/customers", "/suppliers", "/products"`)
});


app.get("/customers", function (req, res) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/suppliers", function (req, res) {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.get("/products", function (req, res) {
  pool
    .query(
      `
    SELECT prod.product_name, availability.unit_price, suppl.supplier_name
    FROM product_availability AS availability
    JOIN products AS prod
    on prod.id = availability.prod_id
    JOIN suppliers AS suppl
    ON availability.supp_id = suppl.id
    `
    )
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
