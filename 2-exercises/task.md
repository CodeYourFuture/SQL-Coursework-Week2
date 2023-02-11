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

SELECT \* FROM customers WHERE country ='United States';

id | name | address | city | country
----+--------------+----------------------------+------------------+---------------
4 | Amber Tran | 6967 Ac Road | Villafranca Asti | United States
5 | Edan Higgins | Ap #840-3255 Tincidunt St. | Arles | United States

2. Retrieve all the customers in ascending name sequence

SELECT \* FROM customers ORDER BY name;
id | name | address | city | country
----+--------------------+-----------------------------+------------------+----------------
4 | Amber Tran | 6967 Ac Road | Villafranca Asti | United States
3 | Britanney Kirkland | P.O. Box 577, 5601 Sem, St. | Little Rock | United Kingdom
5 | Edan Higgins | Ap #840-3255 Tincidunt St. | Arles | United States
1 | Guy Crawford | 770-2839 Ligula Road | Paris | France
2 | Hope Crosby | P.O. Box 276, 4976 Sit Rd. | Steyr | United Kingdom
6 | Quintessa Austin | 597-2737 Nunc Rd. | Saint-Marc | United Kingdom

3. Retrieve all the products whose name contains the word `socks`

SELECT \* FROM products WHERE product_name ILIKE '%socks%';
id | product_name
----+------------------
4 | Super warm socks
(1 row)

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

SELECT products.id,products.product_name, product_availability.supp_id,product_availability.unit_price FROM products
cyf_ecommerce-# INNER JOIN product_availability ON product_availability.prod_id=products.id WHERE product_availability.unit_price >100;
id | product_name | supp_id | unit_price
----+----------------+---------+------------
1 | Mobile Phone X | 4 | 249
1 | Mobile Phone X | 1 | 299
(2 rows)

5. Retrieve the 5 most expensive products

SELECT products.product_name, product_availability.unit_price FROM products
INNER JOIN product_availability ON product_availability.prod_id=products.id
ORDER BY unit_price DESC LIMIT 5;

product_name | unit_price
-----------------+------------
Mobile Phone X | 299
Mobile Phone X | 249
Javascript Book | 41
Javascript Book | 40
Javascript Book | 39
(5 rows)

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

SELECT products.product_name,product_availability.unit_price, suppliers.supplier_name FROM products
INNER JOIN product_availability ON product_availability.prod_id=products.id
INNER JOIN suppliers ON product_availability.supp_id=suppliers.id;

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

SELECT products.product_name,product_availability.unit_price, suppliers.supplier_name, suppliers.country FROM products
INNER JOIN product_availability ON product_availability.prod_id=products.id
INNER JOIN suppliers ON product_availability.supp_id=suppliers.id WHERE suppliers.country='United Kingdom';

      product_name       | unit_price | supplier_name |    country
-------------------------+------------+---------------+----------------
 Javascript Book         |         39 | Argos         | United Kingdom
 Super warm socks        |          8 | Argos         | United Kingdom
 Coffee Cup              |          4 | Argos         | United Kingdom
 Tee Shirt Olympic Games |         21 | Argos         | United Kingdom
 Mobile Phone X          |        249 | Sainsburys    | United Kingdom
 Le Petit Prince         |         10 | Sainsburys    | United Kingdom
 Super warm socks        |         10 | Sainsburys    | United Kingdom
 Coffee Cup              |          5 | Sainsburys    | United Kingdom
 Ball                    |         15 | Sainsburys    | United Kingdom
(9 rows)

8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).


SELECT orders.customer_id, order_items.order_id,  orders.order_reference, orders.order_date, order_items.quantity*product_availability.unit_price as "Total Cost" FROM order_items
INNER JOIN orders ON order_items.order_id=orders.id
INNER JOIN product_availability ON product_availability.prod_id=order_items.product_id WHERE orders.customer_id=1;

 customer_id | order_id | order_reference | order_date | Total Cost
-------------+----------+-----------------+------------+------------
           1 |        1 | ORD001          | 2019-06-01 |         20
           1 |        1 | ORD001          | 2019-06-01 |         18
           1 |        1 | ORD001          | 2019-06-01 |         21
           1 |        1 | ORD001          | 2019-06-01 |         50
           1 |        1 | ORD001          | 2019-06-01 |         25
           1 |        1 | ORD001          | 2019-06-01 |         40
           1 |        1 | ORD001          | 2019-06-01 |         50
           1 |        2 | ORD002          | 2019-07-15 |         40
           1 |        2 | ORD002          | 2019-07-15 |         20
           1 |        2 | ORD002          | 2019-07-15 |         32
           1 |        2 | ORD002          | 2019-07-15 |         40
           1 |        2 | ORD002          | 2019-07-15 |         10
           1 |        2 | ORD002          | 2019-07-15 |         10
           1 |        3 | ORD003          | 2019-07-11 |         30
           1 |        3 | ORD003          | 2019-07-11 |         40
           1 |        3 | ORD003          | 2019-07-11 |         40
           1 |        3 | ORD003          | 2019-07-11 |         50
           1 |        3 | ORD003          | 2019-07-11 |         28
           1 |        3 | ORD003          | 2019-07-11 |         40
           1 |        3 | ORD003          | 2019-07-11 |         30
(20 rows)


9. Retrieve all orders, including order items, from customer named `Hope Crosby`

SELECT * from orders
INNER JOIN customers ON customers.id=orders.customer_id AND customers.name = 'Hope Crosby';


 id | order_date | order_reference | customer_id | id |    name     |          address           | city  |    country
----+------------+-----------------+-------------+----+-------------+----------------------------+-------+----------------
  4 | 2019-05-24 | ORD004          |           2 |  2 | Hope Crosby | P.O. Box 276, 4976 Sit Rd. | Steyr | United Kingdom
(1 row)



10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

-->>> I just liked to add total column , and order by the total price the bigger amount on top!

SELECT products.product_name, orders.order_reference, product_availability.unit_price,order_items.quantity, order_items.quantity * product_availability.unit_price AS "Total" FROM products
INNER JOIN product_availability On product_availability.prod_id=products.id
INNER JOIN order_items ON product_availability.prod_id=order_items.product_id
INNER JOIN orders ON order_items.order_id=orders.id WHERE orders.order_reference = 'ORD006' ORDER BY "Total" DESC;



   product_name   | order_reference | unit_price | quantity | Total
------------------+-----------------+------------+----------+-------
 Javascript Book  | ORD006          |         41 |        1 |    41
 Javascript Book  | ORD006          |         40 |        1 |    40
 Javascript Book  | ORD006          |         39 |        1 |    39
 Super warm socks | ORD006          |         10 |        3 |    30
 Super warm socks | ORD006          |         10 |        3 |    30
 Super warm socks | ORD006          |          8 |        3 |    24
 Super warm socks | ORD006          |          5 |        3 |    15
 Coffee Cup       | ORD006          |          5 |        3 |    15
 Coffee Cup       | ORD006          |          4 |        3 |    12
 Coffee Cup       | ORD006          |          4 |        3 |    12
 Le Petit Prince  | ORD006          |         10 |        1 |    10
 Le Petit Prince  | ORD006          |         10 |        1 |    10
 Coffee Cup       | ORD006          |          3 |        3 |     9
(13 rows)

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

12. Retrieve the names of all customers who bought a product from a supplier based in China.

13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.
