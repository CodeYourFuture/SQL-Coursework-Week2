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
    ANS: SELECT 
          name AS "Customer Name",
          address AS "Address" 
          FROM customers 
            WHERE country = 'United States';
2. Retrieve all the customers in ascending name sequence
    ANS: SELECT * 
          FROM customers 
            ORDER BY name;
3. Retrieve all the products whose name contains the word `socks`
    ANS: SELECT * 
          FROM products 
            WHERE product_name LIKE '%socks%';
4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.
    ANS: SELECT 
          pa.prod_id AS "Product ID",
          p.product_name AS "Product Name", 
          pa.unit_price AS "Unit Price", 
          pa.supp_id AS "Supplier ID"
          FROM product_availability pa 
            INNER JOIN products p ON pa.prod_id = p.id
              WHERE pa.unit_price > 100; 
5. Retrieve the 5 most expensive products
    ANS: SELECT 
          pa.prod_id AS "Product ID",
          p.product_name "Product Name",
          pa.unit_price AS "Unit Price",
          pa.supp_id As "Supplier ID"
          FROM product_availability pa
            INNER JOIN products p ON pa.prod_id = p.id
              ORDER BY pa.unit_price DESC
                LIMIT 5;
6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
    ANS: SELECT 
          p.product_name AS "Product Name",
          pa.unit_price AS "Unit Price",
          s.supplier_name AS "Supplier Name"
          FROM product_availability pa
            INNER JOIN products p ON pa.prod_id = p.id 
              INNER JOIN suppliers s ON pa.supp_id = s.id;
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
    ANS: SELECT
          p.product_name AS "Product Name,
          s.supplier_name AS "Supplier Name"
          FROM product_availability pa 
            INNER JOIN products p ON pa.prod_id = p.id 
              INNER JOIN suppliers s ON pa.supp_id = s.id 
                WHERE s.country = 'United Kingdom';
8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price).
    ANS: SELECT
          o.id AS "Order ID",
          o.customer_id AS "Customer ID",
          o.order_reference AS "Order Reference",
          o.order_date AS "Date Ordered",
          TO_CHAR(SUM(oi.quantity*pa.unit_price), 'FM£999,999') AS "Total Cost Per Product" 
          FROM order_items oi 
            INNER JOIN orders o ON oi.order_id = o.id 
              INNER JOIN product_availability pa ON pa.prod_id = o.id 
                WHERE o.customer_id = 1 
                  GROUP BY o.id;
9. Retrieve all orders, including order items, from customer named `Hope Crosby`
    ANS: SELECT
          c.name AS "Customer Name",
          oi.id AS "Order No.",
          oi.order_id AS "Order ID",
          oi.product_id AS "Product ID",
          oi.supplier_id AS "Supplier ID",
          oi.quantity AS "Quantity" 
          From orders o
            INNER JOIN customers c ON c.id = o.customer_id 
              INNER JOIN order_items oi ON o.id = oi.order_id
                WHERE c.name ='Hope Crosby';
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
    ANS: SELECT 
          p.product_name AS "Product Name",
          TO_CHAR(pa.unit_price, 'FM£9,999.00') AS "Unit Price",
          oi.quantity AS "Quantity" 
          FROM order_items oi
            INNER JOIN products p ON p.id = oi.product_id
              INNER JOIN product_availability pa ON pa.prod_id = oi.product_id
                INNER JOIN orders o ON oi.order_id = o.id
                  WHERE o.order_reference = 'ORD006';
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
    ANS: SELECT 
          c.name AS "Customer Name",
          o.order_reference AS "Order Reference",
          o.order_date AS "Order Date",
          p.product_name AS "Product Name",
          s.supplier_name AS "Supplier Name",
          oi.quantity AS "Quantity Ordered"
          FROM order_items oi
            INNER JOIN orders o ON o.id = oi.order_id 
              INNER JOIN customers c ON c.id = o.customer_id
                INNER JOIN products p ON p.id = oi.product_id
                  INNER JOIN suppliers s ON s.id = oi.supplier_id;
12. Retrieve the names of all customers who bought a product from a supplier based in China.
    ANS: SELECT DISTINCT c.name AS "Customer Name"
          FROM customers c 
            INNER JOIN orders o ON o.customer_id = c.id
              INNER JOIN order_items oi ON oi.order_id = o.id
                INNER JOIN product_availability pa ON pa.prod_id = oi.product_id
                  INNER JOIN suppliers s ON s.id = pa.supp_id
                    WHERE s.country = 'China';
13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.
    ANS: SELECT 
          c.name AS "Customer Name",
          o.order_reference AS "Order Reference",
          o.order_date AS "Order Date",
          TO_CHAR(SUM(oi.quantity*pa.unit_price),'FM£9,999.00') AS "Total Expense"
          FROM orders o
            INNER JOIN customers c ON c.id = o.customer_id
              INNER JOIN order_items oi ON oi.order_id = o.id
                INNER JOIN product_availability pa ON pa.prod_id = oi.product_id
                  GROUP BY c.name, o.order_reference, o.order_date
                    ORDER BY SUM(oi.quantity*pa.unit_price) DESC;