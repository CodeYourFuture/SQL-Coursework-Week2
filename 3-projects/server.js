const express = require('express')
const app = express();
const {Pool} = require('pg');


const pool = new Pool({ 
   // give your username
   user: 'mahri',
   host: 'localhost', 
   // change the database name accordingly
   database: 'cyf_ecommerce',
   password: 'Hatyja-09',
   // Port number
   port: 5432
 })

 app.get('/customers', (req, res)=>{
   pool.query('SELECT * FROM customers')
   .then ((result)=>res.json(result.rows))
   .catch((error)=>{
       console.log(error)
       res.status(500).json(error);
   })})

app.get('/suppliers', (req, res)=>{
   pool.query('SELECT * FROM suppliers')
   .then ((result)=>res.json(result.rows))
   .catch((error)=>{
       console.log(error)
       res.status(500).json(error);
   })
})

app.get('/products', (req, res)=>{
   pool.query('SELECT * FROM products')
   .then ((result)=>res.json(result.rows))
   .catch((error)=>{
       console.log(error)
       res.status(500).json(error);
   })
})

app.listen(3002, ()=> {
console.log('HEY we are listening in 3002')
})
