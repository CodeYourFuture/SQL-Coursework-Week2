const express = require("express");
const app = express();

app.use(express.json());

const moment = require("moment")

const { Pool } = require("pg");

const port = process.env.PORT || 5000;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "cyf_ecommerce",
  password: "myPass",
  // Port number
  port: 5432,
});


// Validate Numeric Item
function validate_number(numIn, text) {
       const numOut = Number(numIn);

       if (Number.isNaN(numOut) || !Number.isSafeInteger(numOut) || numOut <= 0) {
            return [false, `${text} '${numIn}' has been rejected because it must be a positive, nonzero integer.`];
       };
      
       return [true, numOut];
}

app.get("/", (request, result) => {
  return result.send("Hello");
});

/*
   GET ORDERS
   GET endpoint /customers/:customerId/orders to load all the orders along with the items in the orders of a specific customer. 
   The following information should be returned: order references, order dates, product names, unit prices, suppliers and quantities.
*/
app.get("/customers/:custId/orders", function (request, response) {
  const custId = Number(request.params.custId);

  if (Number.isNaN(custId) || !Number.isSafeInteger(custId) || custId <= 0) {
    response
      .status(400)
      .send(
        `'${request.params.custId}' has been rejected because an ID must be a positive, nonzero integer.`
      );
    return;
  }

  pool
    .query(
      `SELECT order_reference,  order_date, product_name, unit_price,  
                supplier_name, quantity
                FROM customers
                JOIN orders
                ON customer_id = customers.id
                JOIN order_items
                ON  orders.id = order_id
                JOIN products
                ON product_id = products.id
                JOIN product_availability
                ON product_id = prod_id AND supplier_id = supp_id
                JOIN suppliers
                ON supplier_id = suppliers.id
                WHERE customers.id = $1
                ORDER BY order_reference, order_date, product_name`,
                      [custId]
    )
    .then((result) => {
      let reply = result.rows;
      if (reply.length === 0) {
        return response
          .status(400)
          .send(`No Customer with ID '${custId}' exists.`);
      }
      return response.json(reply);
    })
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    });
  return;
});

// GET Return a single customer by ID.
app.get("/customers/:custId", function (request, response) {
  const custId = Number(request.params.custId);

  if (Number.isNaN(custId) || !Number.isSafeInteger(custId) || custId <= 0) {
    response
      .status(400)
      .send(`'${request.params.custId}' has been rejected because an ID must be a positive, nonzero integer.`
      );
      return;
  }

  pool
    .query("SELECT * FROM customers WHERE id=$1", [custId])
    .then((result) => {
                       let reply = result.rows;
                       if (reply.length === 0) {
                                 return response
                                    .status(400)
                                    .send(`No Customer with ID '${custId}' exists.`);
                       }
                      return response.json(reply);
                      })
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    });
    return;
});

// GET Return all the Customers.
app.get("/customers", function (request, response) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => response.json(result.rows))
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    });
  return;
});

// GET Return all the Suppliers.
app.get("/suppliers", function (request, response) {
  pool
    .query("SELECT * FROM suppliers")
    .then((result) => response.json(result.rows))
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    });
    return;
});

// GET Filter the list of Products by name using a query parameter, for example /products?name=Cup.
app.get("/products", function (request, response) {
  if ("query" in request && "name" in request.query) {
    const searchTerm = `'%${request.query.name}%'`; // SQL LIKE parameter '%name%'

    pool
      .query(
        `SELECT product_name AS "product name", unit_price AS price, supplier_name AS "supplier name"
            FROM product_availability
            JOIN products
            ON products.id = prod_id
            JOIN suppliers
            ON suppliers.id = supp_id
            WHERE product_name LIKE ${searchTerm}
            ORDER BY product_name, unit_price`
      )
      .then((result) => response.json(result.rows))
      .catch((error) => {
        console.error(error);
        response.status(500).json(error);
      });
      return;
  }

  // Otherwise
  // Return all the Product names along with their Prices and Supplier names.
    pool
      .query(
        `SELECT product_name AS "product name", unit_price AS price, supplier_name AS "supplier name"
        FROM product_availability
        JOIN products
        ON products.id = prod_id
        JOIN suppliers
        ON suppliers.id = supp_id
        ORDER BY product_name, unit_price`
      )
      .then((result) => response.json(result.rows))
      .catch((error) => {
        console.error(error);
        response.status(500).json(error);
      });
      return;
});

// POST CUSTOMER ORDERS
// POST endpoint /customers/:customerId/orders to create a new order including an order date, and an order reference.
// Tested with Postman

app.post("/customers/:custId/orders", function (request, response) {
  let { order_date, order_reference } = request.body; // Destructuring
  let { custId: customer_id } = request.params; // Destructuring

  // Ensure all 3 parameters are valid
  // 1) Is the customer_id a valid integer?
  let result = validate_number(customer_id, "Customer ID");
  if (!result[0]) {
          return response
          .status(400)
          .send(result[1]);
  } else {
          customer_id = result[1];
  }

  // 2) Is the order reference nonblank? 
  order_reference = order_reference.trim();
  if (!order_reference) {
    return response
      .status(400)
      .send(`The Order Reference is blank.`);
  }
 
  // 3) Is the order date a valid date?
  if (moment(order_date, 'YYYY-MM-DD', true).format() === "Invalid date") {
    return response
      .status(400)
      .send(`Order Date '${order_date}' must be a valid date formatted as 'YYYY-MM-DD'.`);    
  }

  pool
    .query("SELECT * FROM customers WHERE id=$1", [customer_id])
    .then((result) => {
      let reply = result.rows;
      if (reply.length === 0) {
        return response
          .status(400)
          .send(`No Customer with the ID '${request.params.custId}' exists.`);
      } else {
              pool
              .query("SELECT * FROM orders WHERE order_reference=$1", [order_reference])
              .then((result) => {
                  let reply = result.rows;
                  if (reply.length > 0) {
                      return response
                      .status(400)
                      .send(`Order Reference '${order_reference}' already exists.`);
                  } else {
                      const query =
                                    "INSERT INTO orders (order_date, order_reference, customer_id) VALUES ($1, $2, $3)";
                      pool
                      .query(query, [order_date, order_reference, customer_id])
                      .then(() => response.send("Customer Order created."))
                      .catch((error) => {
                              console.error(error);
                              response.status(500).json(error);
                      });
                   }
              })
              .catch((error) => {
                  console.error(error);
                  response.status(500).json(error);
              })
              return;
        }
    })
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
    })
  })

// POST CUSTOMERS
// POST endpoint /customers to create a new customer with name, address, city and country.
// Tested with Postman

app.post("/customers", (request, response) => {

  // Trim the parameters contained in request.body
  const newObj = Object.keys(request.body).reduce((accumulator, key) => {
    return { ...accumulator, [key]: request.body[key].trim() };
  }, {});

  const { name:newName, address:newAddress, city:newCity, country:newCountry } = newObj; // Destructuring

  if (!newName || !newAddress || !newCity || !newCountry) {
    return response
      .status(400)
      .send(`Ensure that all the fields are filled in. Blank entries are not allowed.`);
  } 

  pool
    .query("SELECT * FROM customers WHERE name=$1", [newName])
    .then((result) => {
      if (result.rows.length > 0) {
        return response
          .status(400)
          .send(`A customer with the same name '${newName}' already exists.`);
      } else {
        const query =
          "INSERT INTO customers (name, address, city, country) VALUES ($1, $2, $3, $4)";
        pool
          .query(query, [newName, newAddress, newCity, newCountry])
          .then(() => response.send("Customer created."))
          .catch((error) => {
            console.error(error);
            response.status(500).json(error);
          });
      }
    });
    return;    
});

// POST endpoint /products to create a new product.
// Tested with Postman

app.post("/products", (request, response) => {
  let { product_name:newProduct } = request.body; // Destructuring
  
  newProduct = newProduct.trim();
  if (!newProduct) {
    return response
      .status(400)
      .send(`The Product name is blank.`);
  } 

  pool
    .query("SELECT * FROM products WHERE product_name=$1", [newProduct])
    .then((result) => {
      if (result.rows.length > 0) {
        return response
          .status(400)
          .send(`A product with the same name '${newProduct}' already exists.`);
      } else {
        const query =
          "INSERT INTO products (product_name) VALUES ($1)";
        pool
          .query(query, [newProduct])
          .then(() => response.send("Product created."))
          .catch((error) => {
            console.error(error);
            response.status(500).json(error);
          });
      }
    });
    return;
});

// POST endpoint /availability to create a new Product Availability with a Price and a Supplier ID. 
// Tested with Postman

app.post("/availability", (request, response) => {
  let { prod_id, supp_id, unit_price } = request.body; // Destructuring
  
  // Ensure all 3 parameters are valid integers
  let result = validate_number(prod_id, "Product ID");
  if (!result[0]) {
          return response
          .status(400)
          .send(result[1]);
  } else {
          prod_id = result[1];
  }
   
  result = validate_number(supp_id, "Supplier ID");
  if (!result[0]) {
    return response.status(400).send(result[1]);
  } else {
    supp_id = result[1];
  }
   
  result = validate_number(unit_price, "Unit Price");
  if (!result[0]) {
    return response.status(400).send(result[1]);
  } else {
    unit_price = result[1];
  }

  // Further Validation
  pool
    .query("SELECT * FROM product_availability WHERE supp_id=$1 AND prod_id=$2", [supp_id, prod_id])
    .then((result) => {
      if (result.rows.length > 0) {
        return response
          .status(400)
          .send(`Product Availability with the same Supplier ID '${supp_id}' already exists.`);
      }
      else {            
            pool
            .query("SELECT * FROM suppliers WHERE suppliers.id=$1", [supp_id])
            .then((result) => {
                if (result.rows.length === 0) {
                  return response
                         .status(400)
                        .send(
                                `Supplier ID '${supp_id}' does not exist. Therefore Product Availability cannot be added.`
                             );
                }
                else {
                          pool
                              .query(
                                   "SELECT * FROM products WHERE products.id=$1",
                                   [prod_id]
                                 )
                                 .then((result) => {
                                   if (result.rows.length === 0) {
                                     return response
                                       .status(400)
                                       .send(
                                         `Product ID '${prod_id}' does not exist. Therefore Product Availability cannot be added.`
                                       );
                                   } else {
                                     // Validation Complete - Insert New Record
                                       const query =
                                         "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES ($1, $2, $3)";
                                       pool
                                         .query(query, [
                                           prod_id,
                                           supp_id,
                                           unit_price,
                                         ])
                                         .then(() =>
                                           response.send(
                                             "Product Availability created."
                                           )
                                         )
                                         .catch((error) => {
                                           console.error(error);
                                           response.status(500).json(error);
                                         });
                                       return;
                                   }
                                 })
                                 .catch((error) => {
                                   console.error(error);
                                   response.status(500).json(error);
                                   return;
                                 });        
                }
            })
            .catch((error) => {
              console.error(error);
              response.status(500).json(error);
              return;
            });        

      }})
      .catch((error) => {
            console.error(error);
            response.status(500).json(error);
            return;
      });        
  return;
});

// UPDATE CUSTOMERS
// PUT endpoint /customers/:customerId to to update an existing customer with name, address, city and country.
// Tested with Postman

app.put("/customers/:custId", (request, response) => {
  // Trim the parameters contained in request.body
  const newObj = Object.keys(request.body).reduce((accumulator, key) => {
    return { ...accumulator, [key]: request.body[key].trim() };
  }, {});

  const {
    name: newName,
    address: newAddress,
    city: newCity,
    country: newCountry,
  } = newObj; // Destructuring

  if (!newName || !newAddress || !newCity || !newCountry) {
    return response
      .status(400)
      .send(
        `Ensure that all the fields are filled in. Blank entries are not allowed.`
      );
  }

  // Is the customer_id a valid integer?
  let { custId: customer_id } = request.params; // Destructuring
  let result = validate_number(customer_id, "Customer ID");
  if (!result[0]) {
    return response.status(400).send(result[1]);
  } else {
    customer_id = result[1];
  }

  pool
    .query("SELECT * FROM customers WHERE id=$1", [customer_id])
    .then((result) => {
                       let reply = result.rows;
                       if (reply.length === 0) {
                                 return response
                                    .status(400)
                                    .send(`No Customer with the ID '${customer_id}' exists.`);
                       } else {
                                  const query =
                                    "UPDATE customers SET name=$1, address=$2, city=$3, country=$4 WHERE id = $5";
                                  pool
                                    .query(query, [newName, newAddress, newCity, newCountry, customer_id])
                                    .then(() => response.send("Customer updated."))
                                    .catch((error) => {
                                        console.error(error);
                                        response.status(500).json(error);
                                  });
                      }
    })
    .catch((error) => {
            console.error(error);
            response.status(500).json(error);
            return
    }); 
});

// DELETE endpoint /customers/:customerId to delete an existing customer only if this customer doesn't have orders.
app.delete("/customers/:custId", function (request, response) {

  // Is the customer_id a valid integer?
  let { custId: customer_id } = request.params; // Destructuring
  let result = validate_number(customer_id, "Customer ID");
  if (!result[0]) {
    return response.status(400).send(result[1]);
  } else {
          customer_id = result[1];
  }

  pool
    .query("SELECT * FROM orders WHERE customer_id=$1", [customer_id])
    .then((result) => {
      let reply = result.rows;
      if (reply.length > 0) {
        return response
          .status(400)
          .send(
            `Customer with ID '${customer_id}' has existing orders. Customer cannot be deleted.`
          );
      } else {
        const query = "DELETE FROM customers WHERE id=$1";
        pool
          .query(query, [customer_id])
          .then(() => response.send(`Customer '${customer_id}' deleted.`))
          .catch((error) => {
            console.error(error);
            response.status(500).json(error);
          });
      }
    })
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
      return;
    });
})

// DELETE endpoint /orders/:orderId to delete an existing order along with all the associated order items.
app.delete("/orders/:orderId", function (request, response) {
  
  // Is the Order ID a valid integer?
  let { orderId } = request.params; // Destructuring
  let result = validate_number(orderId, "Order ID");
  if (!result[0]) {
      return response.status(400).send(result[1]);
  } else {
      orderId = result[1];
  }

  pool
    .query("DELETE FROM orders WHERE id=$1", [orderId])
    .then(() => response.send(`Order ${orderId} deleted!`))
    .catch((error) => {
      console.error(error);
      response.status(500).json(error);
      return;
    });
});

app.listen(port, function () {
  console.log("Server is listening on port " + port);
});
