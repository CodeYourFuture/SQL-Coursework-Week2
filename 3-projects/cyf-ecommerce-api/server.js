const express = require("express");
const { Pool } = require("pg");
const app = express();

const dbConfig = {
    host: "localhost",
    port: 5432,
    user: "jas",
    password: "",
    database: "cyf_ecommerce",
};
const pool = new Pool(dbConfig);

// return all the customers from the database
const ecommerceCustomersQuery = `SELECT * FROM customers`;
app.get("/customers", (req, res) =>
    pool.query(ecommerceCustomersQuery, (error, result) => {
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(result.rows);
        }
    })
);


// return all the suppliers from the database
const ecommerceSuppliersQuery = `SELECT * FROM suppliers`;
app.get("/suppliers", (req, res) =>
    pool.query(ecommerceSuppliersQuery)
        .then(result => res.send(result.rows))
        .catch(error => res.status(500).send(error))
);


// return all the product names along with their prices and supplier names
const ecommerceProductQuery = `SELECT p.product_name, pa.unit_price, s.supplier_name
  FROM products AS p
  INNER JOIN product_availability AS pa ON pa.prod_id = p.id
  INNER JOIN suppliers AS s ON s.id = pa.supp_id;`;

app.get("/products", async (req, res) => {
    try {
        const result = await pool.query(ecommerceProductQuery);
        res.send(result.rows);
    } catch (error) {
        res.status(500).send(error);
    }
});
app.listen(3000, () => console.log("Running on port 3000"));