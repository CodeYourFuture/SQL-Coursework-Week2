const express = require('express')
const { Pool } = require('pg')

const app = express()
app.use(express())

const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'cyf_ecommerce',
  user: 'user',
  password: '0o9i8u7y',
})

app.get('/customers', (req, res) => {
  pool
    .query('Select * from customers')
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.log(error)
      res.status(500).json(error)
    })
})

app.get('/suppliers', (req, res) => {
  pool
    .query('Select * From suppliers')
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.log(error)
      res.status(500).json(error)
    })
})

app.get('/products', (req, res) => {
  pool
    .query(
      `select product_name as "product name", unit_price as price, supplier_name as "supplier name"
            from products 
            inner join product_availability on product_availability.prod_id = products.id
            inner join suppliers on suppliers.id = product_availability.supp_id
            `,
    )
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.log(error)
      res.status(500).json(error)
    })
})

const port = process.env.port || 5001
app.listen(port, () => {
  console.log(`Server starts on port ${port}`)
})
