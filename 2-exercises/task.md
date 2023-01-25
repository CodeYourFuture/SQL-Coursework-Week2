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

 select name, address from customers where country = 'United States';
     name     |          address           
--------------+----------------------------
 Amber Tran   | 6967 Ac Road
 Edan Higgins | Ap #840-3255 Tincidunt St.
(2 rows)

2. Retrieve all the customers in ascending name sequence

select * from customers ORDER BY name;
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

select * from products where  product_name like '%socks%';
 id |   product_name   
----+------------------
  4 | Super warm socks
(1 row)

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

select p.product_name, p.id, a.unit_price, a.prod_id from product_availability a join products p on a.prod_id = p.id where unit_price>100; 
  product_name  | id | unit_price | prod_id 
----------------+----+------------+---------
 Mobile Phone X |  1 |        249 |       1
 Mobile Phone X |  1 |        299 |       1
(2 rows)



5. Retrieve the 5 most expensive products

SELECT * from product_availability ORDER BY unit_price limit 5;
 prod_id | supp_id | unit_price 
---------+---------+------------
       5 |       1 |          3
       5 |       3 |          4
       5 |       2 |          4
       4 |       2 |          5
       5 |       4 |          5
(5 rows)

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

SELECT p.product_name,a.unit_price,s.supplier_name FROM products AS p JOIN product_availability AS a ON p.id=a.prod_id JOIN suppliers AS s ON s.id=a.supp_id;

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
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

SELECT p.product_name,s.supplier_name FROM products AS p JOIN product_availability AS a ON p.id=a.prod_id JOIN suppliers AS s ON s.id=a.supp_id WHERE s.country='United Kingdom';

  product_name       | supplier_name 
-------------------------+---------------
 Javascript Book         | Argos
 Super warm socks        | Argos
 Coffee Cup              | Argos
 Tee Shirt Olympic Games | Argos
 Mobile Phone X          | Sainsburys
 Le Petit Prince         | Sainsburys
 Super warm socks        | Sainsburys
 Coffee Cup              | Sainsburys
 Ball                    | Sainsburys
(9 rows)

8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price).

SELECT o.id,o.order_date,o.order_reference,(oi.quantity*pa.unit_price) AS total_cost FROM orders AS o JOIN order_items AS oi ON o.id=oi.order_id JOIN product_availability AS pa ON pa.prod_id=oi.product_id WHERE o.customer_id=1;

id | order_date | order_reference | total_cost 
----+------------+-----------------+------------
  1 | 2019-06-01 | ORD001          |         20
  1 | 2019-06-01 | ORD001          |         18
  1 | 2019-06-01 | ORD001          |         21
  1 | 2019-06-01 | ORD001          |         50
  1 | 2019-06-01 | ORD001          |         25
  1 | 2019-06-01 | ORD001          |         40
  1 | 2019-06-01 | ORD001          |         50
  2 | 2019-07-15 | ORD002          |         40
  2 | 2019-07-15 | ORD002          |         20
  2 | 2019-07-15 | ORD002          |         32
  2 | 2019-07-15 | ORD002          |         40
  2 | 2019-07-15 | ORD002          |         10
  2 | 2019-07-15 | ORD002          |         10
  3 | 2019-07-11 | ORD003          |         30
  3 | 2019-07-11 | ORD003          |         40
  3 | 2019-07-11 | ORD003          |         40
  3 | 2019-07-11 | ORD003          |         50
  3 | 2019-07-11 | ORD003          |         28
  3 | 2019-07-11 | ORD003          |         40
  3 | 2019-07-11 | ORD003          |         30
(20 rows)
9. Retrieve all orders, including order items, from customer named `Hope Crosby`

select o.*, oi.*,c.name FROM orders AS o JOIN order_items AS oi ON o.id=oi.order_id JOIN product_availability AS pa ON pa.prod_id=oi.product_id JOIN customers as c ON c.id=o.customer_id WHERE c.name='Hope Crosby'; 

id | order_date | order_reference | customer_id | id | order_id | product_id | supplier_id | quantity |    name     
----+------------+-----------------+-------------+----+----------+------------+-------------+----------+-------------
  4 | 2019-05-24 | ORD004          |           2 |  7 |        4 |          1 |           1 |        1 | Hope Crosby
  4 | 2019-05-24 | ORD004          |           2 |  7 |        4 |          1 |           1 |        1 | Hope Crosby
(2 rows)
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
SELECT p.product_name,pa.unit_price,oi.quantity FROM products AS p JOIN order_items AS oi ON p.id=oi.product_id JOIN product_availability AS pa ON oi.product_id=pa.prod_id AND oi.supplier_id=pa.supp_id JOIN orders AS o ON o.id=oi.order_id WHERE o.order_reference = 'ORD006';

 product_name   | unit_price | quantity 
------------------+------------+----------
 Coffee Cup       |          4 |        3
 Javascript Book  |         41 |        1
 Le Petit Prince  |         10 |        1
 Super warm socks |         10 |        3
(4 rows)
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
SELECT c.name, o.order_reference, o.order_date, p.product_name, s.supplier_name, oi.quantity 
 FROM customers AS c
 JOIN orders AS o ON c.id = o.customer_id
 JOIN order_items AS oi ON o.id = oi.order_id
 JOIN products AS p ON oi.product_id = p.id
 JOIN suppliers AS s ON oi.supplier_id = s.id
 JOIN product_availability AS pa ON oi.product_id = pa.prod_id AND oi.supplier_id = pa.supp_id;

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

12. Retrieve the names of all customers who bought a product from a supplier based in China.

SELECT DISTINCT c.name
FROM customers AS c 
JOIN orders AS o ON c.id = o.customer_id
JOIN order_items AS oi ON o.id = oi.order_id
JOIN product_availability AS pa ON oi.product_id = pa.prod_id AND oi.supplier_id = pa.supp_id 
JOIN suppliers AS s ON pa.supp_id = s.id 
WHERE s.country = 'China';
     name     
--------------
 Amber Tran
 Edan Higgins
 Guy Crawford
(3 rows)
13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.

SELECT c.name as customer_name, o.order_reference, o.order_date, sum(pa.unit_price * oi.quantity) AS total_amount 
FROM customers AS c
JOIN orders AS o ON c.id = o.customer_id
JOIN order_items AS oi ON o.id = oi.order_id
JOIN product_availability AS pa ON oi.product_id = pa.prod_id AND oi.supplier_id = pa.supp_id
GROUP BY customer_name, o.order_reference, o.order_date ORDER BY total_amount DESC;

customer_name    | order_reference | order_date | total_amount 
--------------------+-----------------+------------+--------------
 Hope Crosby        | ORD004          | 2019-05-24 |          299
 Edan Higgins       | ORD008          | 2019-07-23 |          269
 Amber Tran         | ORD007          | 2019-04-05 |          120
 Amber Tran         | ORD006          | 2019-07-05 |           93
 Britanney Kirkland | ORD005          | 2019-05-30 |           88
 Guy Crawford       | ORD003          | 2019-07-11 |           80
 Edan Higgins       | ORD010          | 2019-05-10 |           70
 Guy Crawford       | ORD001          | 2019-06-01 |           43
 Guy Crawford       | ORD002          | 2019-07-15 |           42
 Edan Higgins       | ORD009          | 2019-07-24 |           30
(10 rows)

