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
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/suppliers", async (req, res) => {
  const query = "SELECT * FROM suppliers";
  try {
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/products", async (req, res) => {
  let productName = req.query.name;
  if (!productName) {
    const query =
      "SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p JOIN product_availability pa ON (p.id=pa.prod_id) JOIN suppliers s ON (pa.supp_id=s.id) ORDER BY p.product_name ASC;";

    try {
      const result = await pool.query(query);
      res.json(result.rows);
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    const query =
      "SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p JOIN product_availability pa ON (p.id=pa.prod_id) JOIN suppliers s ON (pa.supp_id=s.id) WHERE p.product_name=$1;";
    try {
      const result = await pool.query(query, [productName]);
      res.json(result.rows);
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

app.get("/products/:name", async (req, res) => {
  let productName = req.params.name;
  console.log(productName);
  const query =
    "SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p JOIN product_availability pa ON (p.id=pa.prod_id) JOIN suppliers s ON (pa.supp_id=s.id) WHERE p.product_name=$1;";
  try {
    await pool.query(query, [productName]).then((result) => {
      res.json(result.rows);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/customers/:customerId", async (req, res) => {
  let customerId = req.params.customerId;
  const query = "SELECT * FROM customers WHERE customers.id=$1";
  try {
    await pool.query(query, [customerId]).then((result) => {
      res.json(result.rows);
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

app.post("/customers", async (req, res) => {
  let name = req.query.name;
  let address = req.query.address;
  let city = req.query.city;
  let country = req.query.country;
  const insertQuery =
    "INSERT INTO customers(name, address, city, country) VALUES($1, $2, $3, $4)";
  pool
    .query(insertQuery, [name, address, city, country])
    .then(() => {
      res.status(201).json({ message: "New customer was added" });
    })
    .catch((error) => console.error(error));
});

app.post("/products", async (req, res) => {
  let product_name = req.query.product_name;

  const insertQuery = "INSERT INTO products(product_name) VALUES($1)";
  pool
    .query(insertQuery, [product_name])
    .then(() => {
      res.status(201).json({ message: "New product was added" });
    })
    .catch((error) => console.error(error));
});

// Add a new POST endpoint /availability to create a new product availability (with a price and a supplier id). Check that the price is a positive integer and that both the product and supplier ID's exist in the database, otherwise return an error.

app.post("/availability", async (req, res) => {
  let prod_id = req.query.prod_id;
  let supp_id = req.query.supp_id;
  let unit_price = req.query.unit_price;

  if (!prod_id || !supp_id || !unit_price || Math.sign(unit_price) !== 1) {
    res
      .status(400)
      .send(
        "Please enter all required fields and make sure price is a positive integer"
      );
    return;
  }

  const sameIDs =
    "SELECT * FROM product_availability WHERE prod_id=$1 AND supp_id=$2";

  const insertQuery =
    "INSERT INTO product_availability(prod_id, supp_id, unit_price) VALUES($1, $2, $3)";

  const existsProd_id = "SELECT * FROM product_availability WHERE prod_id=$1";
  const existsSupp_id = "SELECT * FROM product_availability WHERE supp_id=$1";

  pool.query(sameIDs, [prod_id, supp_id]).then((result) => {
    if (result.rowCount) {
      res.status(404).json({
        message: `Key (prod_id, supp_id)=(${prod_id}, ${supp_id}) already exists.`,
      });
      return;
    }
    pool.query(existsProd_id, [prod_id]).then((result) => {
      if (!result.rowCount) {
        res
          .status(404)
          .json({
            message: `Key prod_id = ${prod_id} does not exist provide a valid key.`,
          });
        return;
      }
      pool.query(existsSupp_id, [supp_id]).then((result) => {
        if (!result.rowCount) {
          res.status(404).json({message: `Key supp_id = ${supp_id} does not exist provide a valid key.`})
          return;
        }
        pool
              .query(insertQuery, [prod_id, supp_id, unit_price])
              .then(() => {
                res.status(201).json({ message: "New product was added" });
              })
              .catch((error) => console.error(error));
    });    
  });
  })
});

// Add a new POST endpoint /customers/:customerId/orders to create a new order (including an order date, and an order reference) for a customer. Check that the customerId corresponds to an existing customer or return an error. Not fully complete I have to change the way the order_reference id updated so that it takes the new id created and then I format the value so that it matches the rest of the inputs.

app.post("/customers/:customerId/orders",async (req,res)=>{
  let customerId = req.params.customerId;
  let order_date = new Date();
  let order_reference = req.query.order_reference

  let checkCustomerId = 'SELECT * FROM customers WHERE id=$1'
  let addNewOrderQuery =
    "INSERT INTO orders(order_date, order_reference, customer_id) VALUES($1, $2, $3)";

  pool.query(checkCustomerId,[customerId]).then((result) => {
    if(!result.rowCount) {
      res.status(404).json({message: `Customer by the id=${customerId} does not exist, enter a current customer`})
      return;
    }
    pool.query(addNewOrderQuery,[order_date,order_reference,customerId]).then(()=>{
      res.status(201).json({message:'New order has been added.'})
    })
    .catch((error)=> console.error(error))
  })

})


// Add a new PUT endpoint /customers/:customerId to update an existing customer (name, address, city and country). Could add more verifications and make sure that when updating only part of the parameters, the result returns the old values instead of null

app.put("/customers/:customerId", async (req,res) =>{
  let customer_id = req.params.customerId
  let name = req.query.name;
  let address = req.query.address;
  let city = req.query.city
  let country = req.query.country;

  let updateQuery = "UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=$5"
  
  pool.query(updateQuery,[name,address,city,country,customer_id]).then(()=>{
    res.status(201).json({message:`Customer by the id=${customer_id} had their details updated.`})
  })
  .catch((error) => console.error(error))
});

// Add a new DELETE endpoint /orders/:orderId to delete an existing order along with all the associated order items. Does delete new entries but does not delete existing ones, will have to find out why

app.delete("/orders/:orderId", async (req,res) =>{
  let orderId = req.params.orderId;
    if (isNaN(orderId)) {
      res.sendStatus(400);
      return;
    }
    const deleteQuery = 'DELETE FROM orders WHERE id=$1';
    const findOrder = 'SELECT * FROM orders WHERE id=$1';

    pool.query(findOrder, [orderId]).then((result) => {
      if (!result.rowCount) {
        res.sendStatus(404);
        return;
      }
      pool
        .query(deleteQuery, [orderId])
        .then((result) => {
          // console.log(result);
          res.json({ message: `Order by ID ${orderId} has been deleted` });
        })
        .catch((error) => console.error(error));
    });

});

// Add a new DELETE endpoint /customers/:customerId to delete an existing customer only if this customer doesn't have orders.



app.listen(3001, () => console.log("API server is running..."));
