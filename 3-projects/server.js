const express = require('express');
const {Pool} = require('pg');
const app = express();

// app.use(express.urlencoded(), true);
app.use(express.json());

const PORT = process.env.PORT || 8080;



const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'postgres',
    password:'Anvita2018',
    port:5432
});
app.get('/customers', (req, res) => {
    pool.query('SELECT * FROM customers')
    .then(result => res.send(result.rows))
}),

app.get('/suppliers', (req, res) => {
    pool.query('SELECT * FROM suppliers')
    .then(result => res.send(result.rows))
    .catch(err => {
        console.log(err);
        res.status(500).json(error)
        .catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
    })
})

app.get("/products", (req, res) => {
  pool
    .query(
      'SELECT products.product_name as "productName", unit_price as price, suppliers.supplier_name as "supplier" FROM product_availability INNER JOIN products ON products.id = product_availability.prod_id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id;'
    )
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});
app.listen(PORT, () => console.log(`Listening to the port ${PORT}`));

