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
SELECT name, address FROM customers WHERE country = 'United States';
     name     |          address
--------------+----------------------------
 Amber Tran   | 6967 Ac Road
 Edan Higgins | Ap #840-3255 Tincidunt St.
(2 rows)
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
SELECT * FROM products WHERE product_name like '%socks%';
 id |   product_name   
----+------------------
  4 | Super warm socks
(1 row)
```
4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.
```sql
SELECT p.id, p.product_name, pa.unit_price, pa.supp_id  FROM products p JOIN product_availability pa ON (p.id = pa.prod_id)  WHERE pa.unit_price > 100;
 id |  product_name  | unit_price | supp_id 
----+----------------+------------+---------
  1 | Mobile Phone X |        249 |       4
  1 | Mobile Phone X |        299 |       1
(2 rows)
```
5. Retrieve the 5 most expensive products
```sql
SELECT * FROM product_availability ORDER BY unit_price DESC limit 5;
 prod_id | supp_id | unit_price 
---------+---------+------------
       1 |       1 |        299
       1 |       4 |        249
       2 |       2 |         41
       2 |       1 |         40
       2 |       3 |         39
(5 rows)
```

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
```sql
SELECT product_name, unit_price, supplier_name FROM products JOIN product_availability ON (products.id = product_availability.prod_id) JOIN suppliers ON (product_availability.supp_id = suppliers.id);
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
SELECT p.product_name, s.supplier_name FROM products p JOIN product_availability pa ON (p.id = pa.prod_id) JOIN suppliers s ON (s.id = pa.supp_id) WHERE s.country = 'United Kingdom';    
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
```
8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price).
```sql
SELECT o.customer_id, o.id AS "Oder ID", o.order_reference, o.order_date, oi.quantity*pa.unit_price AS "total cost" FROM product_availability pa JOIN order_items oi ON (pa.prod_id = oi.product_id) JOIN orders o ON (o.id = oi.order_id) WHERE o.customer_id = 1;
 customer_id | Oder ID | order_reference | order_date | total cost 
-------------+---------+-----------------+------------+------------
           1 |       1 | ORD001          | 2019-06-01 |         20 
           1 |       1 | ORD001          | 2019-06-01 |         18 
           1 |       1 | ORD001          | 2019-06-01 |         21 
           1 |       1 | ORD001          | 2019-06-01 |         50 
           1 |       1 | ORD001          | 2019-06-01 |         25 
           1 |       1 | ORD001          | 2019-06-01 |         40 
           1 |       1 | ORD001          | 2019-06-01 |         50 
           1 |       2 | ORD002          | 2019-07-15 |         40 
           1 |       2 | ORD002          | 2019-07-15 |         20 
           1 |       2 | ORD002          | 2019-07-15 |         32 
           1 |       2 | ORD002          | 2019-07-15 |         40 
           1 |       2 | ORD002          | 2019-07-15 |         10 
           1 |       2 | ORD002          | 2019-07-15 |         10 
           1 |       3 | ORD003          | 2019-07-11 |         30 
           1 |       3 | ORD003          | 2019-07-11 |         40 
           1 |       3 | ORD003          | 2019-07-11 |         40
           1 |       3 | ORD003          | 2019-07-11 |         50
           1 |       3 | ORD003          | 2019-07-11 |         28
           1 |       3 | ORD003          | 2019-07-11 |         40
           1 |       3 | ORD003          | 2019-07-11 |         30
(20 rows)

```
9. Retrieve all orders, including order items, from customer named `Hope Crosby`
```sql
SELECT c.name, o.id, oi.id, oi.quantity, c.address, c.city, c.country FROM customers c JOIN orders o ON (c.id = o.customer_id) JOIN order_items oi ON (o.id = oi.order_id) WHERE c.name = 'Hope Crosby';
    name     | id | id | quantity |          address           | city  |    country     
-------------+----+----+----------+----------------------------+-------+----------------
 Hope Crosby |  4 |  7 |        1 | P.O. Box 276, 4976 Sit Rd. | Steyr | United Kingdom 
(1 row)
```
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
```sql
SELECT p.product_name, pa.unit_price, oi.quantity FROM products p JOIN product_availability pa ON (p.id = pa.prod_id) JOIN order_items oi ON (oi.product_id = pa.prod_id) JOIN orders o ON (o.id = oi.order_id)  WHERE o.order_reference = 'ORD006';
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
SELECT c.name, o.order_reference, o.order_date, p.product_name, s.supplier_name, oi.quantity FROM customers c JOIN orders o ON (c.id = o.customer_id) JOIN order_items oi ON (o.id = oi.order_id) JOIN suppliers s ON (oi.supplier_id = s.id) JOIN product_availability pa ON (s.id = pa.supp_id) JOIN products p ON (p.id = pa.prod_id);
```
12. Retrieve the names of all customers who bought a product from a supplier based in China.
```sql
SELECT c.name FROM customers c JOIN orders o ON (c.id = o.customer_id) JOIN order_items oi ON (o.id = oi.order_id) JOIN suppliers s ON (oi.supplier_id = s.id) WHERE s.country = 'China'; 
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
SELECT c.name, o.order_reference, o.order_date, oi.quantity * pa.unit_price AS TOTAL_AMOUNT FROM customers c JOIN orders o ON ( c.id = o.customer_id) JOIN order_items oi ON (o.id = oi.order_id) JOIN product_availability pa ON (oi.product_id = pa.prod_id) ORDER BY TOTAL_AMOUNT DESC;
```
