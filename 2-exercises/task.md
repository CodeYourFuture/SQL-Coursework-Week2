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

cyf_ecommerce=> select name, address from customers where country='United States';
     name     |          address           
--------------+----------------------------
 Amber Tran   | 6967 Ac Road
 Edan Higgins | Ap #840-3255 Tincidunt St.
(2 rows)

2. Retrieve all the customers in ascending name sequence

cyf_ecommerce=> select * from customers order by name asc;
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

cyf_ecommerce=> select * from products where product_name like '%socks%';
 id |   product_name   
----+------------------
  4 | Super warm socks
(1 row)

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

cyf_ecommerce=> select product_availability.prod_id, products.product_name, product_availability.unit_price, product_availability.supp_id from product_availability
inner join products on products.id = product_availability.prod_id
where product_availability.unit_price > 100;
 prod_id |  product_name  | unit_price | supp_id 
---------+----------------+------------+---------
       1 | Mobile Phone X |        249 |       4
       1 | Mobile Phone X |        299 |       1
(2 rows)

5. Retrieve the 5 most expensive products

cyf_ecommerce=> select products.product_name, product_availability.unit_price from 
products
inner join product_availability on products.id = product_availability.prod_id
order by product_availability.unit_price desc limit 5;
  product_name   | unit_price 
-----------------+------------
 Mobile Phone X  |        299
 Mobile Phone X  |        249
 Javascript Book |         41
 Javascript Book |         40
 Javascript Book |         39
(5 rows)

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

cyf_ecommerce=> select products.product_name, product_availability.unit_price, suppliers.supplier_name 
from products
inner join product_availability on products.id = product_availability.prod_id
inner join suppliers on product_availability.supp_id = suppliers.id;
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

cyf_ecommerce=> select products.product_name, suppliers.supplier_name from products
inner join product_availability on products.id = product_availability.prod_id
inner join suppliers on product_availability.supp_id = suppliers.id
where suppliers.country = 'United Kingdom';
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

cyf_ecommerce=> select order_id, order_reference, order_date, order_items.quantity * product_availability.unit_price AS total 
from orders
inner join order_items on order_items.order_id = orders.id
inner join product_availability on product_availability.prod_id = order_items.product_id
where orders.customer_id = 1;
 order_id | order_reference | order_date | total 
----------+-----------------+------------+-------
        1 | ORD001          | 2019-06-01 |    20
        1 | ORD001          | 2019-06-01 |    18
        1 | ORD001          | 2019-06-01 |    21
        1 | ORD001          | 2019-06-01 |    50
        1 | ORD001          | 2019-06-01 |    25
        1 | ORD001          | 2019-06-01 |    40
        1 | ORD001          | 2019-06-01 |    50
        2 | ORD002          | 2019-07-15 |    40
        2 | ORD002          | 2019-07-15 |    20
        2 | ORD002          | 2019-07-15 |    32
        2 | ORD002          | 2019-07-15 |    40
        2 | ORD002          | 2019-07-15 |    10
        2 | ORD002          | 2019-07-15 |    10
        3 | ORD003          | 2019-07-11 |    30
        3 | ORD003          | 2019-07-11 |    40
        3 | ORD003          | 2019-07-11 |    40
        3 | ORD003          | 2019-07-11 |    50
        3 | ORD003          | 2019-07-11 |    28
        3 | ORD003          | 2019-07-11 |    40
        3 | ORD003          | 2019-07-11 |    30
(20 rows)

9. Retrieve all orders, including order items, from customer named `Hope Crosby`

cyf_ecommerce=> select * 
from orders
inner join order_items on order_items.order_id = orders.id
inner join customers on customers.id = orders.customer_id
where customers.name = 'Hope Crosby';
 id | order_date | order_reference | customer_id | id | order_id | product_id | supplier_id | quantity | id |    name     |          address           | city  |    country     
----+------------+-----------------+-------------+----+----------+------------+-------------+----------+----+-------------+----------------------------+-------+----------------
  4 | 2019-05-24 | ORD004          |           2 |  7 |        4 |          1 |           1 |        1 |  2 | Hope Crosby | P.O. Box 276, 4976 Sit Rd. | Steyr | United Kingdom
(1 row)

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

cyf_ecommerce=> select products.product_name, product_availability.unit_price, order_items.quantity 
from products
inner join order_items on order_items.product_id = products.id
inner join orders on orders.id = order_items.order_id
inner join product_availability on product_availability.prod_id = products.id
where orders.order_reference = 'ORD006';
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

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

cyf_ecommerce=> select distinct customers.name, orders.order_reference, orders.order_date, products.product_name, suppliers.supplier_name, order_items.quantity from orders
inner join customers on customers.id = orders.customer_id
inner join order_items on orders.id = order_items.order_id
inner join product_availability on order_items.product_id = product_availability.prod_id
inner join products on products.id = product_availability.prod_id
inner join suppliers on suppliers.id = product_availability.prod_id;
        name        | order_reference | order_date |   product_name   | supplier_name | quantity 
--------------------+-----------------+------------+------------------+---------------+----------
 Amber Tran         | ORD006          | 2019-07-05 | Javascript Book  | Taobao        |        1
 Amber Tran         | ORD006          | 2019-07-05 | Le Petit Prince  | Argos         |        1
 Amber Tran         | ORD006          | 2019-07-05 | Super warm socks | Sainsburys    |        3
 Amber Tran         | ORD007          | 2019-04-05 | Super warm socks | Sainsburys    |       15
 Britanney Kirkland | ORD005          | 2019-05-30 | Javascript Book  | Taobao        |        2
 Britanney Kirkland | ORD005          | 2019-05-30 | Le Petit Prince  | Argos         |        1
 Edan Higgins       | ORD008          | 2019-07-23 | Mobile Phone X   | Amazon        |        1
 Edan Higgins       | ORD010          | 2019-05-10 | Super warm socks | Sainsburys    |        5
 Guy Crawford       | ORD001          | 2019-06-01 | Super warm socks | Sainsburys    |        5
 Guy Crawford       | ORD002          | 2019-07-15 | Le Petit Prince  | Argos         |        1
 Guy Crawford       | ORD002          | 2019-07-15 | Super warm socks | Sainsburys    |        4
 Hope Crosby        | ORD004          | 2019-05-24 | Mobile Phone X   | Amazon        |        1
(12 rows)

12. Retrieve the names of all customers who bought a product from a supplier based in China.

cyf_ecommerce=> select customers.name 
from customers
inner join suppliers on customers.id=suppliers.id
where suppliers.country='China';
    name     
-------------
 Hope Crosby
(1 row)

13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.

cyf_ecommerce=> select distinct customers.name, orders.order_reference, orders.order_date, order_items.quantity * product_availability.unit_price as order_total_amount from orders
inner join customers on customers.id = orders.customer_id
inner join order_items on orders.id = order_items.order_id
inner join product_availability on order_items.product_id = product_availability.prod_id
inner join products on products.id = product_availability.prod_id
inner join suppliers on suppliers.id = product_availability.prod_id
order by order_total_amount DESC;
        name        | order_reference | order_date | order_total_amount 
--------------------+-----------------+------------+--------------------
 Edan Higgins       | ORD008          | 2019-07-23 |                299
 Hope Crosby        | ORD004          | 2019-05-24 |                299
 Edan Higgins       | ORD008          | 2019-07-23 |                249
 Hope Crosby        | ORD004          | 2019-05-24 |                249
 Amber Tran         | ORD007          | 2019-04-05 |                150
 Amber Tran         | ORD007          | 2019-04-05 |                120
 Britanney Kirkland | ORD005          | 2019-05-30 |                 82
 Britanney Kirkland | ORD005          | 2019-05-30 |                 80
 Britanney Kirkland | ORD005          | 2019-05-30 |                 78
 Amber Tran         | ORD007          | 2019-04-05 |                 75
 Edan Higgins       | ORD010          | 2019-05-10 |                 50
 Guy Crawford       | ORD001          | 2019-06-01 |                 50
 Amber Tran         | ORD006          | 2019-07-05 |                 41
 Amber Tran         | ORD006          | 2019-07-05 |                 40
 Edan Higgins       | ORD010          | 2019-05-10 |                 40
 Guy Crawford       | ORD001          | 2019-06-01 |                 40
 Guy Crawford       | ORD002          | 2019-07-15 |                 40
 Amber Tran         | ORD006          | 2019-07-05 |                 39
 Guy Crawford       | ORD002          | 2019-07-15 |                 32
 Amber Tran         | ORD006          | 2019-07-05 |                 30
 Edan Higgins       | ORD010          | 2019-05-10 |                 25
 Guy Crawford       | ORD001          | 2019-06-01 |                 25
 Amber Tran         | ORD006          | 2019-07-05 |                 24
 Guy Crawford       | ORD002          | 2019-07-15 |                 20
 Amber Tran         | ORD006          | 2019-07-05 |                 15
 Amber Tran         | ORD006          | 2019-07-05 |                 10
 Britanney Kirkland | ORD005          | 2019-05-30 |                 10
 Guy Crawford       | ORD002          | 2019-07-15 |                 10
(28 rows)
