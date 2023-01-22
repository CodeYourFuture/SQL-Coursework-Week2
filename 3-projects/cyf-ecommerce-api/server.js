const express = require("express");
const app = express();
const { Pool } = require("pg");
const port = process.env.PORT || 3000;


// Connection String or Variable String
const pool = new Pool({
    user: "cyf_ecommerce_j3qq_user",
    host: "dpg-cf5f3eg2i3mnvcvgbka0-a.oregon-postgres.render.com",
    database: "cyf_ecommerce_j3qq",
    password: "NeC9j1aaapvbObYlSdz0LC6gzSeIhcom",
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
  });


  // Retrieve all the Customers from the database
  app.get("/customers", (req, res) => {
    pool
      .query("SELECT * FROM customers")
      .then((result) => {
        res.json(result.rows);
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send(error);
      });
  });
  
  // Retrieve all the Suppliers from the database
  app.get("/suppliers", (req, res) => {
    pool
      .query("SELECT * FROM suppliers")
      .then((result) => {
        res.json(result.rows);
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send(error);
      });
  });
  
  // Retrieve all the product names along with their prices and supplier names.
  app.get("/products", (req, res) => {
    pool
      .query(
        "SELECT product_name,unit_price,supplier_name FROM products INNER JOIN product_availability as pa ON pa.prod_id=products.id INNER JOIN suppliers ON suppliers.id=pa.supp_id"
      )
      .then((result) => {
        res.json(result.rows);
      })
      .catch((error) => {
        console.error(error)
        res.status(500).send(error);
      });
  });





app.listen(port, () => {
    console.log(`Listen in http://localhost:${port}`);
  });











































