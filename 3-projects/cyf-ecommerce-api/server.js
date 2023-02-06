const { application } = require("express");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABSE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
 
app.get("/customers", async (req, res) => {
    const query = "SELECT * FROM customers";
    try {
        const result = await pool.query(query);
        res.json(result.rows)
    } catch (error) {
        res.status(500).send(error);
    }    
})

app.get("/suppliers", async (req, res) => {
    const query = "SELECT * FROM suppliers";
    try {
        const result = await pool.query(query);
        res.json(result.rows)
    }   catch (error) {
        res.status(500).send(error);
    }
})

app.get("/products", async (req, res) => {
    const query = "SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p JOIN product_availability pa ON (p.id=pa.prod_id) JOIN suppliers s ON (pa.supp_id=s.id) ORDER BY p.product_name ASC;";
    try {
        const result = await pool.query(query);
        res.json(result.rows)
    } catch (error) {
        res.status(500).send(error);
    }
})


app.listen(3001,()=>console.log("API server is running..."));