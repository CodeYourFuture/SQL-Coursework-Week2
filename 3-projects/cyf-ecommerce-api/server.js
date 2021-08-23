const express = require("express");
const app = express();
const { Pool } = require("pg");

app.use(express.json());

const pool = new Pool({
  user: "Ryno",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "16139",
  port: 5432,
});

app.get("/customers", function (req, res) {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/customers/:id", function (req, res) {
  let id = req.params.id;

  pool
    .query("SELECT * FROM customers WHERE id=$1", [id])
    .then((result) => res.json(result.rows))
    .then((e) => console.error(e));
});

app.post("/customers", function (req, res) {
  const { name, address, city, country } = req.body;

  pool.query("SELECT * FROM customers WHERE name=$1", [name]).then((result) => {
    if (result.rows.length > 0) {
      return res
        .status(400)
        .send(`A customer with the same name already exists!`);
    } else {
      const query =
        "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
      pool
        .query(query, [name, address, city, country])
        .then(() =>
          res.send({
            description: "Customer created!",
            errorStatus: false,
          })
        )
        .catch((e) => console.error(e));
    }
  });
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/products", (req, res) => {
  const productsNameQuery = req.query.name;
  let query =
    "SELECT product_name, unit_price, supplier_name FROM products INNER JOIN product_availability ON product_availability.prod_id = products.id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id ORDER BY product_name";

  if (productsNameQuery) {
    query = `SELECT product_name, unit_price, supplier_name FROM products INNER JOIN product_availability ON product_availability.prod_id = products.id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id WHERE product_name LIKE '%${productsNameQuery}%' ORDER by product_name`;
  }

  pool
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
});

// app.post("/products", function (req, res) {

// })

const listener = app.listen(3000 || process.env.PORT, () => {
  console.log("Server is listening on port " + listener.address().port);
});
