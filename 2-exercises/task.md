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
`SELECT name, address
FROM customers 
WHERE country='United States';
`

2. Retrieve all the customers in ascending name sequence
`SELECT name FROM customers
 ORDER BY name ASC;`


3. Retrieve all the products whose name contains the word `socks`
`SELECT * FROM products
WHERE product_name ILIKE '%socks%';`



4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.
`SELECT P.id, P.product_name, p_a.unit_price, S.id FROM  product_availability AS p_a
INNER JOIN  products AS p ON p.id=p_a.prod_id
INNER JOIN  suppliers AS s ON s.id=p_a.supp_id
WHERE p_a.unit_price > 100;`



5. Retrieve the 5 most expensive products
`SELECT * FROM product_availability
ORDER BY unit_price DESC LIMIT 5;`



6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
`SELECT supplier_name, product_name, unit_price FROM products
INNER JOIN product_availability
ON product_availability.prod_id = products.id
INNER JOIN suppliers
ON suppliers.id=product_availability.supp_id;`



7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.
`SELECT product_name, supplier_name FROM products
INNER JOIN product_availability
ON product_availability.prod_id = products.id
INNER JOIN suppliers
ON suppliers.id=product_availability.supp_id
WHERE country='United Kingdom';`



8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity * unit price).
`SELECT customer_id,order_id,order_reference, order_date, SUM(quantity * unit_price) As "Total Cost" FROM order_items
INNER JOIN orders
ON orders.id=order_items.order_id
INNER JOIN product_availability 
ON product_availability.prod_id=order_items.product_id
WHERE orders.customer_id=1
GROUP BY  customer_id,order_id,order_reference, order_date;`



9. Retrieve all orders, including order items, from customer named `Hope Crosby`
`SELECT * FROM customers 
INNER JOIN orders on customers.id =orders.customer_id
INNER JOIN order_items on orders.id= order_items.order_id
WHERE customers.name='Hope Crosby'; 
`



10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.
`SELECT products.product_name, product_availability.unit_price, order_items.quantity, orders.order_reference FROM order_items
INNER JOIN products ON products.id=order_items.product_id
INNER JOIN product_availability ON product_availability.prod_id=order_items.product_id
INNER JOIN orders ON orders.id=order_items.order_id
WHERE order_reference='ORD006';`




11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.
`SELECT customers.name AS "Customer Name", orders.order_reference, orders.order_date, products.product_name, suppliers.supplier_name, order_items.quantity FROM product_availability
INNER JOIN products ON products.id=product_availability.prod_id
INNER JOIN suppliers ON suppliers.id=product_availability.supp_id
INNER JOIN order_items ON order_items.product_id=product_availability.prod_id
INNER JOIN orders ON orders.id=order_items.order_id 
INNER JOIN customers ON customers.id=orders.customer_id;`



12. Retrieve the names of all customers who bought a product from a supplier based in China.
`SELECT customers.name, suppliers.supplier_name, suppliers.country AS "supplier_country" FROM customers
INNER JOIN orders ON orders.customer_id=customers.id
INNER JOIN order_items ON order_items.order_id=orders.id
INNER JOIN suppliers ON suppliers.id=order_items.supplier_id
WHERE suppliers.country='China';`



13. List all orders giving customer name, order reference, order date and order total amount (quantity * unit price) in descending order of total.
`SELECT customers.name, orders.order_reference, orders.order_date,  SUM(order_items.quantity * product_availability.unit_price) As "Total Amount" FROM orders
INNER JOIN customers ON customers.id=orders.customer_id
INNER JOIN order_items ON order_items.order_id=orders.id
INNER JOIN product_availability ON product_availability.prod_id=order_items.product_id
GROUP BY customers.name, orders.order_reference, orders.order_date
ORDER BY SUM(order_items.quantity * product_availability.unit_price) DESC;
`
`SELECT c.name, o.order_reference, o.order_date, SUM(o_i.quantity * p_a.unit_price) AS "Total Amount" FROM orders AS o
INNER JOIN customers AS c ON c.id=o.customer_id
INNER JOIN order_items AS o_i ON o_i.order_id=o.id
INNER JOIN product_availability AS p_a ON p_a.prod_id=o_i.product_id
GROUP BY c.name, o.order_reference, o.order_date
ORDER BY SUM(o_i.quantity * p_a.unit_price) DESC;
`