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

SELECT name, address FROM customers WHERE country='United States';

name | address
--------------+----------------------------
Amber Tran | 6967 Ac Road
Edan Higgins | Ap #840-3255 Tincidunt St.

2. Retrieve all the customers in ascending name sequence

   SELECT \* FROM customers ORDER BY name ASC;

id | name | address | city | country
----+--------------------+-----------------------------+------------------+----------------
4 | Amber Tran | 6967 Ac Road | Villafranca Asti | United States
3 | Britanney Kirkland | P.O. Box 577, 5601 Sem, St. | Little Rock | United Kingdom
5 | Edan Higgins | Ap #840-3255 Tincidunt St. | Arles | United States
1 | Guy Crawford | 770-2839 Ligula Road | Paris | France
2 | Hope Crosby | P.O. Box 276, 4976 Sit Rd. | Steyr | United Kingdom
6 | Quintessa Austin | 597-2737 Nunc Rd. | Saint-Marc | United Kingdom

3. Retrieve all the products whose name contains the word `socks`

SELECT product_name FROM products WHERE product_name LIKE '%socks%';

## product_name

Super warm socks

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

SELECT prod_id, products.product_name, unit_price, supp_id
FROM product_availability
INNER JOIN products ON product_availability.prod_id=products.id AND product_availability.unit_price >100;

prod_id | product_name | unit_price | supp_id
---------+----------------+------------+---------
1 | Mobile Phone X | 249 | 4
1 | Mobile Phone X | 299 | 1

5. Retrieve the 5 most expensive products

SELECT prod_id, products.product_name, unit_price, supp_id
FROM product_availability
INNER JOIN products ON product_availability.prod_id=products.id
ORDER BY unit_price DESC limit 5;

prod_id | product_name | unit_price | supp_id
---------+-----------------+------------+---------
1 | Mobile Phone X | 299 | 1
1 | Mobile Phone X | 249 | 4
2 | Javascript Book | 41 | 2
2 | Javascript Book | 40 | 1
2 | Javascript Book | 39 | 3

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name
FROM products
INNER JOIN product_availability ON products.id=product_availability.prod_id
INNER JOIN suppliers ON suppliers.id=product_availability.supp_id;

      product_name       | unit_price | supplier_name

-------------------------+------------+---------------
Mobile Phone X | 249 | Sainsburys
Mobile Phone X | 299 | Amazon
Javascript Book | 41 | Taobao
Javascript Book | 39 | Argos
Javascript Book | 40 | Amazon
Le Petit Prince | 10 | Sainsburys
Le Petit Prince | 10 | Amazon
Super warm socks | 10 | Sainsburys
Super warm socks | 8 | Argos
Super warm socks | 5 | Taobao
Super warm socks | 10 | Amazon
Coffee Cup | 5 | Sainsburys
Coffee Cup | 4 | Argos
Coffee Cup | 4 | Taobao
Coffee Cup | 3 | Amazon
Ball | 20 | Taobao
Ball | 15 | Sainsburys
Ball | 14 | Amazon
Tee Shirt Olympic Games | 21 | Argos
Tee Shirt Olympic Games | 18 | Taobao
Tee Shirt Olympic Games | 20 | Amazon

7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

SELECT DISTINCT products.product_name, suppliers.supplier_name
FROM orders
INNER JOIN order_items ON orders.id= order_items.order_id
INNER JOIN suppliers ON suppliers.id= order_items.supplier_id AND suppliers.country='United Kingdom'
INNER JOIN product_availability ON suppliers.id=product_availability.supp_id
INNER JOIN products ON products.id=product_availability.prod_id;

      product_name       | supplier_name

-------------------------+---------------
Javascript Book | Argos
Super warm socks | Argos
Tee Shirt Olympic Games | Argos
Super warm socks | Sainsburys
Coffee Cup | Sainsburys
Coffee Cup | Argos
Mobile Phone X | Sainsburys
Le Petit Prince | Sainsburys
Ball | Sainsburys

8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).

SELECT orders.id, order_reference, order_date, sum(order_items.quantity\*product_availability.unit_price) AS total_cost
FROM orders
INNER JOIN order_items ON orders.id= order_items.order_id AND customer_id=1
INNER JOIN product_availability ON product_availability.supp_id= order_items.supplier_id;

id | order_reference | order_date | total_cost
----+-----------------+------------+------------
2 | ORD002 | 2019-07-15 | 249
3 | ORD003 | 2019-07-11 | 82
1 | ORD001 | 2019-06-01 | 205
1 | ORD001 | 2019-06-01 | 41
3 | ORD003 | 2019-07-11 | 390
2 | ORD002 | 2019-07-15 | 156
2 | ORD002 | 2019-07-15 | 10
2 | ORD002 | 2019-07-15 | 10
3 | ORD003 | 2019-07-11 | 80
2 | ORD002 | 2019-07-15 | 32
3 | ORD003 | 2019-07-11 | 10
1 | ORD001 | 2019-06-01 | 25
1 | ORD001 | 2019-06-01 | 5
2 | ORD002 | 2019-07-15 | 5
3 | ORD003 | 2019-07-11 | 40
2 | ORD002 | 2019-07-15 | 16
3 | ORD003 | 2019-07-11 | 8
1 | ORD001 | 2019-06-01 | 20
1 | ORD001 | 2019-06-01 | 4
3 | ORD003 | 2019-07-11 | 40
1 | ORD001 | 2019-06-01 | 100
1 | ORD001 | 2019-06-01 | 20
2 | ORD002 | 2019-07-15 | 15
3 | ORD003 | 2019-07-11 | 210
2 | ORD002 | 2019-07-15 | 84
3 | ORD003 | 2019-07-11 | 36
1 | ORD001 | 2019-06-01 | 90
1 | ORD001 | 2019-06-01 | 18

We can group by order id(or by order_refrence)
SELECT orders.id, order_reference, order_date, sum(order_items.quantity\*product_availability.unit_price) AS total_cost
FROM orders
INNER JOIN order_items ON orders.id= order_items.order_id AND customer_id=1
INNER JOIN product_availability ON product_availability.supp_id= order_items.supplier_id
GROUP BY orders.id;

id | order_reference | order_date | total_cost
----+-----------------+------------+------------
1 | ORD001 | 2019-06-01 | 528
3 | ORD003 | 2019-07-11 | 896
2 | ORD002 | 2019-07-15 | 577

9. Retrieve all orders, including order items, from customer named `Hope Crosby`

SELECT orders.id, orders.customer_id, order_items.product_id, order_items.quantity
FROM orders
JOIN customers ON orders.customer_id=customers.id AND customers.name='Hope Crosby'
JOIN order_items ON order_items.order_id=orders.id
JOIN products ON products.id=order_items.product_id;

id | customer_id | product_id | quantity
----+-------------+------------+----------
4 | 2 | 1 | 1

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

SELECT products.product_name, product_availability.unit_price, order_items.quantity
FROM orders
INNER JOIN order_items ON order_items.order_id=orders.id AND order_reference='ORD006'
INNER JOIN products ON order_items.product_id=products.id
INNER JOIN product_availability ON order_items.supplier_id=product_availability.supp_id;

product_name | unit_price | quantity
------------------+------------+----------
Super warm socks | 249 | 3
Le Petit Prince | 249 | 1
Javascript Book | 41 | 1
Coffee Cup | 41 | 3
Super warm socks | 10 | 3
Le Petit Prince | 10 | 1
Super warm socks | 10 | 3
Le Petit Prince | 10 | 1
Javascript Book | 5 | 1
Coffee Cup | 5 | 3
Super warm socks | 5 | 3
Le Petit Prince | 5 | 1
Javascript Book | 4 | 1
Coffee Cup | 4 | 3
Javascript Book | 20 | 1
Coffee Cup | 20 | 3
Super warm socks | 15 | 3
Le Petit Prince | 15 | 1
Javascript Book | 18 | 1
Coffee Cup | 18 | 3

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

SELECT customers.name, orders.order_reference, orders.order_date, products.product_name, suppliers.supplier_name, order_items.quantity
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN products ON order_items.product_id = products.id
INNER JOIN suppliers ON order_items.supplier_id = suppliers.id;

        name        | order_reference | order_date |      product_name       | supplier_name | quantity

--------------------+-----------------+------------+-------------------------+---------------+----------
Guy Crawford | ORD001 | 2019-06-01 | Tee Shirt Olympic Games | Taobao | 1
Guy Crawford | ORD001 | 2019-06-01 | Super warm socks | Taobao | 5
Guy Crawford | ORD002 | 2019-07-15 | Super warm socks | Argos | 4
Guy Crawford | ORD002 | 2019-07-15 | Le Petit Prince | Sainsburys | 1
Guy Crawford | ORD003 | 2019-07-11 | Coffee Cup | Argos | 10
Guy Crawford | ORD003 | 2019-07-11 | Ball | Taobao | 2
Hope Crosby | ORD004 | 2019-05-24 | Mobile Phone X | Amazon | 1
Britanney Kirkland | ORD005 | 2019-05-30 | Javascript Book | Argos | 2
Britanney Kirkland | ORD005 | 2019-05-30 | Le Petit Prince | Amazon | 1
Amber Tran | ORD006 | 2019-07-05 | Coffee Cup | Taobao | 3
Amber Tran | ORD006 | 2019-07-05 | Javascript Book | Taobao | 1
Amber Tran | ORD006 | 2019-07-05 | Le Petit Prince | Sainsburys | 1
Amber Tran | ORD006 | 2019-07-05 | Super warm socks | Sainsburys | 3
Amber Tran | ORD007 | 2019-04-05 | Super warm socks | Argos | 15
Edan Higgins | ORD008 | 2019-07-23 | Tee Shirt Olympic Games | Amazon | 1
Edan Higgins | ORD008 | 2019-07-23 | Mobile Phone X | Sainsburys | 1
Edan Higgins | ORD009 | 2019-07-24 | Ball | Sainsburys | 2
Edan Higgins | ORD010 | 2019-05-10 | Ball | Taobao | 1
Edan Higgins | ORD010 | 2019-05-10 | Super warm socks | Amazon | 5

12. Retrieve the names of all customers who bought a product from a supplier based in China.

SELECT DISTINCT customers.name
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN products ON order_items.product_id = products.id
INNER JOIN suppliers ON order_items.supplier_id = suppliers.id
WHERE suppliers.country = 'China';
name

---

Amber Tran
Edan Higgins
Guy Crawford

13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.

SELECT customers.name, orders.order_reference, orders.order_date, SUM(order_items.quantity \* product_availability.unit_price) AS total
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN product_availability ON order_items.product_id = product_availability.prod_id AND order_items.supplier_id = product_availability.supp_id
GROUP BY customers.name, orders.order_reference, orders.order_date
ORDER BY total DESC;

        name        | order_reference | order_date | total

--------------------+-----------------+------------+-------
Hope Crosby | ORD004 | 2019-05-24 | 299
Edan Higgins | ORD008 | 2019-07-23 | 269
Amber Tran | ORD007 | 2019-04-05 | 120
Amber Tran | ORD006 | 2019-07-05 | 93
Britanney Kirkland | ORD005 | 2019-05-30 | 88
Guy Crawford | ORD003 | 2019-07-11 | 80
Edan Higgins | ORD010 | 2019-05-10 | 70
Guy Crawford | ORD001 | 2019-06-01 | 43
Guy Crawford | ORD002 | 2019-07-15 | 42
Edan Higgins | ORD009 | 2019-07-24 | 30
