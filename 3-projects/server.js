const express = require("express");
const bodyParser = require("body-parser");

const pool = require("./Pool");

const cors = require("cors");

const app = express();

app.use(express.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// Importing products routes
const productsRoutes = require("./routes/products");

// Importing customers routes
const customersRoutes = require("./routes/customers");

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

app.use("/products", productsRoutes);
app.use("/customers", customersRoutes);

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
