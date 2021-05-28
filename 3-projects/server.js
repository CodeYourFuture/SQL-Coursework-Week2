const express = require("express");
const { Pool } = require("pg");
const app = express();


const dbConfig = {
    host: "localhost",
    port: 5432,
    user: "cyf",
    password: "CYFStudent123",
    database: "cyf_ecommerce",
};
const pool = new Pool(dbConfig);

// queries set as variables

const allCustomers = `select name from customers`;
const allSuppliers = `select supplier_name from suppliers`;
const allProducts = `select product_name,supplier_name,unit_price from products 
inner join product_availability on products.id=product_availability.prod_id
inner join suppliers on product_availability.supp_id=suppliers.id;
`;

// customers 

app.get("/customers", (req, res) =>
    pool
        .query(allCustomers)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => res.status(500).send(error))
);

// suppliers

app.get("/suppliers", (req, res) =>
    pool
        .query(allSuppliers)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => res.status(500).send(error))
);

// products

app.get("/products", (req, res) =>
    pool
        .query(allProducts)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => res.status(500).send(error))
);



const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}`));
