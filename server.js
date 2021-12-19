const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const res = require("express/lib/response");
const app = express();
app.use(express.json());
app.use(cors());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Abdulrahman123",
  port: 5432,
});

// GET All Customers
app.get("/customers", (req, res) => {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.send(result.rows))
    .catch((e) => console.error(e));
});

// GET All Suppliers
app.get("/suppliers", (req, res) => {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => res.send(result.rows))
    .catch((e) => console.error(e));
});

// GET all the product names along with their prices and supplier names.
app.get("/products", (req, res) => {
  const name = req.query.name;
  console.log(name)
  const query =
    "SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p inner join product_availability pa on pa.prod_id = p.id inner join suppliers s on s.id = pa.supp_id WHERE product_name = $1";
   if (!name) {
     pool
       .query("SELECT * FROM products")
       .then((result) => res.send(result.rows))
       .catch((e) => console.error(e));
   }else{
    pool
      .query(query, [name])
      .then((result) => {
       res.send(result.rows)
      })
      .catch((e) => console.error(e));
   }
    
});

// GET customers by Id
app.get("/customers/:customerId", (req, res) => {
  const customerId = req.params.customerId;
  pool
    .query(`SELECT * FROM customers WHERE id = ${customerId}`)
    .then((result) => res.send(result.rows))
    .catch((e) => console.error(e));
});

// post Create a new customer
app.post("/customers", (req, res) => {
  const newCustomerName = req.body.name;
  const newCustomerAddress = req.body.address;
  const newCustomerCity = req.body.city;
  const newCustomerCountry = req.body.country;
  const query =
    "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
  if (
    !Number.isInteger(newCustomerName) &&
    !Number.isInteger(newCustomerAddress) &&
    !Number.isInteger(newCustomerCity) &&
    !Number.isInteger(newCustomerCountry)
  ) {
    pool
      .query(query, [
        newCustomerName,
        newCustomerAddress,
        newCustomerCity,
        newCustomerCountry,
      ])
      .then(() => res.status(201).send(`The ${newCustomerName} has been added`))
      .catch((e) => console.error(e));
  } else {
    res.status(400).send("Please check the data should be string");
  }
});
// post Create a new product
app.post("/products", (req, res) => {
  const newProductName = req.body.product_name;
  const query = "INSERT INTO products (product_name) VALUES ($1)";
  if (newProductName.length > 0 && !Number.isInteger(newProductName)) {
    pool
      .query(query, [newProductName])
      .then(() => res.status(201).send(`The ${newProductName} has been added`))
      .catch((e) => console.error(e));
  } else {
    res
      .status(400)
      .send("Please check the data should be string and non empty");
  }
});

// post to create a new product availability
app.post('/availability', (req,res) => {
 const newProdId = req.body.prod_id;
 const newSuppId = req.body.supp_id;
 const newUnitPrice = req.body.unit_price; 


 const query =
   "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ($1, $2, $3)";

 // pool
 //   .query(
 //     `SELECT * FROM product_availability pa inner join products p on p.id = pa.prod_id inner join suppliers s on s.id = pa.supp_id WHERE p.id = ${newProdId} AND s.id = ${newSuppId}`
 //   )
 //   .then((result) => {
 //     if (result.rows.length > 0) {
       pool
         .query(query, [newProdId, newSuppId, newUnitPrice])
         .then(() =>
           res.status(201).send("The Product Availability has been updated")
         )
         .catch((e) => console.error(e));
     // } else {
     //   res
     //     .status(400)
     //     .send(
     //       "The product_id or supplier_id is not found in the products or suppliers table"
     //     );
     // }
   // })
   // .catch((e) => console.error(e));
})
app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
