const express = require("express");
const { Pool } = require("pg");
const app = express();
const bodyParser = require("body-parser");
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const pool = new Pool({
  user: "cex",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "mohammed",
  port: 5432,
});

app.get("/customers", (req, res) => {
  pool
    .query("SELECT * FROM  customers")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.get("/customers/:id", (req, res) => {
  const customName = req.params.id;
  const query = `SELECT * FROM  customers WHERE id = ${customName}`;

  if (customName) {
    pool
      .query(query)
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
  }
});

app.get("/suppliers", (req, res) => {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

app.get("/products", (req, res) => {
  const prodName = req.query.name;
  const qyery = `SELECT * FROM products WHERE product_name LIKE '%${prodName}%'`;
  console.log(req.url);

  if (prodName) {
    console.log(prodName);
    pool
      .query(qyery)
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
  } else {
    console.log("prodName");
    pool
      .query(
        "SELECT product_availability. unit_price,products. product_name,suppliers.supplier_name FROM product_availability JOIN products ON product_availability. prod_id = products.id JOIN suppliers ON product_availability.supp_id = suppliers.id"
      )
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
  }
});

app.post("/customers", (req, res) => {
  const customName = req.body.name;
  const customAddress = req.body.address;
  const customCity = req.body.city;
  const customCountry = req.body.country;

  const query =
    "INSERT INTO customers (name, address, city, country) VALUES ($1, $2,$3,$4)";

  pool
    .query(query, [customName, customAddress, customCity, customCountry])

    .then(() => res.send("thank you for posting "))
    .catch((e) => console.error(e));
});

app.post("/products", (req, res) => {
  const prodName = req.body.product_name;
  console.log(prodName);

  const query = "INSERT INTO products (product_name) VALUES ($1)";

  pool
    .query(query, [prodName])

    .then(() => res.send("thank you for submitting"))
    .catch((e) => console.error(e));
});

app.post("/availability", (req, res) => {
  const suppId = req.body.supp_id;
  const unitPrice = req.body.unit_price;
  const prodId = req.body.prod_id;
  console.log(prodId);
   // const productId = "SELECT MAX(id) FROM  products";
  const query =
    "INSERT INTO product_availability (prod_id, unit_price,supp_id ) VALUES ($1,$2,$3)";
   
  if (!prodId || !suppId || unitPrice === 0) {
    res.send("not valid input");
  } else {
    pool
      .query(query, [prodId, unitPrice, suppId])
      .then(() => res.send("thank you for submitting"))
      .catch((e) => res.send(e.detail));
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("the server is running");
});
