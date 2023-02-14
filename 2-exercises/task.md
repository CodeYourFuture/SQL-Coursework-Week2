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
<!-- select name,address from customers where country='United States'; -->
2. Retrieve all the customers in ascending name sequence
<!-- select* from customers order by name asc; -->

3. Retrieve all the products whose name contains the word `socks`
<!-- select * from products where product_name like '%socks%'; -->
4. Retrieve all the products which cost more than 100 showing
product id, name, unit price and supplier id.
<!-- select product_availability.prod_id,product_availability.unit_price,produ
cts.product_name,suppliers.supplier_name from product_availability join products on(produ,
cts.id=product_availability.prod_id)join  suppliers on(suppliers.id=product_availability.
supp_id)where product_availability.unit_price >100; -->

5. Retrieve the 5 most expensive products

<!-- select p.product_name, pa.unit_price from products p inner join product_availability pa on (p.id=pa.prod_id) order by pa.unit_price DESC limit 5; -->

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

<!-- SELECT p.product_name, pa.unit_price, s.supplier_name FROM products p JOIN product_availability pa ON p.id = pa.prod_id JOIN suppliers s ON pa.supp_id = s.id; -->

7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
   <!-- SELECT p.product_name, s.supplier_name FROM suppliers s JOIN product_availability pa ON s.id = pa.supp_id JOIN products p ON pa.prod_id = p.id WHERE s.country = 'United Kingdom'; -->
8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).

<!-- SELECT o.id, o.order_reference, order_date,(oi.quantity * pa.unit_price) as Total_Cost FROM orders o JOIN order_items oi ON o.id = oi.order_id JOIN product_availability pa ON oi.product_id = pa.prod_id  WHERE customer_id = 1; -->

9. Retrieve all orders, including order items, from customer named `Hope Crosby`
<!-- SELECT * FROM customers
INNER JOIN orders ON customers.id=orders.customer_id
INNER JOIN order_items ON order_items.order_id=orders.id
WHERE name ='Hope Crosby'; -->

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

<!-- SELECT products.product_name, product_availability.unit_price, order_items.quantity FROM order_items INNER JOIN products ON order_items.product_id = products.id INNER JOIN product_availability ON order_items.product_id = product_availability.prod_id INNER JOIN orders ON order_items.order_id = orders.id WHERE orders.order_reference = 'ORD006'; -->

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
<!-- SELECT customers.name, orders.order_reference, orders.order_date, products.product_name, suppliers.supplier_name, order_items.quantity FROM order_items  INNER JOIN orders ON order_items.order_id = orders.id INNER JOIN products ON order_items.product_id = products.id INNER JOIN customers ON customers.id = orders.customer_id INNER JOIN suppliers ON order_items.supplier_id = suppliers.id;-->

12. Retrieve the names of all customers who bought a product from a supplier based in China.
<!-- SELECT customers.name FROM order_items INNER JOIN orders ON order_items.order_id = orders.id INNER JOIN customers ON orders.customer_id = customers.id INNER JOIN suppliers ON order_items.supplier_id = suppliers.id WHERE suppliers.country = 'China'; -->
13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.
<!-- SELECT customers.name, orders.order_reference,orders.order_date, (order_items.quantity * product_availability.unit_price) AS total_amount FROM order_items INNER JOIN orders ON orders.id = order_items.order_id INNER JOIN product_availability ON product_availability.prod_id = order_items.product_id INNER JOIN customers ON customers.id = orders.customer_id ORDER BY total_amount DESC; -->
