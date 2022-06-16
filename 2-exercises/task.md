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
select name,address from customers where country ='United States';
     name     |          address           
--------------+----------------------------
 Amber Tran   | 6967 Ac Road
 Edan Higgins | Ap #840-3255 Tincidunt St.
(2 rows)

2. Retrieve all the customers in ascending name sequence

select * from customers order by name asc;
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
select * from products where product_name= 'socks';
 id | product_name 
----+--------------
(0 rows)

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

select products.id, products.product_name, product_availability.unit_price from products INNER JOIN 
product_availability ON products.id = product_availability.prod_id where unit_price > 100;
 id |  product_name  | unit_price 
----+----------------+------------
  1 | Mobile Phone X |        249
  1 | Mobile Phone X |        299
(2 rows)

5. Retrieve the 5 most expensive products

select products.id, products.product_name, product_availability.unit_price from products INNER JOIN 
product_availability ON products.id = product_availability.prod_id  order by unit_price desc limit 5;
 id |  product_name   | unit_price 
----+-----------------+------------
  1 | Mobile Phone X  |        299
  1 | Mobile Phone X  |        249
  2 | Javascript Book |         41
  2 | Javascript Book |         40
  2 | Javascript Book |         39
(5 rows)

 

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

select products.product_name, product_availability.unit_price,suppliers.supplier_name from
products INNER JOIN product_availability ON products.id = product_availability.prod_id
INNER JOIN suppliers ON suppliers.id =  product_availability.supp_id;
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

select products.product_name,suppliers.supplier_name from
products INNER JOIN product_availability ON products.id = product_availability.prod_id
INNER JOIN suppliers ON suppliers.id =  product_availability.supp_id where country = 'United Kingdom';
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

select o.id, o.order_reference, o.order_date, oi.quantity * product_availability.unit_price 
AS total_cost
FROM orders AS o
INNER JOIN order_items AS oi ON o.id = oi.order_id
INNER JOIN product_availability 
ON product_availability.prod_id = oi.product_id 
AND product_availability.supp_id = oi.supplier_id
where customer_id =1 ;
 id | order_reference | order_date | total_cost 
----+-----------------+------------+------------
  1 | ORD001          | 2019-06-01 |         18
  1 | ORD001          | 2019-06-01 |         25
  2 | ORD002          | 2019-07-15 |         32
  2 | ORD002          | 2019-07-15 |         10
  3 | ORD003          | 2019-07-11 |         40
  3 | ORD003          | 2019-07-11 |         40
(6 rows)

<!-- you can also group them by order id -->
select o.id, o.order_reference, o.order_date, SUM(oi.quantity * product_availability.unit_price)
AS total_cost
FROM orders AS o
INNER JOIN order_items AS oi ON o.id = oi.order_id
INNER JOIN product_availability 
ON product_availability.prod_id = oi.product_id 
and  product_availability.supp_id = oi.supplier_id
where customer_id =1 
GROUP BY o.id;
 id | order_reference | order_date | total_cost 
----+-----------------+------------+------------
  1 | ORD001          | 2019-06-01 |         43
  2 | ORD002          | 2019-07-15 |         42
  3 | ORD003          | 2019-07-11 |         80
(3 rows)

9. Retrieve all orders, including order items, from customer named `Hope Crosby`

SELECT o.id, o.order_reference, o.order_date,customers.name
FROM orders AS o
INNER JOIN customers ON customers.id = o.customer_id
INNER JOIN order_items AS oi
ON oi.id = oi.order_id 
WHERE customers.name ='Hope Crosby'; 
 id | order_reference | order_date |    name     
----+-----------------+------------+-------------
  4 | ORD004          | 2019-05-24 | Hope Crosby
(1 row)
 


10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.


SELECT products.product_name, product_availability.unit_price,order_items.quantity
FROM products
INNER JOIN product_availability
ON products.id = product_availability.prod_id
INNER JOIN order_items 
ON product_availability.prod_id = order_items.product_id 
AND product_availability.supp_id = order_items.supplier_id
INNER JOIN orders
ON orders.id = order_items.order_id
WHERE order_reference = 'ORD006';
   product_name   | unit_price | quantity 
------------------+------------+----------
 Coffee Cup       |          4 |        3
 Javascript Book  |         41 |        1
 Le Petit Prince  |         10 |        1
 Super warm socks |         10 |        3
(4 rows)



11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

SELECT customers.name, orders.order_reference, orders.order_date, products.product_name,suppliers.supplier_name, order_items.quantity
FROM customers
INNER JOIN orders ON customers.id = orders.customer_id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN suppliers ON suppliers.id = order_items.supplier_id
INNER JOIN products ON products.id = order_items.product_id;
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
SELECT customers.name FROM customers
INNER JOIN orders 
ON customers.id = orders.customer_id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN suppliers ON suppliers.id = order_items.supplier_id
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


13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.

SELECT customers.name, o.id, o.order_reference, o.order_date, oi.quantity * product_availability.unit_price
AS total_cost
FROM customers 
INNER JOIN orders AS o ON customers.id = o.customer_id
INNER JOIN order_items AS oi ON o.id = oi.order_id
INNER JOIN product_availability 
ON product_availability.prod_id = oi.product_id 
AND  product_availability.supp_id = oi.supplier_id
ORDER BY total_cost DESC;
        name        | id | order_reference | order_date | total_cost 
--------------------+----+-----------------+------------+------------
 Hope Crosby        |  4 | ORD004          | 2019-05-24 |        299
 Edan Higgins       |  8 | ORD008          | 2019-07-23 |        249
 Amber Tran         |  7 | ORD007          | 2019-04-05 |        120
 Britanney Kirkland |  5 | ORD005          | 2019-05-30 |         78
 Edan Higgins       | 10 | ORD010          | 2019-05-10 |         50
 Amber Tran         |  6 | ORD006          | 2019-07-05 |         41
 Guy Crawford       |  3 | ORD003          | 2019-07-11 |         40
 Guy Crawford       |  3 | ORD003          | 2019-07-11 |         40
 Guy Crawford       |  2 | ORD002          | 2019-07-15 |         32
 Edan Higgins       |  9 | ORD009          | 2019-07-24 |         30
 Amber Tran         |  6 | ORD006          | 2019-07-05 |         30
 Guy Crawford       |  1 | ORD001          | 2019-06-01 |         25
 Edan Higgins       |  8 | ORD008          | 2019-07-23 |         20
 Edan Higgins       | 10 | ORD010          | 2019-05-10 |         20
 Guy Crawford       |  1 | ORD001          | 2019-06-01 |         18
 Amber Tran         |  6 | ORD006          | 2019-07-05 |         12
 Amber Tran         |  6 | ORD006          | 2019-07-05 |         10
 Britanney Kirkland |  5 | ORD005          | 2019-05-30 |         10
 Guy Crawford       |  2 | ORD002          | 2019-07-15 |         10
(19 rows)


