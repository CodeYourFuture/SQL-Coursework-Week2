const express = require("express");
const app = express(); 
const bodyParser = require("body-parser");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}))
const PORT = process.env.PORT || 3000;

const { Pool } = require('pg')
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.get("/customers", function(req, res){
    pool.query("SELECT * FROM customers") 
        .then((result) => res.json(result.rows))
        .catch((e)=> console.error(e))
})

app.get("/suppliers", function (req, res) {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.get("/products", function (req, res) {
  pool
    .query(
      "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id;"
    )
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});


app.listen(PORT, function(){
    console.log("Server is running on port 3000");
});

