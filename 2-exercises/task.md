# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a database for an e-commerce app.

To submit this homework write the correct commands for each question here:
```sql
1. SELECT name, address FROM customers WHERE country='United States';

2. SELECT * FROM customers ORDER BY name asc;

3. SELECT * FROM products WHERE product_name LIKE '%socks%';

4. SELECT aval.*, prod.product_name AS name FROM product_availability AS aval, products AS prod WHERE aval.prod_id=prod.id AND unit_price > 100;

5. SELECT aval.*, prod.product_name AS name FROM product_availability AS aval, products AS prod WHERE aval.prod_id=prod.id ORDER BY unit_price desc LIMIT 5;

6. SELECT aval.unit_price, prod.product_name, sup.supplier_name FROM product_availability AS aval, products AS prod, suppliers AS sup WHERE prod.id=aval.prod_id AND aval.supp_id=sup.id;

7. SELECT prod.product_name, sup.supplier_name FROM products AS prod, suppliers AS sup, product_availability AS aval WHERE prod.id=aval.prod_id AND aval.supp_id=sup.id AND sup.country='United Kingdom';

8. SELECT ori.order_id, ord.order_reference, ord.order_date, ori.quantity * aval.unit_price AS total_cost FROM order_items AS ori, orders 
AS ord, product_availability AS aval WHERE ori.order_id=ord.id AND ori.product_id=aval.prod_id AND ord.customer_id='1';

9. SELECT ord.*, ori.* FROM orders AS ord, order_items AS ori, customers AS cus WHERE ord.id=ori.order_id AND ord.customer_id=cus.id AND cus.name='Hope Crosby';

10. SELECT pr.product_name, aval.unit_price, ori.quantity FROM products AS pr, product_availability AS aval, order_items AS ori, orders AS ord WHERE ord.id=ori.order_id AND ori.product_id=pr.id AND pr.id=aval.prod_id AND ord.order_reference='ORD006';

11. SELECT cus.name, ord.order_reference, ord.order_date, pr.product_name, sup.supplier_name, ori.quantity FROM customers AS cus, suppliers AS sup, products AS pr, order_items AS ori, orders AS ord WHERE ord.id=ori.order_id AND ori.product_id=pr.id AND ori.supplier_id=sup.id AND ord.customer_id=cus.id;

12. SELECT cus.name FROM customers AS cus, orders AS ord, order_items AS ori, suppliers AS sup WHERE cus.id=ord.customer_id AND ord.id=ori.order_id AND ori.supplier_id=sup.id AND sup.country='China';

13. SELECT cus.name, ord.order_reference, ord.order_date, ori.quantity * aval.unit_price AS total_amount FROM orders AS ord, order_items AS ori, customers AS cus, product_availability AS aval WHERE ord.id=ori.order_id AND ord.customer_id=cus.id AND ori.product_id=aval.prod_id ORDER BY total_amount DESC;

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

