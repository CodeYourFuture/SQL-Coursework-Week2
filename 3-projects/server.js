const express = require("express");
const app = express();
const {Pool}=require('pg');

const db=new Pool({
    user:'postgres',
    host:'localhost',
    database:'cyf_ecommerce',
    password:'leila6925',
    port:5432
})


app.get("/customers",(req,res)=>{
    db.query('select * from customers',(err,result)=>{
        res.json(result.rows);
    })
})
app.get("/suppliers",(req,res)=>{
    db.query('select * from suppliers',(err,result)=>{
        res.json(result.rows)
    })
})

app.get("/products", (req, res) => {
  db.query(
    "select p.product_name, pa.unit_price,s.supplier_name from products p inner join product_availability pa on (p.id=pa.prod_id) inner join suppliers s on (s.id=pa.supp_id)",
    (err, result) => {
      res.json(result.rows)
    }
  );
});
app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
