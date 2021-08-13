const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const { Pool } = require("pg");

const pool = new Pool({
  user: "kudah",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Machine Learning",
  port: 5432,
});

app.get("/customers", (req, res) => {
  pool.query("select* from customers", (error, result) => {
    if (error) {
      res.send(error);
    } else {
      res.json(result.rows);
    }
  });
});

app.get("/suppliers", (req, resp) => {
  pool.query("select* from suppliers",
    (error, result) => {
      if (error) {
        resp.send(error);
      } else {
        resp.json(result.rows);
      }
    })
});

/*Products*/
app.get("/products", (req, resp) => {
    pool.query("select p.product_name,pa.unit_price,s.supplier_name from products p inner join product_availability pa on pa.prod_id =p.id inner join suppliers s on s.id =pa.supp_id "
        , (error, result) => {
    if (error) {
        resp.send(error)
    }
    else {
        resp.json(result.rows)
    }
})

})


app.listen(PORT, () => {
  console.log("App Listening to " + PORT);
});
