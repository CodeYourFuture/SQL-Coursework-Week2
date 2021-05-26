require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  user: "patryk",
  host: "localhost",
  database: "cyf_ecommerce",
  password: process.env.DB_PASSWORD,
  port: 5432,
});

/* Queries to DB */
const customersQ = "SELECT * from customers";
const supQ = "SELECT * from suppliers";
const prodQ =
  "SELECT product_name, unit_price, supplier_name from products INNER JOIN product_availability on products.id = product_availability.prod_id INNER JOIN suppliers on product_availability.supp_id = suppliers.id;";

app.get("/customers", async (req, res) => {
  try {
    const customers = await pool.query(customersQ);
    res.status(200).json({
      status: "success",
      data: customers.rows,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/suppliers", async (req, res) => {
  try {
    const suppliers = await pool.query(supQ);
    res.status(200).json({
      status: "success",
      data: suppliers.rows,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/products", async (req, res) => {
  try {
    const products = await pool.query(prodQ);
    res.status(200).json({
      status: "success",
      data: products.rows,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000.");
});
