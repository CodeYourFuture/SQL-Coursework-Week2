# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a database for an e-commerce app.

To submit this homework write the correct commands for each question here:

1. Retrieve all the customers' names and addresses who live in the United States

```sql
SELECT name, address FROM customers WHERE country='United States';
```

2.

```sql
SELECT * FROM customers ORDER BY name ASC;
```

3.

```sql
SELECT * FROM products WHERE product_name LIKE '%socks%';
```

4.

```sql
SELECT products.id, products.product_name, product_availability.supp_id, product_availability.unit_price FROM products RIGHT JOIN product_availability ON products.id = product_availability.prod_id WHERE unit_price > 100;
```

5.

```sql
SELECT products.id, products.product_name, product_availability.supp_id, product_availability.unit_price FROM product_availability INNER JOIN products ON product_availability.prod_id = products.id ORDER BY unit_price DESC LIMIT 5;
```

6.

```sql
SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products JOIN product_availability ON products.id = product_availability.prod_id JOIN suppliers ON suppliers.id = product_availability.supp_id;
```

7.

```sql
SELECT products.product_name, suppliers.supplier_name FROM products JOIN product_availability ON products.id = product_availability.prod_id JOIN suppliers ON product_availability.supp_id = suppliers.id WHERE suppliers.country='United Kingdom';
```

8.

```sql
SELECT order_items.order_id, orders.order_reference, orders.order_date, order_items.quantity * product_availability.unit_price AS total_cost FROM orders JOIN order_items ON orders.id = order_items.order_id JOIN product_availability ON order_items.product_id = product_availability.prod_id WHERE orders.customer_id = 1;
```

9.1

```sql
SELECT * FROM orders JOIN order_items ON orders.id = order_items.order_id JOIN customers ON orders.id = customers.id WHERE customers.name = 'Hope Crosby';
```

9.2

```sql
SELECT order_items.order_id, orders.order_date, orders.order_reference, orders.customer_id, order_items.product_id, order_items.supplier_id, order_items.quantity, customers.name, customers.address, customers.city, customers.country FROM orders JOIN order_items ON orders.id = order_items.order_id JOIN customers ON orders.id = customers.id WHERE customers.name = 'Hope Crosby';
```

10.

```sql
SELECT products.product_name, product_availability.unit_price, order_items.quantity FROM products JOIN product_availability ON products.id = product_availability.prod_id JOIN order_items ON product_availability.prod_id = order_items.product_id JOIN orders ON order_items.order_id = orders.id WHERE orders.order_reference = 'ORD006';
```

11.

```sql
SELECT customers.name, orders.order_reference, orders.order_date, products.product_name, suppliers.supplier_name, order_items.quantity FROM customers JOIN orders ON customers.id = orders.customer_id JOIN order_items ON orders.id = order_items.order_id JOIN suppliers ON order_items.supplier_id = suppliers.id JOIN product_availability ON order_items.supplier_id = product_availability.supp_id JOIN products ON product_availability.prod_id = products.id;
```

12.

```sql
SELECT customers.name FROM customers JOIN orders ON customers.id = orders.customer_id JOIN order_items ON orders.id = order_items.order_id JOIN suppliers ON order_items.supplier_id = suppliers.id WHERE suppliers.country = 'China';
```

13.

```sql
SELECT customers.name, orders.order_reference, orders.order_date, order_items.quantity * product_availability.unit_price AS total_amount FROM customers JOIN orders ON customers.id = orders.customer_ID JOIN order_items ON orders.id = order_items.order_id JOIN product_availability ON order_items.product_id = product_availability.prod_id ORDER BY total_amount DESC;
```

14.

```sql
SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM products JOIN product_availability ON products.id = product_availability.prod_id JOIN suppliers ON product_availability.supp_id = suppliers.id;
```

## Setup

To prepare your environment for this homework, open a terminal and create a new database called `cyf_ecommerce`:

```sql
createdb cyf_ecommerce
```

Ensure you cd into the correct folder where the sql file resides

```
cd 2-exercises
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
4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id
5. Retrieve the 5 most expensive products
6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).
9. Retrieve all orders, including order items, from customer named `Hope Crosby`
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
12. Retrieve the names of all customers who bought a product from a supplier based in China.
13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.
14. Return all the product names along with their prices and supplier names