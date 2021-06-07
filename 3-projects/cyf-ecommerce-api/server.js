const express = require("express");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
  user: "Umm Muhammad",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "akande1",
  port: 5432,
});

const customersSelectQuery = `SELECT *FROM customers`;
const suppliersSelectQuery = `SELECT supplier_name FROM suppliers`;
const productSelectQuery = `SELECT product_name, unit_price, supplier_name
FROM products
INNER JOIN product_availability
ON products.id = product_availability.prod_id
INNER JOIN suppliers
ON product_availability.supp_id = suppliers.id`;

app.get("/customers", (req, res) => {
  pool.query(customersSelectQuery, (error, result)=>{
    if(error) {
      res.status(500).send(error);
    } else {
      res.json(result.rows);
    }

  });
});

app.get("/suppliers", (req, res) =>
  pool.query(suppliersSelectQuery, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  })
);

app.get("/products", (req, res)=>{
pool.query(productSelectQuery, (error, result)=>{
if(error) {
  res.status(500).send(error);
}else {
  res.send(result.rows);
}
})
})
app.listen(3000, () => console.log("Fatimoh is coding"));
