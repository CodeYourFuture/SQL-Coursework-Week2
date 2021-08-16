const express = require('express');
const app = express();
app.use(express.json());
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'cyf_ecommerce',
  password: '0000',
  port: 5432,
});

app.get('/', (req, res) => {
  res.json('You have hit the API');
});

app.get('/customers', async (req, res) => {
  const result = await pool.query('SELECT * FROM customers');
  res.json(result.rows);
});

app.get('/customers/:customerId', async (req, res) => {
  const { customerId } = req.params;

  await pool
    .query('SELECT * FROM customers WHERE id = $1', [customerId])
    .then((result) => res.json(result.rows))
    .catch((e) => {
      res.status(400).json(`An error occurred!`);
      console.log(e);
    });
});

app.get('/customers/:customerId/orders', async (req, res) => {
  const { customerId } = req.params;

  await pool
    .query(
      'SELECT c.name, o.order_date, o.order_reference, p.product_name, s.supplier_name, pa.unit_price, oi.quantity FROM customers c INNER JOIN orders o ON c.id = o.customer_id INNER JOIN order_items oi ON o.id = oi.order_id INNER JOIN product_availability pa ON oi.product_id = pa.prod_id AND oi.supplier_id = pa.supp_id INNER JOIN suppliers s ON pa.supp_id = s.id INNER JOIN products p ON pa.prod_id = p.id WHERE c.id = $1',
      [customerId]
    )
    .then((result) => {
      if (result.rowCount > 0) {
        res.json(result.rows);
      } else {
        res
          .status(404)
          .json(`No orders were found for customer with ID: '${customerId}'!`);
      }
    })
    .catch((e) => {
      res.status(400).json(`An error occurred!`);
      console.log(e);
    });
});

app.get('/products', async (req, res) => {
  const { name } = req.query;
  let query = `SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p INNER JOIN product_availability pa ON p.id = pa.prod_id INNER JOIN suppliers s ON pa.supp_id = s.id`;

  if (name) {
    query = `SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p INNER JOIN product_availability pa ON p.id = pa.prod_id INNER JOIN suppliers s ON pa.supp_id = s.id WHERE p.product_name ILIKE '%${name}%'`;
  }

  await pool
    .query(query)
    .then((result) => res.json(result.rows))
    .catch((e) => {
      res.status(400).json(`An error occurred!`);
      console.log(e);
    });
});

app.get('/suppliers', async (req, res) => {
  const result = await pool.query('SELECT * FROM suppliers');
  res.json(result.rowCount);
});

app.get('/orders', async (req, res) => {
  const result = await pool.query('SELECT * FROM orders');
  res.json(result.rows);
});

app.post('/customers', async (req, res) => {
  const { name, address, city, country } = req.body;

  if (name && address && city && country) {
    await pool
      .query(
        `INSERT INTO customers (name, address, city, country) VALUES ($1, $2 ,$3, $4)`,
        [name, address, city, country]
      )
      .then(res.status(200).json(`Customer added successfully`))
      .catch((e) => {
        res.status(400).json(`An error occurred!`);
        console.log(e);
      });
  } else {
    res.status(400).json(`Provide all fields!`);
  }
});

app.post('/products', async (req, res) => {
  const { name } = req.body;

  if (name) {
    await pool
      .query(`INSERT INTO products (product_name) VALUES ($1)`, [name])
      .then(res.status(200).json(`Product added successfully`))
      .catch((e) => {
        res.status(400).json(`An error occurred!`);
        console.log(e);
      });
  } else {
    res.status(400).json(`Provide all fields!`);
  }
});

app.post('/availability', async (req, res) => {
  try {
    const { prod_id, supp_id, unit_price } = req.body;
    if (prod_id && supp_id && unit_price) {
      if (unit_price >= 0) {
        const myProduct = await pool.query(
          `SELECT id FROM products WHERE id = $1`,
          [prod_id]
        );
        if (myProduct.rowCount > 0) {
          const mySupplier = await pool.query(
            `SELECT id FROM suppliers WHERE id = $1`,
            [supp_id]
          );
          if (mySupplier.rowCount > 0) {
            await pool.query(
              `INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ($1, $2, $3)`,
              [prod_id, supp_id, unit_price]
            );
            res.status(200).json(`Product availability added successfully`);
          } else {
            res
              .status(400)
              .json(`The provided supplier ID '${supp_id}' does not exist!`);
          }
        } else {
          res
            .status(400)
            .json(`The provided product ID "${prod_id}" does not exist!`);
        }
      } else {
        res.status(400).json(`The unit price must be a positive number!`);
      }
    } else {
      res.status(400).json(`Provide all fields!`);
    }
  } catch (e) {
    res.status(400).json(`An error occurred!`);
    console.log(e);
  }
});

app.post('/customers/:customerId/orders', async (req, res) => {
  const { order_date, order_reference } = req.body;
  const { customerId } = req.params;

  if (order_date && order_reference) {
    try {
      const myCustomer = await pool.query(
        `SELECT id FROM customers WHERE id = $1`,
        [customerId]
      );
      if (myCustomer.rowCount > 0) {
        await pool.query(
          `INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)`,
          [order_date, order_reference, customerId]
        );
        res.status(200).json(`Order was added successfully`);
      } else {
        res
          .status(400)
          .json(`The provided customer ID '${customerId}' does not exist!`);
      }
    } catch (e) {
      res.status(400).json(`An error occurred!`);
      console.log(e);
    }
  } else {
    res.status(400).json(`Provide all fields!`);
  }
});

app.put('/customers/:customerId', async (req, res) => {
  const { name, address, city, country } = req.body;
  const { customerId } = req.params;

  if (name || address || city || country) {
    try {
      const myCustomer = await pool.query(
        `SELECT * FROM customers WHERE id = $1`,
        [customerId]
      );
      if (myCustomer.rowCount > 0) {
        const newName = name || myCustomer.rows[0].name;
        const newAddress = address || myCustomer.rows[0].address;
        const newCity = city || myCustomer.rows[0].city;
        const newCountry = country || myCustomer.rows[0].country;

        await pool.query(
          `UPDATE customers SET name = $1, address = $2, city = $3, country = $4 WHERE id = $5`,
          [newName, newAddress, newCity, newCountry, customerId]
        );
        res.status(200).json(`Customer info was updated successfully!`);
      } else {
        res
          .status(400)
          .json(`The provided customer ID '${customerId}' does not exist!`);
      }
    } catch (e) {
      res.status(400).json(`An error occurred!`);
      console.log(e);
    }
  } else {
    res.status(400).json(`Provide new customer info!`);
  }
});

app.delete('/orders/:orderId', async (req, res) => {
  const { orderId } = req.params;
  try {
    const myOrder = await pool.query(`SELECT * FROM orders WHERE id = $1`, [
      orderId,
    ]);
    if (myOrder.rowCount > 0) {
      await pool.query(`DELETE FROM order_items WHERE order_id = $1`, [
        orderId,
      ]);
      await pool.query(`DELETE FROM orders WHERE id = $1`, [orderId]);
      res.status(200).json(`Order was deleted successfully!`);
    } else {
      res
        .status(400)
        .json(`The provided order ID '${orderId}' does not exist!`);
    }
  } catch (e) {
    res.status(400).json(`An error occurred!`);
    console.log(e);
  }
});

app.delete('/customers/:customerId', async (req, res) => {
  const { customerId } = req.params;
  try {
    const myCustomer = await pool.query(
      `SELECT * FROM customers WHERE id = $1`,
      [customerId]
    );
    if (myCustomer.rowCount > 0) {
      const customerOrders = await pool.query(
        `SELECT * FROM orders WHERE customer_id = $1`,
        [customerId]
      );
      if (customerOrders.rowCount > 0) {
        res
          .status(400)
          .json(`Can not delete customer. The customer has got order records!`);
      } else {
        await pool.query(`DELETE FROM customers WHERE id = $1`, [customerId]);
        res.status(200).json(`Customer was deleted successfully!`);
      }
    } else {
      res
        .status(400)
        .json(`The provided customer ID '${customerId}' does not exist!`);
    }
  } catch (e) {
    res.status(400).json(`An error occurred!`);
    console.log(e);
  }
});

const listener = app.listen(process.env.PORT || 5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
