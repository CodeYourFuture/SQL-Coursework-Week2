# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a database for an e-commerce app.

To submit this homework write the correct commands for each question here:
```sql


```

When you have finished all of the questions - open a pull request with your answers to the `Databases-Homework` repository.

## Setup

To prepare your environment for this homework, open a terminal and create a new database called `cyf_ecommerce`:

```sql
createdb cyf_ecommerce
```

Import the file [`cyf_ecommerce.sql`](./cyf_ecommerce.sql) in your newly created database:

```sql
psql -d cyf_ecommerce -f cyf_ecommerce.sql
```

Open the file `cyf_ecommerce.sql` in VSCode and examine the SQL code. Take a piece of paper and draw the database with the different relationships between tables (as defined by the REFERENCES keyword in the CREATE TABLE commands). Identify the foreign keys and make sure you understand the full database schema.

## Task

Once you understand the database that you are going to work with, solve the following challenge by writing SQL queries using everything you learned about SQL:

1. Retrieve all the customers' names and addresses who live in the United States
SELECT name, address FROM customers WHERE country = 'United States';

2. Retrieve all the customers in ascending name sequence
SELECT * FROM customers ORDER BY name ASC;
3. Retrieve all the products whose name contains the word `socks`
SELECT * FROM products WHERE lower(product_name) LIKE '%socks%';
4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

SELECT products.id, products.product_name, product_availability.unit_price, product_availability.supp_id
FROM products
INNER JOIN product_availability
ON (products.id = product_availability.prod_id) 
WHERE product_availability.unit_price > 100;
5. Retrieve the 5 most expensive products
SELECT products.id, products.product_name, product_availability.unit_price
FROM products
INNER JOIN product_availability
ON (products.id = product_availability.prod_id)
ORDER BY product_availability.unit_price DESC
LIMIT 5;
6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name
FROM products
INNER JOIN product_availability
ON products.id = product_availability.prod_id
INNER JOIN suppliers
ON product_availability.supp_id = suppliers.id;

7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

SELECT products.product_name, suppliers.supplier_name
FROM products
INNER JOIN product_availability
ON products.id = product_availability.prod_id
INNER JOIN suppliers
ON product_availability.supp_id = suppliers.id AND suppliers.country = 'United Kingdom';

8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price).

SELECT orders.id, orders.order_reference, orders.order_date, order_items.quantity * product_availability.unit_price AS total_cost
FROM orders
INNER JOIN order_items
ON orders.id = order_items.order_id
INNER JOIN product_availability
ON order_items.product_id = product_availability.prod_id
WHERE orders.customer_id = 1;

9. Retrieve all orders, including order items, from customer named `Hope Crosby`

SELECT c.name, o.id, oi.id, oi.quantity, c.address, c.city, c.country FROM customers c JOIN orders o ON (c.id = o.customer_id) JOIN order_items oi ON (o.id = oi.order_id) WHERE c.name = 'Hope Crosby';


10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

SELECT p.product_name, pa.unit_price, oi.quantity FROM products p JOIN product_availability pa ON (p.id = pa.prod_id) JOIN order_items oi ON (oi.product_id = pa.prod_id) JOIN orders o ON (o.id = oi.order_id)  WHERE o.order_reference = 'ORD006';

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

SELECT c.name, o.order_reference, o.order_date, p.product_name, s.supplier_name, oi.quantity FROM customers c JOIN orders o ON (c.id = o.customer_id) JOIN order_items oi ON (o.id = oi.order_id) JOIN suppliers s ON (oi.supplier_id = s.id) JOIN product_availability pa ON (s.id = pa.supp_id) JOIN products p ON (p.id = pa.prod_id);


12. Retrieve the names of all customers who bought a product from a supplier based in China.

SELECT c.name FROM customers c JOIN orders o ON (c.id = o.customer_id) JOIN order_items oi ON (o.id = oi.order_id) JOIN suppliers s ON (oi.supplier_id = s.id) WHERE s.country = 'China'; 


13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.

SELECT c.name, o.order_reference, o.order_date, oi.quantity * pa.unit_price AS TOTAL_AMOUNT FROM customers c JOIN orders o ON ( c.id = o.customer_id) JOIN order_items oi ON (o.id = oi.order_id) JOIN product_availability pa ON (oi.product_id = pa.prod_id) ORDER BY TOTAL_AMOUNT DESC;

