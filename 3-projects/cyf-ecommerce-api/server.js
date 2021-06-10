const express = require("express");
const app = express();
app.use(express.json());
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

const prodAvailQuery = `SELECT DISTINCT unit_price, supp_id 
 FROM product_availability 
 INNER JOIN order_items
 ON Product_availability.prod_id = order_items.product_id ORDER BY  unit_price, supp_id ASC`;



// app.get("/suppliers", (req, res) =>
//   pool
//     .query(suppliersSelectQuery)
//     .then((result) => res.send(result.rows))
//     .catch((error) => res.status(500).send(error))
// );

// app.get("/customers", (req, res) =>{
//   pool
//     .query(customersSelectQuery)
//     .then((result) => res.send(result.rows))
//     .catch((error) => res.status(500).send(error))
// });



app.get("/customers", (req, res) => {
  pool.query(customersSelectQuery, (error, result)=>{
    if(error) {
      res.status(500).send(error);
    } else {
      res.json(result.rows);
    }

  });
});

//get customer by ID
app.get("/customers/:customerId", (req, res) => {

const customerId = parseInt(req.params.customerId);
let query = `SELECT * FROM customers WHERE id = $1`;

 if (isNaN(customerId)) {
    res.status(400).json({ message: "Invalid ID" });
  } else {
    pool.query(query, [customerId])
        .then((result) => {
      if (result.rows.length === 0) {
        res.status(404)
          .json({ Failure: `Such supplier with an id ${customerId} does not exist` });
      } else res.json(result.rows);
    });
  }
});
//Add new customers
app.post("/customers", (req, res)=>{
  const newName = req.body.name;
  const newAddress = req.body.address;
  const newCity = req.body.city;
  const newCountry = req.body.country;
  const regExpression = /^[a-zA-Z0-9 -]{1,30}$/;
  const customerInsertQuery = `INSERT INTO customers (name, address, city, country) VALUES
  ($1, $2, $3, $4) RETURNING ID`;

  if (!regExpression.exec(newName)){
    res.status(500).send("Input correct name")
  } else {
    pool.query(customerInsertQuery, [newName, newAddress, newCity, newCountry])
        .then (result => res.status(201).send(result.rows[0]))
        .catch(error => console.error((error)));
  }
})



app.get("/suppliers", (req, res) =>
  pool.query(suppliersSelectQuery, (error, result) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(result.rows);
    }
  })
);
// app.get("/hotels", function (req, res) {
//   const hotelNameQuery = req.query.name;
//   let query = `SELECT * FROM hotels ORDER BY name`;

//   if (hotelNameQuery) {
//     query = `SELECT * FROM hotels WHERE name LIKE '%${hotelNameQuery}%' ORDER BY name`;
//   }

//   pool
//     .query(query)
//     .then((result) => res.json(result.rows))
//     .catch((e) => console.error(e));
// });
app.get("/products", (req, res) => {
  const productNameQuery = req.params.name;
  let query = `SELECT * FROM products`;

  if (productNameQuery) {
    query = `SELECT * FROM products WHERE product_name LIKE '%${productNameQuery}%' ORDER BY product_name`;
  }      pool.query(query)
            .then((result)=> res.send(result.rows))
            .catch((error)=> console.error(error))
          
          
          });

//Add new products
  app.post("/products", (req, res) => {
    const newProduct = req.body.product_name;
    const regExpression = /^[a-zA-Z0-9 -]{1,30}$/;
    const productInsertQuery = `INSERT INTO products (product_name) VALUES ($1) RETURNING ID`;

    if (!regExpression.exec(newProduct)){
        res.status(500).send("Input correct search");
      }else {
    pool.query(productInsertQuery, [newProduct])
      .then((result) => res.status(201).send(result.rows[0]))
      .catch((error) => console.error(error));
      }  
  });

  app.post("/availability", (req, res)=>{
    const newPrice = req.body.price;
     
    if(!Number.isInteger(newPrice) || newPrice <= 0 ){
      return res
        .status(400)
        .send("The new price should be a positive integer.");
    }
    pool.query("SELECT product_id, supplier_id FROM order_items WHERE name=$1", [newPrice]);



  });





app.listen(3000, () => {console.log("Fatimoh is coding")});
