const express = require("express")
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const { Pool } = require('pg');

const db = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'free2way',
    port: 5432
})



app.get("/", (req, res) => {
    res.send(" Welcome to my ecommerce Database ");
})

// 
app.get("/customers", (req, res) => {
    db.query("select * from customers", (err, result) => {
        res.json(result.rows);
    });
});

app.get("/suppliers", (req, res) => {
    db.query('SELECT * FROM suppliers', (error, result) => {
        res.json(result.rows);
    })
})
app.get("/products", (req, res) => {
    db.query('SELECT product_name, unit_price, supplier_name FROM products JOIN product_availability ON (products.id = product_availability.prod_id) JOIN suppliers ON (product_availability.supp_id = suppliers.id)', (error, result) => {
        res.json(result.rows)
    })
})
app.get("/products?name=Cup", (req, res) => {
    //Need some clarification
})

app.get("/customers/:id", (req, res) => {
    const custId = req.params.id
    db.query('SELECT * FROM customers WHERE id = $1', [custId], (err, result) => {
        res.json(result.rows)
    })
})

app.post("/customers", (req, res) => {
    const newName = req.body.name
    const newAddress = req.body.address
    const newCity = req.body.city
    const newCountry = req.body.country

    const query = "INSERT INTO customers (name,address, city, country)" +
        "VALUES($1, $2, $3, $4)";
    db
        .query(query, [newName, newAddress, newCity, newCountry], (err, result) => {
            res.json(result.rows)
        })
});
app.post("/availability", (req, res) => {
    //Have to be checked 
})
app.post("`/customers/:customerId/orders`", (req, res) => {
    //Have to be checked 
})

app.put("/customers/:id", (req, res) => {
    const custId = req.params.id;
    const newName = req.body.name;
    const newAddress = req.body.address;
    const newCity = req.body.city;
    const newCountry = req.body.country;

    db.query('UPDATE customers SET  name = $4, address = $4,  city = $2, country = $3,WHERE id=$1',
        [newName, newAddress, newCity, newCountry,])
        .then(() => res.send(`Customer ${custId} updated!`))
        .catch((err) => {
            res.status(500).json({ error: err })
        });
})




app.listen(3000, function () {
    console.log("Server is listening on port 3000. ready to accept requrests!")

})