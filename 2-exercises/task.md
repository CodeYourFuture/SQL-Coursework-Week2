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

```
select name, address from customers where country = 'United States';
```

2. Retrieve all the customers in ascending name sequence

```
   SELECT * FROM customers ORDER BY name ASC;
```

3. Retrieve all the products whose name contains the word `socks`

```
SELECT * FROM products WHERE product_name ILIKE '%socks%';
```

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

```
SELECT  p.id, p.product_name, pa.unit_price, s.id AS supplier_id
 FROM products AS p
 INNER JOIN  product_availability As pa ON p.id = pa.prod_id
 INNER JOIN  suppliers As s ON pa.supp_id = s.id;

```

5. Retrieve the 5 most expensive products

```
SELECT  p.id, p.product_name
 FROM products AS p
 INNER JOIN  product_availability As pa ON p.id = pa.prod_id
ORDER by pa.unit_price desc
limit 5;

```

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

```
SELECT product_name, unit_price, supplier_name
 FROM products AS p
  INNER JOIN  product_availability As pa ON p.id = pa.prod_id
 INNER JOIN  suppliers As s ON pa.supp_id = s.id;
```

7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

```
SELECT product_name, supplier_name
 FROM product_availability As pa
 INNER JOIN  products As p ON pa.prod_id = p.id
 INNER JOIN  suppliers As s ON pa.supp_id = s.id

  WHERE s.country ='United Kingdom';
```

8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).

```
SELECT o.id, order_reference, order_date, SUM(quantity * unit_price) AS "Total - Cost"
 FROM orders As o
 INNER JOIN  order_items As oi ON o.id = oi.order_id
INNER JOIN  product_availability AS pa ON oi.product_id = pa.prod_id
INNER JOIN  customers As c ON o.customer_id = c.id
WHERE c.id = 1
GROUP BY o.id;

```

9. Retrieve all orders, including order items, from customer named `Hope Crosby`

```
SELECT o.*, oi.*
 FROM orders As o, order_items As oi, customers As c

WHERE o.id = oi.order_id AND c.id = o.customer_id AND c.name = 'Hope Crosby';

```

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

```
SELECT product_name, unit_price, quantity
 FROM order_items As oi
 INNER JOIN  orders As o ON  oi.order_id = o.id
  INNER JOIN  products As p ON  oi.product_id = p.id
   INNER JOIN  product_availability As pa ON  pa.prod_id = p.id
   Where order_reference = 'ORD006';

```

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

```
SELECT c.name, o.order_reference, o.order_date, p.product_name, s.supplier_name, oi.quantity
 FROM order_items As oi
 INNER JOIN  orders As o ON  oi.order_id = o.id
 INNER JOIN  customers As c ON  o.customer_id = c.id
  INNER JOIN  products As p ON  oi.product_id = p.id
   INNER JOIN  product_availability As pa ON  pa.prod_id = p.id
   INNER JOIN  suppliers As s ON  pa.supp_id = s.id;
```

12. Retrieve the names of all customers who bought a product from a supplier based in China.

```
SELECT c.*
 FROM order_items As oi
INNER JOIN  orders As o ON  oi.order_id = o.id
INNER JOIN  customers As c ON  o.customer_id = c.id
INNER JOIN  suppliers As s ON  oi.supplier_id = s.id
    WHERE s.country = 'China';

```

13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.

```
SELECT c.name, o.order_reference, o.order_date, SUM(oi.quantity * pa.unit_price) as Total
 FROM order_items As oi
 INNER JOIN  orders As o ON  oi.order_id = o.id
 INNER JOIN  customers As c ON  o.customer_id = c.id
INNER JOIN  products As p ON  oi.product_id = p.id
INNER JOIN  product_availability As pa ON  pa.prod_id = p.id
   GROUP BY c.name, o.order_reference, o.order_date;
```
