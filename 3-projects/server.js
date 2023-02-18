const express = require("express");
const app = express();
const {Pool}=require('pg');
const bodyParser =require("body-parser")

app.use(bodyParser.json())

const db=new Pool({
    user:'postgres',
    host:'localhost',
    database:'cyf_ecommerce',
    password:'leila6925',
    port:5432
})

app.get("customers/:id", (req, res) => {
  let custId = parseInt(req.params.id);
  db.query(
    `SELECT * FROM customers WHERE id = $1`,
    [custId],
    function (err, result) {
      result.json();
    }
  );
});
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

app.get("/products", (req,res)=>{
  let prName = req.params.product_name
  db.query(
    `
    SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name
    FROM products
    INNER JOIN product_availability
    ON products.id = product_availability.prod_id
    INNER JOIN suppliers
    ON product_availability.supp_id = suppliers.id
    WHERE products.product_name ILIKE $1`, [`%${prName}%`],
    function (err, result) {
      result.json(res.rows);
    }
  );
})

app.post("/customers",(req,res)=>{
  const customer = req.body;
  const query =
    "INSERT INTO customers (name,address,city,country) " +
      "VALUES ($1,$3, $4, $5)";

  db.query(query, [customer], (err) => {
    res.send("Customer created!");
  })
})

app.post("/products", (req, res) => {
  const product = req.body;
  const query =
    "INSERT INTO products (product_name) " +
    "VALUES ($1)";

  db.query(query, [product], (err) => {
    res.send("product created!");
  });
});

app.post("/availability",(req,res)=>{
  const prodId = req.body.productId
  const price = req.body.price
  const suppId= req.body.supplierId

  if(price<0 || typeof price !=="number"){
    return res.status(400).send("wrong price format")
  }
  const query = "select 1 from products where id=$1"
  db.query(query,[prodId],(err,result)=>{
   if(result.rowCount<=0){
    return res.status(400).send("the productId not found")
   }
   db.query( `INSERT INTO product_availability (prod_id, supp_id, unit_price)
  VALUES($1, $2, $3)`,[prodId,price,suppId],res.send("product availability created!"))
  })
});


 app.post('/customers/:customerId/orders', async (req, res) => {
  const customerId = req.params.customer_id;
  const { order_date, order_reference } = req.body;

  const customerResult = await db.query('SELECT * FROM customers WHERE id = $1', [customerId]);
  const customer = customerResult.rows[0];
  if (!customer) {
    return res.status(404).json({ error: 'Customer not found' });
  }
  const orderResult = await db.query(
    "INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3) RETURNING *",
    [order_date, order_reference, customerId]
  );
  const order = orderResult.rows[0];

  return res.json(order);
});

app.delete("/customers/:customerId", async (req, res) => {
  const customerId = req.params.customer_id;
  const customerResult = await db.query(
    "SELECT * FROM customers WHERE id = $1",
    [customerId]
  );
  const customer = customerResult.rows[0];
  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  const orderResult = await db.query(
    "SELECT * FROM orders WHERE customer_id = $1",
    [customerId]
  );
  const orders = orderResult.rows;
  if (orders.length > 0) {
    return res
      .status(400)
      .json({ error: "Customer has orders and cannot be deleted" });
  }
  await db.query("DELETE FROM customers WHERE id = $1", [customerId]);
  return res.status(204).send("customer record deleted");
});

app.put("/customers/:customerId", async (req, res) => {
  const customerId = req.params.customer_id;
  const { name, address, city, country } = req.body;

  const customerResult = await db.query(
    "SELECT * FROM customers WHERE id = $1",
    [customerId]
  );
  const customer = customerResult.rows[0];
  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  await db.query(
    "UPDATE customers SET name = $1, address = $2, city = $3, country = $4 WHERE id = $5",
    [name, address, city, country, customerId]
  );

  return res.status(204).send("customer record updated");
});

app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
