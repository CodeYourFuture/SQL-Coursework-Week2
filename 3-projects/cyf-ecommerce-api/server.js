const express = require("express");
const app = express();
const validator = require("validator");
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "",
  port: 5432,
});

app.use(express.json());

app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/products", (req, res) => {
  const productQuery = req.query.name;
  let query = `SELECT * FROM products WHERE product_name LIKE '%${productQuery}%' ORDER BY product_name`;

  if (!productQuery) {
    query = "SELECT * FROM products";
  }

  pool
    .query(query)
    .then((result) => {
      return res.json(result.rows);
    })
    .catch((e) => console.error(e));
});

app.get("/customers/:customerId", (req, res) => {
  const customerId = req.params.customerId;

  pool.query(
    `SELECT * FROM customers WHERE id = ${customerId}`,
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.post("/customers", (req, res) => {
  const newCustName = req.body.name;
  const newCustAddress = req.body.address;
  const newCustCity = req.body.city;
  const newCustCountry = req.body.country;
  const query =
    "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
  pool
    .query(query, [newCustName, newCustAddress, newCustCity, newCustCountry])
    .then(() => res.send("New customer added!"))
    .catch((e) => console.error(e));
});

app.post("/products", (req, res) => {
  const prodName = req.body.product_name;

  pool
    .query("INSERT INTO products (product_name) VALUES ($1)", [prodName])
    .then(() => res.send("Product added!"))
    .catch((e) => console.error(e));
});

app.post("/availability", (req, res) => {
  const prodId = req.body.prod_id;
  const suppId = req.body.supp_id;
  const unitPrice = req.body.unit_price;
  const query =
    "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ($1, $2, $3)";
  if (!unitPrice > 0) {
    return res.status(400).send("Please provide a valid price");
  }

  pool.query(
    `SELECT id from products where id = ${prodId} union select id from suppliers WHERE id = ${suppId}`,
    (error, result) => {
      if (result.rows.length < 2) {
        return res.status(400).send("Product or supplier does not exist");
      } else {
        pool
          .query(query, [prodId, suppId, unitPrice])
          .then(() => res.send("product added!"))
          .catch((e) => console.error(e));
      }
    }
  );
});

app.post("/customers/:customerId/orders", (req, res) => {
  const customerId = req.params.customerId;
  const newCustomerOrderDate = req.body.order_date;
  const newCustomerOrderRef = req.body.order_reference;

  pool.query(
    `select * from customers where id = ${customerId}`,
    (error, result) => {
      if (result.rows.length === 0) {
        return res.status(400).send("Customer not on system");
      } else {
        pool
          .query(
            `insert into orders (order_date, order_reference, customer_id) values ($1, $2, $3)`,
            [newCustomerOrderDate, newCustomerOrderRef, customerId]
          )
          .then(() => res.send("order added!"))
          .catch((e) => console.error(e));
      }
    }
  );
});

app.put("/customers/customerId", (req, res) => {
  const customerId = req.params.customerId;
  const customerName = req.body.name;
  const customerAddress = req.body.address;
  const customerCity = req.body.city;
  const customerCountry = req.body.country;

  pool.query( 
    `select * from customers where id = ${customerId}`,
    (error, result) => {
      if (result.rows.length === 0) {
        return res.status(400).send("Customer not on system");
      } else {
        pool
          .query(
            `UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=${customerId}`,
            [customerName, customerAddress, customerCity, customerCountry]
          )
          .then(() => res.send("Customer details updated"))
          .catch((e) => console.error(e));
      }
    }
  );
});

app.delete("/orders/:orderId", (req, res) => {
  const orderId = req.params.orderId;

  pool
  .query(`select * from orders where id=${orderId}`, (error, result) => {
    if (result.rows.length === 0) {
      return res.send(`There are no orders with the id ${orderId}`)
    } else {
      pool
      .query(`delete from orders where id=$1`, [orderId])
      .then(() => res.send(`Order ID:${orderId} has been deleted`))
      .catch((e) => console.error(e))
    }
  });
})

app.delete("/customers/:customerId", (req, res) => {
  const customerId = req.params.customerId;

  pool
  .query(`select * from orders where customer_id=${customerId}`, (error, result) => {
    if (result.rows.length > 0) {
      return res.send(`Customer with the ID ${customerId} cannot be deleted as they have outstanding orders`)
    } else {
      pool
      .query(`delete from customers where id=$1`, [customerId])
      .then(() => res.send(`customer ID:${customerId} has been deleted`))
      .catch((e) => console.error(e))
    }
  });
})


app.get("/customers/:customerId/orders", (req,res) => {
  const customerId = req.params.customerId;

  pool.query(`SELECT orders.order_reference, orders.order_date, order_items.supplier_id, products.product_name, product_availability.unit_price, order_items.quantity 
      FROM order_items 
      INNER JOIN orders ON orders.id=order_items.order_id 
      INNER JOIN products ON products.id=order_items.product_id 
      INNER JOIN product_availability ON product_availability.prod_id=order_items.product_id and product_availability.supp_id=order_items.supplier_Id 
      WHERE orders.customer_id = $1;`,[customerId], (error, result) => {
    if (result.rows.length === 0) {
      return res.send(`Customer ID${customerId} does not have any orders`)
    } else {
      res.send(result.rows)
    }
  })
})

app.listen(3000, function () {
  console.log("server is listening on port 3000, Ready to accept requests");
});



