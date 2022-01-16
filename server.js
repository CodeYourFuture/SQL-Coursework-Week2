const  express = require("express");
const app = express();
const { Pool} = require("pg");

 const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'coder123',
    port: 5432
});

app.get("/", (req, res) => {
 res.send("wellcoe back");
 resStatus(200);   

});
app.get("/customers", function (req, res) {
    pool
      .query("SELECT * FROM customers")
      .then((result) => res.json(result.rows))
      .catch((e) => console.error(e));
  });
  app.get("/suppliers", (req, res) => {
      pool
      .query("SELECT * FROM suppliers")
      .then((result) => res.json(result.rows))
      .catch((e) => console.log(e))
  });
  app.get("/products", (req, res) => {
    pool
    .query("SELECT * FROM products")
    .then((result) => res.json(result.rows))
    .catch((e) => console.log(e))
})

app.listen(3000, function(){
console.log("the listener runing on port 3000");
});