const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const { Pool } = require('pg');

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "123456789",
  port: 5432,
});

app.get('/', (req, res) => {
    res.send(`Welcome to the cyf_ecommerce database. You query about customers, suppliers and products.`);
})

// return all the customers from the database
app.get('/customers', (req, res) => {
    pool.query('SELECT * FROM customers', (error, result) => {
        if(error) {
            console.log(error);
            return res.send(error);
        }
        res.json(result.rows);
    })
})

// GET endpoint `/customers/:customerId` to load a single customer by ID.
app.get('/customers/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  //check if there is a customer with the customerId in the customers table
  pool.query('SELECT * FROM customers WHERE id=$1', [customerId])
  .then((result) => {
    if(result.rows.length === 0) {
      res.send(`There is no customer with the id of ${customerId}!`);
      return
    }else {
      res.send(result.rows);
    }
  })
  .catch((err) => {
    console.log(err);
    res.send(`Something went wrong!`);
  })
})

//PUT endpoint `/customers/:customerId` to update an existing customer (name, address, city and country)
app.put('/customers/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  const {name, address, city, country} = req.body;
  const selectCustomerQueryToUpdate = 'SELECT * FROM customers WHERE id=$1';
  pool.query(selectCustomerQueryToUpdate, [customerId])
  .then((result) => {
    if(result.rows.length === 0) {
      res
      .status(400)
      .send(`There is no customer to update with the id of ${customerId}`);
    }else {
      const updateCustomerQuery = 'UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=$5';
      pool.query(updateCustomerQuery, [name, address, city, country, customerId])
      .then((result) => {
        res.send(`Successfully amended.`);
      })
      .catch((error) => {
        console.error(error);
        res.status(400).send(`Something went wrong!`);
      })
    }
  })
})

//DELETE endpoint `/customers/:customerId` to delete an existing customer only if this customer doesn't have orders - if customerId exists in orders table, then this customer has an order return error, if not delete the customer from customers table
app.delete('/customers/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  const customerIdExistsQuery = 'SELECT EXISTS(SELECT 1 FROM customers WHERE id=$1)';
  const customerHasAnOrderQuery = 'SELECT EXISTS(SELECT 1 FROM orders WHERE customer_id=$1)';

  // check if the customerId is a valid id in customers table, if not return 400 
  pool.query(customerIdExistsQuery, [customerId]) 
  .then((result) => {
    if(result.rows[0].exists === false) {
      return res.status(400).send(`There is no customer with the id of ${customerId} in customers table.`);
    } else {
      // check if customer has an order in orders table, if so return 400, if not delete the customer
      pool.query(customerHasAnOrderQuery, [customerId]).then((result) => {
        console.log(result, "<----result");
        if (result.rows[0].exists === true) {
          // result.rows is an array
          return res
            .status(400)
            .send(
              `The customer with the id of ${customerId} has an order. Cannot delete it.`
            );
        } else {
          const deleteCustomerQuery = "DELETE FROM customers WHERE id=$1";
          pool.query(deleteCustomerQuery, [customerId]).then(() => {
            return res.send(
              `The customer with the id of ${customerId} has been deleted from the customers table.`
            );
          });
        }
      });
    }
  })
})


// return all the suppliers from the database
app.get('/suppliers', (req, res) => {
    pool.query('SELECT * FROM suppliers', (error, result) => {
        if (error) {
          console.log(error);
          return res.send(error);
        }
        res.json(result.rows);
    })
})

// return all the product names along with their prices and supplier names
app.get('/products', (req, res) => {
    pool.query("SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id ORDER BY products.product_name", (error, result) => {
        if (error) {
          console.log(error);
          return res.send(error);
        }
        res.json(result.rows);
    })
})

// POST endpoint `/products` to create a new product.
app.post('/products', (req, res) => {
  const {product_name} = req.body; // get the product name req object with object destructuring
  if(!product_name) { 
    // check if the client all the data needed, if not send status 400
    return res
      .status(400)
      .send(
        `Please fill everything in the form including product name, unit price and supplier name.`
      );
  }
  pool.query('SELECT * FROM products WHERE product_name=$1', [product_name])
    .then((result) => {
      // if product already in products, send status 400
      if (result.rows.length > 0) {
        res.status(400).send(`This product is already in the products.`);
      } else {
        // if product not in products table add it to the products table with the value sent by the client
        pool
          .query(
            "INSERT INTO products (product_name) VALUES ($1)",
            [product_name]
          )
          .then(() => {
            res.status(200).send(`The product has been added to the products.`);
          });
      }
    })
})

// Add a new POST endpoint `/availability` to create a new product availability (with a price and a supplier id). Check that the price is a positive integer and that both the product and supplier ID's exist in the database, otherwise return an error.
app.post('/availability', (req, res) => {
  const {prod_id, supp_id, unit_price} = req.body;
  console.log(Number.isInteger(prod_id), Number.isInteger(supp_id), Number.isInteger(unit_price));
  const reqNotIncludesAllColumns = !prod_id || !supp_id || !unit_price;
  const reqValuesNotInRightFormat = !Number.isInteger(prod_id) || !Number.isInteger(supp_id) || Number.isInteger(unit_price);
  console.log(reqNotIncludesAllColumns, "<----reqNotIncludesAllColumns")
  console.log(reqValuesNotInRightFormat, "<-----reqValuesNotInRightFormat")

  if (reqNotIncludesAllColumns) {
    return res.status(400)
      .send(
        `Please make sure adding product id, supplier id and unit price.`
      );
  } else if (reqValuesNotInRightFormat) {
    return res.status(400)
    .send(`Please make sure adding product id, supplier and unit price in the right format. They should be integer.`);
  }
  
  const selectTheSameRowQueryIfExists = 'SELECT * FROM product_availability WHERE prod_id=$1 AND supp_id=$2 AND unit_price=$3';
  const prodIdInDatabaseQuery = 'SELECT EXISTS(SELECT 1 FROM products WHERE id=$1)';
  const suppIdInDatabaseQuery = 'SELECT EXISTS(SELECT 1 FROM suppliers WHERE id=$1)';
  const insertQuery = 'INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES($1, $2, $3)';

  pool
    .query(selectTheSameRowQueryIfExists, [prod_id, supp_id, unit_price])
    .then((result) => {
      if (result.rows.length > 0) {
        return res.status(400)
          .send(`This already exists, can not add it to the database.`);
      } else {
        pool.query(insertQuery, [prod_id, supp_id, unit_price]).then(() => {
          res.send(`Added to the product_availability table.`);
        });
      }
    });
})


// POST endpoint `/customers` to create a new customer with name, address, city and country
app.post('/customers', (req, res) => {
  const {name, address, city , country} = req.body; // get the each property from request object
  if(!name || !address || !city || !country) {  // if not included any of these, respond status 400
    return res.status(400)
    .send(`Please fill everything in the form including name, address, city and country.`);
  }
  pool.query('SELECT * FROM customers WHERE name=$1 AND address=$2 AND city=$3', [name, address, city])
  .then((result) => {
    if(result.rows.length > 0) {  // if customer already in the customers database, do not add it again
      res
      .status(400)
      .send(`The customer is already in the customers database.`);
    } else {  // if customer is not already in the customers database, insert it into the customers
      pool
        .query(
          "INSERT INTO customers (name, address, city, country) VALUES($1, $2, $3, $4)",
          [name, address, city, country]
        )
        .then(() => {
          res.send(`Customer is added to the customers.`);
        });
    }
  })
})

// DELETE endpoint `/orders/:orderId` to delete an existing order along with all the associated order items
app.delete('/orders/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  const orderIdExistsQuery = 'SELECT EXISTS(SELECT 1 FROM orders WHERE id=$1)';

  // check if the orderId is a valid id in orders table, if not return 400 
  pool.query(orderIdExistsQuery, [orderId]) 
  .then((result) => {
    if(result.rows[0].exists === false) {
      return res.status(400).send(`There is no order with the id of ${orderId} in orders table.`);
    } else {  
      // order id is a valid id in orders table so delete orders from order items first(foreign key constraint) and then delete order itself from the orders table
      const deleteOrderIdFromOrdersQuery = 'DELETE FROM orders WHERE id=$1';
      const deleteOrdersFromOrderItemsQuery = 'DELETE FROM order_items WHERE order_id=$1';

      pool.query(deleteOrdersFromOrderItemsQuery, [orderId]).then(() => [
        pool.query(deleteOrderIdFromOrdersQuery, [orderId]).then(() => {
          res.send(
            `Order with the id of ${orderId} and order items related to the order with the id of ${orderId} has been deleted.`
          );
        }),
      ]);

    }
  })
})



app.listen(port, function () {
  console.log(`Server is listening on port ${port}. Ready to accept requests!`);
})