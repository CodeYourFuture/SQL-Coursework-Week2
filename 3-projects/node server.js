
/* Add Express and node-postgres and make sure you can start the server with `node server.js` */ 

const express = require ("express");
const { send } = require("express/lib/response");
const { Pool } = require ("pg");

const app = express ();
const port = 3000;


app.use(express.json());

/* Create a new NodeJS application called `cyf-ecommerce-api`*/ 
const pool = new Pool({
  user: "nehiguese",
  host: "localhost",
  database: "ecommerce",
  password: "",
  port: 5432,
});


/* Add a new GET endpoint `/customers` to return all the customers from the database */

app.get("/customers", function (req, res) {
  pool
    .query("SELECT * FROM customers")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});

/*Add a new GET endpoint `/suppliers` to return all the suppliers from the database */ 
app.get("/suppliers", function (req, res) {
  pool
    .query("SELECT * FROM supplier")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});


/* (STRETCH GOAL) Add a new GET endpoint `/products` to return all the product names along with their prices and supplier names. */




/* Week 3 */ 

/* In the following homework, you will create new API endpoints in the NodeJS application `cyf-ecommerce-api` that you created for last week's homework for the Database 2 class. */

/* If you don't have it already, add a new GET endpoint `/products` to load all the product names along with their prices and supplier names. */



/* Update the previous GET endpoint `/products` to filter the list of products by name using a query parameter, for example `/products?name=Cup`. This endpoint should still work even if you don't use the `name` query parameter! */


/*Add a new GET endpoint `/customers/:customerId` to load a single customer by ID. */

/* Add a new POST endpoint `/customers` to create a new customer with name, address, city and country. */ 

/* Add a new POST endpoint `/products` to create a new product. */ 

/* Add a new POST endpoint `/availability` to create a new product availability (with a price and a supplier id). Check that the price is a positive integer and that both the product and supplier ID's exist in the database, otherwise return an error. /* 

/* Add a new POST endpoint `/customers/:customerId/orders` to create a new order (including an order date, and an order reference) for a customer. Check that the customerId corresponds to an existing customer or return an error. /* 

/* Add a new PUT endpoint `/customers/:customerId` to update an existing customer (name, address, city and country). /* 

/* Add a new DELETE endpoint `/orders/:orderId` to delete an existing order along with all the associated order items. /* 

/* Add a new DELETE endpoint `/customers/:customerId` to delete an existing customer only if this customer doesn't have orders. /* 

/* Add a new GET endpoint `/customers/:customerId/orders` to load all the orders along with the items in the orders of a specific customer. Especially, the following information should be returned: order references, order dates, product names, unit prices, suppliers and quantities. /* 