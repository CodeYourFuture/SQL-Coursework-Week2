const express = require("express");
//const cors = require("cors");
const db = require("./db");
const app = express();
require("dotenv").config();

//app.use(cors());
//app.use()

app.get("/", function (req, res) {
  db.query("SELECT * FROM customers;", (db_err, db_res) => {
    if (db_err) {
      res.send(JSON.stringify(db_err));
    } else {
      res.json(db_res.rows);
    }
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Start server on port: ${PORT}`));
