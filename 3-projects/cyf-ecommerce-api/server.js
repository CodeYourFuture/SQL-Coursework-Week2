const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5002;

const pool = new Pool({
  user: "jonathanh",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Heugh",
  port: 5432,
});

// GET "/customers"
app.get("/customers", async (req, res) => {
  const result = await pool.query("SELECT * FROM customers");
  res.json(result.rows);
});

// GET single customer by id "/customers/:customerId"
app.get("/customers/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    const result = await pool.query('SELECT * FROM customers WHERE id = $1', [customerId]);
    res.json(result.rows)
  } catch (error) {
    console.error(error.message)
  }
});

//CREATE new customer
app.post("/customers", async (req, res) => {
  try {
    const { name, address, city, country } = req.body;
    const query = 'INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)';
    await pool.query(query, [name, address, city, country]);
    res.json('Customer is Created!')
  } catch (error) {
    console.error(error.message)
  }
});

// GET "/suppliers"
app.get("/suppliers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM suppliers");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// GET "/products"
app.get("/products", async (req, res) => {
  try {
  const prodNameQuery = req.query.name;
  let query =
    "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id";

    if(prodNameQuery) {
      query = `SELECT * FROM products WHERE product_name LIKE '%${prodNameQuery}%'`
    }
  
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

app.listen(PORT, () => console.log(`Server started at port: ${PORT}`));
