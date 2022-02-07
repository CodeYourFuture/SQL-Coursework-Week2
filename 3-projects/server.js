const express = require("express");
const app = express();
const { Pool } = require("pg");
const secrets = require("./_secrets");

// over the top? Yes.
const pool = new Pool({
  host: secrets.host,
  port: secrets.port,
  user: secrets.user,
  password: secrets.password,
  database: secrets.database,
});

// GET "/" : signposting
app.get("/", (req, res) => {
  res.json({ message: "Use /customers or /suppliers or even /products!" });
});

// GET "/customers" : serve all customers in the database
app.get("/customers", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT name, address, city, country FROM customers;"
  );

  res.json(rows);
});

app.get("/suppliers", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT supplier_name, country FROM suppliers;"
  );

  res.json(rows);
});

const query = `SELECT products.product_name, suppliers.supplier_name, product_availability.unit_price
FROM products 
INNER JOIN product_availability ON product_availability.prod_id = products.id
INNER JOIN suppliers ON suppliers.id = product_availability.supp_id;`;

app.get("/products", async (req, res) => {
  const { rows } = await pool.query(query);

  res.json(rows);
});

app.listen(3000, () =>
  console.log("Server is running and listening on port 3000!")
);
