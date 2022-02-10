const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "wiam",
  password: "Hello123",
  database: "cyf_ecommerce",
});

module.exports = pool;
