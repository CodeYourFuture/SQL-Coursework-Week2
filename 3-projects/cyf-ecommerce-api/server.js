const express = require("express");
const app = express();

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

// Add a new GET endpoint `/customers` to return all the customers from the database
app.get("/customers", function (_, response) {
  pool.query("SELECT * FROM customers", (db_error, db_result) => {
    if (db_error) {
      response.send(JSON.stringify(db_error));
    } else {
      response.json(db_result.rows);
    }
  });
});

// Add a new GET endpoint `/suppliers` to return all the suppliers from the database
app.get("/suppliers", function (_, response) {
  pool.query("SELECT * FROM suppliers", (db_error, db_result) => {
    if (db_error) {
      response.send(JSON.stringify(db_error));
    } else {
      response.json(db_result.rows);
    }
  });
});

// Add a new GET endpoint `/products` to return all the product names along with their prices and supplier names
app.get("/products", function (_, response) {
  pool.query(
    "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products JOIN product_availability ON products.id = product_availability.prod_id JOIN suppliers ON product_availability.supp_id = suppliers.id;",
    (db_error, db_result) => {
      if (db_error) {
        response.send(JSON.stringify(db_error));
      } else {
        response.json(db_result.rows);
      }
    }
  );
});
