# E-Commerce API

## Submission

Add all your `javascript` files in this folder and create a pull request to submit your homework

## Task

- Create a new NodeJS application called `cyf-ecommerce-api`
<!-- mkdir cyf-ecommerce-api && cd cyf-ecommerce-api && npm init -->

- Add Express and node-postgres and make sure you can start the server with `node server.js`
<!-- npm install --save express
npm install --save pg -->

- Add a new GET endpoint `/customers` to return all the customers from the database
- Add a new GET endpoint `/suppliers` to return all the suppliers from the database
- (STRETCH GOAL) Add a new GET endpoint `/products` to return all the product names along with their prices and supplier names.

SELECT products.product_name,suppliers.supplier_name,product_availability.unit_price 
FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id
INNER JOIN suppliers ON suppliers.id =  product_availability.supp_id
