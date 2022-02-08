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

--SEARCH MAX--- 
--Group by : Run the Query with and without it before 
Replace it with Where and assign it to specific value - Don't pick an ID that have one item.
Look into insert statement to figure out what data we expecting - and verify it.
You need to know these two values composite key 
Entity relations diagrams ERD 





SELECT MAX(customers.name), orders.order_reference, orders.order_date, SUM(order_items.quantity * product_availability.unit_price) AS total_amount 
FROM customers 
INNER JOIN orders ON customers.id = orders.customer_id 
INNER JOIN order_items ON orders.id = order_items.order_id 
INNER JOIN product_availability ON order_items.product_id = product_availability.prod_id AND product_availability.supp_id = order_items.supplier_id 
GROUP BY orders.id 
ORDER BY total_amount DESC;


2=== 


SELECT customers.name, orders.order_reference, orders.order_date, order_items.quantity ,product_availability.unit_price
FROM orders 
INNER JOIN customers ON customers.id = orders.customer_id 
INNER JOIN order_items ON orders.id = order_items.order_id 
INNER JOIN product_availability ON order_items.product_id = product_availability.prod_id AND product_availability.supp_id = order_items.supplier_id
WHERE orders.id = 1;




----------------------------------------

--1. Retrieve all the customers' names and addresses who live in the United States
SELECT name, address FROM customers WHERE country = 'United States';
--2. Retrieve all the customers in ascending name sequence
SELECT name FROM customers ORDER BY name ASC;
--3. Retrieve all the products whose name contains the word `socks`
SELECT product_name FROM products WHERE product_name LIKE '%socks%';
--4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id using a join query between products and product_availability
SELECT products.id, products.product_name, product_availability.unit_price, product_availability.supp_id FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id WHERE product_availability.unit_price > 100;
--5. Retrieve the 5 most expensive products ordered by price in descending order and show product id, name, unit price and supplier id using a join query between products and product_availability
SELECT products.id, products.product_name, product_availability.unit_price, product_availability.supp_id FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id ORDER BY product_availability.unit_price DESC LIMIT 5;
--6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name` from the products table and the columns `supplier_name` and `supplier_address` from the suppliers table. The result should be ordered by product name in ascending order. 
SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name, suppliers.country FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id ORDER BY products.product_name ASC;
--7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`. The result should be ordered by product name in ascending order.
SELECT products.product_name, suppliers.supplier_name FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id WHERE suppliers.country = 'United Kingdom' ORDER BY products.product_name ASC;
--8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price). USING a join query between orders and order_items
SELECT orders.id, orders.order_reference, orders.order_date, SUM(order_items.quantity * order_items.unit_price) AS total_cost FROM orders INNER JOIN order_items ON orders.id = order_items.order_id WHERE orders.customer_id = 1 GROUP BY orders.id;


--I make a new json file and add the password in that, you can then add that json file to the .gitignore then import that json file in the main server

--9. Retrieve all orders, including order items, from customer named `Hope Crosby`. Include order id, reference, date and total cost (calculated as quantity * unit price). USING a join query between orders and order_items
--select from inner join group each query in different line 

SELECT orders.id, orders.order_reference, orders.order_date, SUM(order_items.quantity * product_availability.unit_price) AS total_cost 
FROM orders 
INNER JOIN order_items ON orders.id = order_items.order_id 
INNER JOIN customers ON orders.customer_id = customers.id 
INNER JOIN product_availability ON product_availability.supp_id = order_items.supplier_id AND product_availability.prod_id = order_items.product_id 
WHERE customers.name = 'Hope Crosby' 
GROUP BY orders.id;

--10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
SELECT products.product_name, product_availability.unit_price, order_items.quantity 
FROM products
INNER JOIN order_items ON products.id = order_items.product_id 
INNER JOIN product_availability ON products.id = product_availability.prod_id AND product_availability.supp_id = order_items.supplier_id 
INNER JOIN orders ON order_items.order_id = orders.id 
WHERE orders.order_reference = 'ORD006';

--11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
SELECT customers.name, orders.order_reference, orders.order_date, products.product_name, suppliers.supplier_name, order_items.quantity 
FROM customers INNER JOIN orders ON customers.id = orders.customer_id 
INNER JOIN order_items ON orders.id = order_items.order_id 
INNER JOIN products ON order_items.prod_id = products.id 
INNER JOIN product_availability ON products.id = product_availability.prod_id tINNER JOIN suppliers ON product_availability.supp_id = suppliers.id;
--12. Retrieve the names of all customers who bought a product from a supplier based in China.
SELECT customers.name FROM customers INNER JOIN orders ON customers.id = orders.customer_id INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN products ON order_items.prod_id = products.id INNER JOIN product_availability ON products.id = product_availability.prod_id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id WHERE suppliers.country = 'China';

--13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.
SELECT MAX(customers.name), orders.order_reference, orders.order_date, SUM(order_items.quantity * product_availability.unit_price) AS total_amount 
FROM customers 
INNER JOIN orders ON customers.id = orders.customer_id 
INNER JOIN order_items ON orders.id = order_items.order_id 
INNER JOIN product_availability ON order_items.product_id = product_availability.prod_id AND product_availability.supp_id = order_items.supplier_id 
GROUP BY orders.id 
ORDER BY total_amount DESC;


