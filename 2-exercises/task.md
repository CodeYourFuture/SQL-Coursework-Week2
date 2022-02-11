# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a database for an e-commerce app.

To submit this homework write the correct commands for each question here:
```sql
-- 1. Retrieve all the customers' names and addresses who live in the United States
SELECT c.name AS name, c.address AS address
FROM customers AS c
WHERE lower(c.country) = 'united states';

-- 2. Retrieve all the customers in ascending name sequence
SELECT * FROM customers AS c ORDER BY c.name; --this give all information but could be considered inefficient

-- this one allows you to customize exactly what you want
SELECT c.name, c.address, c.city, c.country
FROM customers AS c
ORDER BY c.name;

-- 3. Retrieve all the products whose name contains the word `socks`
-- this is also often considered bad practice/inefficient 
SELECT * FROM products AS p
WHERE lower(p.product_name) LIKE ('%socks%');

-- 4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.
SELECT p.id AS product_id, p.product_name,
pa.unit_price, pa.supp_id AS supplier_id
FROM products AS p
INNER JOIN product_availability AS pa
ON p.id = pa.prod_id
WHERE pa.unit_price > 100;

-- 5. Retrieve the 5 most expensive products
SELECT p.product_name, pa.unit_price
FROM products AS p
INNER JOIN product_availability AS pa
ON p.id = pa.prod_id
ORDER BY pa.unit_price DESC
LIMIT 5;

-- 6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

SELECT p.product_name, pa.unit_price, s.supplier_name
FROM products AS p
INNER JOIN product_availability AS pa
ON p.id = pa.prod_id
INNER JOIN suppliers AS s
ON pa.supp_id = s.id;

-- 7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

SELECT p.product_name, s.supplier_name
FROM product_availability AS pa
INNER JOIN products AS p
ON p.id = pa.prod_id
INNER JOIN suppliers AS s
ON s.id = pa.supp_id
WHERE lower(s.country) = 'united kingdom';

-- 8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price).

SELECT o.id As order_id, o.order_reference, o.order_date, oi.quantity * pa.unit_price AS total
FROM order_items AS oi
JOIN orders AS o
ON o.id = oi.order_id
JOIN product_availability AS pa
ON oi.supplier_id = pa.supp_id;

-- 9. Retrieve all orders, including order items, from customer named `Hope Crosby`

-- wasn't sure on exactly what information was needed so I
-- just selected all, though I believe this would work if
-- you simply changed the select clause to get what you wanted
SELECT *
FROM orders AS o
INNER JOIN order_items AS oi
ON o.id = oi.order_id
INNER JOIN customers AS c
ON o.customer_id = c.id
WHERE lower(c.name) = 'hope crosby';


-- 10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

SELECT p.product_name, p.product_name, pa.unit_price, oi.quantity
FROM order_items AS oi
INNER JOIN products AS p
ON p.id = oi.product_id
INNER JOIN orders AS o
ON o.id = oi.order_id
INNER JOIN product_availability AS pa
ON oi.product_id = pa.prod_id
WHERE o.order_reference = 'ORD006';


-- 11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

SELECT c.name AS customer_name, o.order_reference, o.order_date, p.product_name, s.supplier_name, oi.quantity
FROM order_items AS oi
INNER JOIN orders AS o
ON oi.order_id = o.id
INNER JOIN customers AS c
ON o.customer_id = c.id
INNER JOIN products AS p
ON oi.product_id = p.id
INNER JOIN suppliers AS s
ON oi.supplier_id = s.id;


-- 12. Retrieve the names of all customers who bought a product from a supplier based in China.

SELECT c.name AS customer_name
FROM order_items AS oi
INNER JOIN suppliers AS s
ON oi.supplier_id = s.id
INNER JOIN orders AS o
ON oi.order_id = o.id
INNER JOIN customers AS c
ON o.customer_id = c.id
WHERE lower(s.country) = 'china';


-- 13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.

SELECT c.name, o.order_reference, o.order_date, oi.quantity * pa.unit_price AS total_amount
FROM order_items AS oi
INNER JOIN orders AS o
ON o.id = oi.order_id
INNER JOIN customers AS c
ON o.customer_id = c.id
INNER JOIN products AS p
ON oi.product_id = p.id
INNER JOIN product_availability AS pa
ON p.id = pa.prod_id;

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
2. Retrieve all the customers in ascending name sequence
3. Retrieve all the products whose name contains the word `socks`
4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.
5. Retrieve the 5 most expensive products
6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price).
9. Retrieve all orders, including order items, from customer named `Hope Crosby`
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
12. Retrieve the names of all customers who bought a product from a supplier based in China.
13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.

