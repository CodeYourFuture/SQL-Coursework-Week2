const express=require('express')
const app=express()
const PORT = process.env.PORT || 3000;


const { Pool } = require('pg');

const db = new Pool({
    user: 'codeyourfuture',        // replace with you username
    host: 'localhost',
    database: 'cyf_ecommerce',
    password:process.env.db_password ,
    PORT: 5432
});
app.get('/',(req,res)=>{
    res.send('Hello')
})

app.get("/customers", async function(req, res) {
    const rs=await db.query('SELECT * FROM customers')
    res.json(rs.rows)
});
app.get("/suppliers", async function(req, res) {
    const rs=await db.query('SELECT * FROM suppliers')
    res.json(rs.rows)
});


app.listen(PORT,(req,res)=>{
    console.log(`app is listening on port ${PORT}`);
})