require("dotenv").config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { Pool } = require("pg");

const service = require("./ecommerceService");

const pool = new Pool({
  user: "cecilia",
  host: "localhost",
  database: "cyf_ecommerce",
  password: process.env.DB_PASS,
  port: 5432,
});

app.post("/availability", async function (req, res) {
  const newProdId = req.body.prod_id;
  const newSupplierId = req.body.supp_id;
  const newPrice = parseInt(req.body.unit_price);

  if (!Number.isInteger(newPrice) || newPrice <= 0) {
    return res.status(400).send("The price should be a positive integer.");
  }

  const response = await service.createAvailability(
    newProdId,
    newSupplierId,
    newPrice
  );
  res.status(response.status).send(response.message);
});

app.get("/customers", async function (req, res) {
  const client = await pool.connect();
  client.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
  client.release();
});

app.get("/customers/:customerId", async function (req, res) {
  const customerId = req.params.customerId;
  const client = await pool.connect();
  client
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
  client.release();
});

app.get("/customers/:customerId/orders", async function (req, res) {
  const customerId = req.params.customerId;
  const client = await pool.connect();
  const query = `SELECT order_reference, order_date, product_name, unit_price, supplier_name, quantity
  				FROM orders 
				INNER JOIN order_items ON orders.id = order_items.order_id
				INNER JOIN products ON products.id = order_items.product_id
				INNER JOIN product_availability ON product_availability.prod_id = order_items.product_id AND product_availability.supp_id = order_items.supplier_id
				INNER JOIN suppliers ON suppliers.id = product_availability.supp_id
				WHERE customer_id=$1`;
  client
    .query(query, [customerId])
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
  client.release();
});

app.post("/customers", async function (req, res) {
  const newCustomerName = req.body.name;
  const newCustomerAddress = req.body.address;
  const newCustomerCity = req.body.city;
  const newCustomerCountry = req.body.country;

  const client = await pool.connect();
  client
    .query("SELECT * FROM customers WHERE name=$1", [newCustomerName])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("A customer with the same name already exists!");
      } else {
        const query =
          "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";

        client
          .query(query, [
            newCustomerName,
            newCustomerAddress,
            newCustomerCity,
            newCustomerCountry,
          ])
          .then(() => res.send("Customer created!"))
          .catch((e) => console.error(e));
      }
      client.release();
    });
});

app.post("/customers/:customerId/orders", async function (req, res) {
  const customerId = req.params.customerId;
  const newOrderDate = req.body.oder_date;
  const newOrderReference = req.body.order_reference;

  const client = await pool.connect();
  client
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => {
      if (result.rows.length === 0) {
        return res
          .status(400)
          .send("A customer with the required id does not exist!");
      } else {
        const query =
          "INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)";

        client
          .query(query, [newOrderDate, newOrderReference, customerId])
          .then(() => res.send("Order created!"))
          .catch((e) => console.error(e));
      }
      client.release();
    });
});

app.put("/customers/:customerId", async function (req, res) {
  const customerId = req.params.customerId;
  const newFields = req.body;
  let query = "UPDATE customers SET ";
  let counter = 1;
  let fieldsArray = [];
  for (i in newFields) {
    if (
      newFields[i] !== null &&
      newFields[i] != "" &&
      ["name", "address", "city", "country"].includes(i)
    ) {
      query += ` ${i}=$${counter},`;
      counter++;
      fieldsArray.push(newFields[i]);
    }
  }
  query = query.slice(0, -1);
  query += ` WHERE id=$${counter}`;
  fieldsArray.push(customerId);

  if (counter >= 1) {
    const client = await pool.connect();
    pool
      .query(query, fieldsArray)
      .then(() => res.send(`Customer ${customerId} updated!`))
      .catch((e) => console.error(e));
    client.release();
  } else {
    res.status(400).send("No valid fields to update");
  }
});

app.delete("/customers/:customerId", async function (req, res) {
  const customerId = req.params.customerId;
  const client = await pool.connect();
  client
    .query("SELECT * FROM orders WHERE customer_id=$1", [customerId])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("The customer you want to delete has some pending orders!");
      } else {
        client
          .query("DELETE FROM customers WHERE id=$1", [customerId])
          .then(() => res.send(`Customer ${customerId} deleted!`))
          .catch((e) => console.error(e));
      }
    })
    .catch((e) => console.error(e));
  client.release();
});

app.delete("/orders/:orderId", async function (req, res) {
  const orderId = req.params.orderId;
  const client = await pool.connect();
  client
    .query("DELETE FROM order_items WHERE order_id=$1", [orderId])
    .then(() => {
      client
        .query("DELETE FROM orders WHERE id=$1", [orderId])
        .then(() => res.send(`Order ${orderId} deleted!`))
        .catch((e) => console.error(e));
    })
    .catch((e) => console.error(e));
  client.release();
});

app.get("/products", async function (req, res) {
  const productNameQuery = req.query.name;
  let productQuery = `SELECT product_name, unit_price, supplier_name from products 
	INNER JOIN product_availability ON product_availability.prod_id = products.id
	INNER JOIN suppliers ON suppliers.id = product_availability.supp_id`;
  if (productNameQuery) {
    productQuery += `WHERE lower(product_name) LIKE '%${productNameQuery}%';`;
  } else {
    productQuery += ";";
  }
  const client = await pool.connect();
  client
    .query(productQuery)
    .then((result) => res.json(result.rows))
    .catch((e) => console.error(e));
  client.release();
});

app.post("/products", async function (req, res) {
  const newProductName = req.body.name;

  const client = await pool.connect();
  client
    .query("SELECT * FROM products WHERE product_name=$1", [newProductName])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("A product with the same name already exists!");
      } else {
        const query = "INSERT INTO products (product_name) VALUES ($1)";

        client
          .query(query, [newProductName])
          .then(() => res.send("Customer created!"))
          .catch((e) => console.error(e));
      }
      client.release();
    });
});

app.get("/suppliers", async function (req, res) {
  const client = await pool.connect();
  client.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
  client.release();
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
