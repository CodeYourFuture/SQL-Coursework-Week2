--Question 1
SELECT name, address
FROM customers
WHERE country = 'United States';

--Question 2
SELECT * from customers 
ORDER BY name ASC;

--Question 3
SELECT * FROM products WHERE product_name LIKE '%socks%';

--Question 4
SELECT
order_items.product_id, products.product_name, product_availability.unit_price, order_items.supplier_id
FROM product_availability
INNER JOIN order_items
ON order_items.product_id = product_availability.prod_id 
INNER JOIN products 
ON products.id = product_availability.prod_id 
WHERE product_availability.unit_price > 100;

--Question 5
SELECT * FROM products
INNER JOIN product_availability
ON products.id = product_availability.prod_id 
ORDER BY product_availability.unit_price DESC 
LIMIT 5;

--Question 6
SELECT products.product_name, product_availability.unit_price, suppliers.supplier_name 
FROM products 
INNER JOIN product_availability 
ON products.id = product_availability.prod_id 
INNER JOIN suppliers 
ON suppliers.id = product_availability.supp_id;

--Question 7
SELECT products.product_name, suppliers.supplier_name 
FROM product_availability 
INNER JOIN products
ON product_availability.prod_id = products.id 
INNER JOIN suppliers 
ON product_availability.supp_id = suppliers.id 
WHERE suppliers.country = 'United Kingdom';

--Question 8
SELECT order_items.order_id, orders.order_reference, orders.order_date, order_items.quantity * product_availability.unit_price AS total_cost
FROM order_items
INNER JOIN product_availability
ON order_items.product_id = product_availability.prod_id
INNER JOIN orders
ON orders.id = order_items.order_id
WHERE orders.customer_id = 1;

--Question 9
SELECT orders.order_date, orders.order_reference, orders.customer_id, order_items.order_id, order_items.product_id, order_items.supplier_id
, order_items.quantity 
FROM orders
INNER JOIN order_items 
ON order_items.order_id = orders.id 
INNER JOIN customers 
ON orders.customer_id = customers.id 
WHERE customers.name = 'Hope Crosby';

--Question 10
SELECT products.product_name, product_availability.unit_price, order_items.quantity 
FROM products 
INNER JOIN product_availability 
ON products.id = product_availability.prod_id 
INNER JOIN order_items 
ON order_items.product_id = product_availability.prod_id 
INNER JOIN orders 
ON orders.id = order_items.order_id 
WHERE orders.order_reference = 'ORD006';
