# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `cONsumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in ONe order.

## SubmissiON

Below you will find a set of tasks for you to complete to set up a database for an e-commerce app.

To submit this homework write the correct commands for each questiON here:

```sql
ANSWER1 :
SELECT name, address FROM customers WHERE country = 'United States';

ANSWER2 :
SELECT * FROM customers ORDER BY name ASC;

ANSWER3 :
SELECT product_name FROM products WHERE product_name LIKE  '%sock%';

ANSWER4 :
SELECT p.id, p.product_name, pa.unit_price, s.id AS supplierID FROM products p JOIN product_availability pa
ON p.id = pa.prod_id JOIN suppliers s ON pa.supp_id = s.id WHERE pa.unit_price > 100 ;

ANSWER5 :
SELECT p.product_name, pa.unit_price FROM products p JOIN product_availability pa ON p.id = pa.prod_id
ORDER BY pa.unit_price DESC LIMIT 5;

ANSWER6 :
SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p JOIN product_availability pa
ON p.id = pa.prod_id JOIN suppliers s ON pa.supp_id = s.id ;

ANSWER7 :
SELECT s.supplier_name,p.product_name FROM suppliers s JOIN product_availability pa
ON s.id = pa.prod_id  JOIN products p ON pa.prod_id = p.id where country = 'United Kingdom' ;

ANSWER8 :
SELECT o.id,o.order_reference, o.order_date, p.product_name,(oi.quantity)*(pa.unit_price) AS totalcost FROM customers c JOIN  orders o ON c.id = o.customer_id JOIN order_items oi ON o.id=oi.order_id JOIN products p ON oi.product_id
= p.id JOIN product_availability pa ON p.id =  pa.prod_id where c.id =1;

ANSWER9 :
SELECT c.name, oi.quantity, p.product_name FROM customers c JOIN orders o ON c.id = o.customer_id JOIN order_items oi ON o.id = oi.order_id JOIN
product_availability pa ON pa.prod_id = oi.product_id JOIN products p ON pa.prod_id = p.id WHERE c.name = 'Hope Crosby';

ANSWER10 :
SELECT p.product_name, pa.unit_price,oi.quantity FROM products p JOIN product_availability pa
ON p.id = pa.prod_id JOIN order_items oi on pa.prod_id = oi.product_id JOIN orders o ON oi.product_id = o.id
WHERE o.order_reference = 'ORD006';

ANSWER11 :
SELECT c.name, o.order_reference, o.order_date,p.product_name,s.supplier_name,oi.quantity FROM customers c JOIN
orders o ON c.id = o.customer_id JOIN order_items oi ON o.id = oi.order_id JOIN product_availability pa
ON oi.product_id = pa.prod_id JOIN suppliers s ON pa.supp_id = s.id JOIN products p on pa.prod_id = p.id;

ANSWER12 :
SELECT c.name FROM customers c JOIN orders o ON c.id = o.customer_id JOIN order_items oi ON o.id = oi.order_id
JOIN product_availability pa ON oi.product_id = pa.prod_id JOIN suppliers s ON pa.supp_id = s.id JOIN
products p on pa.prod_id = p.id WHERE s.country = 'China' GROUP BY c.name;

ANSWER13 :
SELECT c.name,  o.order_reference, o.order_date, p.product_name,
(oi.quantity)*(pa.unit_price)AS "total amount" FROM customers c JOIN  orders o ON c.id = o.customer_id
JOIN order_items oi ON o.id=oi.order_id JOIN products p ON oi.product_id = p.id
JOIN product_availability pa ON p.id =  pa.prod_id ORDER BY "total amount" DESC;
```

When you have finished all of the questiONs - open a pull request with your answers to the `Databases-Homework` repository.

## Setup

To prepare your envirONment for this homework, open a terminal and create a new database called `cyf_ecommerce`:

```sql
createdb cyf_ecommerce
```

Import the file [`cyf_ecommerce.sql`](./cyf_ecommerce.sql) in your newly created database:

```sql
psql -d cyf_ecommerce -f cyf_ecommerce.sql
```

Open the file `cyf_ecommerce.sql` in VSCode and examine the SQL code. Take a piece of paper and draw the database with the different relatiONships between tables (as defined by the REFERENCES keyword in the CREATE TABLE commands). Identify the foreign keys and make sure you understand the full database schema.

## Task

ONce you understand the database that you are going to work with, solve the following challenge by writing SQL queries using everything you learned about SQL:

1. Retrieve all the customers' names and addresses who live in the United States
2. Retrieve all the customers in ascending name sequence
3. Retrieve all the products whose name cONtains the word `socks`
4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.
5. Retrieve the 5 most expensive products
6. Retrieve all the products with their correspONding suppliers. The result should ONly cONtain the columns `product_name`, `unit_price` and `supplier_name`
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should ONly cONtain the columns `product_name` and `supplier_name`.
8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).
9. Retrieve all orders, including order items, from customer named `Hope Crosby`
10. Retrieve all the products in the order `ORD006`. The result should ONly cONtain the columns `product_name`, `unit_price` and `quantity`.
11. Retrieve all the products with their supplier for all orders of all customers. The result should ONly cONtain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
12. Retrieve the names of all customers who bought a product from a supplier based in China.
13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.
