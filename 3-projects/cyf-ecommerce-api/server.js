const express = require("express");
const { Pool } = require("pg");
const app = express();
const PORT =  5000;

const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database: "cyf_ecommerce",
    password:'postgres',
    port:5432
    
});

const fetchCustomers = `SELECT * FROM customers`;
  app.get('/customers', (req,res)=>{
     pool.query(fetchCustomers, (error, result) => { 
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(result.rows);    
        }     
      });

});


const fetchSuppliers = `SELECT * FROM suppliers`;
  app.get('/suppliers', (req,res)=>{
     pool.query(fetchSuppliers, (error, result) => { 
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(result.rows);    
        }     
      });

});


const fetchProducts = `SELECT  products.product_name,product_availability.unit_price,suppliers.supplier_name
  FROM products
  INNER JOIN  product_availability ON  product_availability.prod_id = products.id
  INNER JOIN suppliers ON suppliers.id = product_availability.supp_id  `;

app.get('/products', (req,res)=>{
     pool.query(fetchProducts, (error, result) => { 
        if (error) {
            res.status(500).send(error);
        } else {
            res.send(result.rows);    
        }     
      });

});



app.listen(PORT, () =>{
   console.log(`server Running on port ${PORT} `);
})
