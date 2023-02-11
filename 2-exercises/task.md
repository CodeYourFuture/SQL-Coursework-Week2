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
=> SELECT name, address FROM customers WHERE country = 'United States';
```

2. Retrieve all the customers in ascending name sequence

```sql
SELECT * FROM customers ORDER BY name;

 id |        name        |           address           |       city       |    country
----+--------------------+-----------------------------+------------------+----------------
  4 | Amber Tran         | 6967 Ac Road                | Villafranca Asti | United States
  3 | Britanney Kirkland | P.O. Box 577, 5601 Sem, St. | Little Rock      | United Kingdom
  5 | Edan Higgins       | Ap #840-3255 Tincidunt St.  | Arles            | United States
  1 | Guy Crawford       | 770-2839 Ligula Road        | Paris            | France
  2 | Hope Crosby        | P.O. Box 276, 4976 Sit Rd.  | Steyr            | United Kingdom
  6 | Quintessa Austin   | 597-2737 Nunc Rd.           | Saint-Marc       | United Kingdom
(6 rows)

```

3. Retrieve all the products whose name contains the word `socks`

```sql
SELECT * FROM products WHERE product_name LIKE '%socks%';

 id |   product_name
----+------------------
  4 | Super warm socks
(1 row)
```

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

```sql
   SELECT products.id, products.product_name, product_availability.unit_price, product_availability.supp_id FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id WHERE unit_price > 100;

   id |  product_name  | unit_price | supp_id
----+----------------+------------+---------
  1 | Mobile Phone X |        249 |       4
  1 | Mobile Phone X |        299 |       1
(2 rows)
```

5. Retrieve the 5 most expensive products

```sql
   SELECT distinct(products.id), products.product_name, product_availability.unit_price FROM products INNER JOIN product_availability ON products.id = product_availability.prod_id ORDER BY unit_price DESC LIMIT 5;

    id |  product_name   | unit_price
----+-----------------+------------
  1 | Mobile Phone X  |        299
  1 | Mobile Phone X  |        249
  2 | Javascript Book |         41
  2 | Javascript Book |         40
  2 | Javascript Book |         39
(5 rows)
```

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

```sql
   SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name FROM product_availability INNER JOIN products ON product_availability.prod_id = products.id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id;

       product_name       | unit_price | supplier_name
-------------------------+------------+---------------
 Mobile Phone X          |        249 | Sainsburys
 Mobile Phone X          |        299 | Amazon
 Javascript Book         |         41 | Taobao
 Javascript Book         |         39 | Argos
 Javascript Book         |         40 | Amazon
 Le Petit Prince         |         10 | Sainsburys
 Le Petit Prince         |         10 | Amazon
 Super warm socks        |         10 | Sainsburys
 Super warm socks        |          8 | Argos
 Super warm socks        |          5 | Taobao
 Super warm socks        |         10 | Amazon
 Coffee Cup              |          5 | Sainsburys
 Coffee Cup              |          4 | Argos
 Coffee Cup              |          4 | Taobao
 Coffee Cup              |          3 | Amazon
 Ball                    |         20 | Taobao
 Ball                    |         15 | Sainsburys
 Ball                    |         14 | Amazon
 Tee Shirt Olympic Games |         21 | Argos
 Tee Shirt Olympic Games |         18 | Taobao
 Tee Shirt Olympic Games |         20 | Amazon
(21 rows)
```

7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

```sql
   SELECT products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN products ON product_availability.prod_id = products.id INNER JOIN suppliers ON product_availability.supp_id = suppliers.id;

         product_name       | supplier_name
-------------------------+---------------
 Mobile Phone X          | Sainsburys
 Mobile Phone X          | Amazon
 Javascript Book         | Taobao
 Javascript Book         | Argos
 Javascript Book         | Amazon
 Le Petit Prince         | Sainsburys
 Le Petit Prince         | Amazon
 Super warm socks        | Sainsburys
 Super warm socks        | Argos
 Super warm socks        | Taobao
 Super warm socks        | Amazon
 Coffee Cup              | Sainsburys
 Coffee Cup              | Argos
 Coffee Cup              | Taobao
 Coffee Cup              | Amazon
 Ball                    | Taobao
 Ball                    | Sainsburys
 Ball                    | Amazon
 Tee Shirt Olympic Games | Argos
 Tee Shirt Olympic Games | Taobao
 Tee Shirt Olympic Games | Amazon
(21 rows)
```

8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price).

```sql
 SELECT orders.id, orders.order_reference, orders.order_date, product_availability.unit_price * order_items.quantity AS total_cost FROM orders INNER JOIN order_items ON orders.id = order_items.order_id INNER JOIN product_availability ON order_items.product_id = product_availability.prod_id WHERE customer_id = 1;

  id | order_reference | order_date | total_cost
----+-----------------+------------+------------
  1 | ORD001          | 2019-06-01 |         20
  1 | ORD001          | 2019-06-01 |         18
  1 | ORD001          | 2019-06-01 |         21
  1 | ORD001          | 2019-06-01 |         50
  1 | ORD001          | 2019-06-01 |         25
  1 | ORD001          | 2019-06-01 |         40
  1 | ORD001          | 2019-06-01 |         50
  2 | ORD002          | 2019-07-15 |         40
  2 | ORD002          | 2019-07-15 |         20
  2 | ORD002          | 2019-07-15 |         32
  2 | ORD002          | 2019-07-15 |         40
  2 | ORD002          | 2019-07-15 |         10
  2 | ORD002          | 2019-07-15 |         10
  3 | ORD003          | 2019-07-11 |         30
  3 | ORD003          | 2019-07-11 |         40
  3 | ORD003          | 2019-07-11 |         40
  3 | ORD003          | 2019-07-11 |         50
  3 | ORD003          | 2019-07-11 |         28
  3 | ORD003          | 2019-07-11 |         40
  3 | ORD003          | 2019-07-11 |         30
(20 rows)

```

9. Retrieve all orders, including order items, from customer named `Hope Crosby`

```sql
SELECT * FROM orders
 INNER JOIN order_items ON order_items.order_id = orders.id
 WHERE customer_id = (SELECT id FROM customers WHERE name = 'Hope Crosby');

 id | order_date | order_reference | customer_id | id | order_id | product_id | supplier_id | quantity
----+------------+-----------------+-------------+----+----------+------------+-------------+----------
  4 | 2019-05-24 | ORD004          |           2 |  7 |        4 |          1 |           1 |        1
(1 row)

```

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

```sql
SELECT products.product_name, product_availability.unit_price, order_items.quantity FROM orders
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN products ON order_items.product_id = products.id
INNER JOIN product_availability ON order_items.product_id = product_availability.prod_id  AND products.id = product_availability.prod_id
WHERE orders.order_reference = 'ORD006';

  product_name   | unit_price | quantity
------------------+------------+----------
 Coffee Cup       |          3 |        3
 Coffee Cup       |          4 |        3
 Coffee Cup       |          4 |        3
 Coffee Cup       |          5 |        3
 Javascript Book  |         40 |        1
 Javascript Book  |         41 |        1
 Javascript Book  |         39 |        1
 Le Petit Prince  |         10 |        1
 Le Petit Prince  |         10 |        1
 Super warm socks |         10 |        3
 Super warm socks |          5 |        3
 Super warm socks |          8 |        3
 Super warm socks |         10 |        3
(13 rows)

```

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

```sql
SELECT customers.name, orders.order_reference, orders.order_date, products.product_name, suppliers.supplier_name, order_items.quantity FROM customers
INNER JOIN orders ON customers.id = orders.customer_id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN products ON order_items.product_id = products.id
INNER JOIN suppliers ON order_items.supplier_id = suppliers.id;

        name        | order_reference | order_date |      product_name       | supplier_name | quantity
--------------------+-----------------+------------+-------------------------+---------------+----------
 Guy Crawford       | ORD001          | 2019-06-01 | Tee Shirt Olympic Games | Taobao        |        1
 Guy Crawford       | ORD001          | 2019-06-01 | Super warm socks        | Taobao        |        5
 Guy Crawford       | ORD002          | 2019-07-15 | Super warm socks        | Argos         |        4
 Guy Crawford       | ORD002          | 2019-07-15 | Le Petit Prince         | Sainsburys    |        1
 Guy Crawford       | ORD003          | 2019-07-11 | Coffee Cup              | Argos         |       10
 Guy Crawford       | ORD003          | 2019-07-11 | Ball                    | Taobao        |        2
 Hope Crosby        | ORD004          | 2019-05-24 | Mobile Phone X          | Amazon        |        1
 Britanney Kirkland | ORD005          | 2019-05-30 | Javascript Book         | Argos         |        2
 Britanney Kirkland | ORD005          | 2019-05-30 | Le Petit Prince         | Amazon        |        1
 Amber Tran         | ORD006          | 2019-07-05 | Coffee Cup              | Taobao        |        3
 Amber Tran         | ORD006          | 2019-07-05 | Javascript Book         | Taobao        |        1
 Amber Tran         | ORD006          | 2019-07-05 | Le Petit Prince         | Sainsburys    |        1
 Amber Tran         | ORD006          | 2019-07-05 | Super warm socks        | Sainsburys    |        3
 Amber Tran         | ORD007          | 2019-04-05 | Super warm socks        | Argos         |       15
 Edan Higgins       | ORD008          | 2019-07-23 | Tee Shirt Olympic Games | Amazon        |        1
 Edan Higgins       | ORD008          | 2019-07-23 | Mobile Phone X          | Sainsburys    |        1
 Edan Higgins       | ORD009          | 2019-07-24 | Ball                    | Sainsburys    |        2
 Edan Higgins       | ORD010          | 2019-05-10 | Ball                    | Taobao        |        1
 Edan Higgins       | ORD010          | 2019-05-10 | Super warm socks        | Amazon        |        5
(19 rows)

```

12. Retrieve the names of all customers who bought a product from a supplier based in China.

```sql
SELECT name FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN suppliers ON order_items.supplier_id = suppliers.id
WHERE suppliers.country = 'China';

    name
--------------
 Guy Crawford
 Guy Crawford
 Guy Crawford
 Amber Tran
 Amber Tran
 Edan Higgins
(6 rows)
```

13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.

```sql
SELECT customers.name, orders.order_reference, orders.order_date, order_items.quantity * product_availability.unit_price AS total_amount FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN product_availability ON order_items.product_id = product_availability.prod_id
ORDER BY total_amount DESC;

        name        | order_reference | order_date | total_amount
--------------------+-----------------+------------+--------------
 Hope Crosby        | ORD004          | 2019-05-24 |          299
 Edan Higgins       | ORD008          | 2019-07-23 |          299
 Hope Crosby        | ORD004          | 2019-05-24 |          249
 Edan Higgins       | ORD008          | 2019-07-23 |          249
 Amber Tran         | ORD007          | 2019-04-05 |          150
 Amber Tran         | ORD007          | 2019-04-05 |          150
 Amber Tran         | ORD007          | 2019-04-05 |          120
.... more rows
```
