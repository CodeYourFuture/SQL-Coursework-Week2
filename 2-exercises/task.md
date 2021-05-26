# E-Commerce Database

In this homework, you are going to work with an ecommerce database. In this database, you have `products` that `consumers` can buy from different `suppliers`. Customers can create an `order` and several products can be added in one order.

## Submission

Below you will find a set of tasks for you to complete to set up a database for an e-commerce app.

To submit this homework write the correct commands for each question here:

```sql
1. select name, address from customers where country='United States';

2. select * from customers order by name;

3. select * from products where product_name ~ 'socks';

4. select product_name, product_id, unit_price, supplier_id from products 
inner join product_availability on product_availability.prod_id = products.id 
inner join order_items on order_items.product_id = product_availability.prod_id 
where unit_price > 100;

5. select product_name, unit_price from products 
inner join product_availability on products.id = product_availability.prod_id 
order by unit_price desc limit 5;

6. select product_name, unit_price, supplier_name from products 
inner join product_availability on products.id = product_availability.prod_id 
inner join suppliers on product_availability.supp_id = suppliers.id ;

7. select product_name, supplier_name
from products
inner join product_availability
on products.id = product_availability.prod_id
inner join suppliers
on product_availability.supp_id = suppliers.id
where suppliers.country = 'United Kingdom';

8. select order_id, order_date, order_reference, customer_id, unit_price*quantity as "total cost" 
from orders 
inner join order_items on orders.id = order_items.order_id 
inner join product_availability on order_items.product_id = product_availability.prod_id 
where orders.customer_id = 1;

9. select orders.*, order_items.* from customers 
inner join orders on customers.id = orders.customer_id 
inner join order_items on orders.id = order_items.order_id 
where customers.name = 'Hope Crosby';

10. select product_name, unit_price from products 
inner join product_availability on products.id = product_availability.prod_id 
inner join order_items on product_availability.prod_id = order_items.product_id 
inner join orders on order_items.order_id = orders.id 
where orders.order_reference = 'ORD006';

11. select name, order_reference, order_date, product_name, supplier_name, quantity from customers 
inner join orders on customers.id = orders.customer_id
inner join order_items on orders.id = order_items.order_id
inner join product_availability on order_items.product_id = product_availability.prod_id
inner join products on product_availability.prod_id = products.id
inner join suppliers on product_availability.supp_id = suppliers.id;

12. select name from customers inner join orders on customers.id = orders.customer_id
inner join order_items on orders.id = order_items.order_id
inner join product_availability on order_items.product_id = product_availability.prod_id
inner join suppliers on product_availability.supp_id = suppliers.id
where suppliers.country = 'China';

13. select name, order_reference, order_date, unit_price*quantity as "total amount" from customers
inner join orders on customers.id = orders.customer_id
inner join order_items on orders.id = order_items.order_id
inner join product_availability on order_items.product_id = product_availability.prod_id
order by "total amount" desc;

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
2. Retrieve all the customers in ascending name sequence
3. Retrieve all the products whose name contains the word `socks`
4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.
5. Retrieve the 5 most expensive products
6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).
9. Retrieve all orders, including order items, from customer named `Hope Crosby`
10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
12. Retrieve the names of all customers who bought a product from a supplier based in China.
13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.
