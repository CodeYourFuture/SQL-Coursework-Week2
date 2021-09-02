const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

let bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.Router());

const { Pool } = require("pg");

const pool = new Pool({
  user: "kudah",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Machine Learning",
  port: 5432,
});
app.get("/", (req, resp) => {
  resp.sendFile(__dirname + "/index.html");
});

//Customers
//Create new customer
app.post("/customers", (req, res) => {
  let id = req.body.customerId;
  let name = req.body.customerName;
  let address = req.body.address;
  let city = req.body.city;
  let country = req.body.country;

  pool
    .query(
      "insert into customers (id,name,address,city,country) values ($1, $2, $3, $4, $5)",
      [id, name, address, city, country]
    )
    .then(() => res.send("Dataset Added"));
});
//Get Customer By Id
app.get("/customers/:customers", (req, res) => {
  let specificCustomer = req.params.customers;
  pool.query(
    `select* from customers where id=$1 `,
    [specificCustomer],
    (error, result) => {
      if (error) {
        res.send(error);
      } else {
        res.json(result.rows);
      }
    }
  );
});

app.get("/suppliers", (req, resp) => {
  pool.query("select* from suppliers", (error, result) => {
    if (error) {
      resp.send(error);
    } else {
      resp.json(result.rows);
    }
  });
});

/*Products*/
//Create New Product
app.post("/products", (req, res) => {
  let id = req.body.id;
  let productName = req.body.productName;
  pool
    .query("insert into products (id,product_name) values ($1,$2)", [
      id,
      productName,
    ])
    .then(()=>res.send(id + " " + productName + " was added to the Database"));
});
//Get All Products
app.get("/allProducts", (req, resp) => {
  let search = req.query.product;
  let query =
    "select p.product_name,pa.unit_price,s.supplier_name from products p inner join product_availability pa on pa.prod_id =p.id inner join suppliers s on s.id =pa.supp_id  ";
  if (search) {
    (query = `select p.product_name,pa.unit_price,s.supplier_name from products p inner join product_availability pa on pa.prod_id =p.id inner join suppliers s on s.id =pa.supp_id  where p.product_name = $1`),
      [search];
  }
  pool
    .query(query)
    .then((result) => {
      resp.json(result.rows);
    })
    .catch((error) => {
      resp.send(error);
    });
  pool.end;
});

app.listen(PORT, () => {
  console.log("App Listening to " + PORT);
});
