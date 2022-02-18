/* Add Express and node-postgres and make sure you can start the server with `node server.js` */ 

const express = require("express");
//const dotenv = require ("dotenv");
const { send } = require("express/lib/response");
const { Pool } = require("pg");
const { resourceLimits } = require("worker_threads");

const app = express ();
dotenv.config();
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


app.get("/products", function (req, res) {
  pool
    .query("SELECT products.product_name, suppliers.supplier_name, product_availability.unit_price FROM product_availability INNER JOIN  products ON product_availability.prod_id = products.id INNER JOIN  suppliers ON product_availability.supp_id = suppliers.id;")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});


/* Week 3 */ 

/* In the following homework, you will create new API endpoints in the NodeJS application `cyf-ecommerce-api` that you created for last week's homework for the Database 2 class. */

/* If you don't have it already, add a new GET endpoint `/products` to load all the product names along with their prices and supplier names. */



/* Update the previous GET endpoint `/products` to filter the list of products by name using a query parameter, for example `/products?name=Cup`. This endpoint should still work even if you don't use the `name` query parameter! */

app.get("/products", function (req, res) {
  pool
    .query("SELECT products.product_name, suppliers.supplier_name, product_availability.unit_price FROM product_availability INNER JOIN  products ON product_availability.prod_id = products.id INNER JOIN  suppliers ON product_availability.supp_id = suppliers.id WHERE product_name LIKE '%Cup%';")
    .then((result) => res.json(result.rows))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});


/*Add a new GET endpoint `/customers/:customerId` to load a single customer by ID. */

app.get("/customers/:customerId", function (req, res) {
    const customerId = Number(req.params.customerId);
    const query = `SELECT * FROM customer WHERE id =$1`;

    if (!Number.isInteger(customerId)) { 
      return res.status(400).json ({msg: "invalid input"});
    }
  pool
    .query(query, [customerId])
    .then ((result) => {
      if (result.rows.length <= 0) { 
        res
        .status (404)
        .json ({msg: `No customer with if ${customerId} has been found`});
      } else { 
        res. json(result.rows);
      }
    })
    .catch((error) => res.status(500).json(error));
  });
  

/* Add a new POST endpoint `/customers` to create a new customer with name, address, city and country. */ 


app.post("/customers", function (req, res) { 
  const newCustomerName = req.body.name;
  const newCustomerAddress = req.body.address;
  const newCustomerCity = req.body.city;
  const newCustomerCountry = req.body.country;

if(
  !newCustomerName &&
  !newCustomerAddress &&
  !newCustomerCity &&
  !newCustomerCountry
) { 
  return res.status(400).json({
    result: "failure", 
    msg: "To add new customer, name, address, city and country are all required"
  });
}

pool
.query("SELECT * FROM customer WHERE name = $1", [newCustomerName])
.then ((result) => { 
  if (result.rows.length > 0) { 
    return res.status(400).json({
      result: "failed",
      msg: "A customer with same name already exists",
    });
  } else { 
 const query = "INSERT INTO customer (name, address, city, country) VALUES ($1, $2, $3, $4)"
pool
.query(query, [newCustomerName, newCustomerAddress, newCustomerCity, newCustomerCountry])
.then(() => res.Json ("customer created"))
.catch((error) => { 
  console.error(error);
  res.status(500).json(error);
  });
}
})
.catch((error) => res.status (400).json(error));
});
/* Add a new POST endpoint `/products` to create a new product. */ 
app.post("/products", function (req, res) {
    const newId = req.body.id;
    const newProductName = req.body.product_name;

if (!newProductName) { 
  return res.status(400).json({
result:"failed",
msg: "product not specified"
  });
}

pool
.query("SELECT * FROM products WHERE id =$1, product_name = $2", [newId, newProductName])
.then((result) => {
  if(result.rows.length > 0) {
    return res
    .status(400)
    .send("This product already exist");
  } else {
    const query = " INSERT INTO product (id, product_name) VALUEs ($1, $2)";

pool
.query(query, [newId, newProductName])
.then (() => res.send ("Product created"))
.catch((error) => { 
  console.error(error);
  res.status(500).json(error);
});
};
})
});



/* Add a new POST endpoint `/availability` to create a new product availability (with a price and a supplier id). Check that the price is a positive integer and that both the product and supplier ID's exist in the database, otherwise return an error. */

app.post("/product_availability", function (req, res) {
  const newProdID = req.body.prod_id;
  const newSuppID = req.body.supp_id;
  const newUnitPrice = req.body.unit_price;

if(!Number.isInteger(price) || price <=0) { 
  return res
    .status(400)
    .send("The unit price should be a positive number.");
}
pool
.query ( 

`SELECT product_availability.prod_id, product_availability.supp_id FROM product_availability 
INNER JOIN products ON products.id = product_availability.prod_id 
INNER JOIN suppliers ON suppliers.id = product_availability.supp_id 
WHERE product_availability.prod_id = $1 AND product_availability.supp_id = $2`,[productId, supplierId]
)
.then((result) => { 
  if(result.rows.length ==0) { 
    return res.status(400). json ({ msg: `Product ID not found`
    }); 
  } else { 
    const query = `SELECT prod_id, supp_id FROM Product availability WHERE prod_id = $1 AND supp_id = $2`;
    pool.query(query, [newProdID, newSuppID])
    .then ((result) => { 
   if (result.rows.length > 0){
    return res.status(400).json ({ 
      msg: "this product already exist"
    })
   } else { 
     const query = "INSERT INTO product_availability (prod_id, supp_id, unit_price) VALUES($1, $2, $3)";

     pool 
     .query(query, [productId, supplierId, unit_price])
     .then(() => { 
       res.json ({ msg: " New proouct availability has been added"})
     })
   }
   .catch ((error) => { 
    res.status(400).json(error);
   });
  
    });
  }
});
}




/* Add a new POST endpoint `/customers/:customerId/orders` to create a new order (including an order date, and an order reference) for a customer. Check that the customerId corresponds to an existing customer or return an error. */ 

app.POST("/customers/:customerId", function (req, res) {
    const customerId = req.params.customerId;
    const newOrderDate = req.body.order_date;
    const newOrderReference = req.order_reference;
    const id = req.body.id;
  pool
    .query("SELECT * FROM customers WHERE id = $1", [customerId])
    .then((result) => {
      if (result.rows.length > 0) { 
       return res
      .status(400)
      .send ("This customer already exist");  
      }else { 
  
const query = "INSERT INTO order (customer_id, id, order_date, order_reference) VALUES ($1, $2, $3, $4)";

 pool
.query(query, [customerId, id, newOrderDate, newOrderReference])
.then(() => res.send ("customer created"))
.catch((error) => { 
  console.error(error);
  res.status(500).json(error);

});
    }
});
});


/* Add a new PUT endpoint `/customers/:customerId` to update an existing customer (name, address, city and country). */


app.put("/customers/:customerId", function (req, res) {
  const customerId = req.params.id;
  const newName = req.body.name;
  const newAddress = req.body.address;
  const newCity = req.body.city;
  const newCountry = req.body.country;

  // added a validation for the post code
  pool
    .query("UPDATE customers WHERE id=$1, name = $2, address = $3, city = $4, country = $5", [customerId, newName, newAddress, newCity, newCountry])
    .then(() => res.send(`Customer ${customerId} updated!`))
    .catch((error) => {
      console.error(error);
      res.status(500).json(error);
    });
});


/* Add a new DELETE endpoint `/orders/:orderId` to delete an existing order along with all the associated order items. */

app.delete("/orders/:orderId", function (req, res) {
  const orderId = req.params.orderId;

    pool
    .query(`SELECT * FROM order WHERe id =$1`, [orderId])
    .then(result => { 
      if (result.rowCount.length) { 
        pool.query(`DELETE FROM order WHERE id=$1` , [orderId])
        .then(() => res.send (`Customer ${orderId} deleted!`))
        .catch((error) => { 
          console.log("error occurred");
          res.status(500).send(error);
        })
      } else {
                res.send({ error: "id does not exist! provide a new one." })
            }
    })


/* Add a new DELETE endpoint `/customers/:customerId` to delete an existing customer only if this customer doesn't have orders. */
app.delete("/customers/:customerId", (req, res) => {

    const { customerId } = req.params;
    const query = `SELECT * FROM orders WHERE customer_id = $1 `

  pool.query(query, [customerId])
        .then(result => {
            if (!result.rows.length) {
                pool.query(`DELETE FROM customers WHERE id = $1`, [customerId])
                    .then(() => {
                        res.send(`Customer ${customerId} has successfully deleted`)
                    })
                    .catch(error => {
                        console.log(error);
                        res.statusMessage(500).send(error)
                    })
            } else {
                res.send({ error: "this customer has some orders." })
            }
        })
})

/* Add a new GET endpoint `/customers/:customerId/orders` to load all the orders along with the items in the orders of a specific customer. Especially, the following information should be returned: order references, order dates, product names, unit prices, suppliers and quantities. */ 

