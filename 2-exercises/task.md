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

 select name,address from customers where country='United States';

2. Retrieve all the customers in ascending name sequence

select * from customers order by name ASC;

3. Retrieve all the products whose name contains the word `socks`

 select * from products where product_name like '%socks%';

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

select p.id,p.product_name,pa.unit_price,pa.supp_id from products p inner join product_availability pa on (p.id=pa.prod_id) where pa.unit_price >100;

5. Retrieve the 5 most expensive products

 select p.product_name, pa.unit_price from products p inner join product_availability pa on (p.id=pa.prod_id) order by pa.unit_price DESC limit 5;

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

 select p.product_name, pa.unit_price,s.supplier_name from products p inner join product_availability pa on (p.id=pa.prod_id) inner join suppliers s on (s.id=pa.supp_id);

7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

select p.product_name, s.supplier_name from products p inner join product_availability pa on (p.id=pa.prod_id) inner join suppliers s on (s.id=pa.supp_id) where s.country='United Kingdom';

8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price).

select o.id,o.order_reference,o.order_date,oi.quantity*pa.unit_price as total from orders o inner join order_items oi on (o.id=oi.order_id) inner join product_availability pa on (pa.prod_id = oi.product_id) where o.customer_id=1;

9. Retrieve all orders, including order items, from customer named `Hope Crosby`

select o.id, oi.product_id,oi.supplier_id,oi.quantity from orders o inner join order_items oi on (o.id=oi.order_id) inner join customers on (customers.id=o.customer_id) where customers.name='Hope Crosby';

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

select p.product_name, pa.unit_price, oi.quantity  from products  p inner join product_availability pa on (p.id = pa.prod_id) inner join order_items oi ON (pa.prod_id = oi.product_id) inner join orders on (oi.order_id = orders.id)  where orders.order_reference = 'ORD006';

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

select c.name, o.order_reference, o.order_date, p.product_name, s.supplier_name, oi.quantity FROM customers c inner Join orders o on (c.id = o.customer_id) inner join order_items oi on (o.id = oi.order_id) inner join product_availability a ON (a.prod_id = oi.product_id) inner JOIN products p ON (p.id = a.prod_id) inner join suppliers s ON (s.id = a.supp_id);

12. Retrieve the names of all customers who bought a product from a supplier based in China.

 select c.name FROM customers c inner Join orders o on (c.id = o.customer_id) inner join order_items oi on (o.id = oi.order_id) inner join product_availability a ON (a.prod_id = oi.product_id) inner JOIN suppliers s ON (s.id = a.supp_id)where s.country = 'China';

13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.

 select c.name, o.order_reference, o.order_date, (a.unit_price * oi.quantity) AS total_amount FROM customers c inner Join orders o on (c.id = o.customer_id) inner join order_items oi on (o.id = oi.order_id) inner join product_availability a ON (a.prod_id = oi.product_id);