const express = require("express");
const app = express();

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
const { Pool } = require("pg");

const pool = new Pool({
  user: "asif",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "786god",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers", (error, result) => {
    if (res.status(200)) {
      res.status(200).json(result.rows);
    } else {
      res.status(500).send(error.message);
    }
  });
});
app.get("/suppliers", function (req, res) {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    if (res.status(200)) {
      res.status(200).json(result.rows);
    } else {
      res.status(500).send(error.message);
    }
  });
});

app.get("/products", function (req, res) {
  let product_name
  if (req.query.name) {
    product_name = req.query.name.toLowerCase();
    pool.query(
      "select products.product_name, product_availability.unit_price,suppliers.supplier_name from products inner join product_availability on products.id=product_availability.prod_id inner join suppliers on product_availability.supp_id=suppliers.id where LOWER(products.product_name) like '%" + product_name +
      "%'; ",
    
      (error, result) => {
        if (res.status(200)) {
          res.status(200).json(result.rows);
        } else {
          res.status(500).send(error.message);
        }
      }
    );
    
  }

  else {

    pool.query(
      "select products.product_name, product_availability.unit_price,suppliers.supplier_name from products inner join product_availability on products.id=product_availability.prod_id inner join suppliers on product_availability.supp_id=suppliers.id",
  

      (error, result) => {
        if (res.status(200)) {
          res.status(200).json(result.rows);
        } else {
          res.status(500).send(error.message);
        }
      }
    );
  };
})
