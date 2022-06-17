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

cyf_ecommerce=> SELECT name, address FROM customers 
WHERE country = 'United States';

name | address  
--------------+----------------------------
Amber Tran | 6967 Ac Road
Edan Higgins | Ap #840-3255 Tincidunt St.
(2 rows)

2. Retrieve all the customers in ascending name sequence
   cyf_ecommerce=> SELECT * FROM customers
    ORDER BY name ASC;
   
   id | name | address | city | country  
   ----+--------------------+-----------------------------+------------------+----------------
   4 | Amber Tran | 6967 Ac Road | Villafranca Asti | United States
   3 | Britanney Kirkland | P.O. Box 577, 5601 Sem, St. | Little Rock | United Kingdom
   5 | Edan Higgins | Ap #840-3255 Tincidunt St. | Arles | United States
   1 | Guy Crawford | 770-2839 Ligula Road | Paris | France
   2 | Hope Crosby | P.O. Box 276, 4976 Sit Rd. | Steyr | United Kingdom
   6 | Quintessa Austin | 597-2737 Nunc Rd. | Saint-Marc | United Kingdom
   (6 rows)

3. Retrieve all the products whose name contains the word `socks`
   cyf_ecommerce=>

SELECT * FROM products 
WHERE product_name LIKE '%socks%';

id | product_name  
----+------------------
4 | Super warm socks
(1 row)

4.  Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.
    
    SELECT prod_id, product_name,unit_price, supp_id FROM products
    JOIN product_availability
    ON product_availability.prod_id = products.id
    WHERE product_availability.unit_price > 100;

        prod_id |  product_name  | unit_price | supp_id

    ---------+----------------+------------+---------
    1 | Mobile Phone X | 249 | 4
    1 | Mobile Phone X | 299 | 1
    (2 rows)

5.  Retrieve the 5 most expensive products
    SELECT * FROM product_availability
    INNER JOIN products ON product.id = product.availability.product.id
    WHERE unit_price IN (
    SELECT MAX(unit_price) FROM product_availability DESC LIMIT 5
    );

6.  Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name
FROM product_availability
INNER JOIN products ON products.id = product_availability.prod_id
INNER JOIN suppliers ON suppliers.id = product_availability.supp_id;

     product_name       | unit_price | supplier_name

-------------------------+------------+---------------
Mobile Phone X | 249 | Sainsburys
Mobile Phone X | 299 | Amazon
Javascript Book | 41 | Taobao
Javascript Book | 39 | Argos
:

7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

SELECT products.product_name, suppliers.supplier_name 
FROM product_availability
INNER JOIN products ON products.id = product_availability.prod_id
INNER JOIN suppliers ON suppliers.id = product_availability.supp_id
WHERE suppliers.country = 'United Kingdom';

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

8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).



9. Retrieve all orders, including order items, from customer named `Hope Crosby`

SELECT * FROM orders
 INNER JOIN order_items ON order_items.order_id = orders.id
 WHERE customer_id = (SELECT id FROM customers WHERE name = 'Hope Crosby');

  id | order_date | order_reference | customer_id | id | order_id | product_id | supplier_id | quantity 
----+------------+-----------------+-------------+----+----------+------------+-------------+----------
  4 | 2019-05-24 | ORD004          |           2 |  7 |        4 |          1 |           1 |        1
(1 row)



10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

12. Retrieve the names of all customers who bought a product from a supplier based in China.
SELECT name FROM orders
INNER JOIN customers ON orders.customer_id = customers.id
INNER JOIN order_items ON orders.id = order_items.order_id
INNER JOIN suppliers ON order_items.supplier_id = suppliers.id
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
