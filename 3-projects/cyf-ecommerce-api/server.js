const express = require("express");
const app = express();


const { Pool } = require("pg");

const pool = new Pool({
  user: "asif",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "786god",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.status(200).json(result.rows))
    .catch((e) => console.error(e));
});
app.get("/customers/:id", function (req, res) {
  let id =req.params.id;
  pool
    .query("SELECT * FROM customers where customers.id =$1", [Number(id)])
  .then((result) => res.status(200).json(result.rows))
    .catch((e) => console.error(e));
    }
  );

app.get("/suppliers", function (req, res) {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.status(200).json(result.rows))
    .catch((e) => console.error(e));
  });

app.get("/products", function (req, res) {
  let product_name
  if (req.query.name) {
    product_name = req.query.name.toLowerCase();
    pool.query(
      "select products.product_name, product_availability.unit_price,suppliers.supplier_name from products inner join product_availability on products.id=product_availability.prod_id inner join suppliers on product_availability.supp_id=suppliers.id where LOWER(products.product_name) like $1", ['%' +product_name + '%']).
      then((result) => res.status(200).json(result.rows)).
      catch((e) => console.error(e))
  }
      
    
  else {

    pool.query(
      "select products.product_name, product_availability.unit_price,suppliers.supplier_name from products inner join product_availability on products.id=product_availability.prod_id inner join suppliers on product_availability.supp_id=suppliers.id").
      then((result) => res.status(200).json(result.rows)).
      catch((e) => console.error(e))
  }
    
});
app.listen(3001, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});