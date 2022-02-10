const express = require("express");

const pool = require("./Pool");

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());

app.post("/customers/:customerId/orders", (req, res) => {
  const { customerId } = req.params;

  const { orderDate, orderReference } = req.body;

  if (!orderDate.length || !orderReference.length) {
    return res.status(400).send({
      success: false,
      message: "orderDate and orderReference must be included",
    });
  }

  pool
    .query("SELECT * FROM customers WHERE customers.id = $1", [customerId])
    .then((result) => {
      if (result.rows.length === 0) {
        return res
          .status(400)
          .send(
            "Customer Id provided does not match any existing customer ids..."
          );
      } else {
        pool
          .query(
            "INSERT INTO orders (order_date, order_reference, customer_id) VALUES($1, $2, $3)",
            [orderDate, orderReference, customerId]
          )
          .then(() => res.send("order Added!"))
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      }
    });
});

app.post("/availability", (req, res) => {
  const { productId, supplierId, price } = req.body;

  if (price < 0) {
    return res.status(400).send({
      success: false,
      message: "make sure price >= 0...",
    });
  }

  pool
    .query("SELECT * FROM products WHERE products.id = $1", [productId])
    .then((result) => {
      if (result.rows.length === 0) {
        return res
          .status(400)
          .send(
            "Provided product id does not match any existing in the system..."
          );
      } else {
        pool
          .query("SELECT * FROM suppliers WHERE suppliers.id = $1", [
            supplierId,
          ])
          .then((result) => {
            if (result.rows.length === 0) {
              return res
                .status(400)
                .send(
                  "Provided supplier Id does not match any existing in the system..."
                );
            } else {
              pool
                .query(
                  "INSERT INTO product_availability(prod_id, supp_id, unit_price) VALUES ($1, $2, $3)",
                  [productId, supplierId, price]
                )
                .then(() => res.send("product availability added"))
                .catch((error) => {
                  console.log(error);
                  res.status(500).json(error);
                });
            }
          });
      }
    });
});

app.post("/products", (req, res) => {
  const { productName } = req.body;

  if (!productName.length) {
    return res.status(400).send({
      success: false,
      message:
        "product name field cannot be empty, please fix and try again...",
    });
  }

  pool
    .query("SELECT * FROM products WHERE product_name=$1", [productName])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("A product with the same name already exists");
      } else {
        const query = "INSERT INTO products (product_name) VALUES ($1)";

        pool
          .query(query, [productName])
          .then(() => res.send("Product Successfully added"))
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      }
    });
});

app.post("/customers", (req, res) => {
  const { customerName, address, city, country } = req.body;

  if (!customerName.length) {
    return res.status(400).send({
      success: false,
      message:
        "Name field cannot be empty when adding a new customer, please fix and try again...",
    });
  } //       console.log(error);
  //       res.status(500).json(error);
  //     });
  // });

  pool
    .query("SELECT * FROM customers WHERE name=$1", [customerName])
    .then((result) => {
      if (result.rows.length > 0) {
        return res
          .status(400)
          .send("A customer with the same name already exists");
      } else {
        const query =
          "INSERT INTO customers (name, address,city,country) VALUES ($1, $2, $3, $4)";

        pool
          .query(query, [customerName, address, city, country])
          .then(() => res.send("Customer Successfully added"))
          .catch((error) => {
            console.log(error);
            res.status(500).json(error);
          });
      }
    });
});

app.get("/customers/:customerId", (req, res) => {
  const { customerId } = req.params;

  pool
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

app.get("/products", (req, res) => {
  const { name } = req.query;
  let query =
    "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id ORDER BY products.product_name";

  let params = [];

  if (name) {
    query =
      "SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id WHERE products.product_name LIKE $1 ORDER BY products.product_name";

    params.push(`%${name}%`);
  }

  pool
    .query(query, params)
    .then((result) => res.status(200).json(result.rows))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

app.get("/suppliers", (req, res) => {
  pool.query("SELECT * FROM suppliers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/availability", (req, res) => {
  pool.query("SELECT * FROM product_availability", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/customers", (req, res) => {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/only-products", (req, res) => {
  pool.query("SELECT * FROM products", (error, result) => {
    res.json(result.rows);
  });
});

app.get("/", (req, res) => {
  return res
    .status(200)
    .send({ success: true, message: "Welcome to Wiam's ecommerce API" });
});

app.get("/*", (req, res) => {
  res.status(400).json({
    success: false,
    msg: "Not within my API s reach...",
  });
});

const PORT = process.env.PORT || 5000;
const listener = app.listen(PORT, () =>
  console.log(`Your app is listening on port ${PORT}`)
);
