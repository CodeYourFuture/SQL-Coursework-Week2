const express = require('express')
const app = express()
const { Pool } = require('pg')
const port = process.env.PORT || 5000
require('dotenv').config()

app.use(express.json())

const pool = new Pool({
  user: process.env.user,
  port: 5432,
  password: process.env.password,
  host: process.env.host,
  database: process.env.database,
})

app.get('/', (req, res) => res.send('Hello Express! Ask for customers...'))

app.get('/customers', (req, res) => {
  pool
    .query(`select * from customers`)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.log(err)
      res.status(404).json({ msg: 'Not Found' })
    })
})

app.get('/suppliers', (req, res) => {
  pool
    .query(`select * from suppliers`)
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.log(err)
      res.status(404).json({ msg: 'Not Found' })
    })
})

app.get('/products', (req, res) => {
  pool
    .query(
      `
      select * from products
      inner join suppliers on suppliers.id=products.id;
      `
    )
    .then((result) => res.json(result.rows))
    .catch((err) => {
      console.log(err)
      res.status(404).json({ msg: 'Not Found' })
    })
})

app.listen(port, () => console.log(`Listening on port ${port}`))
