const { application } = require("express");
const express = require("express");
const app = express();
const { Pool } = require("pg");

app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/", (req, res) => {
  res.send("cyf-ecommerce-api is ready at accept api requests");
});

app.get("/customers", async (req, res) => {
  try {
    const customers = await pool.query("SELECT * FROM customers");
    return res.json(customers.rows);
  } catch (e) {
    console.log(e);
    return res.status(400).json({ msg: "Couldn't get customers" });
  }
});

app.get("/suppliers", async (req, res) => {
  try {
    const suppliers = await pool.query("SELECT * FROM suppliers");
    return res.json(suppliers.rows);
  } catch (e) {
    console.log(e);
    return res.json({ msg: "Couldn't return suppliers" });
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await pool.query(
      "SELECT product_name, unit_price, supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id"
    );
    return res.json(products.rows);
  } catch (e) {
    console.log(e);
    return res.json({ msg: "Couldn't return products" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
