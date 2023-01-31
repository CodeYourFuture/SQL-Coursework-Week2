const express = require("express");
const cors = require('cors')
const app = express();
const port = process.env.PORT || 3000;
const mysql = require('mysql');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Listening on port ${port}`));

const connection = mysql.createConnection(
    {
        host: 'localhost',
        database: 'cyf_ecommerce',
        user: 'root',
        password: '',
        port: 3306
    });

app.get("/customers", (req, res) =>
{
    connection.query('SELECT * FROM customers', (err, rows) =>
    {
        res.send(Object.values(rows));
    })
});

app.get("/suppliers", (req, res) =>
{
    connection.query('SELECT * FROM suppliers', (err, rows) =>
    {
        res.send(Object.values(rows));
    })
});

app.get("/products", (req, res) =>
{
    connection.query('SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products, suppliers, product_availability', (err, rows) =>
    {
        res.send(Object.values(rows));
    })
});
