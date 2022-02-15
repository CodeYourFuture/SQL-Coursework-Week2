const { json } = require("express");
const express = require("express");
const app = express();


app.use(express.json());

app.listen(3000, () => {
    console.log("Server is listening on port 3000. Ready to accept request!");
});

const { Pool } = require('pg');

const pool = new Pool({
    user: 'tenzingeks',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: null,
    port: 5432
});

app.get("/customers/:customerId/orders", (req, res) => {
    const customerId = req.params.customerId;

    pool
    .query("SELECT id FROM customers WHERE id=$1", [customerId])
    .then((result) => {
        if (result.rows.length > 0) {
            pool
                .query("SELECT orders.order_reference, orders.order_date, products.product_name, product_availability.unit_price, suppliers.supplier_name, order_items.quantity FROM orders INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN customers ON customers.id=orders.customer_id INNER JOIN suppliers ON suppliers.id=order_items.supplier_id INNER JOIN products ON products.id=order_items.product_id INNER JOIN product_availability on product_availability.prod_id=products.id WHERE customers.id=$1", [customerId])
                .then((response) => res.status(200).json(response.rows))
                .catch((error) => {
                    console.error(error);
                    res.status(500).json(error);
                });
        } else {
            res.status(400).send("Customer ID does not exist!")
        }
    })
})

app.get("/customers/:customerId", (req, res) => {
    const customerId = req.params.customerId;
    pool
        .query("SELECT * FROM customers WHERE id = $1", [customerId])
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});



app.get("/suppliers", (req, res) => {
    pool
    .query('SELECT * FROM suppliers')
    .then((result) => res.json(result.rows))
    .catch((error) => {
        console.error(error);
        res.status(500).json(error);
    });
});

app.get("/products", (req, res) => {
    const productName = req.query.name;
    let query = `SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM product_availability INNER JOIN products ON products.id = product_availability.prod_id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id`;
    let params = [];
    if (productName) {
        query = `SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM product_availability INNER JOIN products ON products.id = product_availability.prod_id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id WHERE LOWER (product_name) LIKE LOWER ($1)`;
        params.push(`%${productName}%`);
    }
    pool
        .query(query, params)
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});

app.post("/products", (req, res) => {
    const newProduct = req.body.product_name;
    const query = "INSERT INTO products (product_name) VALUES ($1)";

    if (newProduct) {
    pool
    .query(query, [newProduct])
    .then((result) => res.json({
        msg: "Success",
        product: result.rows[0]
    }))
    .catch((error) => {
        console.error(error);
        res.status(500).json(error);
    });
    } else {
        res.status(400).json({msg: "Product not registered."})
    }
});

app.post("/availability", (req, res) => {
    const productId = +req.body.prod_id;
    const supplierId = +req.body.supp_id;
    const cost = +req.body.unit_price;

    if (!Number.isInteger(cost) || cost <= 0) {
        res.status(400).json({msg: "unit_cost must be positive number!"})
    } 
    pool
    .query("SELECT * FROM products WHERE id = $1", [productId])
    .then(async (result) => {
        if (result.rows.length > 0) {
            const result1 = await pool
                .query("SELECT * FROM suppliers WHERE id = $1", [supplierId]);
                if (result1.rows.length > 0) {
                    const query = "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ($1, $2, $3)";
                    return pool
                        .query(query, [productId, supplierId, cost])
                        .then(() => {
                            res.json({
                                msg: "Unit cost successfully added!"
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                            res.status(500).json(error);
                        });

                } else {
                    res.status(400).json({ msg: "Supplier_id not found!"});
                }
        } else {
            res.status(400).json({msg: "Product_id not found!"})
        }
    })
})

app.post("/customers/:customerId/orders", (req, res) => {
    const customerId = +req.params.customerId;
    const orderDate = req.body.order_date;
    const orderRef = req.body.order_reference;
    pool
    .query("SELECT * FROM customers WHERE id= $1", [customerId])
    .then(async (result) => {
        if (result.rows.length > 0) {
            try {
                await pool
                    .query("INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)", [orderDate, orderRef, customerId]);
                res.status(200).json({ msg: "Order successful!" });
            } catch (error) {
                console.error(error);
                res.status(500).send({ msg: error });
            }
        } else {
            res.status(400).json({msg: "Customer ID does not exist!"})
        }
    })
})

app.get("/customers", (req, res) => {
    pool
        .query('SELECT * FROM customers')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
});

app.put("/customers/:customerId", (req, res) => {
    const newName = req.body.name;
    const newAdds = req.body.address;
    const newCity = req.body.city;
    const newCountry = req.body.country;
    const customerId = +req.params.customerId;

    if (newName && newCity && newCity && newCountry) {
        pool
        .query("SELECT id FROM customers WHERE id=$1", [customerId])
        .then(async (result) => {
            if (result.rows.length > 0) {
                try {
                    await pool
                        .query("UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=$5", [newName, newAdds, newCity, newCountry, customerId]);
                    return res.send(`Customer ${customerId}'s data successfully updated!`);
                } catch (error) {
                    console.error(error);
                    res.status(500).json(error);
                }
            } else {
                res.status(400).send("Customer ID does not exist!");
            }
        })
    } else {
        res.status(400).send("One or more fields are incomplete!")
    }   
})

//for deleting orders, items in order_items table must be deleted first as order's id is being used there. 
app.delete("/orders/:orderId", (req, res) => {
    const orderId = req.params.orderId;

    pool
    .query("SELECT id FROM orders WHERE id=$1", [orderId])
    .then((result) => {
        if (result.rows.length > 0) {
            pool
                .query("DELETE FROM order_items WHERE order_id=$1", [orderId])
                .then(() => pool.query("DELETE FROM orders WHERE id=$1", [orderId]))
                .then(() => res.send(`Order ${orderId} successfully deleted!`))
                .catch((error) => {
                    console.error(error);
                    res.status(500).json(error);
                })
        } else {
            res.status(400).json("Order id not found!")
        }
    })
})

app.delete("/customers/:customerId", (req, res) => {
    const customerId = req.params.customerId;
    pool
    .query("SELECT id FROM customers WHERE id=$1", [customerId])
    .then((result) => {
        if (result.rows.length > 0) {
            pool
                .query("SELECT customer_id FROM orders WHERE customer_id=$1", [customerId])
                .then((result1) => {
                    if (result1.rows.length === 0) {
                        pool
                            .query("DELETE FROM customers WHERE id=$1", [customerId])
                            .then(() => res.send(`Customer ${customerId} successfully deleted!`))
                            .catch((error) => {
                                console.error(error);
                                res.status(500).json(error);
                            });
                    } else {
                        res.status(400).send("Customer's order is alive, cannot delete!")
                    }
                })
        } else {
            res.status(400).send("Customer ID does not exist!")
        }
    })
    
})

