const express = require('express');
const cors = require("cors");

const app = express();
const {Pool} = require("pg")

const pool = new Pool({
  user: "mohammad",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "8808",
  port: 5432,
});
app.use(cors())


const PORT = 3005

app.get('/task', (req, res)=> {
    const {n} = req.query
    const queryLookup = {
      1: "SELECT * FROM customers WHERE country LIKE '%United States%'",
      2: "SELECT name FROM customers ORDER BY name ASC",
      3: "SELECT * FROM products WHERE product_name LIKE '%socks%'",
      4: "SELECT products.id,products.product_name, product_availability.unit_price,suppliers.id FROM products INNER JOIN product_availability ON  products.id = product_availability.prod_id INNER JOIN suppliers ON suppliers.id =  product_availability.supp_id WHERE unit_price > 100",
      5: "SELECT  product_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id ORDER BY unit_price DESC LIMIT 5",
      6: "SELECT products.product_name, unit_price, suppliers.supplier_name FROM product_availability INNER JOIN products ON products.id = product_availability.prod_id INNER JOIN suppliers ON suppliers.id = product_availability.supp_id",
      7: "SELECT products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN suppliers ON suppliers.id = product_availability.supp_id INNER JOIN products ON products.id = product_availability.prod_id WHERE suppliers.country = 'United Kingdom'",
      8: 'SELECT orders.id, orders.order_reference, orders.order_date, (quantity * product_availability.unit_price) AS "total cost" FROM order_items INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN product_availability ON product_availability.prod_id = order_items.product_id WHERE orders.customer_id = 1',
      9: "select * from orders inner join order_items on orders.id = order_items.order_id RIGHT join customers on customers.id = orders.customer_id WHERE customers.name = 'Hope Crosby'",
      10: "SELECT product_name, unit_price, quantity FROM orders JOIN order_items ON order_reference = 'ORD006' AND orders.id = order_id JOIN product_availability ON product_id = prod_id AND supplier_id = supp_id JOIN products ON product_id = products.id",
      12: "SELECT customers.name FROM customers INNER JOIN orders ON customers.id = orders.customer_id INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN suppliers ON suppliers.id = order_items.supplier_id WHERE suppliers.country = 'China'",
    };
    pool
      .query(queryLookup[n])
      .then(({ rows }) => res.json(rows))
      .catch((error) => console.log(error) + "Data not found");
})

// Add a new GET endpoint `/customers` to return all the customers from the database
app.get("/suppliers", (req, res) => {
  
  pool
    .query("SELECT * FROM suppliers")
    .then(({ rows }) => res.json(rows))
    .catch((error) => console.log(error) + "Data not found");
});

app.listen(PORT, () => {
    console.log(`App is listening to PORT: ${PORT}`)
})