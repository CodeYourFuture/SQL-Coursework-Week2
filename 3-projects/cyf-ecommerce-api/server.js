const { application } = require("express");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
 
app.get("/customers", async (req, res) => {
    const query = "SELECT * FROM customers";
    try {
        const result = await pool.query(query);
        res.json(result.rows)
    } catch (error) {
        res.status(500).send(error);
    }    
})

app.get("/suppliers", async (req, res) => {
    const query = "SELECT * FROM suppliers";
    try {
        const result = await pool.query(query);
        res.json(result.rows)
    }   catch (error) {
        res.status(500).send(error);
    }
})



app.get("/products", async (req, res) => {
    let productName = req.query.name
    if(!productName){
    const query = "SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p JOIN product_availability pa ON (p.id=pa.prod_id) JOIN suppliers s ON (pa.supp_id=s.id) ORDER BY p.product_name ASC;";
     
    try {
        const result = await pool.query(query);
        res.json(result.rows)
    } catch (error) {
        res.status(500).send(error);
    }
   } 
   else {
       const query =
         "SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p JOIN product_availability pa ON (p.id=pa.prod_id) JOIN suppliers s ON (pa.supp_id=s.id) WHERE p.product_name=$1;";
       try {
         const result = await pool.query(query, [productName]);
         res.json(result.rows);
       } catch (error) {
         res.status(500).send(error);
       }
   }
})

app.get("/products/:name", async (req, res) => {
    let productName = req.params.name;
    console.log(productName)
  const query =
    "SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p JOIN product_availability pa ON (p.id=pa.prod_id) JOIN suppliers s ON (pa.supp_id=s.id) WHERE p.product_name=$1;";
  try {
     await pool.query(query,[productName]).then((result)=> {
        res.json(result.rows);
     });
    
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/customers/:customerId", async (req, res) => {
    let customerId = req.params.customerId
    const query = "SELECT * FROM customers WHERE customers.id=$1"
    try {
        await pool.query(query,[customerId]).then((result) => {
            res.json(result.rows)
        });
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post("/customers", async (req, res) => {
    let name = req.query.name
    let address = req.query.address
    let city = req.query.city
    let country = req.query.country
    const insertQuery = "INSERT INTO customers(name, address, city, country) VALUES($1, $2, $3, $4)";
    pool.query(insertQuery,[name,address,city,country]).then(() => {
        res.status(201).json({message: "New customer was added"})
    })
    .catch((error)=> console.error(error))
})

app.post("/products", async (req, res) => {
  let product_name = req.query.product_name;
  
  const insertQuery =
    "INSERT INTO products(product_name) VALUES($1)";
  pool
    .query(insertQuery, [product_name])
    .then(() => {
      res.status(201).json({ message: "New product was added" });
    })
    .catch((error) => console.error(error));
});

app.post("/availability", async (req, res) => {
  let prod_id = req.query.prod_id  
  let supp_id = req.query.supp_id;
  let unit_price = req.query.unit_price

  if (!prod_id || !supp_id || !unit_price || Math.sign(unit_price)!==1) {
    res.status(400).send("Please enter all required fields and make sure price is a positive integer")
    return;
  } 

  const insertQuery = "INSERT INTO product_availability(prod_id, supp_id, unit_price) VALUES($1, $2, $3)";
  pool
    .query(insertQuery, [prod_id, supp_id, unit_price])
    .then(() => {
      res.status(201).json({ message: "New product was added" });
    })
    .catch((error) => console.error(error));
});



app.listen(3001,()=>console.log("API server is running..."));