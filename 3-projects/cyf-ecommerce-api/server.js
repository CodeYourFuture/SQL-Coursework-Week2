const express = require("express");
const app = express();

const { Pool } = require("pg");

const pool = new Pool({
  user: "test_user",
  host: "dpg-cf60rapa6gdjkk3bbkvg-a.oregon-postgres.render.com",
  database: "cyf_ecommerce_l80y",
  password: "mgC8PDhAovGQrULdAtHazqSLuwTXA2F9",
  port: 5432,
});

app.get("/hotels", function (req, res) {
  pool
    .query("SELECT * FROM hotels")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});


app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});
