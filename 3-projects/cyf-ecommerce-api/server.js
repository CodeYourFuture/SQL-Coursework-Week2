const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db_ecommerce");

// Middleware
app.use(cors());
app.use(express.json());

// ROUTES
// Add a new GET endpoint `/customers` to return all the customers from the database
//Option - 1
app.get("/customers", (req, res) => {
    pool.query("SELECT * FROM customers", (db_err, db_res) => {
        if (db_err) {
            res.send(JSON.stringify(db_err));
        } else {
            console.log(db_res);
            res.json(db_res.rows);
        }
    })
})

Option -2
app.get("/customers", async(request, response) => {
    try {
       const allCustomers = await pool.query("SELECT * FROM customers");
       response.json(allCustomers.rows);
    } catch (error) {
       console.error(error.message);
    }
});


// Add a new GET endpoint `/suppliers` to return all the suppliers from the database
//Option -1
app.get("/suppliers", (req, res) => {
    pool.query("SELECT * FROM suppliers", (db_err, db_res) => {
        if (db_err) {
            res.send(JSON.stringify(db_err));
        } else {
            console.log(db_res);
            res.json(db_res.rows);
        }
    })
})

// Option - 2
// app.get("/suppliers", async(request, response) => {
//     try {
//         const allSuppliers = await pool.query("SELECT * FROM suppliers");
//         response.json(allSuppliers.rows);
//     } catch (error) {
//         console.error(error.message);
//     }
// })


// (STRETCH GOAL) Add a new GET endpoint `/products` to return all the product names along with their prices and supplier names.
// Option - 1
app.get("/products", (req, res) => {
    pool.query("SELECT p.product_name, sup.supplier_name, p_a.unit_price FROM products as p INNER JOIN product_availability as p_a ON p.id = p_a.prod_id INNER JOIN suppliers as sup ON sup.id = p_a.supp_id ORDER BY p.product_name, p_a.unit_price DESC", (db_err, db_res) => {
        if (db_err) {
            res.send(JSON.stringify(db_err));
        } else {
            console.log(db_res);
            res.json(db_res.rows);
        }
    })
})


// Option - 2
// app.get("/products", async(request, response) => {
//     try {
//         const allProducts = await pool.query("SELECT p.product_name, sup.supplier_name, p_a.unit_price FROM products as p INNER JOIN product_availability as p_a ON p.id = p_a.prod_id INNER JOIN suppliers as sup ON sup.id = p_a.supp_id ORDER BY p.product_name, p_a.unit_price DESC");
//         response.json(allProducts.rows);
//     } catch (error) {
//         console.error(error.message);
//     }
// })


app.listen(3000, () => {
    console.log("Server has started on port 3000");
});

