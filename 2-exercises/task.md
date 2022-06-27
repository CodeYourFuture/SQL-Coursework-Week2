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
2. ```sql
SELECT name, address FROM customers WHERE country = 'United States';
```
2. Retrieve all the customers in ascending name sequence
```sql
SELECT * FROM customers ORDER BY name;
```
3. Retrieve all the customers in ascending name sequence 
4. ```sql
 SELECT * FROM products WHERE product_name LIKE '%socks%';
 ```
4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.
```sql
SELECT products.product_name, product_availability.prod_id, product_availability.unit_price, product_availability.supp_id FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id WHERE product_availability.unit_price > 100;
```
5. Retrieve the 5 most expensive products
```sql
SELECT products.product_name, product_availability.unit_price FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id ORDER BY product_availability.unit_price DESC LIMIT 5;
```
 
6. Retrieve all the products whose name contains the word `socks`.
 `product_name`, `unit_price` and `supplier_name`.                                                                                                    
 ```sql
 SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM product_availability INNER JOIN products on product_availability.prod_id = products.id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id;
 ```
7.Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
```sql
SELECT products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN products ON product_availability.prod_id = products.id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id WHERE suppliers.country = 'United Kingdom';
```
8.Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).
```sql
SELECT orders.id, orders.order_reference, orders.order_date, (order_items.quantity * product_availability.unit_price) AS total_cost FROM order_items INNER JOIN orders ON order_items.order_id = orders.id INNER JOIN product_availability ON order_items.product_id = product_availability.prod_id WHERE orders.customer_id = 1;
```
9.  Retrieve all orders, including order items, from customer named `Hope Crosby`
```sql
SELECT orders.*, order_items.* FROM orders INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN customers ON orders.customer_id = customers.id WHERE customers.name = 'Hope Crosby';
```
10. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.  
```sql
SELECT products.product_name, product_availability.unit_price, order_items.quantity FROM order_items INNER JOIN products ON order_items.product_id = products.id INNER JOIN product_availability ON order_items.product_id = product_availability.prod_id INNER JOIN orders ON order_items.order_id = orders.id WHERE orders.order_reference = 'ORD006';
```
12. Retrieve the 5 most expensive products.    
```sql         
SELECT customers.name, orders.order_reference, orders.order_date, products.product_name, suppliers.supplier_name, order_items.quantity FROM order_items INNER JOIN orders ON order_items.order_id = orders.id INNER JOIN products ON order_items.product_id = products.id INNER JOIN customers ON customers.id = orders.customer_id INNER JOIN suppliers ON order_items.supplier_id = suppliers.id;
```
13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.
```sql
SELECT customers.name, orders.order_reference,orders.order_date, (order_items.quantity * product_availability.unit_price) AS total_amount FROM order_items INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN product_availability ON product_availability.prod_id = order_items.product_id INNER JOIN customers ON customers.id = orders.customer_id ORDER BY total_amount DESC;
```
14. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`. 
```sql
SELECT customers.name FROM order_items INNER JOIN orders ON order_items.order_id = orders.id INNER JOIN customers ON orders.customer_id = customers.id INNER JOIN suppliers ON order_items.supplier_id = suppliers.id WHERE suppliers.country = 'China';
```
