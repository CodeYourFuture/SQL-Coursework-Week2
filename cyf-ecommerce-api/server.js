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
    db.query("SELECT * FROM suppliers WHERE supplier_name='Sainsburys'", (error, result) => {
      res.json(result.rows);
    });
  } else {
    db.query("SELECT * FROM suppliers", (error, result) => {
      res.json(result.rows);
    });
  }
});


app.get("/products", async function (req, res) {
  
  if (req.query.name) {
    await db.query(
      `SELECT product_availability.unit_price, products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN products on products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id WHERE products.product_name= '${req.query.name}'`,
      (error, result) => {
        res.json(result.rows);
      }
    );
  } else { 
    await db.query(
      `SELECT product_availability.unit_price, products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN products on products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id`,
      (error, result) => {
        res.json(result.rows);
      }
    );
  }
 
});



// SQL W3 BELOW!
// 
app.get("/customers/:customerId", function (req, res) {
  db.query(`SELECT * FROM customers WHERE id = ${req.params.customerId} `, (error, result) => {
    res.json(result.rows);
  });
});

app.get(`/customers/:customerId/orders`, function (req, res) {
  db.query(
  `SELECT orders.order_reference, orders.order_date, product_availability.unit_price, products.product_name, suppliers.supplier_name, order_items.quantity FROM products INNER JOIN product_availability on products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id INNER JOIN order_items ON order_items.supplier_id=product_availability.supp_id INNER JOIN orders ON order_items.order_id=orders.id WHERE customer_id=${req.params.id}`,
    (error, result) => {
      res.json(result.rows);
    }
  );
});


app.post("/customers", function (req, res) {
  db.query(
    "SELECT product_availability.unit_price, products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN products on products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.post("/products",  function (req, res) {
  db.query(
    `SELECT product_availability.unit_price, products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN products on products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id`,
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.post("/availability", function (req, res) {
  db.query(
    "SELECT product_availability.unit_price, products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN products on products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.post(`/customers/:customerId/orders`, function (req, res) {
  db.query(
    "SELECT product_availability.unit_price, products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN products on products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.put(`/customers/:customerId/orders`, function (req, res) {
  db.query(
    "SELECT product_availability.unit_price, products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN products on products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

app.delete(`/customers/:customerId/orders`, function (req, res) {
  db.query(
    "SELECT product_availability.unit_price, products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN products on products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id",
    (error, result) => {
      res.json(result.rows);
    }
  );
});



app.delete(`/orders/:orderId`, function (req, res) {
  db.query(
    "SELECT product_availability.unit_price, products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN products on products.id=product_availability.prod_id INNER JOIN suppliers ON suppliers.id=product_availability.supp_id",
    (error, result) => {
      res.json(result.rows);
    }
  );
});

// SQL W3 ABOVE!