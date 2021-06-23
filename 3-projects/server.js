const express = require("express");
const {Pool} = require("pg");
const app = express();

const pool = new Pool({
    user: "Daniel",
    host: "localhost",
    database: "cyf_ecommerce",
    password: "admin",
    port: 5432
});

app.get("/customers", (req, res)=>{
    pool.query("SELECT * FROM customers", (error, result)=>{
        if(!error){
            res.json(result.rows);
        } else{
            console.log(error);
        }
    })
});

app.get("/suppliers", (req, res)=>{
    pool.query("SELECT * FROM suppliers", (error, result)=>{
        if(!error){
            res.json(result.rows)
        } else{
            console.log(error);
        }
    })
});

app.get("/products", (req, res)=>{
    pool.query("SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id;", (error, result)=>{
        if(!error){
            res.json(result.rows)
        } else{
            console.log(error);
        }
    })
})







app.listen(3000, ()=>{
    console.log("Listening op port 3000");
});

