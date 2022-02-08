const express = require("express");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
    user: "davidandtiana",
    host: "localhost",
    database: "cyf_ecommerce",
    password: "password",
    port: 5432,
});

app.get(`/customers`, (req, res) => {
    //console.log(pool);
    pool.query(`SELECT * FROM customers`, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send(err);
        } else {
           // console.log('result', result);
            res.status(200).send(result.rows);
        }
    });
});


app.get(`/suppliers`, (req, res) => {
    pool.query(`SELECT * FROM suppliers`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });
});

// GET endpoint `/products` to filter the list of products by name using a query parameter, for example `/products?name=Cup`. 

app.get(`/products`, (req, res) => {
    const name = req.query.name;
    const query = name ? `SELECT * FROM products WHERE name ILIKE '%${name}%'` : `SELECT * FROM products`;
    pool.query(query, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });
});


// Add a new GET endpoint `/customers/:customerId` to load a single customer by ID.
app.get(`/customers/:customerId`, (req, res) => {
    const customerId = req.params.customerId;
    pool.query(`SELECT * FROM customers WHERE customer_id = ${customerId}`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });
});


//- Add a new POST endpoint `/customers` to create a new customer with name, address, city and country. 
app.post(`/customers`, (req, res) => {
    const { name, address, city, country } = req.body;
    pool.query(`INSERT INTO customers (name, address, city, country) VALUES ('${name}', '${address}', '${city}', '${country}')`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });
});



// Add a new POST endpoint `/products` to create a new product with name, price and quantity.
app.post(`/products`, (req, res) => {
    const { name, price, quantity } = req.body;
    pool.query(`INSERT INTO products (name, price, quantity) VALUES ('${name}', ${price}, ${quantity})`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });
});


//Add a new POST endpoint `/availability` to create a new product availability (with a price and a supplier id). Check that the price is a positive integer and that both the product and supplier ID's exist in the database, otherwise return an error 
app.post(`/availability`, (req, res) => {
    const { price, supplier_id, product_id } = req.body;
    pool.query(`INSERT INTO availability (price, supplier_id, product_id) VALUES (${price}, ${supplier_id}, ${product_id})`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });
});



// Add a new POST endpoint `/customers/:customerId/orders` to create a new order (including an order date, and an order reference) for a customer. Check that the customerId corresponds to an existing customer or return an error
app.post(`/customers/:customerId/orders`, (req, res) => {
    const { customerId } = req.params;
    const { order_date, order_reference } = req.body;
    pool.query(`INSERT INTO orders (customer_id, order_date, order_reference) VALUES (${customerId}, '${order_date}', '${order_reference}')`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });
});



//Add a new PUT endpoint `/customers/:customerId` to update an existing customer (name, address, city and country) by ID. Check that the customerId corresponds to an existing customer or return an error
app.put(`/customers/:customerId`, (req, res) => {
    const { customerId } = req.params;
    const { name, address, city, country } = req.body;
    pool.query(`UPDATE customers SET name = '${name}', address = '${address}', city = '${city}', country = '${country}' WHERE customer_id = ${customerId}`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });
});


// Add a new DELETE endpoint `/orders/:orderId` to delete an existing order along with all the associated order items. 
app.delete(`/orders/:orderId`, (req, res) => {
    const { orderId } = req.params;
    pool.query(`DELETE FROM orders WHERE order_id = ${orderId}`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });
});

//Add a new DELETE endpoint `/customers/:customerId` to delete an existing customer only if this customer doesn't have orders associated with it.
app.delete(`/customers/:customerId`, (req, res) => {
    const { customerId } = req.params;
    pool.query(`DELETE FROM customers WHERE customer_id = ${customerId}`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });
});


//Add a new GET endpoint `/customers/:customerId/orders` to load all the orders along with the items in the orders of a specific customer. Especially, the following information should be returned: order references, order dates, product names, unit prices, suppliers and quantities
app.get(`/customers/:customerId/orders`, (req, res) => {
    const { customerId } = req.params;
    pool.query(`SELECT * FROM orders WHERE customer_id = ${customerId}`, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(result.rows);
        }
    });
});









app.listen(3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});



// - Add Express and node-postgres and make sure you can start the server with `node server.js`
// - Add a new GET endpoint `/customers` to return all the customers from the database
// - Add a new GET endpoint `/suppliers` to return all the suppliers from the database
// - (STRETCH GOAL) Add a new GET endpoint `/products` to return all the product names along with their prices and supplier names.
