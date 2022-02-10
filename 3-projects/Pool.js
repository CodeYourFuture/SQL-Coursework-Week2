const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: `${process.env.USER}`,
  password: `${process.env.PASSWORD}`,
  database: "cyf_ecommerce",
});

module.exports = pool;
