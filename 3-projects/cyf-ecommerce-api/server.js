const express = require('express');
const {Pool} = require('pg');



const app = express();
const pool = new Pool({
  user: 'codeyourfuture',
  host: 'localhost',
  database: 'cyf_ecommerce',
  password: 'CYFStudent123',
  port: 5432,
});

app.use(express.json());

//Add a new GET endpoint `/customers` to return all the customers from the database:
const customersSelect = `SELECT * FROM customers`;
app.get('/customers', (req, res) => {
    pool.query(customersSelect)
        .then(result => res.send(result.rows))
        .catch(error => res.status(500).send(error));
});

//Add a new GET endpoint `/suppliers` to return all the suppliers from the database:
app.get('/suppliers', (req, res) => {
  pool.query('SELECT * FROM suppliers', (error, result) => {
    if (error) {
      res.status(500).json(error);
    } else {
      res.json(result.rows);
    }
  });
});

// //Add a new GET endpoint `/products` to return all the product names along with their prices and supplier names:
// const productsSelectQuery =`
// SELECT products.product_name, suppliers.supplier_name, product_availability.unit_price 
// FROM products 
// INNER JOIN product_availability
// ON products.id = product_availability.prod_id 
// INNER JOIN suppliers 
// ON suppliers.id = product_availability.supp_id`;


// app.get('/products', (req, res) => {
//   pool.query( productsSelectQuery, (error, result) => {
//     if (error) {
//       res.status(500).send(error);
//     } else {
//       res.send(result.rows);
//     }
//   });
// });

// Update the previous GET endpoint /products to filter the list of products by name using a query parameter, 
//for example /products?name=Cup. This endpoint should still work even if you don't use the name query parameter!
app.get('/products', (req, res) => {
  const name = req.query.name;
  let query = 'SELECT * FROM products';
  let params = [];

  if(name){
    query = 'SELECT * FROM products WHERE product_name LIKE $1';
    params = [`%${name}%`];

    pool  
      .query(query, params)
      .then((result) => res.json(result.rows))
      .catch((error) => {
        console.error(error);
        res.status(500).json(error);
      })
  }
})
//Add a new GET endpoint /customers/:customerId to load a single customer by ID
app.get('/customers/:customerId', function (req, res) {
  const customerId = req.params.customerId;
  const params = [customerId];
  pool
    .query('SELECT * FROM customers WHERE id=$1', params)
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

//Add a new POST endpoint /customers to create a new customer with name, address, city and country.
app.post('/customers', function (req, res) {
  const newCustomerName = req.body.name;
  const newCustomerAddress = req.body.address;
  const newCustomerCity = req.body.city;
  const newCustomerCountry = req.body.country;

  const selectedQuery =
    'INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)';

  pool
    .query(selectedQuery, [
      newCustomerName,
      newCustomerAddress,
      newCustomerCity,
      newCustomerCountry
    ])
    .then(() => res.send('Customer profile has been created!'))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

//Add a new POST endpoint /products to create a new product.
app.post('/products', (req, res) => {
  const newProductName = req.body.product_name;
  pool
    .query('INSERT INTO products (product_name) VALUES($1)', [newProductName])
    .then(() => res.send('A new product has been created'))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    })
})

//Add a new POST endpoint /availability to create a new product availability (with a price and a supplier id).
// Check that the price is a positive integer and that both the product and supplier ID's exist 
//in the database, otherwise return an error.
app.post('/availability', (req, res) => {
  const newProd_id = req.body.prod_id;
  const newSupp_id = req.body.supp_id;
  const newUnit_price = req.body.unit_price;

  if (!Number.isInteger(newUnit_price) || newUnit_price <= 0) {
    return res.status(400).send('Unit_price should be a positive integer.');
  }

  pool
    .query(
    'SELECT * FROM product_availability WHERE prod_id=$1 or supp_id =$2',
    [(newProd_id, newSupp_id)]
    )
    .then((result) => {
      if(result.rows.length > 0) {
        return res.status
          .apply(400)
          .send('A product or a supplier with the same id already exists!');
      } else {
        pool
          .query(
            'INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES($1, $2, $3)',
            [newProd_id, newSupp_id, newUnit_price]
          )
          .then(() => res.send('A new product_availability has been created'))
          .catch((error) => {
            console.error(error);
            res.status(500).json(error);
          });
      }
    })
})

//Add a new POST endpoint /customers/:customerId/orders to create a new order 
//(including an order date, and an order reference) for a customer. Check that the customerId 
//corresponds to an existing customer or return an error.
app.post('/customers/:customerId/orders', (req, res) => {
  const newOrder_date = req.body.order_date;
  const newOrder_reference = req.body.order_reference;
  const customerId = req.params.customerId;

  pool
    .query('SELECT * FROM orders WHERE customer_id=$1', [customerId])
    .then((result) => {
      if(result.rows.length > 0){
        res.status(400).send('A customer with the same id already exist');
      } else {
        const query = 'INSERT INTO orders (order_date, order_reference) VALUES($1, $2)';
        pool 
         .query(query, [newOrder_date, newOrder_reference])
         .then(() => res.send('order created!'))
         .catch((error) => {
           console.error(error);
           res.status(500).json(error);
         })
      }
    })

});

//Add a new PUT endpoint /customers/:customerId to update an existing customer (name, address, city and country).
app.put('/customers/:customerId', (req, res) => {
  const customerId = req.params.customerId;
  const newName = req.body.name;
  const newAddress = req.body.address;
  const newCity = req.body.city;
  const newCountry = req.body.country;

  pool
    .query('UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id=$5',
     [newName, newAddress, newCity, newCountry, customerId])
    .then(() => res.send(`customer ${customerId} has been updated`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

//Add a new DELETE endpoint /orders/:orderId to delete an existing order along with all the associated order items.
app.delete('/orders/:orderId', (req, res) => {
  const orderId = req.params.orderId;
  
  pool
    .query('DELETE FROM order_items WHERE order_id=$1', [orderId])
    .then(() => pool.query('DELETE FROM orders WHERE id =$1', [orderId]))
    .then(() => res.send(`order ${orderId} deleted!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
})

//Add a new DELETE endpoint /customers/:customerId to delete an existing customer only if this customer doesn't have orders.

app.delete(('/customer/:customerId'), (req, res) => {
  const customerId = req.params.customerId;


  pool  
    .query('DELETE FROM orders WHERE customer_id=$1', [customerId])
    .then(() => pool.query('DELETE FROM customers WHERE id=$1', [customerId]))
    .then(() => res.send(`customer ${customerId} has been deleted`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    })
    
})

// Add a new GET endpoint /customers/:customerId/orders to load all the orders along with 
// the items in the orders of a specific customer. Especially, the following information should be returned:
// order references, order dates, product names, unit prices, suppliers and quantities.
app.get('/customers/:customerId/orders', (req, res) => {
  const customerId = req.params.customerId;
  const query = `
                SELECT orders.order_reference, orders.order_date, products.product_name, product_availability.unit_price, suppliers.supplier_name, order_items.quantity
                FROM orders INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN products
                ON products.id = order_items.product_id INNER JOIN product_availability ON product_availability.prod_id = products.id 
                INNER JOIN suppliers ON suppliers.id = order_items.supplier_id WHERE customer_id=$1;
                  `
              pool
                .query(query, [customerId])
                .then((result) => res.json(result.rows))
                .catch((error) => {
                  console.error(error);
                  res.status(500).json(error);
                });
})
app.listen(5000, () => {
    console.log("server has started on port 5000");
})