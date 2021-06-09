-- 1. Retrieve all the customers' names and addresses 
-- who live in the United States
SELECT name,
    address
FROM customers
WHERE country = 'United States';
-- 2. Retrieve all the customers in ascending name sequence
SELECT *
FROM customers
ORDER BY name;
-- 3. Retrieve all the products whose name contains the word `socks`
SELECT *
FROM products
WHERE product_name LIKE '%socks%';
-- 4. Retrieve all the products which cost more than 100
-- showing product id, name, unit price and supplier id.
SELECT a.id,
    a.product_name,
    b.unit_price,
    b.supp_id
FROM products AS a
    INNER JOIN product_availability AS b ON a.id = b.prod_id
WHERE unit_price > 100;
-- 5. Retrieve the 5 most expensive products
SELECT a.product_name,
    MAX (b.unit_price)
FROM products AS a
    INNER JOIN product_availability AS b ON a.id = b.prod_id
GROUP BY a.product_name
LIMIT 5;
-- 6. Retrieve all the products with their corresponding suppliers. 
-- The result should only contain the columns `product_name`, `unit_price` and `supplier_name`
SELECT a.product_name,
    b.unit_price,
    c.supplier_name
FROM products AS a
    INNER JOIN product_availability AS b ON a.id = b.prod_id
    INNER JOIN suppliers AS c ON b.supp_id = c.id;
-- 7. Retrieve all the products sold by suppliers based in the United Kingdom. 
-- The result should only contain the columns `product_name` and `supplier_name`.
SELECT a.product_name,
    c.supplier_name
FROM products AS a
    INNER JOIN product_availability AS b ON a.id = b.prod_id
    INNER JOIN suppliers AS c ON b.supp_id = c.id
WHERE c.country = 'United Kingdom';
-- 8. Retrieve all orders, including order items, from customer ID `1`. 
-- Include order id, reference, date and total cost (calculated as quantity * unit price).
SELECT a.id,
    a.order_date,
    a.order_reference,
    SUM(b.quantity * c.unit_price) AS total_cost
FROM orders AS a
    INNER JOIN order_items AS b ON a.id = b.order_id
    INNER JOIN product_availability AS c ON b.product_id = c.prod_id
WHERE a.customer_id = 1
GROUP BY a.id,
    a.order_date,
    a.order_reference;
-- 9. Retrieve all orders, including order items, from customer named `Hope Crosby`
SELECT *
FROM orders
    INNER JOIN order_items AS b ON orders.id = b.order_id
    INNER JOIN customers AS c ON orders.customer_id = c.id
WHERE c.name = 'Hope Crosby';
-- 10. Retrieve all the products in the order `ORD006`. The result should 
-- only contain the columns `product_name`, `unit_price` and `quantity`.
SELECT a.product_name,
    b.unit_price,
    c.quantity
FROM products AS a
    INNER JOIN product_availability AS b ON a.id = b.prod_id
    INNER JOIN order_items AS c ON a.id = c.product_id
    INNER JOIN orders AS d ON c.order_id = d.id
WHERE d.order_reference = 'ORD006';
-- 11. Retrieve all the products with their supplier for all orders of all customers. 
-- The result should only contain the columns `name` (from customer), `order_reference`,
--  `order_date`, `product_name`, `supplier_name` and `quantity`.
SELECT a.name,
    b.order_reference,
    b.order_date,
    d.product_name,
    supplier_name,
    quantity
FROM customers AS a
    INNER JOIN orders AS b ON a.id = b.customer_id
    INNER JOIN order_items AS c ON b.id = c.order_id
    INNER JOIN products AS d ON c.product_id = d.id
    INNER JOIN suppliers AS e ON c.supplier_id = e.id;
-- 12. Retrieve the names of all customers who bought a product from a supplier based in China.
SELECT a.name
FROM customers AS a
    INNER JOIN orders AS b ON a.id = b.customer_id
    INNER JOIN order_items AS c ON b.id = c.order_id
    INNER JOIN suppliers AS d ON c.supplier_id = d.id
WHERE d.country = 'China';
-- 13. List all orders giving customer name, order reference, order date and 
-- order total amount (quantity * unit price) in descending order of total.
SELECT a.name,
    b.order_date,
    b.order_reference,
    SUM(c.quantity * d.unit_price) AS total_cost
FROM customers AS a
    INNER JOIN orders AS b ON b.customer_id = a.id
    INNER JOIN order_items AS c ON b.id = c.order_id
    INNER JOIN product_availability AS d ON c.product_id = d.prod_id
GROUP BY a.name,
    b.order_date,
    b.order_reference
ORDER BY total_cost DESC;
-- (STRETCH GOAL) Add a new GET endpoint `/products` 
-- to return all the product names along with their 
-- prices and supplier names.
\ echo Server Project
SELECT a.product_name,
    c.unit_price,
    supplier_name
FROM products AS a
    INNER JOIN order_items AS b ON a.id = b.product_id
    INNER JOIN product_availability AS c ON b.product_id = c.prod_id
    INNER JOIN suppliers AS d ON b.supplier_id = d.id