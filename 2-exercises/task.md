# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a database for an e-commerce app.

To submit this homework write the correct commands for each question here:

```sql

1.
SELECT name, address
FROM customers
WHERE country = 'United States';

2.
SELECT * FROM customers ORDER BY name;

3.
SELECT * FROM products WHERE product_name LIKE '%socks%';

4.
SELECT id, product_name AS name, a.unit_price AS price, a.supp_id AS supplier_id
FROM products
INNER JOIN product_availability a
ON  a.prod_id = id
WHERE  a.unit_price > 100;

5.
SELECT id, product_name AS name, a.unit_price AS price
FROM products
INNER JOIN product_availability a
ON  a.prod_id = id
ORDER BY price DESC
LIMIT 5;

6.
SELECT product_name AS name, a.unit_price AS price, s.supplier_name AS supplierName
FROM products
INNER JOIN product_availability a
ON  a.prod_id = id
INNER JOIN suppliers s
ON s.id = a.supp_id;

7.
SELECT product_name AS name, s.supplier_name AS supplierName
FROM products
INNER JOIN product_availability a
ON  a.prod_id = id
INNER JOIN suppliers s
ON s.id = a.supp_id
WHERE s.country = 'United Kingdom';

8.
SELECT o.id, o.order_reference AS ref, o.order_date AS date, (a.unit_price*i.quantity) AS Total_cost
FROM orders o
INNER JOIN order_items i
ON i.order_id = o.id
INNER JOIN product_availability a
ON a.prod_id = i.product_id
WHERE o.customer_id=1;

9.
SELECT ord.id, ord.order_reference as ref, ord.order_date as date, cust.name FROM orders ord
INNER JOIN order_items items
ON items.order_id = ord.id
INNER JOIN customers cust
ON cust.id = ord.customer_id
WHERE cust.name='Hope Crosby';

10.
SELECT products.product_name as name, avail.unit_price as price, items.quantity as quantity
FROM order_items items
INNER JOIN product_availability avail
ON avail.prod_id = items.product_id
INNER JOIN products
ON products.id = items.product_id
INNER JOIN orders
ON orders.id = items.order_id
WHERE orders.order_reference='ORD006';

11.
SELECT c.name, o.order_reference, o.order_date, p.product_name, s.supplier_name, oi.quantity
FROM customers c
INNER JOIN orders o
ON o.customer_id = c.id
INNER JOIN order_items oi
ON oi.order_id = o.id
INNER JOIN products p
ON p.id = oi.product_id
INNER JOIN suppliers s
ON s.id = oi.supplier_id;


12.
SELECT c.name as name, sup.country as supplier_country
FROM customers c
INNER JOIN orders ord
ON ord.customer_id = c.id
INNER JOIN order_items items
ON items.order_id = ord.id
INNER JOIN suppliers sup
ON sup.id = items.supplier_id
WHERE sup.country = 'China';

13.
SELECT c.name, o.order_reference, o.order_date, (pa.unit_price * oi.quantity) as total_amount
FROM orders o
INNER JOIN customers c
ON c.id = o.customer_id
INNER JOIN  order_items oi
ON oi.order_id = o.id
INNER JOIN products p
ON p.id = oi.product_id
INNER JOIN product_availability pa
ON pa.prod_id = p.id
ORDER BY total_amount DESC;

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
8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).
9. Retrieve all orders, including order items, from customer named `Hope Crosby`
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
12. Retrieve the names of all customers who bought a product from a supplier based in China.
13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.
