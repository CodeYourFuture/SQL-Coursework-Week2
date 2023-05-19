1. Retrieve all the customers' names and addresses who live in the United States

```sql
select name , address from customers where country='United States';
```

2. Retrieve all the customers in ascending name sequence

```sql
select name from customers order by name asc;
```

3. Retrieve all the products whose name contains the word `socks`

```sql
select product_name from products where product_name ilike '%socks%';
```

4. Retrieve all the products which cost more than 100 showing product id, name, unit price and supplier id.

```sql
select p.id, p.product_name, pa.unit_price, pa.supp_id from products p join product_availability pa on  pa.unit_price>100;
```

5. Retrieve the 5 most expensive products

```sql
select p.id, p.product_name, pa.unit_price, pa.supp_id from products p join product_availability pa on pa.unit_price>100 order by pa.unit_price desc limit 5;
```

6. Retrieve all the products with their corresponding suppliers. The result should only contain the columns `product_name`, `unit_price` and `supplier_name`

```sql
select p.product_name,pa.unit_price,s.supplier_name from products p join product_availability pa on p.id = pa.prod_id join suppliers s on s.id = pa.supp_id;
```

7. Retrieve all the products sold by suppliers based in the United Kingdom. The result should only contain the columns `product_name` and `supplier_name`.

```sql
select p.product_name,s.supplier_name from products join product_availability pa on p.id = pa.prod_id join suppliers s on s.id = pa.supp_id where s.country = 'United Kingdom';
```

8. Retrieve all orders, including order items, from customer ID `1`. Include order id, reference, date and total cost (calculated as quantity \* unit price).

```sql
SELECT i.order_id, o.order_reference, o.order_date, p.product_name, i.quantity * pa.unit_price AS total_cost FROM orders o JOIN order_items i ON CAST(SUBSTR(o.order_reference, 4, LENGTH(o.order_reference) - 3) AS INT) = i.order_id JOIN products p ON p.id = i.product_id JOIN product_availability pa ON i.product_id = pa.prod_id WHERE o.customer_id = 1;
```

9. Retrieve all orders, including order items, from customer named `Hope Crosby`

```sql
SELECT o.id,o.order_date,o.order_reference, p.product_name FROM orders o
 JOIN customers c ON o.customer_id=c.id
 JOIN order_items i
ON CAST(SUBSTRING(o.order_reference, 4, LENGTH(o.order_reference) - 3) AS INT) = i.order_id
 JOIN products p ON i.product_id=p.id
WHERE c.name = 'Hope Crosby';
```

10. Retrieve all the products in the order `ORD006`. The result should only contain the columns `product_name`, `unit_price` and `quantity`.

```sql
SELECT product_name,product_availability.unit_price,order_items.quantity FROM products
 JOIN order_items ON order_items.product_id=products.id
 JOIN product_availability
ON product_availability.prod_id=products.id
 JOIN orders
ON CAST(SUBSTRING(orders.order_reference, 4, LENGTH(orders.order_reference) - 3) AS INT) = order_items.order_id
WHERE orders.order_reference = 'ORD006';
```

11. Retrieve all the products with their supplier for all orders of all customers. The result should only contain the columns `name` (from customer), `order_reference`, `order_date`, `product_name`, `supplier_name` and `quantity`.

```sql
SELECT customers.name,orders.order_reference,orders.order_date,products.product_name,suppliers.supplier_name,order_items.quantity FROM customers
 JOIN orders ON orders.customer_id=customers.id
 JOIN order_items
ON CAST(SUBSTRING(orders.order_reference, 4, LENGTH(orders.order_reference) - 3) AS INT) = order_items.order_id
 JOIN products ON order_items.product_id=products.id
 JOIN product_availability
ON product_availability.prod_id=products.id
 JOIN suppliers
ON product_availability.supp_id=suppliers.id;
```

12. Retrieve the names of all customers who bought a product from a supplier based in China.

```sql
SELECT DISTINCT c.name
FROM customers c
JOIN orders o ON o.customer_id = c.id
JOIN order_items i ON CAST(SUBSTR(o.order_reference, 4, LENGTH(o.order_reference) - 3) AS INT) = i.order_id
JOIN product_availability p ON p.prod_id = i.product_id
JOIN suppliers s ON p.supp_id = s.id
WHERE s.country = 'China';
```

13. List all orders giving customer name, order reference, order date and order total amount (quantity \* unit price) in descending order of total.

```sql
SELECT c.name,o.order_reference, o.order_date, p.product_name, i.quantity * pa.unit_price AS "order total amount" FROM customers c
JOIN orders o ON o.customer_id=c.id
JOIN order_items i
ON CAST(SUBSTR(o.order_reference, 4, LENGTH(o.order_reference) - 3) AS INT) = i.order_id
JOIN product_availability pa
ON pa.prod_id=i.product_id
JOIN products p ON pa.prod_id=p.id
order by "order total amount" desc;
```
