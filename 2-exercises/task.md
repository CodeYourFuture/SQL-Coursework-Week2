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

SELECT name, address FROM customers
WHERE country = 'United States';
returns
     name     |          address
--------------+----------------------------
 Amber Tran   | 6967 Ac Road
 Edan Higgins | Ap #840-3255 Tincidunt St.
(2 rows)

2. Retrieve all the customers in ascending name sequence
SELECT name, address FROM customers
ORDER BY name ASC;
returns
        name        |           address
--------------------+-----------------------------
 Amber Tran         | 6967 Ac Road
 Britanney Kirkland | P.O. Box 577, 5601 Sem, St.
 Edan Higgins       | Ap #840-3255 Tincidunt St.
 Guy Crawford       | 770-2839 Ligula Road
 Hope Crosby        | P.O. Box 276, 4976 Sit Rd.
 Quintessa Austin   | 597-2737 Nunc Rd.
(6 rows)

3. Retrieve all the products whose name contains the word `socks`
SELECT product_name FROM products
WHERE product_name LIKE '%socks%';
returns 
   product_name
------------------
 Super warm socks
(1 row)


4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.
SELECT products.id,products.product_name, product_availability.unit_price,suppliers.id
FROM products 
INNER JOIN product_availability 
ON  products.id = product_availability.prod_id
INNER JOIN suppliers 
ON suppliers.id =  product_availability.supp_id
WHERE unit_price > 100;
returns
 id |  product_name  | unit_price | id
----+----------------+------------+----
  1 | Mobile Phone X |        249 |  4
  1 | Mobile Phone X |        299 |  1
(2 rows)

5. Retrieve the 5 most expensive products
SELECT  product_name
FROM products 
INNER JOIN product_availability 
ON products.id = product_availability.prod_id
ORDER BY unit_price DESC
LIMIT 5;
returns
  product_name
-----------------
 Mobile Phone X
 Mobile Phone X
 Javascript Book
 Javascript Book
 Javascript Book
(5 rows)

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
SELECT products.product_name, unit_price, suppliers.supplier_name FROM product_availability 
INNER JOIN products ON products.id = 
product_availability.prod_id 
INNER JOIN suppliers ON suppliers.id = 
product_availability.supp_id
returns
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
SELECT products.product_name, suppliers.supplier_name FROM product_availability INNER JOIN suppliers ON suppliers.id = product_availability.supp_id INNER JOIN products ON products.id = product_availability.prod_id WHERE suppliers.country = 'United Kingdom';
returns
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
SELECT orders.id, orders.order_reference, orders.order_date, (quantity * product_availability.unit_price) AS "total cost" FROM order_items INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN product_availability ON product_availability.prod_id = order_items.product_id WHERE orders.customer_id = 1;
returns
 id | order_reference | order_date | total cost
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

9. Retrieve all orders, including order items, from customer named `Hope Crosby`
SELECT * 
FROM orders 
INNER JOIN order_items ON orders.id = order_items.order_id 
RIGHT JOIN customers ON customers.id = orders.customer_id 
WHERE customers.name = 'Hope Crosby';
returns
 id | order_date | order_reference | customer_id | id | order_id | product_id | supplier_id | quantity | id |    name     |          address           | city  |    country
----+------------+-----------------+-------------+----+----------+------------
  4 | 2019-05-24 | ORD004          |           2 |  7 |        4 |          1 |           1 |        1 |  2 | Hope Crosby | P.O. Box 276, 4976 Sit Rd. | Steyr | United Kingdom
(1 row)

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
SELECT product_name, unit_price, quantity                       
FROM orders
JOIN order_items
ON order_reference = 'ORD006' AND orders.id = order_id
JOIN product_availability
ON product_id = prod_id AND supplier_id = supp_id
JOIN products
ON product_id = products.id;
returns
   product_name   | unit_price | quantity
------------------+------------+----------
 Coffee Cup       |          4 |        3
 Javascript Book  |         41 |        1
 Le Petit Prince  |         10 |        1
 Super warm socks |         10 |        3
(4 rows)

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

12. Retrieve the names of all customers who bought a product from a supplier based in China.
SELECT customers.name FROM customers 
INNER JOIN orders ON customers.id = orders.customer_id 
INNER JOIN order_items ON orders.id = order_items.order_id 
INNER JOIN suppliers ON suppliers.id = order_items.supplier_id 
WHERE suppliers.country = 'China';
returns
     name
--------------
 Guy Crawford
 Guy Crawford
 Guy Crawford
 Amber Tran
 Amber Tran
 Edan Higgins
(6 rows)

13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.

