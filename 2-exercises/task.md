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

8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price).
9. Retrieve all orders, including order items, from customer named `Hope Crosby`
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
12. Retrieve the names of all customers who bought a product from a supplier based in China.
13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.

