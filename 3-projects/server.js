const express = require("express");
const app = express();
const { Pool } = require('pg');
app.use(express.json());

// Variables
const pool = new Pool({
    user: 'sql_week_3_cyf_ecommerce_api_user',
    host: 'dpg-cf7culhmbjsmch8qsmr0-a.oregon-postgres.render.com',
    database: 'sql_week_3_cyf_ecommerce_api',
    password: 'bZNG67otvKiRPsWsGkHVPhK1SYFLxSgJ',
    port: 5432
    , ssl: {
        rejectUnauthorized: false
    }
});

app.get("/customers", function(req, res) {
    pool.query('SELECT * FROM customers')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
  });

  app.get("/suppliers", function(req, res) {
    pool.query('SELECT * FROM suppliers')
        .then((result) => res.json(result.rows))
        .catch((error) => {
            console.error(error);
            res.status(500).json(error);
        });
  });

  app.get("/products", function (req, res) {
    pool
      .query(
        `select product_name, unit_price as price, supplier_name from products 
          inner join product_availability on products.id = product_availability.prod_id 
          inner join suppliers on suppliers.id = product_availability.supp_id;`
      )
      .then((result) => res.json(result.rows))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      });
  });


app.listen(process.env.PORT || 3000, function() {
    console.log("Server is listening on port 3000. Ready to accept requests!");
});