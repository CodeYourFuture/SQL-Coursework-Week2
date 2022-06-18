/* Add a new GET endpoint `/customers` to return all the customers from the database
- Add a new GET endpoint `/suppliers` to return all the suppliers from the database
- (STRETCH GOAL) Add a new GET endpoint `/products` to return all the product names along with their prices and supplier names.
 */
const express = require("express");
const { Pool } = require("pg");

const app = express();

app.use(express.json());
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cyf_ecommerce',
  password: '',
  port: 5432
});


const port = process.env.PORT || 5500;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get("/customers", (req, res) => {
  pool.query('SELECT * FROM customers')
    .then(result => res.json(result.rows))
    .catch(error => {
      console.error(error);
      res.status(500).json(error)
  })
}  
)
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