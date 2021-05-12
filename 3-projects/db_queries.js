const { Pool } = require("pg");

const pool = new Pool({
  user: "cecilia",
  host: "localhost",
  database: "cyf_ecommerce",
  password: process.env.DB_PASS,
  port: 5432,
});

const getSupplier = async (newSupplierId) => {
  const client = await pool.connect();
  const supplierCheck = await client.query(
    "SELECT * FROM suppliers WHERE id=$1",
    [newSupplierId]
  );
  client.release();
  return supplierCheck;
};

const getProduct = async (newProdId) => {
  const client = await pool.connect();
  const productCheck = await client.query(
    "SELECT * FROM products WHERE id=$1",
    [newProdId]
  );
  client.release();
  return productCheck;
};

const getAvailability = async (newProdId, newSupplierId) => {
  const client = await pool.connect();
  const existingAvailability = await client.query(
    "SELECT * FROM product_availability WHERE prod_id=$1 AND supp_id = $2",
    [newProdId, newSupplierId]
  );
  client.release();
  return existingAvailability;
};

const insertAvailability = async (newProdId, newSupplierId, newPrice) => {
  const client = await pool.connect();
  const query =
    "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ($1, $2, $3)";
  await client.query(query, [newProdId, newSupplierId, newPrice]);

  client.release();
};

module.exports = {
  getSupplier,
  getProduct,
  getAvailability,
  insertAvailability,
};
//export { checkSupplier };
