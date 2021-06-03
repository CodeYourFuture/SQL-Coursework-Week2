const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;
app.listen(5000, function () {
  console.log(`Server is listening on port ${PORT}. Ready to accept requests!`);
});

const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "cyf_ecommerce",
  password: "",
});

const WELCOME_MESSAGE = `<h1 style="text-align:center">Welcome to my cyf_ecommerce api.</h1>
                        <p style="text-align:center; font-size:1.2rem">Please ask me one of these:
                        <strong>/customers, /suppliers</strong> or <strong>/products</strong>.</p>`;

const getProductsQuery = `SELECT
                            p.product_name AS "Product Name",
                            pa.unit_price AS "Unit Price",
                            s.supplier_name AS "Supplier Name"
                            FROM product_availability pa
                              INNER JOIN products p ON pa.prod_id = p.id 
                                INNER JOIN suppliers s ON pa.supp_id = s.id;`;

// GET "/"
app.get("/", async (req, res) => {
  res.send(WELCOME_MESSAGE);
});

// GET "/{route}"
app.get("/:route", async (req, res) => {
  const route = req.params.route;
  let query = `SELECT * FROM ${route}`;
  try {
    if (route === "products") {
      query = getProductsQuery;
    }
    const result = await pool.query(query);
    res.send(result.rows);
  } catch (e) {
    res.send({ error: e });
  }
});
