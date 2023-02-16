const { query } = require("express");
const express = require("express");
const app = express();
const port = 5000;

app.use(express.json());

const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Kdagaal123",
  port: 5432,
});

const productsBySuppliers = `SELECT products.product_name, suppliers.supplier_name, product_availability.unit_price FROM products
JOIN product_availability on product_availability.prod_id=products.id
JOIN suppliers on product_availability.supp_id=suppliers.id
ORDER BY supplier_name`;

app.get("/cyf-ecommerce-api", (req, res) => {
  res.status(200).send(`Wellcom cyf-ecommerce-api
    visit these roots;
/customers
/suppliers
/products
    `);
});

app.get("/cyf-ecommerce-api/customers", (req, res) => {
  pool
    .query("SELECT * FROM customers")
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

app.get("/cyf-ecommerce-api/suppliers", (req, res) => {
  pool
    .query("SELECT * FROM suppliers")
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

app.get("/cyf-ecommerce-api/products", (req, res) => {
  pool
    .query("SELECT * FROM products")
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

app.get("/cyf-ecommerce-api/productsBySuppliers", (req, res) => {
  pool
    .query(`${productsBySuppliers}`)
    .then((data) => res.json(data))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

//-------------    FROM HERE IS  SQL WEEK 3   ------------------------

app.get("/customers/:customerId", (req, res) => {
  const customerId = +req.params.customerId;

  pool
    .query(
      `SELECT c.name, c.address, c.city, c.country FROM customers c WHERE id=${customerId}`
    )
    .then((customer) => res.json(customer.rows))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

app.get("/product_avaialability", (req, res) => {
  pool
    .query(`SELECT * FROM product_availability;`)
    .then((availableProducts) => res.json(availableProducts.rows))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

app.post("/addNewCustomer", (req, res) => {
  pool
    .query(
      `
    INSERT INTO customers (name,address,city,country)
    VALUES ('New name3','New address3', 'XYZ City3','ABC Country3');
    `
    )
    .then(() => res.send("A new customer is added"))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

app.post("/addNewProduct", (req, res) => {
  pool
    .query(`INSERT INTO products (product_name) VALUES ('Book');`)
    .then(() => res.send("New row is added"))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

app.post("/addProductAvailability", (req, res) => {
  pool
    .query(
      `INSERT INTO product_availability (prod_id,supp_id,unit_price)
            VALUES (13,2,15);`
    )
    .then(() =>
      res.status(200).json("new record is added to product_availability table")
    )
    .catch((err) => {
      console.error(err);
      res.send(err);
    });
});

app.post("/customers/:customerId/AddNewOrders", (req, res) => {
  const custID = +req.params.customerId;
  const query = `INSERT INTO orders (order_date,order_reference,customer_id)
              VALUES ('2023-01-10','0RD012',${Number(custID)})`;

  pool
    .query(query)
    .then(() => res.send("Anew order is added for customer " + custID))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

//Look this put block and it's fucntionality thing about update and put methods
app.put("/updateCustomerRecord/:customerId", (req, res) => {
  const custID = +req.params.customerId;
  console.log(custID, `${Number(custID)}`);
  pool
    .query(
      `
UPDATE customers
SET name='Ahmed',address='10 AliClose M82UY',city='Manchester',country='Canada'
WHERE id ='${custID}'
`
    )
    .then(() => res.send(`customer id : ${custID} has been updated`))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

app.delete("/deleteOrder/:orderId", (req, res) => {
  const orderId = +req.params.orderId;
  pool
    .query(`DELETE FROM orders WHERE orders.id='${Number(orderId)}'`)
    .then(() => {
      res.send("order number " + orderId + " has been deleted").catch((err) => {
        console.error(err);
        res.send(err);
      });
    });
});



app.delete("/deleteCustomer/:customerId", (req, res) => {
  const customerId = +req.params.customerId;

  pool
    .query(
      `Delete FROM customers 
    JOIN orders ON orders.customer_id=customers.id
    WHERE customers.id='${customerId} AND orders.customer_id='${customerId}'`
    )
    .then((customer) => res.json(customer.rows))
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

app.get(`/getAllCustomerOrders/:customerId/orders`, (req, res) => {
  const custID = +req.params.customerId;

  pool
    .query(
      `SELECT c.name, o.order_reference,o.order_date, p.product_name, oi.quantity,s.supplier_name, pa.unit_price from customers c
JOIN orders o ON o.customer_id=c.id
JOIN order_items oi on oi.order_id=o.id
JOIN products p ON p.id=oi.product_id
JOIN suppliers s ON s.id=oi.supplier_id
JOIN product_availability pa ON pa.prod_id=oi.product_id
WHERE c.id = '${custID}'`)
    .then((customerOrders) => res.json(customerOrders.rows))
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
});

app.listen(port, () => {
  console.log(`server is running ${port}`);
});
