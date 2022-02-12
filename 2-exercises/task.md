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

```sql
SELECT cus.name, cus.address
FROM customers cus
WHERE cus.country LIKE '%United States%';

```

<br></br>

2. Retrieve all the customers in ascending name sequence

```sql
SELECT * FROM customers ORDER BY name;

```

<br></br>

3. Retrieve all the products whose name contains the word `socks`

```sql
SELECT * FROM products WHERE product_name ILIKE ('%socks%');

```

<br></br>

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

```sql
SELECT prod_id, product_name FROM products
 INNER JOIN product_availability
 ON products.id = product_availability.prod_id
 WHERE product_availability.unit_price > 100;

```

<br></br>

5. Retrieve the 5 most expensive products

```sql
SELECT * FROM products
 INNER JOIN product_availability ON products.id = product_availability.prod_id ORDER BY product_availability.unit_price DESC LIMIT 5;

```

<br></br>

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

```sql
SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name
FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id
INNER JOIN suppliers ON product_availability.supp_id = suppliers.id;

```

<br></br>

7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

```sql
SELECT products.product_name, suppliers.supplier_name FROM products
INNER JOIN product_availability ON products.id = product_availability.prod_id
INNER JOIN suppliers ON product_availability.supp_id = suppliers.id
WHERE suppliers.country = 'United Kingdom';

```

<br></br>

8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).

```sql
SELECT orders.id, orders.order_reference, orders.order_date, (order_items.quantity*product_availability.unit_price) AS total_cost FROM orders
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN product_availability ON order_items.product_id = product_availability.prod_id WHERE orders.customer_id = 1;

```

<br></br>

9. Retrieve all orders, including order items, from customer named `Hope Crosby`

```sql
SELECT * FROM orders INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN customers ON orders.customer_id = customers.id
WHERE customers.name ILIKE ('%Hope Crosby%');

```

<br></br>

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

```sql

SELECT products.product_name, product_availability.unit_price, order_items.quantity
FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id
INNER JOIN order_items ON product_availability.prod_id = order_items.product_id
INNER JOIN orders ON order_items.order_id = orders.id
WHERE orders.order_reference = 'ORD006';

```

<br></br>

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

```sql
SELECT customers.name, orders.order_reference, orders.order_date, products.product_name, suppliers.supplier_name, order_items.quantity
FROM customers INNER JOIN orders on customers.id = orders.customer_id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN products ON order_items.product_id = products.id
INNER JOIN product_availability ON products.id = product_availability.prod_id
INNER JOIN suppliers ON product_availability.supp_id = suppliers.id

```

<br></br>

12. Retrieve the names of all customers who bought a product from a supplier based in China.

```sql
SELECT customers.name FROM customers
INNER JOIN orders ON customers.id = orders.customer_id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN suppliers ON order_items.supplier_id = suppliers.id
WHERE suppliers.country  = 'China';

```

<br></br>

13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.

```sql
SELECT customers.name, orders.order_reference, orders.order_date, order_items.quantity*product_availability.unit_price AS total_amount
FROM customers INNER JOIN orders ON customers.id = orders.customer_id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN product_availability ON order_items.product_id = product_availability.prod_id
ORDER BY total_amount DESC;

```

<br></br>
