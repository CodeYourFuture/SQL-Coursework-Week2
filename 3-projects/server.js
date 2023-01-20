//Libraries
const express = require("express");
const app = express();
const { Pool } = require("pg");
const port = process.env.port || 3001;
app.use(express.json());

const pool = new Pool({
  user: "test_user",
  host: "dpg-cf4j8cha6gdtfg33f0ug-a.oregon-postgres.render.com",
  database: "cyf_ecommerce_testdb",
  password: "6Won6otyntKOsILXN2GdIZ0jqVFWYRfz",
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

app.post("/customer", function (req, res) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

app.post("/supplier", function (req, res) {
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
      `select product_name, unit_price as price, supplier_name from products 
        inner join product_availability on products.id = product_availability.prod_id 
        inner join suppliers on suppliers.id = product_availability.supp_id;`
    )
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});


app.listen(port, function () {
  console.log("Server is listening on port 3001. Ready to accept requests!");
});
