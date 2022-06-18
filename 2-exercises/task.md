# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a database for an e-commerce app.

To submit this homework write the correct commands for each question here:
```sql

1. Retrieve all the customers' names and addresses who live in the United States
SELECT name, address FROM customers
WHERE country = 'United States';

     name     |          address           
--------------+----------------------------
 Amber Tran   | 6967 Ac Road
 Edan Higgins | Ap #840-3255 Tincidunt St.
(2 rows)


2. Retrieve all the customers in ascending name sequence

SELECT * FROM customers
ORDER BY name ASC;

 id |        name        |           address           |       city       |    country     
----+--------------------+-----------------------------+------------------+----------------
  4 | Amber Tran         | 6967 Ac Road                | Villafranca Asti | United States
  3 | Britanney Kirkland | P.O. Box 577, 5601 Sem, St. | Little Rock      | United Kingdom
  5 | Edan Higgins       | Ap #840-3255 Tincidunt St.  | Arles            | United States
  1 | Guy Crawford       | 770-2839 Ligula Road        | Paris            | France
  2 | Hope Crosby        | P.O. Box 276, 4976 Sit Rd.  | Steyr            | United Kingdom
  6 | Quintessa Austin   | 597-2737 Nunc Rd.           | Saint-Marc       | United Kingdom
(6 rows)

3. Retrieve all the products whose name contains the word `socks`

SELECT * FROM products WHERE product_name LIKE '%socks%';

 id |   product_name   
----+------------------
  4 | Super warm socks
(1 row)

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

 SELECT pa.prod_id, p.product_name, pa.unit_price, pa.supp_id
 FROM products AS p
 JOIN product_availability AS pa 
 ON p.id = pa.prod_id 
 AND pa.unit_price > 100;
 
  prod_id |  product_name  | unit_price | supp_id 
---------+----------------+------------+---------
       1 | Mobile Phone X |        249 |       4
       1 | Mobile Phone X |        299 |       1
(2 rows)

 SELECT *
 FROM products AS p
 JOIN product_availability AS pa 
 ON p.id = pa.prod_id 
 ORDER BY unit_price DESC
 LIMIT 5;
 
5. Retrieve the 5 most expensive products

 id |  product_name   | prod_id | supp_id | unit_price 
----+-----------------+---------+---------+------------
  1 | Mobile Phone X  |       1 |       1 |        299
  1 | Mobile Phone X  |       1 |       4 |        249
  2 | Javascript Book |       2 |       2 |         41
  2 | Javascript Book |       2 |       1 |         40
  2 | Javascript Book |       2 |       3 |         39

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

SELECT DISTINCT p.product_name, pa.unit_price, s.supplier_name
 FROM products AS p
 JOIN product_availability AS pa 
 ON p.id = pa.prod_id 
 JOIN suppliers AS s
 ON p.id = s.id; 
 
    product_name   | unit_price | supplier_name 
------------------+------------+---------------
 Mobile Phone X   |        249 | Amazon
 Javascript Book  |         40 | Taobao
 Mobile Phone X   |        299 | Amazon
 Super warm socks |         10 | Sainsburys
 Javascript Book  |         41 | Taobao
 Le Petit Prince  |         10 | Argos
 Super warm socks |          5 | Sainsburys
 Javascript Book  |         39 | Taobao
 Super warm socks |          8 | Sainsburys
(9 rows)
 
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

SELECT p.product_name, s.supplier_name
 FROM products AS p
 JOIN suppliers AS s
 ON p.id = s.id AND s.country = 'United Kingdom';
 
    product_name   | supplier_name 
------------------+---------------
 Le Petit Prince  | Argos
 Super warm socks | Sainsburys
(2 rows)
 
8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price).

SELECT order_id AS "order id", order_reference AS reference, order_date AS date, quantity * unit_price AS "total cost"
FROM order_items
JOIN orders
ON orders.id = order_id
JOIN product_availability
ON product_id = prod_id
WHERE customer_id = 1 AND supplier_id = supp_id;

 order id | reference |    date    | total cost 
----------+-----------+------------+------------
        1 | ORD001    | 2019-06-01 |         18
        1 | ORD001    | 2019-06-01 |         25
        2 | ORD002    | 2019-07-15 |         32
        2 | ORD002    | 2019-07-15 |         10
        3 | ORD003    | 2019-07-11 |         40
        3 | ORD003    | 2019-07-11 |         40
(6 rows)

9. Retrieve all orders, including order items, from customer named `Hope Crosby`

SELECT orders.order_date, orders.order_reference, orders.customer_id, order_id, product_id, supplier_id, quantity FROM order_items
JOIN customers
ON customers.name = 'Hope Crosby'
JOIN orders
ON customer_id = customers.id
WHERE customers.name = 'Hope Crosby';

 order_date | order_reference | customer_id | order_id | product_id | supplier_id | quantity 
------------+-----------------+-------------+----------+------------+-------------+----------
 2019-05-24 | ORD004          |           2 |        1 |          7 |           2 |        1
 2019-05-24 | ORD004          |           2 |        1 |          4 |           2 |        5
 2019-05-24 | ORD004          |           2 |        2 |          4 |           3 |        4
 2019-05-24 | ORD004          |           2 |        2 |          3 |           4 |        1
 2019-05-24 | ORD004          |           2 |        3 |          5 |           3 |       10
 2019-05-24 | ORD004          |           2 |        3 |          6 |           2 |        2
 2019-05-24 | ORD004          |           2 |        4 |          1 |           1 |        1
 2019-05-24 | ORD004          |           2 |        5 |          2 |           3 |        2
 2019-05-24 | ORD004          |           2 |        5 |          3 |           1 |        1
 2019-05-24 | ORD004          |           2 |        6 |          5 |           2 |        3
 2019-05-24 | ORD004          |           2 |        6 |          2 |           2 |        1
 2019-05-24 | ORD004          |           2 |        6 |          3 |           4 |        1
 2019-05-24 | ORD004          |           2 |        6 |          4 |           4 |        3
 2019-05-24 | ORD004          |           2 |        7 |          4 |           3 |       15
 2019-05-24 | ORD004          |           2 |        8 |          7 |           1 |        1
 2019-05-24 | ORD004          |           2 |        8 |          1 |           4 |        1
 2019-05-24 | ORD004          |           2 |        9 |          6 |           4 |        2
 2019-05-24 | ORD004          |           2 |       10 |          6 |           2 |        1
 2019-05-24 | ORD004          |           2 |       10 |          4 |           1 |        5
(19 rows)

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

SELECT product_name, unit_price, quantity
FROM orders
JOIN order_items
ON orders.id = order_id
JOIN products
ON product_id = products.id
JOIN product_availability
ON product_id = prod_id
WHERE customer_id = 1 AND supplier_id = supp_id;

      product_name       | unit_price | quantity 
-------------------------+------------+----------
 Tee Shirt Olympic Games |         18 |        1
 Super warm socks        |          5 |        5
 Super warm socks        |          8 |        4
 Le Petit Prince         |         10 |        1
 Coffee Cup              |          4 |       10
 Ball                    |         20 |        2
(6 rows)

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

SELECT customers.name, order_reference, order_date, product_name, supplier_name, quantity 
FROM customers
FULL JOIN orders
ON customer_id = customers.id
JOIN order_items
ON orders.id = order_id
JOIN products
ON product_id = products.id
JOIN product_availability
ON product_id = prod_id
JOIN suppliers
ON supplier_id = supp_id;

        name        | order_reference | order_date |      product_name       | supplier_name | quantity 
--------------------+-----------------+------------+-------------------------+---------------+----------
 Guy Crawford       | ORD001          | 2019-06-01 | Tee Shirt Olympic Games | Amazon        |        1
 Guy Crawford       | ORD001          | 2019-06-01 | Tee Shirt Olympic Games | Taobao        |        1
 Guy Crawford       | ORD001          | 2019-06-01 | Tee Shirt Olympic Games | Argos         |        1
 Guy Crawford       | ORD001          | 2019-06-01 | Tee Shirt Olympic Games | Sainsburys    |        1
 Guy Crawford       | ORD001          | 2019-06-01 | Super warm socks        | Amazon        |        5
 Guy Crawford       | ORD001          | 2019-06-01 | Super warm socks        | Taobao        |        5
 Guy Crawford       | ORD001          | 2019-06-01 | Super warm socks        | Argos         |        5
 Guy Crawford       | ORD001          | 2019-06-01 | Super warm socks        | Sainsburys    |        5
 Guy Crawford       | ORD002          | 2019-07-15 | Super warm socks        | Amazon        |        4
 Guy Crawford       | ORD002          | 2019-07-15 | Super warm socks        | Taobao        |        4
 Guy Crawford       | ORD002          | 2019-07-15 | Super warm socks        | Argos         |        4
 Guy Crawford       | ORD002          | 2019-07-15 | Super warm socks        | Sainsburys    |        4
 Guy Crawford       | ORD002          | 2019-07-15 | Le Petit Prince         | Amazon        |        1
 Guy Crawford       | ORD002          | 2019-07-15 | Le Petit Prince         | Taobao        |        1
 Guy Crawford       | ORD002          | 2019-07-15 | Le Petit Prince         | Argos         |        1
 Guy Crawford       | ORD002          | 2019-07-15 | Le Petit Prince         | Sainsburys    |        1
 Guy Crawford       | ORD003          | 2019-07-11 | Coffee Cup              | Amazon        |       10
 Guy Crawford       | ORD003          | 2019-07-11 | Coffee Cup              | Taobao        |       10
 Guy Crawford       | ORD003          | 2019-07-11 | Coffee Cup              | Argos         |       10
 Guy Crawford       | ORD003          | 2019-07-11 | Coffee Cup              | Sainsburys    |       10
 Guy Crawford       | ORD003          | 2019-07-11 | Ball                    | Amazon        |        2
 Guy Crawford       | ORD003          | 2019-07-11 | Ball                    | Taobao        |        2
 Guy Crawford       | ORD003          | 2019-07-11 | Ball                    | Argos         |        2
 Guy Crawford       | ORD003          | 2019-07-11 | Ball                    | Sainsburys    |        2
 Hope Crosby        | ORD004          | 2019-05-24 | Mobile Phone X          | Amazon        |        1
 Hope Crosby        | ORD004          | 2019-05-24 | Mobile Phone X          | Taobao        |        1
 Hope Crosby        | ORD004          | 2019-05-24 | Mobile Phone X          | Argos         |        1
 Hope Crosby        | ORD004          | 2019-05-24 | Mobile Phone X          | Sainsburys    |        1
 Britanney Kirkland | ORD005          | 2019-05-30 | Javascript Book         | Amazon        |        2
 Britanney Kirkland | ORD005          | 2019-05-30 | Javascript Book         | Taobao        |        2
 Britanney Kirkland | ORD005          | 2019-05-30 | Javascript Book         | Argos         |        2
 Britanney Kirkland | ORD005          | 2019-05-30 | Javascript Book         | Sainsburys    |        2
 Britanney Kirkland | ORD005          | 2019-05-30 | Le Petit Prince         | Amazon        |        1
 Britanney Kirkland | ORD005          | 2019-05-30 | Le Petit Prince         | Taobao        |        1
 Britanney Kirkland | ORD005          | 2019-05-30 | Le Petit Prince         | Argos         |        1
 Britanney Kirkland | ORD005          | 2019-05-30 | Le Petit Prince         | Sainsburys    |        1
 Amber Tran         | ORD006          | 2019-07-05 | Coffee Cup              | Amazon        |        3
 Amber Tran         | ORD006          | 2019-07-05 | Coffee Cup              | Taobao        |        3
 Amber Tran         | ORD006          | 2019-07-05 | Coffee Cup              | Argos         |        3
 Amber Tran         | ORD006          | 2019-07-05 | Coffee Cup              | Sainsburys    |        3
 Amber Tran         | ORD006          | 2019-07-05 | Javascript Book         | Amazon        |        1
 Amber Tran         | ORD006          | 2019-07-05 | Javascript Book         | Taobao        |        1
 Amber Tran         | ORD006          | 2019-07-05 | Javascript Book         | Argos         |        1
 Amber Tran         | ORD006          | 2019-07-05 | Javascript Book         | Sainsburys    |        1
 Amber Tran         | ORD006          | 2019-07-05 | Le Petit Prince         | Amazon        |        1
 Amber Tran         | ORD006          | 2019-07-05 | Le Petit Prince         | Taobao        |        1
 Amber Tran         | ORD006          | 2019-07-05 | Le Petit Prince         | Argos         |        1
 Amber Tran         | ORD006          | 2019-07-05 | Le Petit Prince         | Sainsburys    |        1
 Amber Tran         | ORD006          | 2019-07-05 | Super warm socks        | Amazon        |        3
 Amber Tran         | ORD006          | 2019-07-05 | Super warm socks        | Taobao        |        3
 Amber Tran         | ORD006          | 2019-07-05 | Super warm socks        | Argos         |        3
 Amber Tran         | ORD006          | 2019-07-05 | Super warm socks        | Sainsburys    |        3
 Amber Tran         | ORD007          | 2019-04-05 | Super warm socks        | Amazon        |       15
 Amber Tran         | ORD007          | 2019-04-05 | Super warm socks        | Taobao        |       15
 Amber Tran         | ORD007          | 2019-04-05 | Super warm socks        | Argos         |       15
 Amber Tran         | ORD007          | 2019-04-05 | Super warm socks        | Sainsburys    |       15
 Edan Higgins       | ORD008          | 2019-07-23 | Tee Shirt Olympic Games | Amazon        |        1
 Edan Higgins       | ORD008          | 2019-07-23 | Tee Shirt Olympic Games | Taobao        |        1
 Edan Higgins       | ORD008          | 2019-07-23 | Tee Shirt Olympic Games | Argos         |        1
 Edan Higgins       | ORD008          | 2019-07-23 | Tee Shirt Olympic Games | Sainsburys    |        1
 Edan Higgins       | ORD008          | 2019-07-23 | Mobile Phone X          | Amazon        |        1
 Edan Higgins       | ORD008          | 2019-07-23 | Mobile Phone X          | Taobao        |        1
 Edan Higgins       | ORD008          | 2019-07-23 | Mobile Phone X          | Argos         |        1
 Edan Higgins       | ORD008          | 2019-07-23 | Mobile Phone X          | Sainsburys    |        1
 Edan Higgins       | ORD009          | 2019-07-24 | Ball                    | Amazon        |        2
 Edan Higgins       | ORD009          | 2019-07-24 | Ball                    | Taobao        |        2
 Edan Higgins       | ORD009          | 2019-07-24 | Ball                    | Argos         |        2
 Edan Higgins       | ORD009          | 2019-07-24 | Ball                    | Sainsburys    |        2
 Edan Higgins       | ORD010          | 2019-05-10 | Ball                    | Amazon        |        1
 Edan Higgins       | ORD010          | 2019-05-10 | Ball                    | Taobao        |        1
 Edan Higgins       | ORD010          | 2019-05-10 | Ball                    | Argos         |        1
 Edan Higgins       | ORD010          | 2019-05-10 | Ball                    | Sainsburys    |        1
 Edan Higgins       | ORD010          | 2019-05-10 | Super warm socks        | Amazon        |        5
 Edan Higgins       | ORD010          | 2019-05-10 | Super warm socks        | Taobao        |        5
 Edan Higgins       | ORD010          | 2019-05-10 | Super warm socks        | Argos         |        5
 Edan Higgins       | ORD010          | 2019-05-10 | Super warm socks        | Sainsburys    |        5
(76 rows)

12. Retrieve the names of all customers who bought a product from a supplier based in China.

SELECT * FROM customers
JOIN orders
ON customer_id = customers.id
JOIN order_items
ON orders.id = order_id
WHERE supplier_id = 2; 

 id |     name     |          address           |       city       |    country    | id | order_date | order_reference | customer_id | id | order_id | product_id | supplier_id | quantity 
----+--------------+----------------------------+------------------+---------------+----+------------+-----------------+-------------+----+----------+------------+-------------+----------
  1 | Guy Crawford | 770-2839 Ligula Road       | Paris            | France        |  1 | 2019-06-01 | ORD001          |           1 |  2 |        1 |          4 |           2 |        5
  1 | Guy Crawford | 770-2839 Ligula Road       | Paris            | France        |  1 | 2019-06-01 | ORD001          |           1 |  1 |        1 |          7 |           2 |        1
  1 | Guy Crawford | 770-2839 Ligula Road       | Paris            | France        |  3 | 2019-07-11 | ORD003          |           1 |  6 |        3 |          6 |           2 |        2
  4 | Amber Tran   | 6967 Ac Road               | Villafranca Asti | United States |  6 | 2019-07-05 | ORD006          |           4 | 11 |        6 |          2 |           2 |        1
  4 | Amber Tran   | 6967 Ac Road               | Villafranca Asti | United States |  6 | 2019-07-05 | ORD006          |           4 | 10 |        6 |          5 |           2 |        3
  5 | Edan Higgins | Ap #840-3255 Tincidunt St. | Arles            | United States | 10 | 2019-05-10 | ORD010          |           5 | 18 |       10 |          6 |           2 |        1
(6 rows)

13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.

SELECT customers.name AS "customer name", orders.order_reference AS "order reference", orders.order_date AS "order date", quantity * unit_price AS "order total amount" 
FROM order_items
JOIN orders
ON orders.id = order_id
JOIN customers
ON customer_id = customers.id
JOIN products
ON product_id = products.id
JOIN product_availability
ON product_id = prod_id
ORDER BY quantity * unit_price DESC;

   customer name    | order reference | order date | order total amount 
--------------------+-----------------+------------+--------------------
 Hope Crosby        | ORD004          | 2019-05-24 |                299
 Edan Higgins       | ORD008          | 2019-07-23 |                299
 Hope Crosby        | ORD004          | 2019-05-24 |                249
 Edan Higgins       | ORD008          | 2019-07-23 |                249
 Amber Tran         | ORD007          | 2019-04-05 |                150
 Amber Tran         | ORD007          | 2019-04-05 |                150
 Amber Tran         | ORD007          | 2019-04-05 |                120
 Britanney Kirkland | ORD005          | 2019-05-30 |                 82
 Britanney Kirkland | ORD005          | 2019-05-30 |                 80
 Britanney Kirkland | ORD005          | 2019-05-30 |                 78
 Amber Tran         | ORD007          | 2019-04-05 |                 75
 Edan Higgins       | ORD010          | 2019-05-10 |                 50
 Guy Crawford       | ORD003          | 2019-07-11 |                 50
 Guy Crawford       | ORD001          | 2019-06-01 |                 50
 Guy Crawford       | ORD001          | 2019-06-01 |                 50
 Edan Higgins       | ORD010          | 2019-05-10 |                 50
 Amber Tran         | ORD006          | 2019-07-05 |                 41
 Guy Crawford       | ORD003          | 2019-07-11 |                 40
 Guy Crawford       | ORD001          | 2019-06-01 |                 40
 Guy Crawford       | ORD002          | 2019-07-15 |                 40
 Guy Crawford       | ORD002          | 2019-07-15 |                 40
 Guy Crawford       | ORD003          | 2019-07-11 |                 40
 Guy Crawford       | ORD003          | 2019-07-11 |                 40
 Amber Tran         | ORD006          | 2019-07-05 |                 40
 Edan Higgins       | ORD009          | 2019-07-24 |                 40
 Edan Higgins       | ORD010          | 2019-05-10 |                 40
 Amber Tran         | ORD006          | 2019-07-05 |                 39
 Guy Crawford       | ORD002          | 2019-07-15 |                 32
 Amber Tran         | ORD006          | 2019-07-05 |                 30
 Guy Crawford       | ORD003          | 2019-07-11 |                 30
 Amber Tran         | ORD006          | 2019-07-05 |                 30
 Guy Crawford       | ORD003          | 2019-07-11 |                 30
 Edan Higgins       | ORD009          | 2019-07-24 |                 30
 Edan Higgins       | ORD009          | 2019-07-24 |                 28
 Guy Crawford       | ORD003          | 2019-07-11 |                 28
 Guy Crawford       | ORD001          | 2019-06-01 |                 25
 Edan Higgins       | ORD010          | 2019-05-10 |                 25
 Amber Tran         | ORD006          | 2019-07-05 |                 24
 Guy Crawford       | ORD001          | 2019-06-01 |                 21
 Edan Higgins       | ORD008          | 2019-07-23 |                 21
 Edan Higgins       | ORD010          | 2019-05-10 |                 20
 Guy Crawford       | ORD001          | 2019-06-01 |                 20
 Guy Crawford       | ORD002          | 2019-07-15 |                 20
 Edan Higgins       | ORD008          | 2019-07-23 |                 20
 Guy Crawford       | ORD001          | 2019-06-01 |                 18
 Edan Higgins       | ORD008          | 2019-07-23 |                 18
 Amber Tran         | ORD006          | 2019-07-05 |                 15
 Amber Tran         | ORD006          | 2019-07-05 |                 15
 Edan Higgins       | ORD010          | 2019-05-10 |                 15
 Edan Higgins       | ORD010          | 2019-05-10 |                 14
 Amber Tran         | ORD006          | 2019-07-05 |                 12
 Amber Tran         | ORD006          | 2019-07-05 |                 12
 Britanney Kirkland | ORD005          | 2019-05-30 |                 10
 Amber Tran         | ORD006          | 2019-07-05 |                 10
 Amber Tran         | ORD006          | 2019-07-05 |                 10
 Guy Crawford       | ORD002          | 2019-07-15 |                 10
 Guy Crawford       | ORD002          | 2019-07-15 |                 10
 Britanney Kirkland | ORD005          | 2019-05-30 |                 10
 Amber Tran         | ORD006          | 2019-07-05 |                  9
(59 rows)



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
SELECT name, address FROM customers
WHERE country 
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

