const express = require("express");
const app = express();
const { Pool } = require("pg");
const secrets = require("./_secrets");

app.use(express.json());

// over the top? Yes.
const pool = new Pool({
  host: secrets.host,
  port: secrets.port,
  user: secrets.user,
  password: secrets.password,
  database: secrets.database,
});

// GET "/" : signposting
app.get("/", (req, res) => {
  res.json({ message: "Use /customers or /suppliers or even /products!" });
});

// GET "/customers" : serve all customers in the database
app.get("/customers", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT name, address, city, country FROM customers;"
  );

  res.json(rows);
});

app.get("/customers/:customerId", async (req, res) => {
  const { customerId } = req.params;
  const query =
    "SELECT name, address, city, country FROM customers WHERE id = $1";

  const { rows } = await pool.query(query, [customerId]);

  rows.length
    ? res.json(rows)
    : res.status(500).json({
        success: false,
        message: `No customer with id of ${customerId} was found!`,
      });
});

app.post("/customers", async (req, res) => {
  const { name, address, city, country } = req.body;
  const query =
    "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4) RETURNING *;";

  if (!name)
    return res
      .status(500)
      .json({ success: false, message: "Name cannot be null" });

  const { rows } = await pool.query(query, [name, address, city, country]);

  res.json(rows);
});

app.post("/customers/:customerId/orders", async (req, res) => {
  const { customerId } = req.params;
  const { order_date } = req.body;

  // query for getting the last 3 numbers of the most recently added order from the orders table
  const lastOrderReference =
    "SELECT substring(order_reference, 4) as number FROM orders ORDER BY order_reference DESC LIMIT(1)";

  const result = await pool.query(lastOrderReference);
  const number = result.rows[0].number;
  const splitNumber = number.split("").map((string) => parseInt(string));

  // incrementing the number by 1
  splitNumber[2]++;
  // if last digit of the number = 10 that means the middle number has to have plus one
  if (splitNumber[2] >= 10) {
    splitNumber[2] = 0;
    splitNumber[1]++;
    // if the middle number = 10 then the first number has to have plus one
    if (splitNumber[1] >= 10) {
      splitNumber[1] = 0;
      splitNumber[0]++;
    }
  }

  // reconstructing the order reference string
  const order_reference = `ORD${splitNumber.join("")}`;

  const query =
    "INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3) RETURNING *;";

  if (!order_date)
    return res
      .status(500)
      .json({ success: false, message: "Some data is not valid" });

  const { rows } = await pool.query(query, [
    order_date,
    order_reference,
    customerId,
  ]);

  res.json(rows);
});

app.get("/suppliers", async (req, res) => {
  const { rows } = await pool.query(
    "SELECT supplier_name, country FROM suppliers;"
  );

  res.json(rows);
});

app.get("/products", async (req, res) => {
  let query = `SELECT products.product_name, suppliers.supplier_name, product_availability.unit_price
FROM products 
INNER JOIN product_availability ON product_availability.prod_id = products.id
INNER JOIN suppliers ON suppliers.id = product_availability.supp_id`;

  const { name } = req.query;
  const params = [];

  if (name) {
    query = query.concat(" ", "WHERE LOWER(products.product_name) LIKE $1;");
    params.push(`%${name.toLowerCase()}%`);
  }

  const { rows } = await pool.query(query, params);

  res.json(rows);
});

app.post("/products", async (req, res) => {
  const { product_name } = req.body;
  const query = "INSERT INTO products (product_name) VALUES ($1) RETURNING *;";

  if (!product_name)
    return res
      .status(500)
      .json({ success: false, message: "product_name is empty!" });

  const { rows } = await pool.query(query, [product_name]);

  res.json(rows);
});

app.post("/availability", async (req, res) => {
  const { prod_id, supp_id, unit_price } = req.body;
  const query =
    "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ($1, $2, $3) RETURNING *;";

  if (!prod_id || !supp_id || !unit_price)
    return res.status(500).json({
      success: false,
      message: `Some data is not valid, please check again`,
    });

  const { rows } = await pool.query(query, [prod_id, supp_id, unit_price]);

  res.json(rows);
});

app.listen(3000, () =>
  console.log("Server is running and listening on port 3000!")
);
