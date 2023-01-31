const express = require("express");
const app = express();
const { Pool } = require("pg");
const cors = require("cors");
app.use(cors());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "cyf_wm42023",
  port: 5432,
  // connectionString:
  //   "postgres://kawa:xea5cgoHN7vSXkLYgi1pV60RwVRdJIQK@dpg-cfbi33pgp3jsh6aqrnag-a.oregon-postgres.render.com/videosproject_kawa_cyf",
  // ssl: { rejectUnauthorized: false },
});

pool.connect((err) => {
  if (err) {
    console.error("Error connecting to the database: " + err.stack);
    return;
  }
  console.log("Connected to the database");
});

app.get("/customers", (req, res) => {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      res.status(400).json(error);
    });
});

app.get("/suppliers", (req, res) => {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      res.status(400).json(error);
    });
});

app.get("/products", (req, res) => {
  const query =
    "SELECT product_name, unit_price, supplier_name    FROM products JOIN product_availability ON products.id = product_availability.prod_id  JOIN suppliers ON product_availability.supp_id = suppliers.id;";

  pool
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      res.status(400).json(error);
    });
});
