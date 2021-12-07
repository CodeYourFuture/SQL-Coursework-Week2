# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy FROM different `suppliers`. Customers can create an `order` and several products can be added in one order.

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

ONce you understand the database that you are going to work with, solve the following challenge by writing SQL queries using everything you learned about SQL:

1. Retrieve all the customers' names and addresses who live in the United States

```sql
SELECT
  name,
  address,
  country
FROM
  customers
WHERE
  country = 'United States';
```

2. Retrieve all the customers in ascending name sequence

```sql
SELECT
  name
FROM
  customers
ORDER BY
  name;
```

3. Retrieve all the products whose name contains the word `socks`

```sql
SELECT
  product_name
FROM
  products
WHERE
  product_name LIKE '%socks%';
```

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

```sql
SELECT
  pa.prod_id,
  p.product_name AS name,
  pa.unit_price,
  pa.supp_id AS supplier_id
FROM
  product_availability AS pa
  INNER JOIN products AS p ON pa.prod_id = p.id
WHERE
  pa.unit_price > 100;
```

5. Retrieve the 5 most expensive products

<!-- All product details -->

```sql
SELECT
  pa.prod_id,
  p.product_name AS name,
  pa.unit_price,
  pa.supp_id AS supplier_id
FROM
  product_availability AS pa
  INNER JOIN products AS p ON pa.prod_id = p.id
ORDER BY
  pa.unit_price DESC
LIMIT
  5;
```

<!-- Just the products -->

```sql
SELECT
  p.product_name AS name
FROM
  product_availability AS pa
  INNER JOIN products AS p ON pa.prod_id = p.id
ORDER BY
  pa.unit_price DESC
LIMIT
  5;
```

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

```sql
SELECT
  p.product_name,
  pa.unit_price,
  s.supplier_name
FROM
  product_availability AS pa
  INNER JOIN products AS p ON pa.prod_id = p.id
  INNER JOIN suppliers AS s ON pa.supp_id = s.id;
```

7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

```sql
SELECT
  p.product_name,
  s.supplier_name
FROM
  products AS p
  INNER JOIN order_items AS oi ON p.id = oi.product_id
  INNER JOIN suppliers AS s ON oi.supplier_id = s.id
WHERE
  s.country = 'United Kingdom';
```

8. Retrieve all orders, including order items, FROM customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).

```sql
SELECT
  o.id,
  o.order_reference,
  o.order_date,
  (
    oi.quantity * pa.unit_price
  ) AS total_cost
FROM
  orders AS o
  INNER JOIN order_items AS oi ON oi.order_id = o.id
  INNER JOIN product_availability AS pa ON oi.product_id = pa.prod_id
WHERE
  o.customer_id = 1;
```

9. Retrieve all orders, including order items, FROM customer named `Hope Crosby`

```sql
SELECT
  *
FROM
  customers AS c
  INNER JOIN orders AS o ON c.id = o.customer_id
  INNER JOIN order_items AS oi ON o.id = oi.order_id
WHERE
  c.name = 'Hope Crosby';
```

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

```sql
SELECT
  p.product_name,
  pa.unit_price,
  oi.quantity
FROM
  products AS p
  INNER JOIN order_items AS oi ON oi.product_id = p.id
  INNER JOIN orders AS o ON oi.order_id = o.id
  INNER JOIN product_availability AS pa ON oi.product_id = pa.prod_id
WHERE
  o.order_reference = 'ORD006';
```

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (FROM customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

```sql
SELECT
  c.name,
  o.order_reference,
  o.order_date,
  p.product_name,
  s.supplier_name,
  oi.quantity
FROM
  customers AS c
  INNER JOIN orders AS o ON o.customer_id = c.id
  INNER JOIN order_items AS oi ON oi.order_id = o.id
  INNER JOIN products AS p ON p.id = oi.product_id
  INNER JOIN suppliers AS s ON s.id = oi.supplier_id;
```

12. Retrieve the names of all customers who bought a product from a supplier based in China.

```sql
SELECT
  DISTINCT c.name
FROM
  customers AS c
  INNER JOIN orders AS o ON o.customer_id = c.id
  INNER JOIN order_items AS oi ON oi.order_id = o.id
  INNER JOIN suppliers AS s ON s.id = oi.supplier_id
WHERE
  s.country = 'China';
```

13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.

```sql
SELECT
  c.name,
  o.order_reference,
  o.order_date,
  (
    oi.quantity * pa.unit_price
  ) AS order_total_amount
FROM
  customers AS c
  INNER JOIN orders AS o ON c.id = o.customer_id
  INNER JOIN order_items AS oi ON o.id = oi.order_id
  INNER JOIN product_availability pa ON oi.product_id = pa.prod_id
ORDER BY
  order_total_amount DESC;
```
