const express = require("express");
const app = express();
const { Pool } = require("pg");

const randomRecords = [
  {
    name: "Anosh",
    address: "47 Neverland Street",
    city: "Timbuktu",
    country: "Samoa",
  },
  {
    name: "Maha",
    address: "50 Sesame Street",
    city: "Mogadishu",
    country: "South Korea",
  },
  {
    name: "Oneil",
    address: "221B Baker Street",
    city: "Carthage",
    country: "Siberia",
  },
];

app.use(express.json());

const db = new Pool({
  user: "codeyourfuture", // replace with you username
  host: "localhost",
  database: "cyf_ecommerce",
  password: "cyf123",
  port: 5432,
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

app.get("/customers", function (req, res) {
  db.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/suppliers", function (req, res) {
  if (req.query.name) {
    db.query(
      `SELECT * FROM suppliers WHERE supplier_name='${req.query.name}'`,
      (error, result) => {
        res.json(result.rows);
      }
    );
  } else {
    db.query("SELECT * FROM suppliers", (error, result) => {
      res.json(result.rows);
    });
  }
});

// SQL W3
app.get("/products", function (req, res) {
  if (req.query.name) {
    db.query(
      `SELECT product_availability.unit_price, products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN products on products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id WHERE products.product_name= '${req.query.name}'`,
      (error, result) => {
        res.json(result.rows);
      }
    );
  } else {
    db.query(
      `SELECT product_availability.unit_price, products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN products on products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id`,
      (error, result) => {
        res.json(result.rows);
      }
    );
  }
});

app.get("/customers/:customerId", function (req, res) {
  db.query(
    `SELECT * FROM customers WHERE id = '${req.params.customerId}' `,
    (error, result) => {
      console.log("REQUEST CAME IN");
      res.json(result.rows);
    }
  );
});

app.get(`/customers/:customerId/orders`, function (req, res) {
  db.query(
    `SELECT orders.order_reference, orders.order_date, product_availability.unit_price, products.product_name, suppliers.supplier_name, order_items.quantity FROM products INNER JOIN product_availability on products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id INNER JOIN order_items ON order_items.supplier_id=product_availability.supp_id INNER JOIN orders ON order_items.order_id=orders.id WHERE customer_id='${req.params.customerId}'`,
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.post("/customers", function (req, res) {
  const body = req.body;
  db.query(
    `INSERT INTO customers (name,address,city,country) VALUES ('${body.name}', '${body.address}', '${body.city}','${body.country}')`,
    (error, result) => {
      res.send({ body });
    }
  );
});

app.post("/products", function (req, res) {
  const body = req.body;
  db.query(
    `INSERT INTO products (product_name) VALUES ('${body.product_name}')`,
    (error, result) => {
      res.send({ body });
    }
  );
});

// #5 NEEDS REVIEW
app.post("/availability", function (req, res) {
  const body = req.body;
  db.query(
    `INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES (${body.prod_id},${body.supp_id},${body.price} )`,
    (error, result) => {
      if (error) {
        console.log(error);
        res.json({ error });
      } else {
        res.send("RECORD INSERTED INTO PRODUCT_AVAILABILITY TABLE");
      }
    }
  );
});

app.post(`/customers/:customerId/orders`, function (req, res) {
  const body = req.body;

  db.query(
    `INSERT INTO orders (order_date, order_reference, customer_id) VALUES ('${body.date}', '${body.reference}', '${req.params.customerId}')`,
    (error, result) => {
      res.send("RECORD INSERTED INTO ORDERS TABLE");
    }
  );
});

app.put(`/customers/:customerId`, function (req, res) {
  const body = req.body;

  db.query(
    `UPDATE customers SET name = '${body.name}', address = '${body.address}', city = '${body.city}', country = '${body.country}' WHERE id = '${req.params.customerId}' `,
    (error, result) => {
      if (error) {
        console.log(error);
        res.json(error);
      } else {
        res.json(result.rows);
      }
    }
  );
});


// #9 NEEDS REVIEW
app.delete(`/customers/:customerId`, function (req, res) {
  const body = req.body;

  // db.query(
  //   "DELETE FROM customers USING orders WHERE  = producers.id AND producers.name = 'foo'",
  //   (error, result) => {
  //     res.json(result.rows);
  //   }
  // );

  const customerCheck = db.query("SELECT * FROM customers WHERE id = $1", [req.params.customerId ]);
  const customerOrderCheck = db.query(
    "SELECT * FROM orders WHERE customer_id = $1",
    [req.params.customerId]
  );
  if (customerCheck && customerOrderCheck) {
    db.query(
      "DELETE FROM order_items WHERE order_id = $1",
      [req.params.customerId],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          res.json("ITEM DELETED");
        }
      }
    );
  } else {
    res.json("NOT DELETED. CUSTOMER HAS ORDERS");
  }
});

// #8 NEEDS REVIEW
app.delete(`/orders/:orderId`, function (req, res) {
  const body = req.body;

  // db.query(
  //   "DELETE FROM films USING producers WHERE producer_id = producers.id AND producers.name = 'foo';",
  //   (error, result) => {
  //     res.json(result.rows);
  //   }
  // );


  const orderCheck = db.query("SELECT * FROM orders WHERE id = $1", [
    req.params.orderId,
  ]);
  const orderItemsCheck = db.query(
    "SELECT * FROM order_items WHERE customer_id = $1",
    [req.params.orderId]
  );
  if (orderCheck && orderItemIdCheck) {
    db.query(
      "DELETE FROM order_items WHERE order_id = $1",
      [req.params.customerId],
      (error, results) => {
        if (error) {
          throw error;
        } else {
          res.json("ITEM DELETED");
        }
      }
    );
  } else {
    res.json("NOT DELETED. CUSTOMER HAS ORDERS");
  }


});

// SQL W3 ABOVE!
