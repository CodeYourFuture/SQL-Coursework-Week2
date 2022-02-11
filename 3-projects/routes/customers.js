const express = require("express");

const pool = require("../Pool");

const router = express.Router();

// POST /customers/:customerId/orders
router.post("/:customerId/orders", (req, res) => {
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

// GET /customers/:customerId
router.get("/:customerId", (req, res) => {
  const { customerId } = req.params;

  pool
    .query("SELECT * FROM customers WHERE id=$1", [customerId])
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.log(error);
      res.status(500).json(error);
    });
});

// POST /customers
router.post("/", (req, res) => {
  const { customerName, address, city, country } = req.body;

  if (!customerName.length) {
    return res.status(400).send({
      success: false,
      message:
        "Name field cannot be empty when adding a new customer, please fix and try again...",
    });
  }
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

// GET /customers
router.get("/", (req, res) => {
  pool.query("SELECT * FROM customers", (error, result) => {
    res.json(result.rows);
  });
});

module.exports = router;
