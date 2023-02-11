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
   <!-- select name, address from customers where country='United States' -->
2. Retrieve all the customers in ascending name sequence
   <!-- select * from customers order by name asc; -->
3. Retrieve all the products whose name contains the word `socks`
<!-- select * from products where product_name like'%socks%'; -->
4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.
<!-- select product_availability.prod_id, product_availability.unit_price,products.product_name, suppliers.supplier_name from product_availability join
products on(products.id = product_availability.prod_id) join suppliers
on (suppliers.id = product_availability.supp_id) where product_availability.unit_price > 100; -->
5. Retrieve the 5 most expensive products
<!-- select product_availability.prod_id, product_availability.unit_price,products.product_name, suppliers.supplier_name from product_availability join
products on(products.id = product_availability.prod_id) join suppliers
on (suppliers.id = product_availability.supp_id) order by product_availability.unit_price DESC limit 5; -->

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
<!-- select product_availability.unit_price,products.product_name, suppliers.supplier_name from product_availability join
products on(products.id = product_availability.prod_id) join suppliers
on (suppliers.id = product_availability.supp_id); -->

7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
<!-- select products.product_name, suppliers.supplier_name from products
join suppliers on (suppliers.id = products.id) where suppliers.country='United Kingdom'
; -->

8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).
<!-- select orders.id, orders.order_reference, orders.order_date,(order_items.quantity * product_availability.unit_price) as total_cost from orders
join order_items on (orders.id = order_items.order_id) join product_availability on
(product_availability.prod_id = order_items.product_id) where orders.customer_id=1; -->

9. Retrieve all orders, including order items, from customer named `Hope Crosby`
<!-- select orders.id, orders.order_reference, orders.order_date from orders join order_items on (orders.id = order_items.order_id) join customers on (customers.id = orders.customer_id) where customers.name='Hope Crosby'; -->

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
12. Retrieve the names of all customers who bought a product from a supplier based in China.
13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.
