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
postgres=# select name, address from customers where country='United Kingdom';
        name        |           address           
--------------------+-----------------------------
 Hope Crosby        | P.O. Box 276, 4976 Sit Rd.
 Britanney Kirkland | P.O. Box 577, 5601 Sem, St.
 Quintessa Austin   | 597-2737 Nunc Rd.
(3 rows)


2. Retrieve all the customers in ascending name sequence
select name from customers order by name ASC;
        name        
--------------------
 Amber Tran
 Britanney Kirkland
 Edan Higgins
 Guy Crawford
 Hope Crosby
 Quintessa Austin
(6 rows)


3. Retrieve all the products whose name contains the word `socks`
select product_name from products where product_name like '%socks%';
   product_name   
------------------
 Super warm socks
(1 row)

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.
 select a.id, a.product_name, b.unit_price, b.supp_id from products as a join product_availability as b on a.id=b.prod_id where b.unit_price>100;
 id |  product_name  | unit_price | supp_id 
----+----------------+------------+---------
  1 | Mobile Phone X |        249 |       4
  1 | Mobile Phone X |        299 |       1
(2 rows)


5. Retrieve the 5 most expensive products
SELECT * FROM product_availability ORDER BY unit_price limit 5;
 prod_id | supp_id | unit_price 
---------+---------+------------
       5 |       1 |          3
       5 |       3 |          4
       5 |       2 |          4
       4 |       2 |          5
       5 |       4 |          5


6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price).
9. Retrieve all orders, including order items, from customer named `Hope Crosby`
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
12. Retrieve the names of all customers who bought a product from a supplier based in China.
13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.

