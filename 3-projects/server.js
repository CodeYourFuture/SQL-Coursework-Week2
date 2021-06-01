require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors({ origin: "*" }));

const pool = new Pool();
const customersSelectQuery = `SELECT * FROM customers`;
const suppliersSelectQuery = `SELECT * FROM suppliers`;
const productsSelectQuery = `SELECT p.product_name, p_a.unit_price, suppliers.supplier_name FROM product_availability AS p_a
INNER JOIN products AS p ON p.id=p_a.prod_id
INNER JOIN suppliers ON  suppliers.id=p_a.supp_id;`;


app.get("/customers", async (req, res) => {
  try {
    const result = await pool.query(customersSelectQuery);
    res.send(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/suppliers", async (req, res) => {
  try {
    const result = await pool.query(suppliersSelectQuery);
    res.send(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/products", async (req, res) => {
  try {
    const result = await pool.query(productsSelectQuery);
    res.send(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(3000, () => console.log("Running on port 3000"));


















